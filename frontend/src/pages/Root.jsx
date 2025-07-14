import React from 'react'
import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar';
export default function Root() {
  return (
    <div className="flex gap-[32px] p-[24px] bg-white min-h-screen">
      <SideBar />
      <Outlet />
    </div>
  )
}