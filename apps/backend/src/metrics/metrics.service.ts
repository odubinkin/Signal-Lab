import { Injectable } from '@nestjs/common';
import { Counter, Histogram, Registry, collectDefaultMetrics } from 'prom-client';

@Injectable()
export class MetricsService {
  private readonly registry = new Registry();
  private readonly scenarioRunsTotal: Counter<'type' | 'status'>;
  private readonly scenarioRunDurationSeconds: Histogram<'type'>;
  private readonly httpRequestsTotal: Counter<'method' | 'path' | 'status_code'>;

  constructor() {
    collectDefaultMetrics({ register: this.registry });
    this.scenarioRunsTotal = new Counter({
      name: 'scenario_runs_total',
      help: 'Total scenario runs by type and status.',
      labelNames: ['type', 'status'],
      registers: [this.registry]
    });
    this.scenarioRunDurationSeconds = new Histogram({
      name: 'scenario_run_duration_seconds',
      help: 'Scenario run duration in seconds.',
      labelNames: ['type'],
      buckets: [0.05, 0.1, 0.25, 0.5, 1, 2, 5],
      registers: [this.registry]
    });
    this.httpRequestsTotal = new Counter({
      name: 'http_requests_total',
      help: 'HTTP responses by method, path, and status code.',
      labelNames: ['method', 'path', 'status_code'],
      registers: [this.registry]
    });
  }

  recordScenario(type: string, status: string, durationMs: number): void {
    this.scenarioRunsTotal.inc({ type, status });
    this.scenarioRunDurationSeconds.observe({ type }, durationMs / 1000);
  }

  recordHttp(method: string, path: string, statusCode: number): void {
    this.httpRequestsTotal.inc({ method, path, status_code: String(statusCode) });
  }

  async render(): Promise<string> {
    return this.registry.metrics();
  }

  contentType(): string {
    return this.registry.contentType;
  }
}
