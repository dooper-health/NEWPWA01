// Urgent case right side card
import React, { useEffect, useState } from 'react'
import HepatologiesIcon from '../assets/icons/hepatologist-icon.svg';
import CallIcon from '../assets/icons/call-dark-icon.svg';
import LocationPin from '../assets/icons/location-pin.svg';
import Dcs from '../assets/images/Doctor-sample-1.svg';
import PrimaryButton from './PrimaryButton';
export default function UCRC(props) {
  const [isPaid, setIsPaid] = useState(false);
  useEffect(()=>{if(props.urgentStep > 7) setIsPaid(true); else setIsPaid(false)},[props.urgentStep])
  return (
    <div className="bg-white sm:min-w-[396px] font-Montserrat rounded-[8px]">
        <div className='flex flex-col rounded-[8px] w-full border border-[#EEF0F3]'>
          {props.urgentStep != 5 && <div className='flex flex-col gap-[16px] p-[20px]'>
              <div className='flex gap-[4px] text-[14px] font-[600] leading-[116%]'><div>Order </div>{isPaid && <div className='text-[#41B079]'>(Paid)</div>}</div>
              <div className='flex justify-between'>
                  <p className='text-[#8D98A4] text-[14px] font-[500] leading-[116%]'>Service 1</p>
                  <p className='text-[14px] font-[500] leading-[116%]'>Rs. 546</p>
                </div>
                <div className='flex justify-between'>
                  <p className='text-[#8D98A4] text-[14px] font-[500] leading-[116%]'>GST</p>
                  <p className='text-[14px] font-[500] leading-[116%]'>Rs. 78</p>
                </div>
                <div className='flex justify-between'>
                  <p className='text-[#8D98A4] text-[14px] font-[500] leading-[116%]'>Other Changes</p>
                  <p className='text-[14px] font-[500] leading-[116%]'>Rs. 78</p>
                </div>
                <hr/>
                <div className='flex justify-between'>
                  <p className='text-[#8D98A4] text-[14px] font-[500] leading-[116%]'>Sub Total</p>
                  <p className='text-[14px] font-[500] leading-[116%]'>Rs. 600</p>
                </div>
                <div className='flex justify-between'>
                  <p className='text-[#8D98A4] text-[14px] font-[500] leading-[116%]'>Discount</p>
                  <p className='text-[14px] font-[500] leading-[116%]'>Rs. 100</p>
                </div>
                <hr/>
                <div className='flex justify-between'>
                  <p className='text-[14px] font-[600] leading-[116%]'>Total</p>
                  <p className='text-[14px] font-[600] leading-[116%]'>Rs. 500</p>
                </div>
                <hr/>
              {props.urgentStep == 1 && <PrimaryButton title="Pay Now" action={()=>{}} />}
            </div>}
            {props.urgentStep > 1 && <>
            <div className='flex gap-[8px] p-[20px] border-b border-[#EEF0F3]'>
              <img src={Dcs} alt="icon" />
              <div>
                <h1 className='text-[16px] font-[600] leading-[110%]'>DHA Name</h1>
                <p className='text-primary01 text-[12px] font-[500] leading-[116%]'>Degree</p>
              </div>
            </div>
            {props.urgentStep >= 5 &&  <>
            <h1 className='text-[14px] font-[600] leading-[116%] px-[20px]'>Assigned Speciality</h1>
            <div className='flex gap-[8px] p-[20px]'>
              <img src={HepatologiesIcon} alt="icon" />
              <div>
                <h1 className='text-[16px] font-[600] leading-[110%]'>Hepatologiest</h1>
                <p className='text-primary01 text-[12px] font-[500] leading-[116%]'>By DHA</p>
              </div>
            </div>
            <h1 className='text-[14px] font-[600] leading-[116%] px-[20px]'>Assigned Doctor</h1>
            <div className='flex gap-[8px] p-[20px] border-b border-[#EEF0F3]'>
              <img src={Dcs} alt="icon" />
              <div>
                <h1 className='text-[16px] font-[600] leading-[110%]'>Doctor Name</h1>
                <p className='text-primary01 text-[12px] font-[500] leading-[116%]'>Degree</p>
              </div>
            </div>
            </>} 
            {props.urgentStep >= 9 && <>
              <h1 className='text-[14px] font-[600] leading-[116%] px-[20px]'>Assigned Attendee</h1>
              <div className='flex gap-[8px] p-[20px] '>
                <img src={Dcs} alt="icon" />
                <div>
                  <h1 className='text-[16px] font-[600] leading-[110%]'>Attendee Name</h1>
                  <p className='text-primary01 text-[12px] font-[500] leading-[116%]'>Degree</p>
                </div>
              </div>
            </>}
            {props.urgentStep != 12 && <div className='flex flex-col gap-[12px] p-[20px]'>
                <div className='flex items-center gap-[8px]'>
                  <img src={CallIcon} alt='call' />
                  <p className='text-[#5B6572] text-[14px] font-[500] leading-[116%]'>+91 123 456 7890</p>
                </div>
                <div className='flex items-center gap-[8px]'>
                  <img src={LocationPin} alt="location" />
                  <p className='text-[#5B6572] text-[14px] font-[500] leading-[116%]'>On the way</p>
                  <p className='text-primary01 text-[12px] font-[500] leading-[116%] underline'>Track DHA</p>
                </div>
            </div>}
            {props.urgentStep >= 8 && <div className='flex flex-col gap-[12px] p-[20px]'>
              <h1 className='text-[14px] font-[600] leading-[116%]'>Pharmacy Assigned</h1>
              <div className='flex items-center gap-[8px]'>
                  <img src={LocationPin} alt="location" />
                  <p className='text-[#5B6572] text-[14px] font-[500] leading-[116%]'>On the Way</p>
                  <p className='text-primary01 text-[12px] font-[500] leading-[116%] underline'>Track Delivery Partner</p>
                </div>
            </div>}
            </>}
        </div>
        {props.urgentStep >= 6 && <div className='flex flex-col p-[20px]'>
          <h1 className='text-[14px] font-[600] leading-[116%] px-[20px]'>Pharmacy Assigned</h1>
          <div className='flex flex-col gap-[16px] p-[20px]'>
            <div className='flex gap-[4px] text-[14px] font-[600] leading-[116%]'><div>Qoutation </div>{isPaid && <div className='text-[#41B079]'>(Paid)</div>}</div>
              <div className='flex justify-between'>
                <p className='text-[#8D98A4] text-[14px] font-[500] leading-[116%]'>Sub Total</p>
                <p className='text-[14px] font-[500] leading-[116%]'>Rs. 600</p>
              </div>
              <div className='flex justify-between'>
                <p className='text-[#8D98A4] text-[14px] font-[500] leading-[116%]'>Discount</p>
                <p className='text-[14px] font-[500] leading-[116%]'>Rs. 100</p>
              </div>
              <hr/>
              <div className='flex justify-between'>
                <p className='text-[14px] font-[600] leading-[116%]'>Total</p>
                <p className='text-[14px] font-[600] leading-[116%]'>Rs. 500</p>
              </div>
              <hr/>
            {props.urgentStep == 7 && <div className='flex justify-between gap-[8px]'>
              <button className='text-[#41B079] text-[12px] font-[600] leading-[116%] bg-[#E5FFF2] w-[174px] px-[16px] py-[8px] rounded-[24px]' onClick={()=>{setIsPaid(true)}}>Accept</button>
              <button className='text-[#F1614B] text-[12px] font-[600] leading-[116%] bg-[#FFE9E6] w-[174px] px-[16px] py-[8px] rounded-[24px]' >Reject</button>
            </div>}
          </div>
        </div>}
    </div>
  )
}
