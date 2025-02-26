import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarsChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  };
  options: {
    responsive: boolean;
    plugins: {
      legend: {
        display: boolean;
      };
      tooltip?: {
        callbacks?: {
          label?: (tooltipItem: any) => string;
        };
      };
    };
    indexAxis?: 'y' | 'x';
  };
}

export const BarsChart: React.FC<BarsChartProps> = ({ data, options }) => {
  // Calculate total sum of data
  const total = data.datasets[0].data.reduce((acc, value) => acc + value, 0);

  // Truncate label function
  const truncateLabel = (label: string, maxLength: number) => {
    return label.length > maxLength ? label.substring(0, maxLength) + '...' : label;
  };

  // Update options to include percentage in tooltips and truncated labels
  const updatedOptions = {
    ...options,
    indexAxis: 'y',
    maintainAspectRatio: false,
    plugins: {
      ...options.plugins,
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const value = tooltipItem.raw;
            const percentage = ((value / total) * 100).toFixed(2);
            // Use the original label for the tooltip
            const originalLabel = data.labels[tooltipItem.dataIndex];
            return `${originalLabel}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  // Truncate labels in data
  const truncatedData = {
    ...data,
    labels: data.labels.map(label => truncateLabel(label, 25)) // Adjust maxLength as needed
  };

  return <Bar data={truncatedData} options={updatedOptions as any} />;
};