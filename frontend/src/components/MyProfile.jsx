// import React, { useContext, useRef, useState, useEffect } from 'react'
// import profilePic from "../assets/images/Profile-picture.svg";
// import editPencil from "../assets/icons/edit-pencil-icon.svg";
// import rightArrowIcon from "../assets/icons/right-arrow-lightbg-icon.svg";
// import leftArrowIcon from "../assets/icons/left-arrow-icon.svg";
// import userIcon from "../assets/icons/user-icon.svg";
// import wallet from "../assets/icons/wallet-icon.svg";
// import phone from "../assets/icons/call-dark-icon.svg";
// import privacy from "../assets/icons/policy-icon.svg";
// import terms from "../assets/icons/terms-icon.svg";
// import info from "../assets/icons/info-icon.svg";
// import star from "../assets/icons/star-dark-icon.svg";
// import logout from "../assets/icons/logout-icon.svg";
// import { Link } from "react-router-dom";
// import Footermobile from "./Footermobile";
// import Selector from './Selector'
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import Context from '../context/AppContext';



// const MyProfile = () => {
//   const { mobileNumber } = useContext(Context);
//   const [fullName, setFullName] = useState('');
//   const [profilePhoto, setprofilePhoto] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfileInfo = async () => {
//       if (!mobileNumber) {
//         console.error('Mobile number not available');
//         return;
//       }
//       try {
//         const response = await fetch(`http://localhost:5000/api/profile/mobile/${mobileNumber}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch profile info');
//         }
//         const data = await response.json();
//         setFullName(data.fullName);
//         setprofilePhoto(data.profilePhoto);
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };

//     fetchProfileInfo();
//   }, [mobileNumber]);

//   return (
//     <>
//         <div className="bg-[#F4F4F4] sm:w-full w-[500px] h-auto  overflow-hidden">
//           <main className="sm:mx-[120px] mx-[10px] pt-[24px] pb-[48px]">
//           <div className="flex gap-2 sm:pl-0 pl-5">
//           <img src={leftArrowIcon} className="sm:hidden h-9 w-9 -mt-1"></img>
//             <div className="font-Montserrat flex flex-row sm:font-[700] font-extrabold text-[22px] w-[1077px] pb-[8px]">
//               My Profile
//             </div>
//           </div>
            
//             <div className="h-[656px] sm:w-[454px] w-[400px] rounded-2xl p-[32px] bg-white mt-[32px]">
//               <div className="flex  pt-[12px]  pb-[20px] relative border-b border-[gray]">
//                 <img
//                   src={profilePic}
//                   alt="phone"
//                   className="w-[48px] h-[48px] rounded-full "
//                 />
//                 <Link to="/user/edit-profile">
//                   <img
//                     src={editPencil}
//                     alt="icon"
//                     className="absolute top-0 left-0 mt-7 ml-4"
//                   />
//                 </Link>
//                 <div className="ml-[16px]">
//                   <h1 className="font-Montserrat text-[14px] font-[600] text-black">
//                   {fullName}
//                   </h1>
//                   <h2 className="font-Montserrat text-[14px] font-[500] text-[#5B6572]">
//                     Balance : 2000INR
//                   </h2>
//                   <Link to="/user/edit-profile">
//                     <img
//                       src={rightArrowIcon}
//                       alt=""
//                       className="sm:ml-[309px] ml-[249px] -mt-[29px] w-[16px] h-[16px]"
//                     />
//                   </Link>
//                 </div>
//               </div>
//               <div className='sm:hidden'>
//               <Selector/>
//             </div>
//            <div className='hidden sm:block'>
//            <div className='py-[20px] flex flex-row  border-b-[1px]'>
//               <img src={userIcon} alt="pro"  className='w-[20px] h-[20px] mt-[2px]'/>
//               <h1 className='font-Montserrat font-medium text-[16px] ml-[16px]'>Edit Profile</h1>
//               <Link to="/user/edit-profile">
//               <img src={rightArrowIcon}
//                alt="" 
//                className='sm:ml-[248px] ml-[189px] mt-[3px] w-[16px] h-[16px]'/>   
//               </Link>
              
