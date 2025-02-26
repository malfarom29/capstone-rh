export interface User {
  id: string;
  email: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

interface AnalyticsRates {
  name: string;
  count: number;
  percentage: number;
}

export interface IncidentData {
  totalIncidents: number;
  incidentTypes: AnalyticsRates[];
  incidentLocations: AnalyticsRates[];
  incidentCountries: AnalyticsRates[];
  incidentAverageAge: number;
  // incidentYearlyMonthlyMode: AnalyticsRates[];
}

export interface UploadResponse {
  csvUrl: string;
  pdfUrl: string;
  jobId: string;
}