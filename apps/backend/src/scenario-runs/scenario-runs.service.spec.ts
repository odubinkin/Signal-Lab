import { BadRequestException, HttpException, InternalServerErrorException } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { MetricsService } from '../metrics/metrics.service';
import { PrismaService } from '../prisma/prisma.service';
import { JsonLogger } from '../shared/json-logger.service';
import { ScenarioRunsService } from './scenario-runs.service';

jest.mock('@sentry/node', () => ({
  captureException: jest.fn()
}));

describe('ScenarioRunsService', () => {
  const originalSlowRequestTimeout = process.env.SLOW_REQUEST_TIMEOUT_MS;
  let prisma: jest.Mocked<Pick<PrismaService, 'scenarioRun'>>;
  let metrics: jest.Mocked<Pick<MetricsService, 'recordScenario' | 'recordHttp'>>;
  let logger: jest.Mocked<Pick<JsonLogger, 'scenario'>>;
  let service: ScenarioRunsService;

  beforeEach(() => {
    prisma = {
      scenarioRun: {
        findMany: jest.fn(),
        create: jest.fn(({ data }) =>
          Promise.resolve({
            id: 'run_123',
            type: data.type,
            status: data.status,
            duration: data.duration
          })
        )
      }
    } as unknown as jest.Mocked<Pick<PrismaService, 'scenarioRun'>>;
    metrics = {
      recordScenario: jest.fn(),
      recordHttp: jest.fn()
    };
    logger = {
      scenario: jest.fn()
    };
    service = new ScenarioRunsService(prisma as unknown as PrismaService, metrics as unknown as MetricsService, logger as unknown as JsonLogger);
    jest.mocked(Sentry.captureException).mockClear();
    delete process.env.SLOW_REQUEST_TIMEOUT_MS;
  });

  afterAll(() => {
    process.env.SLOW_REQUEST_TIMEOUT_MS = originalSlowRequestTimeout;
  });

  it('persists a successful run and records success telemetry', async () => {
    await expect(
      service.run({
        type: 'success',
        name: 'Demo',
        metadata: {
          source: 'frontend',
          ignored: undefined,
          nested: { keep: true, skip: () => 'unsupported' },
          list: [1, undefined, 'ok']
        }
      })
    ).resolves.toEqual({
      id: 'run_123',
      type: 'success',
      status: 'success',
      duration: expect.any(Number)
    });

    expect(prisma.scenarioRun.create).toHaveBeenCalledWith({
      data: {
        type: 'success',
        status: 'success',
        duration: expect.any(Number),
        error: undefined,
        metadata: {
          source: 'frontend',
          nested: { keep: true },
          list: [1, 'ok'],
          name: 'Demo'
        }
      }
    });
    expect(metrics.recordScenario).toHaveBeenCalledWith('success', 'success', expect.any(Number));
    expect(metrics.recordHttp).toHaveBeenCalledWith('POST', '/api/scenarios/run', 200);
    expect(logger.scenario).toHaveBeenCalledWith('log', 'Scenario run handled', expect.objectContaining({ status: 'success' }));
  });

  it('records validation_error runs before throwing a bad request exception', async () => {
    await expect(service.run({ type: 'validation_error' })).rejects.toBeInstanceOf(BadRequestException);

    expect(prisma.scenarioRun.create).toHaveBeenCalledWith({
      data: {
        type: 'validation_error',
        status: 'validation_error',
        duration: expect.any(Number),
        error: 'Requested validation error demo.',
        metadata: undefined
      }
    });
    expect(metrics.recordHttp).toHaveBeenCalledWith('POST', '/api/scenarios/run', 400);
    expect(logger.scenario).toHaveBeenCalledWith(
      'warn',
      'Scenario run handled',
      expect.objectContaining({ status: 'validation_error', error: 'Requested validation error demo.' })
    );
  });

  it('records teapot runs with the custom teapot payload', async () => {
    await service.run({ type: 'teapot' }).catch((error: unknown) => {
      expect(error).toBeInstanceOf(HttpException);
      const exception = error as HttpException;
      expect(exception.getStatus()).toBe(418);
      expect(exception.getResponse()).toEqual({ signal: 42, message: "I'm a teapot" });
    });

    expect(prisma.scenarioRun.create).toHaveBeenCalledWith({
      data: {
        type: 'teapot',
        status: 'teapot',
        duration: expect.any(Number),
        error: undefined,
        metadata: { easter: true }
      }
    });
    expect(metrics.recordHttp).toHaveBeenCalledWith('POST', '/api/scenarios/run', 418);
  });

  it('reports system_error runs to Sentry before throwing an internal server error', async () => {
    await expect(service.run({ type: 'system_error' })).rejects.toBeInstanceOf(InternalServerErrorException);

    expect(Sentry.captureException).toHaveBeenCalledWith(expect.any(InternalServerErrorException));
    expect(prisma.scenarioRun.create).toHaveBeenCalledWith({
      data: {
        type: 'system_error',
        status: 'system_error',
        duration: expect.any(Number),
        error: 'Requested system error demo.',
        metadata: undefined
      }
    });
    expect(metrics.recordHttp).toHaveBeenCalledWith('POST', '/api/scenarios/run', 500);
  });

  it('uses the configured slow request delay and records a slow warning', async () => {
    process.env.SLOW_REQUEST_TIMEOUT_MS = '0';

    await expect(service.run({ type: 'slow_request' })).resolves.toMatchObject({
      id: 'run_123',
      type: 'slow_request',
      status: 'slow_warning'
    });

    expect(prisma.scenarioRun.create).toHaveBeenCalledWith({
      data: {
        type: 'slow_request',
        status: 'slow_warning',
        duration: expect.any(Number),
        error: undefined,
        metadata: undefined
      }
    });
    expect(metrics.recordScenario).toHaveBeenCalledWith('slow_request', 'slow_warning', expect.any(Number));
    expect(metrics.recordHttp).toHaveBeenCalledWith('POST', '/api/scenarios/run', 200);
  });

  it('lists the latest 20 scenario runs for history', async () => {
    const createdAt = new Date('2026-04-27T00:00:00.000Z');
    jest.mocked(prisma.scenarioRun.findMany).mockResolvedValue([
      {
        id: 'run_recent',
        type: 'success',
        status: 'success',
        duration: 20,
        createdAt
      }
    ] as never);

    await expect(service.listRecent()).resolves.toEqual([
      {
        id: 'run_recent',
        type: 'success',
        status: 'success',
        duration: 20,
        createdAt
      }
    ]);
    expect(prisma.scenarioRun.findMany).toHaveBeenCalledWith({
      orderBy: { createdAt: 'desc' },
      take: 20,
      select: {
        id: true,
        type: true,
        status: true,
        duration: true,
        createdAt: true
      }
    });
  });
});
