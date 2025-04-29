import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface WeatherDataPoint {
  date: string;
  temperature: number;
  humidity: number;
}

// Sample data
const sampleWeatherData: WeatherDataPoint[] = [
  { date: 'Jan 01', temperature: 5, humidity: 65 },
  { date: 'Jan 02', temperature: 6, humidity: 72 },
  { date: 'Jan 03', temperature: 4, humidity: 68 },
  { date: 'Jan 04', temperature: 3, humidity: 55 },
  { date: 'Jan 05', temperature: 2, humidity: 48 },
  { date: 'Jan 06', temperature: 5, humidity: 60 },
  { date: 'Jan 07', temperature: 8, humidity: 70 }
];

const WeatherChart: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is active
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    // Initial check
    checkDarkMode();

    // Observe class changes on <html> to detect dark mode toggling
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkDarkMode();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  const chartData: ChartData<'line'> = {
    labels: sampleWeatherData.map(data => data.date),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: sampleWeatherData.map(data => data.temperature),
        borderColor: '#0ea5e9', // sky-500
        backgroundColor: 'rgba(14, 165, 233, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Humidity (%)',
        data: sampleWeatherData.map(data => data.humidity),
        borderColor: '#f97316', // orange-500
        backgroundColor: 'rgba(249, 115, 22, 0.2)',
        tension: 0.4,
        fill: true,
        yAxisID: 'y1',
      }
    ]
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Temperature (°C)',
          color: isDarkMode ? '#f1f5f9' : '#334155', // cloud-100 : cloud-700
        },
        grid: {
          color: isDarkMode ? 'rgba(71, 85, 105, 0.2)' : 'rgba(203, 213, 225, 0.5)', // cloud-600 : cloud-300
        },
        ticks: {
          color: isDarkMode ? '#cbd5e1' : '#475569', // cloud-300 : cloud-600
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Humidity (%)',
          color: isDarkMode ? '#f1f5f9' : '#334155',
        },
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: isDarkMode ? '#cbd5e1' : '#475569',
        }
      },
      x: {
        grid: {
          color: isDarkMode ? 'rgba(71, 85, 105, 0.2)' : 'rgba(203, 213, 225, 0.5)',
        },
        ticks: {
          color: isDarkMode ? '#cbd5e1' : '#475569',
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: isDarkMode ? '#f1f5f9' : '#334155',
          usePointStyle: true,
          pointStyle: 'circle',
        }
      },
      tooltip: {
        backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: isDarkMode ? '#f1f5f9' : '#334155',
        bodyColor: isDarkMode ? '#cbd5e1' : '#475569',
        borderColor: isDarkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(203, 213, 225, 0.8)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
      }
    }
  };

  return (
    <div className="bg-white dark:bg-cloud-800 rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-medium mb-4 text-cloud-900 dark:text-cloud-50">
        Sample Weather Data Visualization
      </h3>
      <div className="h-64 sm:h-80">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default WeatherChart;