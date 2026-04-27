import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RunScenarioDto } from './dto/run-scenario.dto';
import { ScenarioRunsService } from './scenario-runs.service';

@ApiTags('scenarios')
@Controller('scenarios')
/**
 * HTTP controller for scenario execution demos.
 *
 * The controller stays thin so validation, persistence, metrics, and logging
 * behavior remain centralized in {@link ScenarioRunsService}.
 */
export class ScenarioRunsController {
  constructor(private readonly scenarioRuns: ScenarioRunsService) {}

  /**
   * Executes a scenario and returns the persisted run summary when the scenario
   * completes successfully.
   *
   * Error scenarios deliberately throw typed HTTP exceptions after recording
   * their run, allowing the frontend to exercise global error handling.
   */
  @Post('run')
  @HttpCode(200)
  @ApiOkResponse({
    schema: {
      example: {
        id: 'clv0000000000abcd1234',
        type: 'success',
        status: 'success',
        duration: 12
      }
    }
  })
  run(@Body() dto: RunScenarioDto) {
    return this.scenarioRuns.run(dto);
  }
}
