import Head from 'next/head'
import Navbar from '@/components/navbar'
import Card from '@/components/card'
import Sidebar from '@/components/sidebar'

export default function Home() {
  return (
        <div className='bg-gray-200'>
                <Navbar></Navbar>
        <div className='flex'> 
                <Sidebar></Sidebar>
        <div className="flex justify-center pl-8 pt-8 h-screen">
                <Card
                  title="ChatBot help to old people"
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  imageSrc="/abuelos.jpeg"
            />
        </div>
        </div>      
    </div>
  )
}