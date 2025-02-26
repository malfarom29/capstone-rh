import { Expose, Transform, Type } from "class-transformer";

class AnalyticsRatesDto {
  @Expose()
  name: string;

  @Expose()
  count: number;

  @Expose()
  @Transform(({ value }) => Number(value.toFixed(2)))
  percentage: number;
}

export class IncidentAnalyticsDto {
  @Expose()
  totalIncidents: number;

  @Expose()
  @Type(() => AnalyticsRatesDto)
  incidentTypes: AnalyticsRatesDto[];

  @Expose()
  @Type(() => AnalyticsRatesDto)
  incidentLocations: AnalyticsRatesDto[];

  @Expose()
  @Type(() => AnalyticsRatesDto)
  incidentCountries: AnalyticsRatesDto[];

  @Expose()
  incidentAverageAge: number;
}