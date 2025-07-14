import React from 'react'
import warning from '../assets/icons/warning-icon.svg'
import SecondaryButton from '../components/SecondaryButton'
export default function  WarningModal(props){
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0'>
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/30' onClick={()=>{props.onClose(false)}}></div>
        <div className='fixed top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] bg-white sm:w-[480px] w-[350px] h-[400px] rounded-[8px] p-[32px]'>
            <div className='flex flex-col items-center'>
              <img src={warning} className='max-w-[120px] max-h-[120px]'></img>
              <h5 className='text-xl text-[#1A1C1F] font-bold not-italic  leading-4 pt-5 font-Montserrat mt-5' >Complete Your Profile</h5>
              <p className='not-italic text-sm font-medium pb-5 pt-2 font-Montserrat md-3 '>No booking will be confirmed till the profile is completed</p>
              <div className='w-[420px]'><SecondaryButton title="Complete Profile" action={()=>props.onClose(false)}/></div>
              <button className='text-[#8D98A4] text-sm pt-3 font-Montserrat mt-3' onClick={()=>{props.onClose(false)}}>Close</button>
            </div>
        </div>
    </div>
  )
}
