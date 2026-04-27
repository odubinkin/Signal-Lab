import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, LogLevel } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as Sentry from '@sentry/node';
import { MetricsService } from '../metrics/metrics.service';
import { PrismaService } from '../prisma/prisma.service';
import { JsonLogger } from '../shared/json-logger.service';
import { RunScenarioDto } from './dto/run-scenario.dto';

type ScenarioRunResponse = {
  id: string;
  type: string;
  status: string;
  duration: number;
};

const wait = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

@Injectable()
export class ScenarioRunsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly metrics: MetricsService,
    private readonly logger: JsonLogger
  ) {}

  async run(dto: RunScenarioDto): Promise<ScenarioRunResponse> {
    const startedAt = Date.now();

    if (dto.type === 'slow_request') {
      await wait(this.getSlowRequestTimeoutMs());
    }

    const duration = Date.now() - startedAt;

    if (dto.type === 'validation_error') {
      const run = await this.persist(dto, 'validation_error', duration, 'Requested validation error demo.');
      this.record('warn', dto.type, run.id, 'validation_error', duration, 'Requested validation error demo.');
      throw new BadRequestException('Scenario requested a validation error.');
    }

    if (dto.type === 'teapot') {
      const run = await this.persist(dto, 'teapot', duration, undefined, { easter: true });
      this.record('warn', dto.type, run.id, 'teapot', duration);
      throw new HttpException({ signal: 42, message: "I'm a teapot" }, HttpStatus.I_AM_A_TEAPOT);
    }

    if (dto.type === 'system_error') {
      const run = await this.persist(dto, 'system_error', duration, 'Requested system error demo.');
      const error = new InternalServerErrorException('Scenario requested a system error.');
      Sentry.captureException(error);
      this.record('error', dto.type, run.id, 'system_error', duration, 'Requested system error demo.');
      throw error;
    }

    const status = dto.type === 'slow_request' ? 'slow_warning' : 'success';
    const run = await this.persist(dto, status, duration);
    this.record(dto.type === 'slow_request' ? 'warn' : 'log', dto.type, run.id, status, duration);

    return {
      id: run.id,
      type: run.type,
      status: run.status,
      duration: run.duration ?? duration
    };
  }

  private async persist(
    dto: RunScenarioDto,
    status: string,
    duration: number,
    error?: string,
    extraMetadata: Record<string, unknown> = {}
  ) {
    const metadata = this.buildMetadata(dto, extraMetadata);
    return this.prisma.scenarioRun.create({
      data: {
        type: dto.type,
        status,
        duration,
        error,
        metadata
      }
    });
  }

  private buildMetadata(dto: RunScenarioDto, extraMetadata: Record<string, unknown>): Prisma.InputJsonObject | undefined {
    const metadata = this.toJsonObject({
      ...(dto.metadata ?? {}),
      ...extraMetadata,
      ...(dto.name ? { name: dto.name } : {})
    });

    return Object.keys(metadata).length > 0 ? metadata : undefined;
  }

  private toJsonObject(value: Record<string, unknown>): Prisma.InputJsonObject {
    return Object.fromEntries(
      Object.entries(value)
        .map(([key, item]) => [key, this.toJsonValue(item)] as const)
        .filter((entry): entry is readonly [string, Prisma.InputJsonValue] => entry[1] !== undefined)
    );
  }

  private toJsonValue(value: unknown): Prisma.InputJsonValue | undefined {
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return value;
    }

    if (Array.isArray(value)) {
      return value.map((item) => this.toJsonValue(item)).filter((item): item is Prisma.InputJsonValue => item !== undefined);
    }

    if (typeof value === 'object' && value !== null) {
      return this.toJsonObject(value as Record<string, unknown>);
    }

    return undefined;
  }

  private getSlowRequestTimeoutMs(): number {
    const rawValue = process.env.SLOW_REQUEST_TIMEOUT_MS;
    const parsedValue = rawValue ? Number(rawValue) : 5000;

    if (!Number.isFinite(parsedValue) || parsedValue < 0) {
      return 5000;
    }

    return parsedValue;
  }

  private record(level: LogLevel, scenarioType: string, scenarioId: string, status: string, duration: number, error?: string): void {
    this.metrics.recordScenario(scenarioType, status, duration);
    this.metrics.recordHttp('POST', '/api/scenarios/run', status === 'success' || status === 'slow_warning' ? 200 : status === 'teapot' ? 418 : status === 'validation_error' ? 400 : 500);
    this.logger.scenario(level, 'Scenario run handled', {
      scenarioType,
      scenarioId,
      status,
      duration,
      error
    });
  }
}
