import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { DataRow } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ChartsProps {
  data: DataRow[];
}

export const Charts: React.FC<ChartsProps> = ({ data }) => {
  const generateChartData = (type: string) => {
    const numericColumns = Object.keys(data[0]).filter(key =>
      data.every(row => !isNaN(Number(row[key])))
    );

    if (numericColumns.length === 0) return null;

    const labels = data.map((_, index) => `Item ${index + 1}`);
    const datasets = numericColumns.map((column, index) => ({
      label: column,
      data: data.map(row => Number(row[column])),
      backgroundColor: `hsla(${index * 360 / numericColumns.length}, 70%, 50%, 0.5)`,
      borderColor: `hsla(${index * 360 / numericColumns.length}, 70%, 50%, 1)`,
      borderWidth: 1,
    }));

    return { labels, datasets };
  };

  const chartData = generateChartData('bar');

  if (!chartData) return <div>No numeric data available for visualization</div>;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Bar Chart</h3>
        <Bar options={options} data={chartData} />
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Line Chart</h3>
        <Line options={options} data={chartData} />
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Pie Chart</h3>
        <Pie options={options} data={chartData} />
      </div>
    </div>
  );
};