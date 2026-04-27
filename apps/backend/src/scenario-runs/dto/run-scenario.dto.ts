import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export const scenarioTypes = ['success', 'validation_error', 'system_error', 'slow_request', 'teapot'] as const;

export type ScenarioType = (typeof scenarioTypes)[number];

export class RunScenarioDto {
  @ApiProperty({ enum: scenarioTypes, example: 'success' })
  @IsIn(scenarioTypes)
  type!: ScenarioType;

  @ApiPropertyOptional({ example: 'Demo run' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string;

  @ApiPropertyOptional({ example: { source: 'frontend' } })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
