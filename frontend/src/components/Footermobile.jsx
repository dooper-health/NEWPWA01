

import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Dashboard from '../assets/icons/dashboard.png'
import Bookings from '../assets/icons/book.png'
import Earnings from '../assets/icons/emergency.png'
import Profile from '../assets/icons/profile.png'

const Footermobile = () =>{

    return (
        <>
        <div className='sm:hidden fixed bottom-0 flex bg-[#FFFFFF] w-full h-18 border-t border-gray-300'>
        <div className='flex mx-auto my-2 space-x-8'>
        <div className='flex  flex-col items-center '>
        <Link to="/home" className='flex flex-col items-center'>
            <img src={Dashboard} className='w-[30px] h-[30px] mb-1 border border-gray-300 p-1 rounded-full '/>
            <p className=' text-black text-[14px] hover:text-red-900 hover:font-bold '>Dashboard</p>
            </Link>
        </div>
        <div className='flex  flex-col items-center'>
        <Link to="/bookings" className='flex flex-col items-center'>
            <img src={Bookings} className='w-[30px] h-[30px] mb-1 border border-gray-300 p-1 rounded-full'/>
            <p className=' text-black text-[14px] hover:text-red-900 hover:font-bold '>Bookings</p>
            </Link>
        </div>
        {/* <div className='flex  flex-col items-center'>
        <Link to="/earning" className='flex flex-col items-center'>
            <img src={Earnings} className='w-[30px] h-[30px] mb-1 border border-gray-300 p-1 rounded-full'/>
            <p className=' text-black text-[14px] hover:text-red-900 hover:font-bold  '>Emergency</p>
            </Link>
        </div> */}
        <div className='flex  flex-col items-center'>
        <a href="tel: +916375596006" className='flex flex-col items-center'  >
             <img src={Earnings} className='w-[30px] h-[30px] mb-1 border border-gray-300 p-1 rounded-full'/>
            <p className=' text-black text-[14px] hover:text-red-900 hover:font-bold  '>Emergency</p>
            </a>
        </div>
        <div className='flex  flex-col items-center'>
        <Link to="/user" className='flex flex-col items-center'>
            <img src={Profile} className='w-[30px] h-[30px] mb-1 border border-gray-300 p-1 rounded-full'/>
            <p className=' text-black text-[14px] hover:text-red-900 hover:font-bold '>Profile</p>
            </Link>
        </div>
        </div>
        </div>
        </>
    )


}
export default Footermobile 





// import React from 'react';
// import { Link } from 'react-router-dom';
// import Dashboard from '../assets/icons/dashboard.png';
// import Bookings from '../assets/icons/book.png';
// import Earnings from '../assets/icons/salary.png';
// import Profile from '../assets/icons/profile.png';

// const Footermobile = () => {
//     return (
//         <>
//             <div className='sm:hidden fixed bottom-0 flex bg-[#FFFFFF] w-full h-[100px] border-t border-gray-300'>
//                 <div className='flex mx-auto my-8 space-x-8'>
//                     <div className='flex flex-col items-center'>
//                         <Link to="/home" className='flex flex-col items-center'>
//                             <img src={Dashboard} className='w-[30px] h-[30px] mb-1 border border-gray-300 p-1 rounded-full' />
//                             <p className='text-black text-[14px] hover:text-red-900 hover:font-bold'>Dashboard</p>
//                         </Link>
//                     </div>
//                     <div className='flex flex-col items-center'>
//                         <Link to="/bookings" className='flex flex-col items-center'>
//                             <img src={Bookings} className='w-[30px] h-[30px] mb-1 border border-gray-300 p-1 rounded-full' />
//                             <p className='text-black text-[14px] hover:text-red-900 hover:font-bold'>Bookings</p>
//                         </Link>
//                     </div>
//                     <div className='flex flex-col items-center'>
//                         <Link to="/earning" className='flex flex-col items-center'>
//                             <img src={Earnings} className='w-[30px] h-[30px] mb-1 border border-gray-300 p-1 rounded-full' />
//                             <p className='text-black text-[14px] hover:text-red-900 hover:font-bold'>Emergency</p>
//                         </Link>
//                     </div>
//                     <div className='flex flex-col items-center'>
//                         <Link to="/user" className='flex flex-col items-center'>
//                             <img src={Profile} className='w-[30px] h-[30px] mb-1 border border-gray-300 p-1 rounded-full' />
//                             <p className='text-black text-[14px] hover:text-red-900 hover:font-bold'>Profile</p>
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Footermobile;
