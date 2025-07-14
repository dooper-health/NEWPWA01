
import React from 'react'
import { Outlet } from 'react-router-dom';
import dooper from '../assets/Dooper-red-logo.svg';
export default function LoginSignUp() {
  return (
    <div className="flex flex-col  flex-1  overflow-hidden">
        <img
          src={dooper}
          alt="dooper"
          className="mx-auto w-[170px]"
        />
        <Outlet />
      </div>
  )
}
