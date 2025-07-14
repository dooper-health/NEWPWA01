import React from 'react'
import patient from "../assets/icons/patient-report-card.svg"
import close from "../assets/icons/x.svg"

export default function  DoctorPrecptionModal(props){
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0'>
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/30' onClick={()=>{props.onClose(false)}}></div>
        <div className='fixed top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] bg-white w-[340px] rounded-[8px] '>
            <div className='relative flex flex-col items-center'>
              <img src={patient} className='max-w-[586px] max-h-[430px] shrink-0 object-fill'></img>
              <img src={close} className='cursor-pointer absolute -top-[10px] -right-[10px] bg-white fixed right-[-5px] max-h-[20px] max-w-[20px] rounded-sm' onClick={()=>{props.onClose(false)}}/>
            </div>
        </div>
    </div>
  )
}