//             </div>
//            </div>
//               {/* <div className="py-[20px] flex flex-row  border-b-[1px]">
//                 <img
//                   src={wallet}
//                   alt="pro"
//                   className="w-[20px] h-[20px] mt-[2px]"
//                 />
//                 <h1 className="font-Montserrat font-medium text-[16px] ml-[16px]">
//                   My Earnings
//                 </h1>
//                 <Link to="/user/earnings">
//                   <img
//                     src={rightArrowIcon}
//                     alt=""
//                     className="ml-[237px] mt-[3px] w-[16px] h-[16px]"
//                   />
//                 </Link>
//               </div> */}
//               <div className="py-[20px] flex flex-row  border-b-[1px]">
//                 <img
//                   src={phone}
//                   alt="pro"
//                   className="w-[20px] h-[20px] mt-[2px]"
//                 />
//                 <h1 className="font-Montserrat font-medium text-[16px] ml-[16px]">
//                   Help & Support
//                 </h1>
//                 <img
//                   src={rightArrowIcon}
//                   alt=""
//                   className="sm:ml-[214px] ml-[154px] mt-[3px] w-[16px] h-[16px]"
//                 />
//               </div>
//               <div className="py-[20px] flex flex-row  border-b-[1px]">
//                 <img
//                   src={privacy}
//                   alt="pro"
//                   className="w-[20px] h-[20px] mt-[2px]"
//                 />
//                 <h1 className="font-Montserrat font-medium text-[16px] ml-[16px]">
//                   Privacy Policy
//                 </h1>
//                 <img
//                   src={rightArrowIcon}
//                   alt=""
//                   className="sm:ml-[226px] ml-[167px] mt-[3px] w-[16px] h-[16px]"
//                 />
//               </div>
//               <div className="py-[20px] flex flex-row  border-b-[1px]">
//                 <img
//                   src={terms}
//                   alt="pro"
//                   className="w-[20px] h-[20px] mt-[2px]"
//                 />
//                 <h1 className="font-Montserrat font-medium text-[16px] ml-[16px]">
//                   Terms & Conditions
//                 </h1>
//                 <img
//                   src={rightArrowIcon}
//                   alt=""
//                   className="sm:ml-[180px] ml-[121px] mt-[3px] w-[16px] h-[16px]"
//                 />
//               </div>
//               <div className="py-[20px] flex flex-row  border-b-[1px]">
//                 <img
//                   src={info}
//                   alt="pro"
//                   className="w-[20px] h-[20px] mt-[2px]"
//                 />
//                 <h1 className="font-Montserrat font-medium text-[16px] ml-[16px]">
//                   About Us
//                 </h1>
//                 <img
//                   src={rightArrowIcon}
//                   alt=""
//                   className="sm:ml-[262px] ml-[203px] mt-[3px] w-[16px] h-[16px]"
//                 />
//               </div>
//               <div className="py-[20px] flex flex-row  border-b-[1px]">
//                 <img
//                   src={star}
//                   alt="pro"
//                   className="w-[20px] h-[20px] mt-[2px]"
//                 />
//                 <h1 className="font-Montserrat font-medium text-[16px] ml-[16px]">
//                   Rate Us
//                 </h1>
//                 <img
//                   src={rightArrowIcon}
//                   alt=""
//                   className="sm:ml-[275px] ml-[216px] mt-[3px] w-[16px] h-[16px]"
//                 />
//               </div>
//               <div className="py-[20px] flex flex-row  border-b-[1px]">
//                 <img
//                   src={logout}
//                   alt="pro"
//                   className="w-[20px] h-[20px] mt-[2px]"
//                 />
                
//                 <h1 className="font-Montserrat font-medium text-[16px] ml-[16px]">
//                   Logout
//                 </h1>
//                 <img
//                   src={rightArrowIcon}
//                   alt=""
//                   className="sm:ml-[279px] ml-[220px] mt-[3px] w-[16px] h-[16px]"
//                 />
//               </div>
//             </div>
//           </main>
//         </div>
//         <Footermobile/>
//         </>
//   );
// };

// // export default MyProfile;





// import React, { useContext, useRef, useState, useEffect } from 'react'
// import profilePic from "../assets/images/Profile-picture.svg";
// import editPencil from "../assets/icons/edit-pencil-icon.svg";
// import rightArrowIcon from "../assets/icons/right-arrow-lightbg-icon.svg";
// import leftArrowIcon from "../assets/icons/left-arrow-icon.svg";
// import userIcon from "../assets/icons/user-icon.svg";
// import wallet from "../assets/icons/wallet-icon.svg";
// import phone from "../assets/icons/call-dark-icon.svg";
// import privacy from "../assets/icons/policy-icon.svg";
// import terms from "../assets/icons/terms-icon.svg";
// import info from "../assets/icons/info-icon.svg";
// import star from "../assets/icons/star-dark-icon.svg";
// import logout from "../assets/icons/logout-icon.svg";
// import { Link } from "react-router-dom";
// import Footermobile from "./Footermobile";
// import Selector from './Selector'
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import Context from '../context/AppContext';



