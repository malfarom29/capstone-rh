import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IncidentModule } from './incident/incident.module';
import { CoreModule } from './core/core.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [IncidentModule, CoreModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
