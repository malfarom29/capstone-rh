import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { getRandomColor } from '../lib/utils';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SpeedometerProps {
  name: string;
  count: number;
  percentage: number;
}

export const SpeedometerChart: React.FC<SpeedometerProps> = ({
  name,
  percentage,
}) => {
  const color = getRandomColor([]);
  
  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [color, '#e2e8f0'],
        borderWidth: 0,
        circumference: 360,
        rotation: 270,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    cutout: '75%',
  };

  return (
    <div className="relative w-full max-w-[200px] mx-auto">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
        <p className="text-lg font-semibold text-[#184E77]">{name}</p>
        <p className="text-3xl font-bold" style={{ color }}>{percentage}%</p>
      </div>
    </div>
  );
};