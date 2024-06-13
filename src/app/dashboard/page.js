import Navbar from '@/components/Navbar';
import TablePrice from '@/components/TablePrice'
import Textbox from '@/components/Textbox';
import React from 'react'


export const dashboard = () => {
  return (
    <div>
        <Navbar />
        <div className='pt-8'>
            <TablePrice />
            
        </div>
        <div className='pt-8 items-center mx-auto container'>
          <h2 className='font-bold text-xl text-gray-800'>Information Context for the Bot</h2>
          <p className='text-gray-600 '>Write all general information that the bot need to know for help to the users</p>
         <Textbox />
        </div>
        
        
    </div>
  )
}

export default dashboard;