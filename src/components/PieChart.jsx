'use client'

import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, SubTitle } from 'chart.js';



ChartJS.register(ArcElement, Tooltip, Legend, SubTitle);

const PieChart = () => {
  const [chartData, setChartData] = useState({
    
    datasets: [
      {
        label: 'Contador',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    fetch('/api/items')
      .then(response => response.json())
      .then(data => {
        const nombres = data.map(item => item.Nombre);
        const contadores = data.map(item => item.Contador);

        setChartData({
          labels: nombres,
          datasets: [
            {
              label: 'Contador',
              data: contadores,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        });
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: false,
      title: {
        display: true,
        text: 'Support frequency',
        font: {
          size: 20,
        },
      },
       subtitle:{
        display: true,
        text: "Hover the mouse to review data",
        font: {
          size: 15,
        },
        padding: {
          bottom: 30
      }
       }, 
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div style={{ width: '350px', height: '350px' }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
