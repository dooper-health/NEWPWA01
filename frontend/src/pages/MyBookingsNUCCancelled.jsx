

import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import backArrow from "../assets/icons/arrow-left-black-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import calenderIcon from "../assets/icons/calender-icon.svg";
import clock from "../assets/icons/clock.svg";
import profilePicture from "../assets/images/Patient-picture.svg";
import linkIcon from "../assets/icons/link-white-icon.svg";
import Steps from "../components/Steps";
import SecondaryButton from "../components/SecondaryButton";
import Context from "../context/AppContext";
import VideoCall from "./VideoCall";
import UCRC from "../components/UCRC";

export default function MyBookingsNUCCancelled() {
    const navigate = useNavigate();
    const [videoCallPage, setVideoCallPage] = useState(false);
    const {urgentStep, setUrgentStep} = useContext(Context);
  return (
    <div className="">
      <div className="hidden sm:block"><Navbar /></div>
      {videoCallPage ? <VideoCall onCallEnd={()=>{setVideoCallPage(false)}}/> :<div className="flex flex-col bg-[#F4F4F4]/50 sm:px-[120px] px-[15px] pt-[24px]">
        <div className="cursor-pointer font-Montserrat flex flex-row font-[700] text-[22px] h-[32px] sm:w-[1077px] pb-[8px] mb-[16px]" onClick={()=>{navigate('/bookings-urgent')}}>
            <img
              src={backArrow}
              alt="back"
              srcset=""
              className="h-[24px] w-[24px] mt-1 mr-[8px]"
            />
          Case Details
        </div>
        <div className="sm:flex sm:flex-row flex-col gap-[30px] mt-[8px] pb-[48px]">
          
          <div className=" sm:w-[774px]  w-[360px] border border-[#EEF0F3] rounded-2xl bg-white">
            <div className="h-[122px] py-[12px]  px-[20px]  flex items-start self-stretch ">
              <img
                src={profilePicture}
                alt="pro"
                srcset=""
                className="w-[88px] h-[88px] "
              />
              <h1 className="font-Montserrat text-[16px font-semibold ml-[16px] mt-[4px]">
                Patient Name
              </h1>
              <h2 className="text-[#5B6572] font-Montserrat text-[16px] font-medium  -ml-[113px] mt-[27px]">
                xyz , Street name
              </h2>
              <h3 className="hidden sm:block text-[#5B6572] font-Montserrat text-[10px] font-medium  -ml-[138px] mt-[51px]">
                Age : 32 | Gender: Male | Blood Group: O+ <br /> Height : 6” 3
                inches | Weight : 76
              </h3>
              <h3 className="sm:hidden text-[#5B6572] font-Montserrat text-[10px] font-medium  -ml-[138px] mt-[51px]">
                Age : 32 | Gender: Male |<br/> Blood Group: O+ <br /> Height : 6” 3
                inches |<br/> Weight : 76
              </h3>
            </div>
            <div className="border-b-red ">
              <ul className="flex py-[16px] px-[20px] items-center border-y border-[#EEF0F3]">
                <li className="py-[8px] px-[12px] items-center rounded-lg border border-[#DBDDDF] text-[12px] font-Montserrat font-medium mr-2">
                  Symptom 1
                </li>
                <li className="py-[8px] px-[12px] items-center rounded-lg border border-[#DBDDDF] text-[12px] font-Montserrat font-medium mr-2">
                  Symptom 2
                </li>
                <li className="py-[8px] px-[12px] items-center rounded-lg border border-[#DBDDDF] text-[12px] font-Montserrat font-medium mr-2">
                  Symptom number 3
                </li>
              </ul>
            </div>
            <div className="h-[84px] py-[20px] px-[20px] border-[#EEF0F3]">
              <h1 className="font-Montserrat text-[14px] font-medium">
                Urgent care
              </h1>
              <h2 className="flex font-Montserrat text-[12px] font-medium mt-[8px] w-[345px]">
                <img
                  src={calenderIcon}
                  alt="calender"
                  className="h-4 w-4 mr-[7px]"
                  // srcset=""
                />
                13 June, 2023
              </h2>
              <h3 className="flex font-Montserrat text-[12px] font-medium -mt-[19px] sm:ml-[372px] ml-[200px]">
                <img
                  src={clock}
                  alt="cal"
                  className="h-4 w-4 mr-[7px] mt-[1px]"
                  // srcSet=""
                />
                9 : 00 AM
              </h3>
            </div>
            <div className="flex flex-col gap-[24px] py-[20px] px-[20px] border-t border-[#EEF0F3]">
                <div className="flex justify-between w-full p-[20px]">
                    <div className="flex-1 flex flex-col gap-[16px]">
                        <h1 className="text-[14px] font-[500] leading-[116%]">Patient's Note</h1>
                        <p className="text-[#5B6572] text-[12px] font-[400] leading-[160%] pr-[18px]">
                        Experience on-demand first-point medical assistance at your doorstep with Dooper's urgent care solutions. Transform your urgent healthcare experience with our one-stop solution, from tests to medications.                        </p>
                    </div>
                    <div className="flex-1 flex flex-col gap-[16px]">
                        <h1 className="text-[14px] font-[500] leading-[116%]">Patient's Note</h1>
                        <div className="rounded-[8px]">
                            <iframe className="rounded-[8px]" src="https://www.youtube.com/embed/yUrKHcYG9rg?si=mopdE2HvVGl_n0ao&amp;start=15" allow="autoplay; clipboard-write; encrypted-media; "></iframe>
                        </div>
                    </div>
                </div>
                <div className="text-white text-[12px] font-[500] leading-[116%] flex justify-cener items-center w-fit bg-[#FF0000] py-[7px] px-[16px] rounded-[8px] ml-[12px]">
                  Booking Cancelled
                </div>
                <div className="flex flex-col gap-[8px]">
                  <h2 className="text-[#8D98A4] text-[12px] font-[500] leading-[116%]">Reson for Cancellation</h2>
                  <textarea className="outline-none text-[14px]font-[500] leading-[116%] border border-[#EEF0F3] rounded-[8px] p-[20px] w-full h-[100px]" placeholder="Lorem Ipsum dolor ait amet">
                    
                  </textarea>
                </div>
            </div>
          </div>

          <div>
            {/* right side */}
            <UCRC />
          </div>

        </div>
      </div>}
    </div>
  );
}
