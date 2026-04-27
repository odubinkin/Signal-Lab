import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RunScenarioDto } from './dto/run-scenario.dto';
import { ScenarioRunsService } from './scenario-runs.service';

@ApiTags('scenarios')
@Controller('scenarios')
export class ScenarioRunsController {
  constructor(private readonly scenarioRuns: ScenarioRunsService) {}

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
