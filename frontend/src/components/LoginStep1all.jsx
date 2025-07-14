import React, { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import indianFlag from '../assets/icons/flag-india-icon.svg';
import dropDownIcon from '../assets/icons/drop-down-icon.svg';
import axios from 'axios';
import Context from '../context/AppContext'; // Assuming your context is exported as Context from AppContext.js



export default function LoginStep1all() {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState(null);
  const { setMobileNumber: setGlobalMobileNumber } =  useContext(Context);

  const handleChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending request to /api/auth/login/send-otp with mobile:', mobileNumber);
      const response = await axios.post('/api/otp/login/send-otp', { phoneNumber: mobileNumber });
      console.log('Response data:', response.data);
      alert(`Your OTP is: ${response.data.otp}`);
            setGlobalMobileNumber(mobileNumber);
      navigate('/verify-login', { state: { mobileNumber: mobileNumber } });
    } catch (error) {
      console.error('There was an error with the login request:', error.response || error);
      setError('There was an error with your request. Please try again.');
    }
  };

  return (
    <div className="flex bg-[#FFFFFF] ">
      <div className="flex flex-col w-full max-w-[416px] mx-auto ">
        <div className="text-center mb-8">
          <div className="font-Montserrat text-2xl font-bold leading-10  text-[#1A1C1F]">
            Welcome
          </div>
          <div className="text-[#1A1C1F] font-medium text-[14px] mt-1 sm:text-[14px]">
            Welcome to <span className="text-[#E40443] font-semibold">DOOPER</span>, please enter your details
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4    ">
            <label htmlFor="mobileNumber" className="text-[#8D98A4] text-sm font-normal">
              Phone Number
            </label>

            <div className="flex items-center gap-2 border border-[#EEF0F3] rounded-md px-2 ">
              <img src={indianFlag} alt="India Flag" className="w-6 h-6" />
              <img src={dropDownIcon} alt="Dropdown Icon" className="w-4 h-4" />
              <div className="w-px h-3 bg-[#E3E6E8]" />
              <input
                type="text"
                id="mobileNumber"
                placeholder="Enter your phone number"
                className="flex flex-1 placeholder-[#5B6572] border-none outline-none text-sm font-medium h-11"
                value={mobileNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          <PrimaryButton title="Send OTP" type="submit" />

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </form>

        <div className="flex items-center justify-between mt-4 ">
          <hr className="flex-1 bg-[#B8BFC7] h-[1px]" />
          <span className="text-[#B8BFC7] text-xs">Don't have an account?</span>
          <hr className="flex-1 bg-[#B8BFC7] h-[1px]" />
        </div>

        <SecondaryButton title="Sign Up" action={() => navigate('/signup')} />

        <div className="flex flex-col mt-4">
          <div className="flex items-center text-sm font-normal text-[#000000]">
            <input type="checkbox" className="mr-2 h-4 w-4 border-2 border-[#4B465C]" />
            By signing up you agree to <a href="#" className="text-[#E40443]">Terms of use</a>
          </div>
          <div className="flex items-center text-sm font-normal text-[#000000] ">
            <input type="checkbox" className="mr-2 h-4 w-4 border-2 border-[#000000]" />
            Get updates on WhatsApp
          </div>
        </div>

        <div className="text-center mt-4 text-[#5B6572] text-sm font-normal">
          Join the community of smart and experienced doctors. Login to access your personalized dashboard, track your record or process and get informed by our services
        </div>
      </div>
    </div>
  );
}
