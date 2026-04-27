import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';

type LogPayload = {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: string;
  [key: string]: unknown;
};

@Injectable()
/**
 * Console logger that emits one structured JSON object per line.
 *
 * The service keeps Nest's logger contract while producing log output that is
 * easier for local tooling and observability pipelines to parse.
 */
export class JsonLogger extends ConsoleLogger {
  /** Writes a standard informational log entry. */
  override log(message: unknown, context?: string): void {
    this.write('log', message, context);
  }

  /** Writes a warning log entry. */
  override warn(message: unknown, context?: string): void {
    this.write('warn', message, context);
  }

  /** Writes an error log entry. */
  override error(message: unknown, stack?: string, context?: string): void {
    this.write('error', message, context);
  }

  /** Writes a debug log entry. */
  override debug(message: unknown, context?: string): void {
    this.write('debug', message, context);
  }

  /**
   * Serializes a log payload and writes it to stdout.
   */
  private write(level: LogLevel, message: unknown, context?: string, extra: Record<string, unknown> = {}): void {
    const payload: LogPayload = {
      timestamp: new Date().toISOString(),
      level,
      message: typeof message === 'string' ? message : JSON.stringify(message),
      context,
      ...extra
    };
    process.stdout.write(`${JSON.stringify(payload)}\n`);
  }

  /**
   * Emits scenario-specific logs with a stable context name and custom fields.
   */
  scenario(level: LogLevel, message: string, fields: Record<string, unknown>): void {
    this.write(level, message, 'ScenarioRuns', fields);
  }
}
