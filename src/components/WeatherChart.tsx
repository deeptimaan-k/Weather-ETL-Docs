// src/components/WeatherChart.tsx
import React, { useEffect, useRef } from 'react';

const WeatherChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = chartRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Example Chart.js chart (you must have chart.js installed)
    import('chart.js/auto').then(({ default: Chart }) => {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Temperature (°C)',
            data: [22, 24, 19, 23, 26, 28, 25],
            borderColor: 'rgba(59, 130, 246, 1)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Weekly Weather Report' }
          }
        }
      });
    });
  }, []);

  return <canvas ref={chartRef} width="600" height="300" />;
};

export default WeatherChart;