// const MyProfile = () => {
//   const { mobileNumber } = useContext(Context);
//   const [fullName, setFullName] = useState('');
//   const [profilePhoto, setprofilePhoto] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfileInfo = async () => {
//       if (!mobileNumber) {
//         console.error('Mobile number not available');
//         return;
//       }
//       try {
//         const response = await fetch(`http://localhost:5000/api/profile/mobile/${mobileNumber}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch profile info');
//         }
//         const data = await response.json();
//         setFullName(data.fullName);
//         setprofilePhoto(data.profilePhoto);
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };

//     fetchProfileInfo();
//   }, [mobileNumber]);

//   return (
//     <>
//         <div className="bg-[#F4F4F4] sm:w-full w-[500px] h-auto  overflow-hidden">
//           <main className="sm:mx-[120px] mx-[10px] pt-[24px] pb-[48px]">
//           <div className="flex gap-2 sm:pl-0 pl-5">
//           <img src={leftArrowIcon} className="sm:hidden h-9 w-9 -mt-1"></img>
//             <div className="font-Montserrat flex flex-row sm:font-[700] font-extrabold text-[22px] w-[1077px] pb-[8px]">
//               My Profile
//             </div>
//           </div>
            
//             <div className="h-[656px] sm:w-[454px] w-[400px] rounded-2xl p-[32px] bg-white mt-[32px]">
//               <div className="flex  pt-[12px]  pb-[20px] relative border-b border-[gray]">
//                 <img
//                   src={`/${profilePhoto}`}
//                   alt="phone"
//                   className="w-[48px] h-[48px] rounded-full "
//                 />
//                 <Link to="/user/edit-profile">
//                   <img
//                     src={editPencil}
//                     alt="icon"
//                     className="absolute top-0 left-0 mt-7 ml-4"
//                   />
//                 </Link>
//                 <div className="ml-[16px]">
//                   <h1 className="font-Montserrat text-[14px] font-[600] text-black">
//                   {fullName}
//                   </h1>
//                   <h2 className="font-Montserrat text-[14px] font-[500] text-[#5B6572]">
//                     Balance : 2000INR
//                   </h2>
//                   <Link to="/user/edit-profile">
//                     <img
//                       src={rightArrowIcon}
//                       alt=""
//                       className="sm:ml-[309px] ml-[249px] -mt-[29px] w-[16px] h-[16px]"
//                     />
//                   </Link>
//                 </div>
//               </div>
//               <div className='sm:hidden'>
//               <Selector/>
//             </div>
//            <div className='hidden sm:block'>
//            <div className='py-[20px] flex flex-row  border-b-[1px]'>
//               <img src={userIcon} alt="pro"  className='w-[20px] h-[20px] mt-[2px]'/>
//               <h1 className='font-Montserrat font-medium text-[16px] ml-[16px]'>Edit Profile</h1>
//               <Link to="/user/edit-profile">
//               <img src={rightArrowIcon} alt="" className='sm:ml-[248px] ml-[189px] mt-[3px] w-[16px] h-[16px]'/>   
//               </Link>
              
