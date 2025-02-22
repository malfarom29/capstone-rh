import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
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
}
