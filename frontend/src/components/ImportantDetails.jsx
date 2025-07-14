import React, { useContext, useRef, useState, useEffect } from 'react';
import physicalAssesment from '../assets/icons/physical-assesment.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Context from '../context/AppContext';
import { toast } from 'react-toastify';

export default function ImportantDetails() {
  const { mobileNumber } = useContext(Context);
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  // const [physicalAssessmentPhoto, setphysicalAssessmentPhoto] = useState('');

  useEffect(() => {
    const savedGender = localStorage.getItem('gender');
    if (savedGender) {
      setGender(savedGender);
    }
    const fetchProfileInfo = async () => {
      if (!mobileNumber) {
        console.error('Mobile number not available');
        return;
      }
      try {
        const response = await fetch(`/api/documents/mobile/${mobileNumber}`);
        if (!response.ok) {
          throw new Error('Failed to fetch profile info');
        }
        const data = await response.json();
        setHeight(data.height);
        setWeight(data.weight);
        setAge(data.age);
        setBloodGroup(data.bloodGroup);
        // setphysicalAssessmentPhoto(data.physicalAssessmentPhoto);
        //setGender(data.gender);
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
    setphysicalAssessmentPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // Update gender state and save to localStorage
    setGender(gender);
    localStorage.setItem('gender', gender);
    formData.append('gender', gender);
    //setGender(gender);
    formData.append('height', height);
    formData.append('weight', weight);
    formData.append('age', age);
    formData.append('bloodGroup', bloodGroup);
    // if (physicalAssessmentPhoto) {
    //   formData.append('physicalAssessmentPhoto', physicalAssessmentPhoto);
    // }

    try {
      const response = await fetch(`/api/documents/mobile/${mobileNumber}`, {
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
      toast.error('Error saving profile');
    }
  };

  return (
    <div className='flex flex-col gap-[32px] bg-white p-[32px] rounded-[16px] sm:mx-0 mx-[10px] sm:min-w-[500px] w-[350px] sm:w-fit '>
      <div className='flex flex-col gap-[24px]'>
        <div className='flex flex-col gap-[8px]'>
          <p className='text-[#8D98A4] text-[12px] font-[500] leading-[116%]'>Physical assessment photo</p>
          <div onClick={handleFileInputClick}>
            {physicalAssesment ? (
              <img className='w-[200px]' src={physicalAssesment} alt="img" />
            ) : (
              <img className='w-[200px]' src={physicalAssesment} alt="img" />
            )}
          </div>
          <input
            type='file'
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>
        <div className='flex flex-col gap-[8px]'>
        <p className='text-[#8D98A4] text-[12px] font-[500] leading-[116%]'>Gender</p>
        <select
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
            localStorage.setItem('gender', e.target.value);
          }}
          className='outline-none text-[#5B6572] text-[14px] font-[500] leading-[116%] border border-[#EEF0F3] py-[12px] px-[16px] rounded-[8px] w-full'
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
        <div className='flex flex-col gap-[8px]'>
          <p className='text-[#8D98A4] text-[12px] font-[500] leading-[116%]'>Height (in cm)</p>
          <input
            type='number'
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder='Enter your height'
            className='outline-none text-[#5B6572] text-[14px] font-[500] leading-[116%] border border-[#EEF0F3] py-[12px] px-[16px] rounded-[8px] w-full'
          />
        </div>
        <div className='flex flex-col gap-[8px]'>
          <p className='text-[#8D98A4] text-[12px] font-[500] leading-[116%]'>Weight (in kg)</p>
          <input
            type='number'
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder='Enter your weight'
            className='outline-none text-[#5B6572] text-[14px] font-[500] leading-[116%] border border-[#EEF0F3] py-[12px] px-[16px] rounded-[8px] w-full'
          />
        </div>
        <div className='flex flex-col gap-[8px]'>
          <p className='text-[#8D98A4] text-[12px] font-[500] leading-[116%]'>age (in years)</p>
          <input
            type='number'
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder='Enter your age'
            className='outline-none text-[#5B6572] text-[14px] font-[500] leading-[116%] border border-[#EEF0F3] py-[12px] px-[16px] rounded-[8px] w-full'
          />
        </div>
        <div className='flex flex-col gap-[8px]'>
          <p className='text-[#8D98A4] text-[12px] font-[500] leading-[116%]'>Blood group</p>
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className='outline-none text-[#5B6572] text-[14px] font-[500] leading-[116%] border border-[#EEF0F3] py-[12px] px-[16px] rounded-[8px] w-full'
          >
            <option>A+</option>
            <option>B+</option>
            <option>AB+</option>
            <option>O+</option>
            <option>A-</option>
            <option>B-</option>
            <option>AB-</option>
            <option>O-</option>
          </select>
        </div>
      </div>
      <div>
        <button
          className='bg-[#41B079] text-[14px] text-white font-[600] leading-[116%] px-[24px] py-[8px] rounded-[8px]'
          onClick={handleSubmit}
        >
          Save Details
        </button>
      </div>
    </div>
  );
}
