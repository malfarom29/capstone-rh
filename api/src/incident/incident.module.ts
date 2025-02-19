import { Module } from '@nestjs/common';
import { IncidentService } from './services/incident.service';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [CoreModule],
  providers: [IncidentService]
})
export class IncidentModule { }
