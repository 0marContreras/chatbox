  import BarChart from '@/components/BarChart';
  import Navbar from '@/components/Navbar';
  import PieChart from '@/components/PieChart';
  import TablePrice from '@/components/TablePrice';
  import Textbox from '@/components/Textbox';
  import React from 'react';

  export default function Dashboard() {
    return (
      <div>
        <Navbar />
        
        <div className='flex flex-col lg:flex-row flex-wrap justify-center items-center pb-12 pt-24 px-4 lg:px-0'>
        <div className='mb-8 lg:mb-0 lg:mr-8 w-full lg:w-auto'>
          <TablePrice />
          <div className="flex justify-center mt-8">
            <a className="py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow">
              Save 2
            </a>
          </div>
        </div>
          <div className='h-[350px] w-full lg:w-[400px] mb-8 lg:mb-0 px-0 lg:px-8 mx-auto'>
            <BarChart />
          </div>
          <div className='lg:w-[400px] lg:w-auto px-0 lg:px-8 mx-auto'>
            <PieChart />
          </div>
        </div>
        <div className='container mx-auto items-center px-4 lg:px-0'>
          <h2 className='font-bold text-xl text-gray-800'>Information Context for the Bot</h2>
          <p className='text-gray-600 mb-8'>Write all general information that the bot need to know for help to the users</p>
          <div className='container mx-auto items-center mb-12'>
            <Textbox />
            <div className=" pt-8 hidden md:inline-block">
                    <a className="py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow">
                        Save
                    </a>
                </div>
          </div>
        </div>
      </div>
    );
  }
