import { INestApplication, RequestMethod, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as Sentry from '@sentry/node';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { PrismaService } from '../prisma/prisma.service';
import { GlobalExceptionFilter } from '../shared/global-exception.filter';
import { JsonLogger } from '../shared/json-logger.service';

jest.mock('@sentry/node', () => ({
  captureException: jest.fn(),
  init: jest.fn()
}));

describe('Backend scenario HTTP integration', () => {
  const originalSlowRequestTimeout = process.env.SLOW_REQUEST_TIMEOUT_MS;
  let app: INestApplication;
  let prisma: { scenarioRun: { create: jest.Mock; findMany: jest.Mock } };
  let logger: jest.Mocked<Pick<JsonLogger, 'log' | 'warn' | 'error' | 'debug' | 'scenario'>>;

  beforeAll(async () => {
    process.env.SLOW_REQUEST_TIMEOUT_MS = '0';
    prisma = {
      scenarioRun: {
        findMany: jest.fn(() =>
          Promise.resolve([
            {
              id: 'run_recent',
              type: 'success',
              status: 'success',
              duration: 14,
              createdAt: new Date('2026-04-27T00:00:00.000Z')
            }
          ])
        ),
        create: jest.fn(({ data }) =>
          Promise.resolve({
            id: `run_${data.type}`,
            type: data.type,
            status: data.status,
            duration: data.duration
          })
        )
      }
    };
    logger = {
      log: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
      scenario: jest.fn()
    };

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .overrideProvider(JsonLogger)
      .useValue(logger)
      .compile();

    app = moduleRef.createNestApplication();
    app.useLogger(logger);
    app.enableCors();
    app.setGlobalPrefix('api', {
      exclude: [{ path: 'metrics', method: RequestMethod.GET }]
    });
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true
      })
    );
    app.useGlobalFilters(new GlobalExceptionFilter(logger as unknown as JsonLogger));
    await app.init();
  });

  beforeEach(() => {
    prisma.scenarioRun.create.mockClear();
    prisma.scenarioRun.findMany.mockClear();
    jest.mocked(Sentry.captureException).mockClear();
  });

  afterAll(async () => {
    await app.close();
    process.env.SLOW_REQUEST_TIMEOUT_MS = originalSlowRequestTimeout;
  });

  it('serves health under the global API prefix', async () => {
    const response = await request(app.getHttpServer()).get('/api/health').expect(200);

    expect(response.body).toEqual({
      status: 'ok',
      timestamp: expect.any(String)
    });
  });

  it('runs a successful scenario through validation, persistence, and metrics', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/scenarios/run')
      .send({ type: 'success', name: 'Integration', metadata: { source: 'test' } })
      .expect(200);

    expect(response.body).toEqual({
      id: 'run_success',
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
        metadata: { source: 'test', name: 'Integration' }
      }
    });
  });

  it('rejects invalid scenario payloads before persistence', async () => {
    const response = await request(app.getHttpServer()).post('/api/scenarios/run').send({ type: 'unknown' }).expect(400);

    expect(response.body).toMatchObject({
      statusCode: 400,
      path: '/api/scenarios/run',
      message: expect.arrayContaining([expect.stringContaining('type must be one of the following values')])
    });
    expect(prisma.scenarioRun.create).not.toHaveBeenCalled();
  });

  it('returns intentional validation scenario errors after persistence', async () => {
    const response = await request(app.getHttpServer()).post('/api/scenarios/run').send({ type: 'validation_error' }).expect(400);

    expect(response.body).toMatchObject({
      statusCode: 400,
      path: '/api/scenarios/run',
      message: 'Scenario requested a validation error.'
    });
    expect(prisma.scenarioRun.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        type: 'validation_error',
        status: 'validation_error',
        error: 'Requested validation error demo.'
      })
    });
  });

  it('passes through the custom teapot response body', async () => {
    const response = await request(app.getHttpServer()).post('/api/scenarios/run').send({ type: 'teapot' }).expect(418);

    expect(response.body).toEqual({ signal: 42, message: "I'm a teapot" });
  });

  it('returns normalized server errors and reports them to Sentry', async () => {
    const response = await request(app.getHttpServer()).post('/api/scenarios/run').send({ type: 'system_error' }).expect(500);

    expect(response.body).toMatchObject({
      statusCode: 500,
      path: '/api/scenarios/run',
      message: 'Scenario requested a system error.'
    });
    expect(Sentry.captureException).toHaveBeenCalled();
  });

  it('records slow request scenarios as successful slow warnings', async () => {
    const response = await request(app.getHttpServer()).post('/api/scenarios/run').send({ type: 'slow_request' }).expect(200);

    expect(response.body).toMatchObject({
      id: 'run_slow_request',
      type: 'slow_request',
      status: 'slow_warning'
    });
  });

  it('returns recent scenario runs for the frontend history', async () => {
    const response = await request(app.getHttpServer()).get('/api/scenarios/runs').expect(200);

    expect(response.body).toEqual([
      {
        id: 'run_recent',
        type: 'success',
        status: 'success',
        duration: 14,
        createdAt: '2026-04-27T00:00:00.000Z'
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

  it('exposes Prometheus metrics outside the API prefix', async () => {
    const response = await request(app.getHttpServer()).get('/metrics').expect(200);

    expect(response.text).toContain('scenario_runs_total');
    expect(response.headers['content-type']).toContain('text/plain');
  });
});
