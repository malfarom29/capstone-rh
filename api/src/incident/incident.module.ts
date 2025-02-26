import { Module } from '@nestjs/common';
import { IncidentService } from './services/incident.service';
import { CoreModule } from '../core/core.module';
import { IncidentsController } from './controllers/incidents/incidents.controller';

@Module({
  imports: [CoreModule],
  providers: [IncidentService],
  controllers: [IncidentsController]
})
export class IncidentModule { }
