import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

export default function User() {
  return (
    <div className='flex flex-col bg-[#F4F4F4] min-h-screen'>
      <Navbar />
      <div className='flex w-full h-full'>
        <Outlet />
      </div>
    </div>
  )
}