//             </div>
//            </div>
//               {/* <div className="py-[20px] flex flex-row  border-b-[1px]">
//                 <img
//                   src={wallet}
//                   alt="pro"
//                   className="w-[20px] h-[20px] mt-[2px]"
//                 />
//                 <h1 className="font-Montserrat font-medium text-[16px] ml-[16px]">
//                   My Earnings
//                 </h1>
//                 <Link to="/user/earnings">
//                   <img
//                     src={rightArrowIcon}
//                     alt=""
//                     className="ml-[237px] mt-[3px] w-[16px] h-[16px]"
//                   />
//                 </Link>
//               </div> */}
//               <div className="py-[20px] flex flex-row  border-b-[1px]">
//                 <img
//                   src={phone}
//                   alt="pro"
//                   className="w-[20px] h-[20px] mt-[2px]"
//                 />
//                 <h1 className="font-Montserrat font-medium text-[16px] ml-[16px]">
//                   Help & Support
//                 </h1>
//                 <img
//                   src={rightArrowIcon}
//                   alt=""
//                   className="sm:ml-[214px] ml-[154px] mt-[3px] w-[16px] h-[16px]"
//                 />
//               </div>
//               <div className="py-[20px] flex flex-row  border-b-[1px]">
//                 <img
//                   src={privacy}
//                   alt="pro"
//                   className="w-[20px] h-[20px] mt-[2px]"
//                 />
//                 <h1 className="font-Montserrat font-medium text-[16px] ml-[16px]">
//                   Privacy Policy
//                 </h1>
//                 <img
//                   src={rightArrowIcon}
//                   alt=""
//                   className="sm:ml-[226px] ml-[167px] mt-[3px] w-[16px] h-[16px]"
//                 />
//               </div>
//               <div className="py-[20px] flex flex-row  border-b-[1px]">
//                 <img
//                   src={terms}
//                   alt="pro"
//                   className="w-[20px] h-[20px] mt-[2px]"
//                 />
//                 <h1 className="font-Montserrat font-medium text-[16px] ml-[16px]">
//                   Terms & Conditions
//                 </h1>
//                 <img
//                   src={rightArrowIcon}
//                   alt=""
//                   className="sm:ml-[180px] ml-[121px] mt-[3px] w-[16px] h-[16px]"
//                 />
//               </div>
//               <div className="py-[20px] flex flex-row  border-b-[1px]">
//                 <img
//                   src={info}
//                   alt="pro"
//                   className="w-[20px] h-[20px] mt-[2px]"
//                 />
//                 <h1 className="font-Montserrat font-medium text-[16px] ml-[16px]">
//                   About Us
//                 </h1>
//                 <img
//                   src={rightArrowIcon}
//                   alt=""
//                   className="sm:ml-[262px] ml-[203px] mt-[3px] w-[16px] h-[16px]"
//                 />
//               </div>
//               <div className="py-[20px] flex flex-row  border-b-[1px]">
//                 <img
//                   src={star}
//                   alt="pro"
//                   className="w-[20px] h-[20px] mt-[2px]"
//                 />
//                 <h1 className="font-Montserrat font-medium text-[16px] ml-[16px]">
//                   Rate Us
//                 </h1>
//                 <img
//                   src={rightArrowIcon}
//                   alt=""
//                   className="sm:ml-[275px] ml-[216px] mt-[3px] w-[16px] h-[16px]"
//                 />
//               </div>
//               <div className="py-[20px] flex flex-row  border-b-[1px]">
//                 <img
//                   src={logout}
//                   alt="pro"
//                   className="w-[20px] h-[20px] mt-[2px]"
//                 />
//                 <h1 className="font-Montserrat font-medium text-[16px] ml-[16px]">
//                   Logout
//                 </h1>
//                 <img
//                   src={rightArrowIcon}
//                   alt=""
//                   className="sm:ml-[279px] ml-[220px] mt-[3px] w-[16px] h-[16px]"
//                 />
//               </div>
//             </div>
//           </main>
//         </div>
//         <Footermobile/>
//         </>
//   );
// };

// export default MyProfile;

//////////////////////////////////final responsive //////////////////
import React, { useContext, useRef, useState, useEffect } from 'react'
import profilePic from "../assets/images/Profile-picture.svg";
import editPencil from "../assets/icons/edit-pencil-icon.svg";
import rightArrowIcon from "../assets/icons/right-arrow-lightbg-icon.svg";
import leftArrowIcon from "../assets/icons/left-arrow-icon.svg";
import userIcon from "../assets/icons/user-icon.svg";
import wallet from "../assets/icons/wallet-icon.svg";
import phone from "../assets/icons/call-dark-icon.svg";
import privacy from "../assets/icons/policy-icon.svg";
import terms from "../assets/icons/terms-icon.svg";
import info from "../assets/icons/info-icon.svg";
import star from "../assets/icons/star-dark-icon.svg";
import logout from "../assets/icons/logout-icon.svg";
import { Link } from "react-router-dom";
import Footermobile from "./Footermobile";
import Selector from './Selector'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Context from '../context/AppContext';

