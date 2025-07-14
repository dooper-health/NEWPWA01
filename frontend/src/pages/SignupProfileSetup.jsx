import React from 'react'
import { Outlet } from 'react-router-dom'

export default function SignupProfileSetup() {
  return (
    <div className="flex flex-col justify-between items-center flex-1 p-[48px]">
        <Outlet />
        <div></div>
    </div>
  )
}
