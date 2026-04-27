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

/**
 * Pauses execution for latency demo scenarios.
 *
 * The helper is module-scoped so tests can drive the delay through
 * SLOW_REQUEST_TIMEOUT_MS without exposing timing controls on the service API.
 */
const wait = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

@Injectable()
/**
 * Coordinates scenario execution, persistence, telemetry, and intentional
 * error paths for the demo API.
 */
export class ScenarioRunsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly metrics: MetricsService,
    private readonly logger: JsonLogger
  ) {}

  /**
   * Runs the requested scenario and returns a persisted run summary for
   * successful outcomes.
   *
   * Intentional error scenarios are still persisted and recorded before their
   * HTTP exceptions are thrown, preserving observability parity across success
   * and failure flows.
   */
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

  /**
   * Persists a scenario run with JSON-safe metadata and optional error detail.
   */
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

  /**
   * Merges caller metadata, scenario-specific fields, and the optional display
   * name into the Prisma JSON shape.
   *
   * Returns undefined when there is no JSON payload to avoid storing empty
   * objects for runs without useful metadata.
   */
  private buildMetadata(dto: RunScenarioDto, extraMetadata: Record<string, unknown>): Prisma.InputJsonObject | undefined {
    const metadata = this.toJsonObject({
      ...(dto.metadata ?? {}),
      ...extraMetadata,
      ...(dto.name ? { name: dto.name } : {})
    });

    return Object.keys(metadata).length > 0 ? metadata : undefined;
  }

  /**
   * Converts a loose record into Prisma JSON input, dropping unsupported values
   * such as undefined, functions, and symbols.
   */
  private toJsonObject(value: Record<string, unknown>): Prisma.InputJsonObject {
    return Object.fromEntries(
      Object.entries(value)
        .map(([key, item]) => [key, this.toJsonValue(item)] as const)
        .filter((entry): entry is readonly [string, Prisma.InputJsonValue] => entry[1] !== undefined)
    );
  }

  /**
   * Recursively narrows unknown values to Prisma JSON input values.
   *
   * Arrays and objects are preserved after unsupported nested values are
   * removed, which keeps useful diagnostic context without risking Prisma JSON
   * serialization errors.
   */
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

  /**
   * Reads the slow-request delay from the environment with a safe default.
   *
   * Invalid or negative values fall back to five seconds so the demo remains
   * deterministic even when configuration is malformed.
   */
  private getSlowRequestTimeoutMs(): number {
    const rawValue = process.env.SLOW_REQUEST_TIMEOUT_MS;
    const parsedValue = rawValue ? Number(rawValue) : 5000;

    if (!Number.isFinite(parsedValue) || parsedValue < 0) {
      return 5000;
    }

    return parsedValue;
  }

  /**
   * Emits metrics and structured logs for the completed scenario outcome.
   *
   * The HTTP status label mirrors the exception that callers observe, while
   * success and slow-warning scenarios both map to the 200 response path.
   */
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
