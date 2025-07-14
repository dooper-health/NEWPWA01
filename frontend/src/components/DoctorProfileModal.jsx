import React from 'react'
import DocProfile from '../assets/icons/DoctorProfileImg.svg'

export default function  DoctorProfileModal(props){
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0'>
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/30' onClick={()=>{props.onClose(false)}}></div>
        <div className='fixed top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] bg-white w-[760px] h-[421px] rounded-[8px] '>
            <div className='flex flex-row'>
                <div className='bg-[#F5F6F7] w-[380px] h-380px flex flex-col items-center'>
                    <img src = {DocProfile} className='pt-[62px]  pl-[59]'/>
                </div>
                <div className='p-[32px] font-Montserrat leading-[116%]'>
                    <div className='pb-[20px]'>
                    <p className='text-[16px] text-[#E40443] font-[600] pb-[16px] leading-[110%]'>Profile</p>
                    <p className='text-[24px] text-[#1A1C1F] font-[600] leading-[130%]'>Dr. James Graham</p>
                    <p className='text-[16px] font-[600] pt-[8px] pb-[8px] leading-[110%]'>MBBS</p>
                    <p className='text-[16px] font-[500] leading-[160%]'>Appolo Hospitals, Newark,<br className='pt-[5px]'></br>USA</p>
                    </div>
                <div className='flex flex-col items-start pb-[20px]'>
                <p className='text-[16px] text-[#E40443] font-[600] pb-[16px] leading-[110%]'>SPECIALITY</p>
                <div className='grid grid-cols-2 gap-[8px]'>
                <div className='flex flex-row  pr-[16px] pt-[8px] pb-[8px] pl-[16px] w-[120px] bg-[#F4F4F4] border rounded-full h-[34px]'>
                    <p className=' font-[500] leading-[110%]  text-[#1A1C1F]   text-[16px] font-Montserrat' >Cardiology</p>
                </div>
                <div className='flex flex-row   pr-[16px] pt-[8px] pb-[8px] pl-[16px] bg-[#F4F4F4] border rounded-full w-[117px] h-[34px]'>
                    <p className=' font-[500] leading-[110%]  text-[#1A1C1F]   text-[16px] font-Montserrat' >Neurology</p>
                </div>
                <div className='flex flex-row  pr-[16px] pt-[8px] pb-[8px] pl-[16px] h-[34px] bg-[#F4F4F4] border rounded-full'>
                    <p className=' font-[500] leading-[110%]  text-[#1A1C1F]   text-[16px] font-Montserrat ' > Periodontology</p>
                </div>
                </div>

                </div>
                <div>
                <p className='text-[16px] text-[#E40443] font-[600] pb-[16px] leading-[110%]'>EXPERIENCE</p>
                <p className='text-[16px] font-[600]  leading-[110%]'>20 Years +</p>

                </div>
                </div>
            </div>
        </div>
    </div>
  )
}
