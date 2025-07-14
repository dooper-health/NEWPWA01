import React, { useEffect, useState } from "react";
import rightArrowIcon from "../assets/icons/right-arrow-lightbg-icon.svg";
import profile from "../assets/icons/User.png"
import FamilyDetails from "../assets/icons/FamilyDetails.svg"
import MedicalHistory from "../assets/icons/MedicalHistory1.svg";
import Important from "../assets/icons/ImportantDetails.svg"
import BasicDetails from "../assets/icons/BasicDetails.svg"
import { Link } from 'react-router-dom'


const Selector = () => {
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <div className="">
      <div
        onClick={() => setOpen(!open)}
        className={`${ !selected && "py-[20px] flex flex-row  border-b-[1px]" }` } >
      <div className="flex font-Montserrat font-medium text-[16px] -ml-[2px] gap-[18px] ">
      <img src={profile} alt="pro"  className='w-[20px] h-[20px] mt-[2px]'/>
        {selected
          ? selected?.length > 25
            ? selected?.substring(0, 25) + "..."
            : selectedsadfsdgsdg
          : "Edit Profile"}
      </div>
        <img src={rightArrowIcon} alt="" className={`sm:ml-[248px] ml-[189px] mt-[3px] w-[16px] h-[16px] ${open && "rotate-90"}`}/>   
      </div>
      <ul
        className={`bg-white mt-2 overflow-y-auto ${
          open ? "max-h-60" : "max-h-0"
        } `}
      >
       {open &&<div className="space-y-[10px] overflow-hidden">
        <li>
       <div className="flex justify-between">
       <div className=''>
       <Link to="/user/edit-profile" className='flex ml-6 '>
        <img src={BasicDetails} className='w-[24px] h-[28px] mt-3' />
        <h1 className='font-Montserrat font-medium text-[16px] ml-[4px] mt-4'>Basic Details</h1>
        </Link>
      </div>
      {/* <div><Link to=""><img src={arrowicon} className="mt-4"/></Link></div> */}
       </div>
       </li>
      <hr/>
      <li>
       <div className="flex justify-between">
       <div >
        <Link to="/user/edit-profile/important-details" className='flex ml-6 '>
        <img src={Important } className='w-[24px] h-[28px] mt-3' />
        <h1 className='font-Montserrat font-medium text-[16px] ml-[4px] mt-4'>Important Details</h1>
        </Link>
      </div>
      {/* <div><Link to="/"><img src={arrowicon} className="mt-4"/></Link></div> */}
       </div>
       </li>
      <hr/>
       <li>
       <div className="flex justify-between">
       <div className=''>
       <Link to="/user/edit-profile/medical-history" className='flex ml-6 '>
        <img src={MedicalHistory} className='w-[24px] h-[28px] mt-3' />
        <h1 className='font-Montserrat font-medium text-[16px] ml-[4px] mt-4'>Medical History</h1>
        </Link>
      </div>
      {/* <div><Link to="/"><img src={arrowicon} className="mt-4"/></Link></div> */}
       </div>
       </li>
      <hr/>
      <li>
       <div className="flex justify-between">
       <div className=''>
       <Link to="/user/edit-profile/family-details" className='flex ml-6 '>
        <img src={FamilyDetails} className='w-[24px] h-[28px] mt-3' />
        <h1 className='font-Montserrat font-medium text-[16px] ml-[4px] mt-4'>Family Details</h1>
        </Link>
      </div>
      {/* <div><Link to="/"><img src={arrowicon} className="mt-4"/></Link></div> */}
       </div>
       </li>
      <hr/>
       
       
       </div>}  
      </ul>
    </div>
  );
};

export default Selector;