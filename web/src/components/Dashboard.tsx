import React, { useEffect, useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import type { IncidentData } from '../types';
import api from '../api/axios';
import { BarsChart } from './BarsChart';

export const Dashboard = () => {
  const [incidentData, setIncidentData] = useState<IncidentData>({} as IncidentData);
  const [pollingInterval, setPollingInterval] = useState(30000); // 30 seconds
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const { data } = await api.get<IncidentData>('/incidents/analytics');
      setIncidentData(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, pollingInterval);
    return () => clearInterval(interval);
  }, [pollingInterval]);

  const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 5000) { // Minimum 5 seconds
      setPollingInterval(value);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#168AAD] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-[#184E77]">Dashboard</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Polling Interval (ms):</label>
            <Input
              type="number"
              min="5000"
              value={pollingInterval}
              onChange={handleIntervalChange}
              className="w-32"
            />
          </div>
          <Button onClick={fetchData} size="sm">
            Refresh
          </Button>
        </div>
      </div>

      {error ? (
        <div className="bg-red-50 p-4 rounded-lg text-red-500">
          {error}
        </div>
      ) : (
        <div className="flex flex-col gap-6 w-full">
          <div className="w-full h-[400px] bg-white p-9 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-[#184E77]">Tipos de incidentes</h3>
            <BarsChart data={{
              labels: incidentData.incidentTypes.map((incident) => incident.name),
              datasets: [{
                label: 'Incident Types',
                data: incidentData.incidentTypes.map((incident) => incident.count),
                backgroundColor: '#168AAD',
              }]
            }} options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }} />
          </div>

          <div className="w-full h-[400px] bg-white p-9 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-[#184E77]">Ubicaciones de incidentes</h3>
            <BarsChart data={{
              labels: incidentData.incidentLocations.map((incident) => incident.name),
              datasets: [{
                label: 'Incident Locations',
                data: incidentData.incidentLocations.map((incident) => incident.count),
                backgroundColor: '#168AAD',
              }]
            }} options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }} />
          </div>

          <div className="w-full h-[400px] bg-white p-9 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-[#184E77]">Países en los que se han producido incidentes</h3>
            <BarsChart data={{
              labels: incidentData.incidentCountries.map((incident) => incident.name),
              datasets: [{
                label: 'Incident Countries',
                data: incidentData.incidentCountries.map((incident) => incident.count),
                backgroundColor: '#168AAD',
              }]
            }} options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }} />
          </div>

          {/* <div className="w-full h-[400px] bg-white p-9 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-[#184E77]">Edad promedio de los incidentes</h3>
            <div className="flex items-center justify-center h-full">
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
};