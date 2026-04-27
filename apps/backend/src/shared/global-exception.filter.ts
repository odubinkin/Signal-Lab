import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import * as Sentry from '@sentry/node';
import { JsonLogger } from './json-logger.service';

type ErrorBody = {
  statusCode: number;
  path: string;
  timestamp: string;
  message: string | string[];
};

type TeapotBody = {
  signal: number;
  message: string;
};

@Catch()
/**
 * Normalizes uncaught and HTTP exceptions into the backend error response
 * contract.
 *
 * Server errors are reported to Sentry, while intentional client/demo errors
 * are logged at warning level and returned with their original status code.
 */
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: JsonLogger) {}

  /**
   * Converts an exception into the JSON response shape expected by clients.
   */
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionResponse = exception instanceof HttpException ? exception.getResponse() : undefined;
    const message = this.resolveMessage(exceptionResponse, exception);

    if (status >= 500) {
      Sentry.captureException(exception);
      this.logger.error(`Unhandled request error: ${request.method} ${request.url}`, undefined, 'GlobalExceptionFilter');
    } else {
      this.logger.warn(`Handled request error: ${request.method} ${request.url}`, 'GlobalExceptionFilter');
    }

    if (status === HttpStatus.I_AM_A_TEAPOT && this.isTeapotBody(exceptionResponse)) {
      response.status(status).json(exceptionResponse);
      return;
    }

    const body: ErrorBody = {
      statusCode: status,
      path: request.url,
      timestamp: new Date().toISOString(),
      message
    };

    response.status(status).json(body);
  }

  /**
   * Extracts the most useful message from Nest HTTP exception bodies and
   * generic Error instances.
   */
  private resolveMessage(exceptionResponse: unknown, exception: unknown): string | string[] {
    if (typeof exceptionResponse === 'object' && exceptionResponse !== null && 'message' in exceptionResponse) {
      const message = (exceptionResponse as { message: unknown }).message;
      if (typeof message === 'string' || Array.isArray(message)) {
        return message as string | string[];
      }
    }

    if (exception instanceof Error && exception.message) {
      return exception.message;
    }

    return 'Internal server error';
  }

  /**
   * Detects the custom teapot payload that should be passed through unchanged.
   */
  private isTeapotBody(value: unknown): value is TeapotBody {
    return (
      typeof value === 'object' &&
      value !== null &&
      'signal' in value &&
      'message' in value &&
      (value as TeapotBody).signal === 42 &&
      (value as TeapotBody).message === "I'm a teapot"
    );
  }
}
