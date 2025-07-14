import React from "react";
import doc from "../assets/icons/doctor-sample-image.svg"
import call from '../assets/icons/call-dark-icon.svg'


export default function OrderDetailsModal(props){
    return(
        <div className="p-[20px] w-[396px]">
            <p className="font-Montserrat text-[14px] font-[600] pb-[16px]">Order Details <span className="text-[#41B079]"> (Paid)</span></p>
            <div className="flex flex-row">
                <div className="flex flex-row items-start w-[174px]">
                    <p className="text-[#8D98A4] font-[500] font-Montserrat text-[14px]">Service 1</p>
                </div>
                <div className="flex flex-col items-end w-[174px]">
                    <p className="text-[#1A1C1F] font-Montserrat font-[500] leading-4 pb-[16px]">Rs. 546</p>
                </div>
            </div>
            <div className="flex flex-row">
                <div className="flex flex-row items-start w-[174px]">
                    <p className="text-[#8D98A4] font-[500] font-Montserrat text-[14px]">GST</p>
                </div>
                <div className="flex flex-col items-end w-[174px]">
                    <p className="text-[#1A1C1F] font-Montserrat font-[500] leading-4 pb-[16px]">Rs. 78</p>
                </div>
            </div>
            <div className="flex flex-row border-b-2">
                <div className="flex flex-row items-start w-[174px]">
                    <p className="text-[#8D98A4] font-[500] font-Montserrat text-[14px]">Other Charges</p>
                </div>
                <div className="flex flex-col items-end w-[174px]">
                    <p className="text-[#1A1C1F] font-Montserrat font-[500] leading-4 pb-[16px]">Rs. 78</p>
                </div>
            </div>
            <div className="flex flex-row pt-[16px]">
                <div className="flex flex-row items-start w-[174px]">
                    <p className="text-[#8D98A4] font-[500] font-Montserrat text-[14px]">Sub Total</p>
                </div>
                <div className="flex flex-col items-end w-[174px]">
                    <p className="text-[#1A1C1F] font-Montserrat font-[500] leading-4 pb-[16px]">Rs. 600</p>
                </div>
            </div>
            <div className="flex flex-row border-b-2">
                <div className="flex flex-row items-start w-[174px]">
                    <p className="text-[#8D98A4] font-[500] font-Montserrat text-[14px]">Discount</p>
                </div>
                <div className="flex flex-col items-end w-[174px]">
                    <p className="text-[#1A1C1F] font-Montserrat font-[500] leading-4 pb-[16px]">Rs. 100</p>
                </div>
            </div>
            <div className="flex flex-row pt-[16px]">
                <div className="flex flex-row items-start w-[174px]">
                    <p className="text-[#1A1C1F] font-[500] font-Montserrat text-[14px]">Total</p>
                </div>
                <div className="flex flex-col items-end w-[174px]">
                    <p className="text-[#1A1C1F] font-Montserrat font-[500] leading-4 pb-[16px]">Rs. 500</p>
                </div>
            </div>
            <div className="pr-[20px] pt-[20px] flex flex-row w-[396px]">
                <img src ={doc}/>
                <div className="flex flex-col pl-[8px]">
                    <p className="font-Montserrat font-[500]">DHA Name</p>
                    <p className="text-[#E40443] font-Montserrat text-[12px] font-[500]"> Degree</p>
                </div>
            </div>
            <div className="pr-[20px] pt-[20px] flex flex-row w-[396px]">
                <img src ={call}/>
                <div className="flex flex-col pl-[8px]">
                    <p className="font-Montserrat font-[500] text-[#5B6572]">+91 123 456 7890</p>
                </div>
            </div>
            <div></div>
        </div>
    );
}