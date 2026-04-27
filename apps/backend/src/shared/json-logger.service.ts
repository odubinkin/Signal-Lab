import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';

type LogPayload = {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: string;
  [key: string]: unknown;
};

@Injectable()
export class JsonLogger extends ConsoleLogger {
  override log(message: unknown, context?: string): void {
    this.write('log', message, context);
  }

  override warn(message: unknown, context?: string): void {
    this.write('warn', message, context);
  }

  override error(message: unknown, stack?: string, context?: string): void {
    this.write('error', message, context);
  }

  override debug(message: unknown, context?: string): void {
    this.write('debug', message, context);
  }

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

  scenario(level: LogLevel, message: string, fields: Record<string, unknown>): void {
    this.write(level, message, 'ScenarioRuns', fields);
  }
}