const MyProfile = () => {
  // const { mobileNumber } = useContext(Context);
  const { mobileNumber, setMobileNumber } = useContext(Context); // Ensure setMobileNumber is available in the context
  const [fullName, setFullName] = useState('');
  const [profilePhoto, setprofilePhoto] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // const response = await fetch('http://localhost:5000/api/logout', {
      //   method: 'POST',
      //   credentials: 'include', // include cookies if any
      // });
      // if (!response.ok) {
      //   throw new Error('Failed to log out');
      // }
      // console.log('Logout successful'); // Debugging statement
      setMobileNumber(''); // Clear the mobile number in context
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
    <>
      <div className="bg-[#F4F4F4] w-full h-auto overflow-hidden">
        <main className="mx-[10px] sm:mx-[120px] pt-6 pb-12">
        <Link to="/home">
          <div className="flex gap-2 pl-5 sm:pl-0">

            <img src={leftArrowIcon} className="h-9 w-9 -mt-1 sm:hidden" alt="back arrow" />
            <div className="font-Montserrat flex flex-row font-extrabold text-[22px] sm:font-[700] sm:w-full w-[300px] pb-2">
              My Profile
            </div>
          </div>
            </Link>
          
          <div className="bg-white rounded-2xl p-8 mt-8 w-full sm:w-[454px]">
            <div className="flex pt-3 pb-5 relative border-b border-gray-300">
              <img
                src={profilePic}
                alt="profile"
                className="w-12 h-12 rounded-full"
              />
              <Link to="/user/edit-profile">
                <img
                  src={editPencil}
                  alt="edit"
                  className="absolute top-0 left-0 mt-7 ml-4"
                />
              </Link>
              <div className="ml-4">
                <h1 className="font-Montserrat text-[20px] font-semibold text-black">
                  {fullName}
                </h1>
                {/* <h2 className="font-Montserrat text-sm font-medium text-gray-600">
                  Balance : 2000INR
                </h2> */}
                <Link to="/user/edit-profile">
                  <img
                    src={rightArrowIcon}
                    alt="right arrow"
                    className="absolute sm:relative sm:ml-[309px] ml-[245px] -mt-[29px] w-4 h-4"
                  />
                </Link>
              </div>
            </div>

            <div className='sm:hidden'>
              <Selector />
            </div>

            <div className='hidden sm:block'>
              <div className='py-5 flex flex-row border-b'>
                <img src={userIcon} alt="user" className='w-5 h-5 mt-1' />
                <h1 className='font-Montserrat font-medium text-lg ml-4'>Edit Profile</h1>
                <Link to="/user/edit-profile">
                  <img src={rightArrowIcon} alt="right arrow" className='ml-[235px] mt-1 w-4 h-4' />
                </Link>
              </div>
            </div>

            <div className="py-5 flex flex-row border-b">
              <img src={phone} alt="phone" className="w-5 h-5 mt-1" />
              <h1 className="font-Montserrat font-medium text-lg ml-4">Help & Support</h1>
              <img src={rightArrowIcon} alt="right arrow" className="ml-auto mt-1 w-4 h-4" />
            </div>

            <div className="py-5 flex flex-row border-b">
              <img src={privacy} alt="privacy policy" className="w-5 h-5 mt-1" />
              <h1 className="font-Montserrat font-medium text-lg ml-4">Privacy Policy</h1>
              <img src={rightArrowIcon} alt="right arrow" className="ml-auto mt-1 w-4 h-4" />
            </div>

            <div className="py-5 flex flex-row border-b">
              <img src={terms} alt="terms" className="w-5 h-5 mt-1" />
              <h1 className="font-Montserrat font-medium text-lg ml-4">Terms & Conditions</h1>
              <img src={rightArrowIcon} alt="right arrow" className="ml-auto mt-1 w-4 h-4" />
            </div>

            <div className="py-5 flex flex-row border-b">
              <img src={info} alt="about us" className="w-5 h-5 mt-1" />
              <h1 className="font-Montserrat font-medium text-lg ml-4">About Us</h1>
              <img src={rightArrowIcon} alt="right arrow" className="ml-auto mt-1 w-4 h-4" />
            </div>

            <div className="py-5 flex flex-row border-b">
              <img src={star} alt="rate us" className="w-5 h-5 mt-1" />
              <h1 className="font-Montserrat font-medium text-lg ml-4">Rate Us</h1>
              <img src={rightArrowIcon} alt="right arrow" className="ml-auto mt-1 w-4 h-4" />
            </div>

            <div className="py-5 flex flex-row border-b"  onClick={handleLogout} >
              <img src={logout} alt="logout" className="w-5 h-5 mt-1" />
              <h1 className="font-Montserrat font-medium text-lg ml-4">Logout</h1>
              <img src={rightArrowIcon} alt="right arrow" className="ml-auto mt-1 w-4 h-4" />
            </div>
            {/* <div className="py-5 flex flex-row border-b">
              <img src={logout} alt="logout" className="w-5 h-5 mt-1" />
              <h1  onClick={handleLogout} className="font-Montserrat font-medium text-lg ml-4">Logout</h1>
              <img src={rightArrowIcon} alt="right arrow" className="ml-auto mt-1 w-4 h-4" />
            </div> */}
          </div>
        </main>
      </div>
      <Footermobile/>
    </>
    
  );
};

export default MyProfile;
