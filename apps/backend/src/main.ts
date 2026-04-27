import { INestApplication, ValidationPipe, RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './shared/global-exception.filter';
import { JsonLogger } from './shared/json-logger.service';

/**
 * Creates and starts the Nest backend with production-equivalent middleware,
 * validation, logging, exception handling, Swagger, and optional Sentry setup.
 */
async function bootstrap(): Promise<void> {
  let app: INestApplication | undefined;
  const sentryDsn = process.env.SENTRY_DSN;
  const sentryProjectSlug = process.env.SENTRY_PROJECT_SLUG ?? 'signal-lab';
  if (sentryDsn) {
    Sentry.init({
      dsn: sentryDsn,
      environment: process.env.NODE_ENV ?? 'development',
      serverName: sentryProjectSlug,
      initialScope: {
        tags: {
          project_slug: sentryProjectSlug
        }
      }
    });
  }

  try {
    app = await NestFactory.create(AppModule, {
      bufferLogs: true
    });
    const logger = app.get(JsonLogger);
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
    app.useGlobalFilters(new GlobalExceptionFilter(logger));

    const config = new DocumentBuilder()
      .setTitle('Signal Lab API')
      .setDescription('Platform foundation API for scenario execution demos.')
      .setVersion('0.1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    const port = Number(process.env.BACKEND_PORT ?? 3001);
    await app.listen(port, '0.0.0.0');
    logger.log(`Backend listening on ${port}`, 'Bootstrap');
  } catch (error) {
    Sentry.captureException(error);
    await Sentry.flush(2000);
    if (app) {
      await app.close().catch(() => undefined);
    }
    process.exit(1);
  }
}

void bootstrap();
