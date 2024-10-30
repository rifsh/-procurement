import React from 'react';
import Sidebar from '../components/SideBar';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

const centerTextPlugin = {
  id: 'centerTextPlugin',
  beforeDraw: (chart) => {
    const { ctx, data } = chart;
    const total = data.datasets[0].data.reduce((acc, val) => acc + val, 0);
    ctx.save();
    const xCenter = chart.getDatasetMeta(0).data[0].x;
    const yCenter = chart.getDatasetMeta(0).data[0].y;

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#333';
    ctx.fillText(`Total: ${total}`, xCenter, yCenter);
  },
};

const Home = () => {
  const navigate=useNavigate()
  const data = {
    labels: ['Suppliers', 'Items'],
    datasets: [
      {
        label: 'Count',
        data: [10, 20], 
        backgroundColor: ['#d4fae3', '#5ae1a9'],
        hoverBackgroundColor: ['#b8f1d8', '#48d095'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
      },
    },
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-full h-full mt-5 md:mt-0">
        <div className="p-6 bg-gray-100 flex-grow">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="border border-gray-300 rounded-lg p-4 bg-white shadow">
              <h2 className="text-lg font-semibold">Supplier Count</h2>
              <p className="text-2xl font-bold">10</p>
            </div>
            <div className="border border-gray-300 rounded-lg p-4 bg-white shadow">
              <h2 className="text-lg font-semibold">Items Count</h2>
              <p className="text-2xl font-bold">20</p>
            </div>
          </div>
          <div className="flex flex-col items-center mb-6 bg-white rounded-lg shadow p-4 h-3/5">
            <h2 className="text-lg font-semibold mb-4">Counts Chart</h2>
            <div className="w-full h-full">
              <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
            </div>
          </div>
          <div className="flex flex-col items-center mt-6  bg-white rounded-lg shadow p-4 ">
            <div className="w-full h-full flex justify-between items-center md:px-20">
              <button onClick={()=>{navigate('/supplier')}} className='md:p-2 border text-xs md:text-base p-1 bg-primary rounded-3xl hover:bg-secondary hover:text-white'>Create Supplier</button>
              <button onClick={()=>{navigate('/item')}} className='md:p-2 md:px-6 border text-xs md:text-base p-1 bg-primary rounded-3xl hover:bg-secondary hover:text-white'>Add Item</button>
              <button onClick={()=>{navigate('/createpurchase')}} className='md:p-2 border bg-primary text-xs md:text-base p-1 rounded-3xl hover:bg-secondary hover:text-white'>PurchseOrder</button>
              <button onClick={()=>{navigate('/history')}} className='md:p-2 md:px-7 border bg-primary text-xs md:text-base p-1 rounded-3xl hover:bg-secondary hover:text-white'>History</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
