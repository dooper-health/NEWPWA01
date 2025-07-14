


import React, { useRef, useState, useContext } from "react";
import Step2image from "../assets/Step-2-of-3.svg";
import UploadIcon from "../assets/icons/upload-file-icon.svg";
import PrimaryButton from "./PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Context from '../context/AppContext';

export default function SignupStep2() {
  const fileRef = useRef();
  const navigate = useNavigate();
  const { mobileNumber } = useContext(Context);

  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [physicalAssessmentPhoto, setPhysicalAssessmentPhoto] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('mobileNumber', mobileNumber);
    formData.append('height', height);
    formData.append('age', age);
    formData.append('weight', weight);
    formData.append('bloodGroup', bloodGroup);
    if (physicalAssessmentPhoto) {
      formData.append('physicalAssessmentPhoto', physicalAssessmentPhoto);
    }

    try {
      const response = await axios.post('/api/signup2', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        navigate("/signup-profile-setup/step-3");
      }
    } catch (error) {
      console.error('Error in form submission:', error);
      // Implement user feedback here
    }
  };

  return (
    <div className="flex flex-col font-Montserrat h-full sm:-ml-[10px] -ml-[35px]">
      <div className="mb-6">
        <Link to="/signup-profile-setup">
          <button className="flex justify-start border-2 border-black rounded-lg p-2 font-bold ">
            Back
          </button>
        </Link>
      </div>
      <img src={Step2image} alt="Step 2" className="mb-20"/>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[20px] items-center">
        <h1 className="text-center text-[32px] font-[700] leading-[44px]">
          Important Details
        </h1>
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[8px] sm:min-w-[420px] w-[350px]">
            <p className="text-[#8D98A4] text-[12px] font-[500] leading-[116%] text-center">
              Physical assessment photo
            </p>
            <div
              onClick={() => fileRef.current.click()}
              className="cursor-pointer border border-[#EEF0F3] px-[20px] py-[16px] rounded-[8px]"
            >
              <input 
                type="file" 
                ref={fileRef} 
                style={{ display: "none" }} 
                onChange={(e) => setPhysicalAssessmentPhoto(e.target.files[0])}
              />
              <img src={UploadIcon} alt="" className="mx-auto" />
              <h1 className="text-[14px] font-[500] text-[#5B6572] flex items-center justify-center mt-[8px]">
                Upload Photo
              </h1>
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <p className="text-[#8D98A4] text-[12px] font-[500] leading-[116%]">
              Height (in cm)
            </p>
            <input
              type="number"
              placeholder="Enter your height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="outline-none text-[#5B6572] text-[14px] font-[500] leading-[116%] border border-[#EEF0F3] py-[12px] px-[16px] rounded-[8px] sm:w-full w-[350px]"
              required
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <p className="text-[#8D98A4] text-[12px] font-[500] leading-[116%]">
              Age (in years)
            </p>
            <input
              type="number"
              placeholder="Enter your Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="outline-none text-[#5B6572] text-[14px] font-[500] leading-[116%] border border-[#EEF0F3] py-[12px] px-[16px] rounded-[8px] sm:w-full w-[350px]"
              required
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <p className="text-[#8D98A4] text-[12px] font-[500] leading-[116%]">
              Weight (in kg)
            </p>
            <input
              type="number"
              placeholder="Enter your weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="outline-none text-[#5B6572] text-[14px] font-[500] leading-[116%] border border-[#EEF0F3] py-[12px] px-[16px] rounded-[8px] sm:w-full w-[350px]"
              required
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <p className="text-[#8D98A4] text-[12px] font-[500] leading-[116%]">
              Blood - group
            </p>
            <select 
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="outline-none text-[#5B6572] text-[14px] font-[500] leading-[116%] border border-[#EEF0F3] py-[12px] px-[16px] rounded-[8px] sm:w-full w-[350px]"
            >
              <option value="">Select your blood group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div className="mt-[8px]">
            <button 
              type="button"
              onClick={() => navigate("/signup-profile-setup/step-3")}
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
      </form>
      <div className="text-center text-[14px] font-[500] leading-[116%] mt-[100px] items-center ml-[10px]">
        This step is skippable but compulsory before booking services
      </div>
    </div>
  );
}
