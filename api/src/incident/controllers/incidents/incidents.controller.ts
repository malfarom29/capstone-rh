import { Controller, Post, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { IncidentService } from '../../services/incident.service';

@Controller('incidents')
export class IncidentsController {
  constructor(private readonly incidentService: IncidentService) { }

  @Post('upload')
  @HttpCode(HttpStatus.CREATED)
  async createIncident() {
    const url = await this.incidentService.bulkInsertIncidents();
    return {
      message: 'Incidents upload URL generated successfully',
      url,
    };
  }

  @Get('analytics')
  @HttpCode(HttpStatus.OK)
  async getIncidentAnalytics() {
    return this.incidentService.getIncidentAnalytics();
  }
}
