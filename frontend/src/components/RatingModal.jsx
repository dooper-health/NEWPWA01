import React from 'react'
import starFilled from '../assets/icons/star-filled-icon.svg'
import starEmpty from '../assets/icons/star-empty-icon.svg'

export default function  RatingModal(props){
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0'>
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/30' onClick={()=>{props.onClose(false)}}></div>
        <div className='fixed top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] font-Montserrat bg-white w-[480px] rounded-[8px] p-[32px]'>
            <div className='flex flex-col items-center'>
              <h5 className='w-full text-xl text-[#1A1C1F] font-[600] leading-4 pt-5' >Rate Service</h5>
              <div className='w-full flex flex-col gap-[20px]'>
                <div className='flex gap-[8px] py-[8px]'>
                    <img src={starFilled} className='w-[20px] '></img>
                    <img src={starFilled} className='w-[20px] '></img>
                    <img src={starFilled} className='w-[20px] '></img>
                    <img src={starFilled} className='w-[20px] '></img>
                    <img src={starEmpty} className='w-[20px] '></img>

                </div>
                <div className='w-full flex flex-col gap-[8px]'>
                    <p className='w-full text-[12px] font-[500] leading-[116%]'>Review Message</p>
                    <textarea placeholder='Write Message here' className='w-full text-[14px] font-[500] leading-[116%] h-[80px] px-[20px] py-[16px] border border-[#EEF0F3] rounded-md'>
                    </textarea>   
                </div>
                <button className='w-full text-center text-white text-sm font-[500] bg-[#41B079] px-[24px] py-[6px] rounded-md' onClick={()=>{props.onClose(false)}}>Submit Review</button>
              </div>
            </div>
        </div>
    </div>
  )
}
