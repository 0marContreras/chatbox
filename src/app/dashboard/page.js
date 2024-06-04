import Navbar from '@/components/Navbar';
import TablePrice from '@/components/TablePrice'
import React from 'react'

export const dashboard = () => {
  return (
    <div>
        <Navbar />
        <div className='pt-8'>
            <TablePrice />
        </div>
        
        
    </div>
  )
}

export default dashboard;