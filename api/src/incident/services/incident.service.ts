import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/services/prisma/prisma.service';
import { createUploadSignedUrl } from '../../utils/aws';
import { IncidentAnalyticsDto } from '../dto/responses/incident-analytics.dto';
import { instanceToInstance, plainToInstance } from 'class-transformer';

const MONTHS = [
  { name: 'Enero', value: 1 },
  { name: 'Febrero', value: 2 },
  { name: 'Marzo', value: 3 },
  { name: 'Abril', value: 4 },
  { name: 'Mayo', value: 5 },
  { name: 'Junio', value: 6 },
  { name: 'Julio', value: 7 },
  { name: 'Agosto', value: 8 },
  { name: 'Septiembre', value: 9 },
  { name: 'Octubre', value: 10 },
  { name: 'Noviembre', value: 11 },
  { name: 'Diciembre', value: 12 },
];

@Injectable()
export class IncidentService {
  constructor(private readonly prisma: PrismaService) { }

  async bulkInsertIncidents() {
    return createUploadSignedUrl(`${new Date().getTime()}_report.csv`);
  }

  async getIncidentAnalytics(): Promise<IncidentAnalyticsDto> {
    const totalIncidents = await this.prisma.incident.count();
    const [
      incidentTypes,
      incidentLocations,
      incidentCountries,
      incidentAverageAge,
      incidentYearlyMonthlyMode
    ] = await Promise.all([
      this.incidentTypesAnalysis(totalIncidents),
      this.incidentLocationsAnalysis(totalIncidents),
      this.incidentCountriesAnalysis(totalIncidents),
      this.incidentAverageAgeAnalysis(),
      this.incidentYearlyMonthlyModeAnalysis()
    ]);

    return instanceToInstance(plainToInstance(IncidentAnalyticsDto, {
      totalIncidents,
      incidentTypes,
      incidentLocations,
      incidentCountries,
      incidentAverageAge,
      incidentYearlyMonthlyMode
    }));
  }

  private async incidentTypesAnalysis(totalIncidents: number) {
    const incidents = await this.prisma.incident.groupBy({
      by: ['incidentTypeId'],
      _count: true,
    });
    const incidentTypeIds = incidents.map((incident) => incident.incidentTypeId);
    const incidentTypes = await this.prisma.incidentType.findMany({
      where: {
        id: { in: incidentTypeIds },
      },
    });

    return incidents.map((incident) => ({
      name: incidentTypes.find((type) => type.id === incident.incidentTypeId)?.name,
      count: incident._count,
      percentage: (incident._count / totalIncidents) * 100,
    }));
  }

  private async incidentLocationsAnalysis(totalIncidents: number) {
    const incidents = await this.prisma.incident.groupBy({
      by: ['locationId'],
      _count: true,
    });
    const locations = await this.prisma.location.findMany({
      where: {
        id: { in: incidents.map((incident) => incident.locationId) },
      },
    });

    return incidents.map((incident) => ({
      name: locations.find((location) => location.id === incident.locationId)?.name,
      count: incident._count,
      percentage: (incident._count / totalIncidents) * 100,
    }));
  }

  private async incidentCountriesAnalysis(totalIncidents: number) {
    const incidents = await this.prisma.$queryRaw<{ name: string; count: number }[]>`
      SELECT co.name, count(1)
      FROM incidents i
      LEFT JOIN cities ci ON i.city_id = ci.id
      LEFT JOIN countries co ON ci.country_id = co.id
      GROUP BY co.name
    `;

    return incidents.map((incident) => ({
      name: incident.name,
      count: Number(incident.count),
      percentage: (Number(incident.count) / totalIncidents) * 100,
    }));
  }

  private async incidentAverageAgeAnalysis() {
    const incidents = await this.prisma.$queryRaw<{ averageAge: number }[]>`
      SELECT AVG(age)::integer as "averageAge"
      FROM incidents i
    `;

    return {
      averageAge: incidents[0].averageAge,
    };
  }

  private async incidentYearlyMonthlyModeAnalysis() {
    const incidents = await this.prisma.$queryRaw<{ year: number; month: string; count: number; }[]>`
      SELECT report_year as year, mode() within group ( order by report_month) as month, count(1) as count
      FROM incidents
      GROUP BY report_year;
    `;

    return incidents.map((incident) => ({
      year: incident.year,
      month: MONTHS.find((month) => month.value === parseInt(incident.month))?.name,
      count: Number(incident.count),
    }));
  }
}
