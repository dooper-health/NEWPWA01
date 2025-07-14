

import React from 'react'
import PrimaryButton from './PrimaryButton'

export default function ServiceBookingCard(props) {
  return (
    <div className='flex flex-col items-center gap-[24px] p-[40px] max-w-[372px] border-transparent shadow-xl rounded-xl'>
            <img className='w-[43px]' src={props.image} alt="service image" />
            <div className='flex flex-col items-center'>
                <div className='text-[16px] font-[500] leading-[110%]'>{props.serviceName}</div>
                <p className='text-center text-[12px] font-[400] leading-[160%]'>{props.serviceDetail}</p>
                <a src="#"><p className='text-center text-[12px] mt-2 leading-[160%] text-red-600 font-bold'>{props.more}</p></a>
            </div>
            <div className='flex justify-center -mr-12 sm:ml-0 -ml-[50px] sm:mr-0  '>
                <div><PrimaryButton title="Book Service" action={()=>{props.action(true)}}/></div>
            </div>
    </div>
  )
}
