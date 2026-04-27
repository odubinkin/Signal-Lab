import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
/**
 * Provides a lightweight liveness endpoint for the backend process.
 */
export class HealthController {
  /**
   * Returns a static health status with the server-side response timestamp.
   */
  @Get()
  @ApiOkResponse({
    schema: {
      example: {
        status: 'ok',
        timestamp: '2026-04-27T00:00:00.000Z'
      }
    }
  })
  getHealth(): { status: 'ok'; timestamp: string } {
    return {
      status: 'ok',
      timestamp: new Date().toISOString()
    };
  }
}
