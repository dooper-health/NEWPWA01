

import React, { useState, useContext } from "react";
import Step3image from "../assets/Step-3-of-3.svg";
import PrimaryButton from "./PrimaryButton";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import Context from '../context/AppContext';

export default function SignupStep3() {
  const navigate = useNavigate();
  const { mobileNumber } = useContext(Context);

  const [anyDisease, setAnyDisease] = useState('No');
  const [diseases, setDiseases] = useState([]);
  const [diseaseInput, setDiseaseInput] = useState('');

  const handleAddDisease = () => {
    if (diseaseInput.trim()) {
      setDiseases([...diseases, diseaseInput]);
      setDiseaseInput('');
    }
  };

  const handleRemoveDisease = (index) => {
    setDiseases(diseases.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/signup3', {
        mobileNumber,
        anyDisease,
        diseases
      });

      if (response.status === 200) {
        navigate("/home");
      }
    } catch (error) {
      console.error('Error in form submission:', error);
      // Implement user feedback here
    }
  };

  return (
    <div className="flex flex-col font-Montserrat h-full sm:-ml-[10px] -ml-[35px] ">
      <div className="mb-6">
        <Link to="/signup-profile-setup/step-2">
          <button className="flex justify-start border-2 border-black rounded-lg p-2 font-bold ">
            Back
          </button>
        </Link>
      </div>
      <img src={Step3image} alt="Step 3" className="mb-20"/>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[20px] sm:min-w-[420px] w-[350px]">
        <h1 className="text-center text-[32px] font-[700] leading-[44px]">
          Medical history
        </h1>
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[8px]">
            <p className="text-[#8D98A4] text-[12px] font-[500] leading-[116%]">
              Any disease
            </p>
            <select
              value={anyDisease}
              onChange={(e) => setAnyDisease(e.target.value)}
              className="outline-none text-[#5B6572] text-[14px] font-[500] leading-[116%] border border-[#EEF0F3] py-[12px] px-[16px] rounded-[8px] sm:w-full w-[350px]"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          {anyDisease === 'Yes' && (
            <div className="flex flex-col gap-[8px]">
              <p className="text-[#8D98A4] text-[12px] font-[500] leading-[116%]">
                Add diseases
              </p>
              <div className="flex gap-[12px]">
                <input
                  type="text"
                  placeholder="Enter disease"
                  value={diseaseInput}
                  onChange={(e) => setDiseaseInput(e.target.value)}
                  className="outline-none text-[#5B6572] text-[14px] font-[500] leading-[116%] border border-[#EEF0F3] py-[12px] px-[16px] rounded-[8px] sm:w-full w-[350px]"
                />
                <button
                  type="button"
                  onClick={handleAddDisease}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  +
                </button>
              </div>
              <div className="flex flex-wrap gap-[8px]">
                {diseases.map((disease, index) => (
                  <div key={index} className="flex items-center gap-[4px] p-[8px] bg-gray-200 rounded">
                    <span>{disease}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveDisease(index)}
                      className="text-red-500"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="mt-[8px]">
            <button 
              type="button"
              onClick={() => navigate("/home")}
              className="text-primary01 text-[14px] font-[600] leading-[110%] sm:w-full w-[350px] border border-primary01 px-[24px] py-[15px] mb-[10px] rounded-[8px]"
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
      <div className="text-center text-[14px] font-[500] leading-[116%] mt-[100px] -ml-[15px]">
        This step is skippable but compulsory before booking services
      </div>
    </div>
  );
}
