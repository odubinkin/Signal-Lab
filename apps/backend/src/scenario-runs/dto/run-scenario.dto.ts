import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export const scenarioTypes = ['success', 'validation_error', 'system_error', 'slow_request', 'teapot'] as const;

/**
 * Supported scenario demo modes exposed by the backend.
 *
 * Each value maps to a deterministic API behavior so the frontend can trigger
 * success, validation, latency, and error-handling paths on demand.
 */
export type ScenarioType = (typeof scenarioTypes)[number];

/**
 * Request payload accepted by the scenario execution endpoint.
 *
 * The DTO intentionally keeps metadata loose because demo callers can attach
 * arbitrary diagnostic context. The service later sanitizes it into Prisma's
 * JSON input shape before persistence.
 */
export class RunScenarioDto {
  /** Scenario mode that selects the backend behavior to execute. */
  @ApiProperty({ enum: scenarioTypes, example: 'success' })
  @IsIn(scenarioTypes)
  type!: ScenarioType;

  /** Optional human-readable label copied into persisted metadata. */
  @ApiPropertyOptional({ example: 'Demo run' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string;

  /** Optional caller-provided metadata persisted with JSON-safe values only. */
  @ApiPropertyOptional({ example: { source: 'frontend' } })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
