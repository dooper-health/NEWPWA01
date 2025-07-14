import React, { useState } from 'react'
import downArrowIcon from "../assets/icons/arrow-down-black-icon.svg"
import upArrowIcon from "../assets/icons/arrow-up-white-icon.svg"
import checkIcon from "../assets/icons/check-white-icon.svg"
export default function Steps(props) {
    const [expand, setExpand] = useState(false);
  return (
    <div className="flex gap-[20px] font-Montserrat">
        <div className="flex flex-col items-center" onClick={props.action}>
            <div className={`flex justify-center items-center min-w-[44px] min-h-[44px] rounded-[50%] ${ props.step >= props.stepNo ? 'bg-primary01 text-white':'bg-[#EEF0F3] text-[#5B6572]'}`} onClick={props.onClickAction}>
                { props.step > props.stepNo ? <img src={checkIcon} alt="done" /> : <p className="text-[14px] font-[600] leading-[116%]">{props.stepNo}</p> }
            </div>
            { !props.isLast && <div className={`h-full border border-dashed ${ props.step > props.stepNo ? 'border-primary01': 'border-[#EEF0F3]'}`} /> }
        </div>
        <div className="flex flex-col gap-[20px] w-full mb-[40px]">
            <div className="flex justify-between w-full">
                <div className="flex flex-col gap-[4px]" onClick={props.action}>
                    <h1 className="text-[18px] font-[500] leading-[120%]">{props.mainTitle}</h1>
                    <h2 className="text-[#5B6572] text-[14px] font-[500] leading-[116%]">{props.timing && props.step > props.stepNo ? props.timing: 'Remaining'}</h2>
                </div>
                <div className={`cursor-pointer h-fit p-[4px] rounded-[50%] ${expand ? 'bg-black':'bg-[#F5F6F7]'}`} onClick={()=>{setExpand(prev=>!prev)}}>
                    <img src={expand ? upArrowIcon:downArrowIcon} alt="expand"/>
                </div>
            </div>
            <div className={`${expand ? 'flex':'hidden'}`}>
                {props.children}
            </div>
        </div>
    </div>
  )
}
