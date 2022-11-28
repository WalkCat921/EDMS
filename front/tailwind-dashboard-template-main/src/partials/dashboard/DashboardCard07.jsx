import React, { useState, useEffect, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);
import axios from 'axios';

function DashboardCard07() {

  const [statistic, setStatistic] = useState([])
  const [count, setCount] = useState([])

  useEffect(() => {
    loadContries()
  },[]);

  const loadContries = async() => {
    await axios.get('http://localhost:8080/api/dashboard/users/documents/size').then(response=>{
    setStatistic(Object.keys(response.data))
    setCount(Object.values(response.data))
    })
  }

 const data = {
    labels: statistic,
    datasets: [
      {
        label: 'Размер',
        data: count,
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
  };


  return (<>
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Общий размер файлов пользователя</h2>
      </header>
      <Doughnut data={data} />
    </div>
    </>
  );
}
export default DashboardCard07;
