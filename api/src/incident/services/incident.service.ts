import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/services/prisma/prisma.service';
import { createUploadSignedUrl } from '../../utils/aws';

@Injectable()
export class IncidentService {
  constructor(private readonly prisma: PrismaService) { }

  async bulkInsertIncidents() {
    return createUploadSignedUrl(`${new Date().getTime()}_report.csv`);
  }
}
