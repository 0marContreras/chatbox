'use client';

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [chartData, setChartData] = useState({
    labels: ['1', '2', '3', '4', '5'],
    datasets: [
      {
        label: 'Número de calificaciones',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [0, 0, 0, 0, 0], 
      },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distribución de Calificaciones',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/reviews');
        const result = await response.json();

        const scores = [0, 0, 0, 0, 0]; 
        const scoreCounts = result.scoreCounts;
        for (let i = 1; i <= 5; i++) {
          scores[i - 1] = scoreCounts[i] || 0; 
        }

        setChartData({
          labels: ['1', '2', '3', '4', '5'],
          datasets: [
            {
              label: 'Número de calificaciones',
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(75,192,192,0.6)',
              hoverBorderColor: 'rgba(75,192,192,1)',
              data: scores, 
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
