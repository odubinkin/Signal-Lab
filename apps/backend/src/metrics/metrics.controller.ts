import { Controller, Get, Header } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { MetricsService } from './metrics.service';

@ApiExcludeController()
@Controller('metrics')
/**
 * Exposes Prometheus metrics outside the API prefix.
 */
export class MetricsController {
  constructor(private readonly metrics: MetricsService) {}

  /**
   * Returns the registry payload using the Prometheus text exposition format.
   */
  @Get()
  @Header('Content-Type', 'text/plain; version=0.0.4; charset=utf-8')
  async getMetrics(): Promise<string> {
    return this.metrics.render();
  }
}
