import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale

} from 'chart.js';
import { Bar, Doughnut, Line, Radar, Scatter } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Sorting Algorithms',
    },
  },
};




export default function Charts(props) {
  const labels = [...props.array];

  const data = {
    labels: labels,
    datasets: [{
      label: 'Numbers',
      data: props.array,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  };
  return (
    <div className="relative flex flex-col min-w-0 break-words  w-full mb-6 rounded p-10">
      <div className='grid grid-flow-row-dense sm:grid-cols-2 gris-cols-1 grid-row-2 gap-10 AdminPane'>
        <div className="relative flex flex-col min-w-0 break-words  w-full mb-6 shadow-lg rounded">
          <Bar data={data} options={options} />
        </div>
        <div className="relative flex flex-col min-w-0 break-words  w-full mb-6 shadow-lg rounded">
          <Line options={options} data={data} />
        </div>
        <div className="relative flex flex-col min-w-0 break-words  w-full mb-6 shadow-lg rounded">
          <Doughnut options={options} data={data} />
        </div>
        <div className="relative flex flex-col min-w-0 break-words  w-full mb-6 shadow-lg rounded">
          <Scatter options={options} data={data}/>
        </div>
      </div>

    </div>
  )
}
