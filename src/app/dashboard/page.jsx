"use client"
import BarChart from '@/components/BarChart';
import Navbar from '@/components/Navbar';
import PieChart from '@/components/PieChart';
import TablePrice from '@/components/TablePrice';
import TableDate from '@/components/TableDate';
import Textbox from '@/components/Textbox';
import React from 'react'; 
import { useState, useEffect } from 'react';
import Invalid from '@/components/Invalid'
import BackupButton from '../../components/BackupButton';

export default function Dashboard() {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const response = await fetch('/api/signin');
        if (response.status === 200) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (error) {
        setIsValid(false);
      }
    };

    fetchAuthStatus();
  }, []);

  if (isValid === null) {
    return <main className="bg-[#142233] w-full h-screen flex flex-col items-center justify-center px-4"/>;
  }
  

  if (!isValid) {
    return (
      <Invalid/>  
    );
  }

  return (
    <div>
      <Navbar />
      <div className='mt-12 ml-[300px]'> 
        <BackupButton/>
      </div>
       <div className='flex flex-col lg:flex-row flex-wrap justify-center items-center pb-12 pt-24 px-4 lg:px-0'>  
        <div className='mb-8 lg:mb-0 lg:mr-8 w-full lg:w-auto'>
          <TablePrice />
          <div className="flex justify-center mt-8">
          </div>
        </div>
        <div className='mb-8 lg:mb-0 lg:mr-8 w-full lg:w-auto'>
          <TableDate/>
          <div className="flex justify-center mt-8">
          </div>
        </div>
      </div>
      <div className='flex justify-around'>
      <div className='h-[500px] pl-12 w-full lg:w-[800px] ' >
            <BarChart />
      </div>
      <div className='lg:w-[400px] overflow-auto h-96 '>
            <PieChart />
      </div>
      </div>
      <div className='container mx-auto items-center px-4 lg:px-0 pb-8'>
          <h2 className='font-bold text-xl text-gray-800'>Information Context for the Bot</h2>
          <p className='text-gray-600 mb-8'>Write all general information that the bot need to know for help to the users</p>
          <div className='container mx-auto items-center'>
            <Textbox />
          </div>
      </div>
    </div>
  );
}
