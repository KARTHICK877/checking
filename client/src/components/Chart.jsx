import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import './Chart.css'; 

function Chart() {
  const [data, setData] = useState({
    totalMarkdowns: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('https://markdown-connecting.onrender.com/api/markdown/fetch-data')
      .then((response) => {
        setData({
          totalMarkdowns: response.data.totalMarkdowns,
          totalUsers: response.data.totalUsers,
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const chartData = {
    labels: ['Markdown Documents', 'Users'],
    datasets: [
      {
        label: '',
        data: [data.totalMarkdowns, data.totalUsers],
           backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 0, 0, 0.2)'],
           borderColor: ['rgba(75, 192, 192, 1)','rgba(255, 0, 0, 1)'],
           borderWidth: 1,
           barThickness: 100,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
            stepSize: 1, 
            precision: 0, 
          },
          
      },
    },
    plugins: {
        legend: {
          display: false,
        },
    }
  };

  return (
    <div className="chart-container">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default Chart;
