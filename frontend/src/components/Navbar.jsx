import React, { useContext, useRef, useState, useEffect } from 'react'
import dooperLogo from "../assets/Dooper-red-logo.svg"
import dropDownIcon from '../assets/icons/drop-down-icon.svg'
import dropDownArrowIcon from '../assets/icons/drop-down-dark-icon.svg'
import notificationIcon from "../assets/icons/notification-bell-icon.svg"
import callButtonIcon from '../assets/icons/call-button-red-icon.svg'
import photo from "../assets/images/My-account-picture.svg"
import { Link, useNavigate } from 'react-router-dom'
import Context from '../context/AppContext';
import profilePic from "../assets/images/Profile-picture.svg";

const Navbar = () => {
  const { mobileNumber } = useContext(Context);
  const [fullName, setFullName] = useState('');
  const [profilePhoto, setprofilePhoto] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileInfo = async () => {
      if (!mobileNumber) {
        console.error('Mobile number not available');
        return;
      }
      try {
        const response = await fetch(`/api/profile/mobile/${mobileNumber}`);
        if (!response.ok) {
          throw new Error('Failed to fetch profile info');
        }
        const data = await response.json();
        setFullName(data.fullName);
        setprofilePhoto(data.profilePhoto);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProfileInfo();
  }, [mobileNumber]);

  return (
    <div className='hidden sm:block bg-white sm:flex justify-between items-center w-full  sm:py-[44px] py-[22px] sm:px-[120px] px-[30px] border-b border-[#E3E6E8] '>
      <img src={dooperLogo} alt='logo' className='sm:block hidden cursor-pointer' onClick={()=>{navigate('/home')}}/>
      <p className='sm:hidden flex'><img src='../assets/icons/menu(1).png' /><span className='font-bold text-2xl'>Dashboard</span></p>
      <div className='flex font-Montserrat text-[#8D98A4] space-x-[16px] h-[16px] '>
          <div className='hidden xl:flex gap-[24px] items-center'>
              <Link to='/home' className='cursor-pointer'>Home</Link>
              <Link to='/bookings' className='cursor-pointer'>My Bookings</Link>
              {/* <div className='flex gap-[4px] items-center'><Link className='cursor-pointer'>Our Network</Link><img src={dropDownIcon} alt="dropdown" /></div> */}
              {/* <Link className='cursor-pointer'>About Us</Link> */}
              <Link className='cursor-pointer'>Contact Us</Link>
              {/* <div className='flex gap-[4px] items-center'><Link className='cursor-pointer'>Join us with</Link><img src={dropDownIcon} alt="dropdown" /></div> */}
          </div>
          <div className='flex items-center gap-[16px]'>
            <Link to="/user" className='hidden xl:flex gap-[8px] items-center bg-[#F4F4F4] h-fit w-fit p-[8px] border border-[#F5F6F7] rounded-[8px]'>
              <img src={profilePic} alt="pic" srcSet="" className='h-[28px] w-[28px] ' />
              <h1 className='text-[14px] font-[500] font-Montserrat pl-[6px] pr-[6px]'>{fullName}</h1>
              <img src={dropDownArrowIcon} alt="" className='font-Montserrat text-[14px] font-[500] leading-[116%]' />
            </Link>
            <Link className="h-[44px] w-[40px] p-[12px] bg-[#F4F4F4] rounded-[8px]" to="/user/notifications">
              <img className="w-[16px]" src={notificationIcon} alt="" srcSet=""/>
            </Link>
            <div>
              <img className='hidden h-[44px] w-[40px]' src={callButtonIcon} alt="phone number" />
            </div>
          </div>
      </div>
    </div>
  )
}

export default Navbar
