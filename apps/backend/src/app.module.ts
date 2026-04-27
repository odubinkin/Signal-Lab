import { Module } from '@nestjs/common';
import { HealthController } from './health/health.controller';
import { MetricsController } from './metrics/metrics.controller';
import { MetricsService } from './metrics/metrics.service';
import { PrismaService } from './prisma/prisma.service';
import { ScenarioRunsController } from './scenario-runs/scenario-runs.controller';
import { ScenarioRunsService } from './scenario-runs/scenario-runs.service';
import { JsonLogger } from './shared/json-logger.service';

@Module({
  controllers: [HealthController, MetricsController, ScenarioRunsController],
  providers: [JsonLogger, MetricsService, PrismaService, ScenarioRunsService]
})
export class AppModule {}
