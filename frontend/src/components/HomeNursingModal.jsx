import React from "react";
import PrimaryButton from "./PrimaryButton"
import nurse from '../assets/icons/ServicesHomeNursingDoctor.svg'
import home from "../assets/icons/ServicesHomeNursing.svg"

export default function HomeNursingModal(props){
    return(
    <div className='fixed top-0 left-0 right-0 bottom-0'>
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/30' onClick={()=>{props.onClose(false)}}></div>
        <div className='fixed top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] bg-white sm:w-[600px] e-[300px] sm:h-[332px] h-[600px] rounded-[8px] p-[32px]'>
        <h4 className="text-xl text-[#1A1C1F] font-600 leading-9 not-italic leading-4 pb-[32px] font-Montserrat font-semibold">Home Nursing</h4>
            <div className="flex sm:flex-row flex-col sm:space-x-4 sm:space-y-0 space-y-2"> 
                <div className="flex flex-col items-center w-[278px] h-[198px] pl-[40px] pt-[32px] pb-[32px] pr-[40px] rounded-lg border p-1">
                    <img src={nurse} className="pb-2"/>
                    <p className="color-[#1A1C1F] font-Montserrat text-base font-medium pb-[16px]">Nursing</p>
                    <div className="sm:ml-0 -ml-[50px] -mr-12 sm:mr-0 ">
                    <PrimaryButton title="Book Service" action={()=>{props.setNursingModal(true); props.onClose(false)}} />
                    </div>                    
                </div>
                <div className="flex flex-col items-center w-[278px] h-[198px] pl-[40px] pt-[32px] pb-[32px] pr-[40px] rounded-lg border p-1">
                    <img src={home} className="pb-2"/>
                    <p className="color-[#1A1C1F] font-Montserrat text-base font-medium pb-[16px]">Home care</p>
                    <div className="sm:ml-0 -ml-[50px] -mr-12 sm:mr-0 ">
                    <PrimaryButton title="Book Service" action={()=>{props.setHomeCareModal(true); props.onClose(false)}}/>
                    </div>
                </div>
            </div>
            </div>
        </div>
    ); 
}