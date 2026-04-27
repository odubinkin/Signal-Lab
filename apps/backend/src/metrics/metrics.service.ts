import { Injectable } from '@nestjs/common';
import { Counter, Histogram, Registry, collectDefaultMetrics } from 'prom-client';

@Injectable()
/**
 * Owns the Prometheus registry and application-specific counters.
 *
 * A private registry keeps tests and repeated Nest application instances from
 * colliding with prom-client's default global registry.
 */
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

  /**
   * Records a scenario run count and duration observation.
   */
  recordScenario(type: string, status: string, durationMs: number): void {
    this.scenarioRunsTotal.inc({ type, status });
    this.scenarioRunDurationSeconds.observe({ type }, durationMs / 1000);
  }

  /**
   * Records the HTTP response status emitted for a backend endpoint.
   */
  recordHttp(method: string, path: string, statusCode: number): void {
    this.httpRequestsTotal.inc({ method, path, status_code: String(statusCode) });
  }

  /**
   * Renders the current registry in Prometheus text exposition format.
   */
  async render(): Promise<string> {
    return this.registry.metrics();
  }

  /**
   * Returns the content type expected by Prometheus-compatible scrapers.
   */
  contentType(): string {
    return this.registry.contentType;
  }
}
