import React, { useContext, useRef, useState, useEffect } from 'react';
import profilePhoto from '../assets/images/Profile-picture.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Context from '../context/AppContext';
import { toast } from 'react-toastify';

export default function BasicDetails() {
  const { mobileNumber } = useContext(Context);
  const [fullName, setFullName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [email, setEmail] = useState('');
  // const [profilePhoto, setProfilePhoto] = useState('');
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
        setAddressLine1(data.addressLine1);
        setPincode(data.pincode);
        setCity(data.city);
        setState(data.state);
        setEmail(data.email);
        setProfilePhoto(data.profilePhoto);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProfileInfo();
  }, [mobileNumber]);

  const fileInputRef = useRef(null);
  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('addressLine1', addressLine1);
    formData.append('pincode', pincode);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('email', email);
    if (profilePhoto) {
      formData.append('profilePhoto', profilePhoto);
    }

    try {
      const response = await fetch(`/api/profile/mobile/${mobileNumber}`, {
        method: 'PATCH',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to save profile info');
      }
      // alert('Info saved successfully');
      toast.success('Info saved successfully');
      //navigate('/important-details');
    } catch (error) {
      console.error('Error:', error);
      // alert('Error saving profile info');
      toast.error('Error saving profile info');
    }
  };

  const handlePincodeChange=async(e)=>{
    const value = e.target.value;
    setPincode(value);
    if(value.length === 6){
      try {
        const response = await axios.get(`https://api.postalpincode.in/pincode/${value}`);
        if (!response.data[0].Status === 'Success') {
          throw new Error('Failed to fetch city and state');
        }
        setCity(response.data[0].PostOffice[0].District);
        setState(response.data[0].PostOffice[0].State);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  return (
    <div className='flex flex-col gap-[32px] bg-white p-[32px] rounded-[16px] sm:mx-0 mx-[5px] sm:min-w-[500px] sm:w-fit '>
      <div className='flex flex-col gap-[24px]'>
        <div className='flex gap-[24px] items-center'>
          <img src={profilePhoto} alt="avatar" />
          {/* <img src={profilePhoto || Avatar} alt="avatar" /> */}
          <div className='flex flex-col gap-[16px]'>
            <div className='flex gap-[16px]'>
              <button className="sm:text-[15px] text-[12px]  font-[500] text-white bg-[#E40443] rounded-[6px] sm:px-[20px] px-[10px] py-[10px] tracking-[0.43px]" onClick={handleFileInputClick}>Upload new photo</button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <button className="sm:text-[15px] text-[12px] font-[500] text-[#A8AAAE] bg-[#A8AAAE29] rounded-[6px] px-[20px] py-[10px] tracking-[0.43px]" onClick={() => setProfilePhoto('')}>Reset</button>
            </div>
            <p className='text-[#4B465C] text-[12px] font-[400] leading-[22px]'>Allowed JPG, GIF or PNG, Max size of 800K</p>
          </div>
        </div>
        <div className='flex flex-col gap-[8px]'>
          <p className='text-[#8D98A4] text-[12px] font-[500] leading-[116%]'>Full Name*</p>
          <input
            type='text'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder='Jaydip Sakhiya'
            className='outline-none text-[#5B6572] text-[14px] font-[500] leading-[116%] border border-[#EEF0F3] py-[12px] px-[16px] rounded-[8px] w-full'
          />
        </div>
        <div className='flex flex-col gap-[8px]'>
          <p className='text-[#8D98A4] text-[12px] font-[500] leading-[116%]'>Phone Number</p>
          <input
            type='text'
            value={mobileNumber}
            readOnly
            placeholder='+91-987654322'
            className='outline-none text-[#5B6572] text-[14px] font-[500] leading-[116%] border border-[#EEF0F3] py-[12px] px-[16px] rounded-[8px] w-full'
          />
        </div>
        <div className='flex flex-col gap-[8px]'>
          <p className='text-[#8D98A4] text-[12px] font-[500] leading-[116%]'>Address</p>
          <input
            type='text'
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            placeholder='Enter your address'
            className='outline-none text-[#5B6572] text-[14px] font-[500] leading-[116%] border border-[#EEF0F3] py-[12px] px-[16px] rounded-[8px] w-full'
          />
          <input
            type='number'
            value={pincode}
            onChange={handlePincodeChange}
            placeholder='324010'
            className='outline-none text-[#5B6572] text-[14px] font-[500] leading-[116%] border border-[#EEF0F3] py-[12px] px-[16px] rounded-[8px] w-full'
          />
          <input
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder='Jaipur'
            className='outline-none text-[#5B6572] text-[14px] font-[500] leading-[116%] border border-[#EEF0F3] py-[12px] px-[16px] rounded-[8px] w-full'
            readOnly
          />
          <input
            type='text'
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder='Rajasthan'
            className='outline-none text-[#5B6572] text-[14px] font-[500] leading-[116%] border border-[#EEF0F3] py-[12px] px-[16px] rounded-[8px] w-full'
            readOnly
          />
        </div>
        <div className='flex flex-col gap-[8px]'>
          <p className='text-[#8D98A4] text-[12px] font-[500] leading-[116%]'>Email*</p>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='xyz@gmail.com'
            className='outline-none text-[#5B6572] text-[14px] font-[500] leading-[116%] border border-[#EEF0F3] py-[12px] px-[16px] rounded-[8px] w-full'
          />
        </div>
      </div>
      <div>
        <button className='bg-[#41B079] text-[14px] text-white font-[600] leading-[116%] px-[24px] py-[8px] rounded-[8px]' onClick={handleSubmit}>Save Details</button>
      </div>
    </div>
  );
}

