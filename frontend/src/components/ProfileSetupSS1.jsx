
import React, { useContext, useRef, useState, useEffect } from 'react'
import Step1image from '../assets/Step-1-of-3.svg';
import Avatar1 from '../assets/icons/avatar-1.svg'
import Avatar2 from '../assets/icons/avatar-2.svg'
import Avatar3 from '../assets/icons/avatar-3.svg'
import Avatar4 from '../assets/icons/avatar-4.svg'
import Avatar5 from '../assets/icons/avatar-5.svg'
import Avatar6 from '../assets/icons/avatar-6.svg'
import Avatar7 from '../assets/icons/avatar-7.svg'
import Avatar8 from '../assets/icons/avatar-8.svg'
import UploadIcon from '../assets/icons/upload-file-icon.svg'
import PrimaryButton from './PrimaryButton'
import indianFlag from '../assets/icons/flag-india-icon.svg'
import dropDownIcon from '../assets/icons/drop-down-icon.svg'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Context from '../context/AppContext';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {
    const location = useLocation();
    // const { mobileNumber: locationMobileNumber } = location.state || {};
    // const { mobileNumber, setMobileNumber } = useContext(Context);
    const { mobileNumber } = useContext(Context);
    const [fullName, setFullName] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [error, setError] = useState("");
    const [pincode, setPincode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [email, setEmail] = useState('');
    const [emergencyContactNumber, setEmergencyContactNumber] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const fileRef = useRef(null);
    const navigate = useNavigate();

    const handlePincodeChange = async (e) => {
      const value = e.target.value;
      setPincode(value);
  
      if (value.length === 6) {
        setError(""); // Clear previous error
        setCity("");  // Clear city
        setState(""); // Clear state
  
        try {
          const response = await axios.get(`https://api.postalpincode.in/pincode/${value}`);
          const data = response.data;
  
          if (data[0].Status === "Success") {
            const postOffice = data[0].PostOffice[0];
            setCity(postOffice.District);
            setState(postOffice.State);
          } else {
            setError("Invalid pincode or no data found.");
          }
        } catch (error) {
          console.error("Error fetching location data:", error);
          setError("Failed to fetch location. Please try again later.");
        }
      } else {
        setCity(""); // Clear city if the pincode length is not 6
        setState(""); // Clear state if the pincode length is not 6
      }}
  //   useEffect(() => {
  //     if (locationMobileNumber && locationMobileNumber !== mobileNumber) {
  //         setMobileNumber(locationMobileNumber);
  //     }
  // }, [locationMobileNumber, mobileNumber, setMobileNumber]);
  
  const handleFormSubmit = async (event) => {
    if (!city || !state) {
       toast.error("wrong picode or unable to fetch city and state.");
    }
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('mobileNumber', mobileNumber);
    console.log('Sending mobileNumber:', mobileNumber);
    formData.append('fullName', fullName);
    formData.append('addressLine1', addressLine1);
    formData.append('pincode', pincode);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('email', email);
    formData.append('emergencyContactNumber', emergencyContactNumber);
    formData.append('avatar', selectedAvatar);
  
    if (fileRef.current && fileRef.current.files[0]) {
      formData.append('profilePhoto', fileRef.current.files[0]);
    }


  
    try {
      const response = await axios.post('/api/signup1', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      if (response.status === 200) {
        // setProfileCompleted(false);
        navigate('/signup-profile-setup/step-2', { state: { mobileNumber } });
      }
    } catch (error) {
      console.error('Error in form submission:', error);
    }
  };


    return (
      <form onSubmit={handleFormSubmit} className='flex flex-col gap-[60px] justify-between items-center font-Montserrat sm:-ml-[10px] -ml-[15px]'>
        <img src={Step1image} alt="step1" />
        <div className='flex flex-col gap-[20px]'>
          <h1 className='text-center text-[32px] font-[700] leading-[44px]'>Basic Details</h1>
          <div className='flex flex-col gap-[32px]'>
            <h2 className='text-center text-[22px] font-[600] leading-[32px]'>Choose Avatar</h2>
            <div className='grid sm:grid-cols-4 grid-cols-3 justify-items-center'>
              {[Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6, Avatar7, Avatar8].map((avatar, index) => (
                <img
                  key={index}
                  className='cursor-pointer w-[120px] p-[10px]'
                  src={avatar}
                  alt="Avatar"
                  onClick={() => setSelectedAvatar(avatar)}
                  style={{ border: selectedAvatar === avatar ? '2px solid blue' : 'none' }}
                />
              ))}
            </div>
            <div className='flex flex-col gap-[8px]'>
              <div
                onClick={() => { fileRef.current.click() }}
                className="cursor-pointer border border-[#EEF0F3] px-[20px] py-[16px] rounded-[8px]"
              >
                <input
                  type="file"
                  ref={fileRef}
                  style={{ display: "none" }}
                />
                <img src={UploadIcon} alt="" className="mx-auto" />
                <h1 className=" text-[14px] font-[500] text-[#5B6572] flex items-center justify-center mt-[8px]">
                  Upload
                </h1>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-[16px]'>
            <div className='flex flex-col gap-[8px]'>
              <p className='text-[#8D98A4] text-[12px] font-[500] leading-[116%]'>Full Name *</p>
              <input
                type='text'
                placeholder='Enter full name'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className='outline-none text-[#5B6572] text-[14px] font-[500] leading-[116%] border border-[#EEF0F3] py-[12px] px-[16px] rounded-[8px] w-full'
                required
              />
            </div>
            <div className='flex flex-col gap-[8px]'>
              <p className='text-[#8D98A4] text-[12px] font-[500] leading-[116%]'>Address *</p>
              <input
                type='text'
                placeholder='Enter your address'
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                className='outline-none text-[#5B6572] text-[14px] font-[500] leading-[116%] border border-[#EEF0F3] py-[12px] px-[16px] rounded-[8px] w-full'
                required
              />
              <input
                type='number'
                placeholder='Pincode'
                value={pincode}
                onChange={handlePincodeChange}
                maxLength="6" 
                className='outline-none text-[#5B6572] text-[14px] font-[500] leading-[116%] border border-[#EEF0F3] py-[12px] px-[16px] rounded-[8px] w-full'
                required
              />
              <input
                type='text'
                placeholder='City'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className='outline-none text-[#5B6572] text-[14px] font-[500] leading-[116%] border border-[#EEF0F3] py-[12px] px-[16px] rounded-[8px] w-full'
                readOnly
              />
              <input
                type='text'
                placeholder='State'
                value={state}
                onChange={(e) => setState(e.target.value)}
                className='outline-none text-[#5B6572] text-[14px] font-[500] leading-[116%] border border-[#EEF0F3] py-[12px] px-[16px] rounded-[8px] w-full'
                readOnly
              />
            </div>
            <div className='flex flex-col gap-[8px]'>
              <p className='text-[#8D98A4] text-[12px] font-[500] leading-[116%]'>Email *</p>
              <input
                type='text'
                placeholder='Enter your email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='outline-none text-[#5B6572] text-[14px] font-[500] leading-[116%] border border-[#EEF0F3] py-[12px] px-[16px] rounded-[8px] w-full'
              />
            </div>
          </div>
          <div>
            <div className="flex flex-col mx-auto w-full">
              <label
                htmlFor=""
                className="text-[#8D98A4] h-[14px] text-[12px] font-[400] mb-1"
              >
                Emergency contact number *
              </label>
              <div className="flex gap-[12px] items-center border-solid border-[1px] border-[#EEF0F3] rounded-[8px] px-2 mb-[32px]">
                <img src={indianFlag} alt="india" />
                <img src={dropDownIcon} alt="dropdown" />
                <div className='w-[1px] h-[11px] bg-[#E3E6E8]' />
                <input
                  type="text"
                  placeholder="Enter emergency contact number"
                  value={emergencyContactNumber}
                  onChange={(e) => setEmergencyContactNumber(e.target.value)}
                  className="flex placeholder-[#5B6572] border-none outline-none font-Montserrat text-[14px] font-medium h-[44px] w-full"
                />
              </div>
            <div className="mt-[8px]">
            <button 
              type="button"
              onClick={() => navigate("/signup-profile-setup/step-2")}
              className="text-primary01 text-[14px] font-[600] leading-[110%] w-full border border-primary01 px-[24px] py-[15px] mb-[10px] rounded-[8px]"
            >
              Skip
            </button>
            <PrimaryButton
              title="Next Step"
              type="submit"
            />
          </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
  
  export default SignupForm;