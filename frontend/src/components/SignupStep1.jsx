// // // // firebase add by Navdeep-----------------------------------------------------

// // // import React, { createContext, useContext, useEffect, useState } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import SecondaryButton from './SecondaryButton';

// // // import PhoneInput from "react-phone-number-input";
// // // import "react-phone-number-input/style.css";
// // // import {
// // //   onAuthStateChanged,
// // //   signOut,
// // //   RecaptchaVerifier,
// // //   signInWithPhoneNumber,
// // // } from "firebase/auth";
// // // import { auth } from "../firebase";

// // // // UserAuthContext
// // // const userAuthContext = createContext();

// // // export function UserAuthContextProvider2({ children }) {
// // //   const [user, setUser] = useState({});

// // //   function logOut() {
// // //     return signOut(auth);
// // //   }

// // //   function setUpRecaptcha(number) {
// // //     const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {});
// // //     recaptchaVerifier.render();
// // //     return signInWithPhoneNumber(auth, number, recaptchaVerifier);
// // //   }

// // //   useEffect(() => {
// // //     const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
// // //       console.log("Auth", currentuser);
// // //       setUser(currentuser);
// // //     });

// // //     return () => {
// // //       unsubscribe();
// // //     };
// // //   }, []);

// // //   return (
// // //     <userAuthContext.Provider value={{ user, logOut, setUpRecaptcha }}>
// // //       {children}
// // //     </userAuthContext.Provider>
// // //   );
// // // }

// // // export function useUserAuth() {
// // //   return useContext(userAuthContext);
// // // }

// // // // Login Component
// // // const SignupStep1 = () => {
// // //   const [isButtonDisabled,setIsButtonDisabled]= useState(false);
// // //   const [number, setNumber] = useState("");
// // //   const [otp, setOtp] = useState("");
// // //   const [error, setError] = useState("");
// // //   const [flag, setFlag] = useState(false);
// // //   const [result, setResult] = useState("");
// // //   const { setUpRecaptcha } = useUserAuth();
// // //   const navigate = useNavigate();

// // //   const getOtp = async (e) => {
    
// // //     e.preventDefault();
// // //     setError("");

// // //     // Disable button
// // //     setIsButtonDisabled(true);

// // //     // Re-enable button after 3 seconds
// // //     setTimeout(() => {
// // //       setIsButtonDisabled(false);
// // //     }, 3000);
// // //     if (number === "" || number === undefined) return setError("Please enter a valid phone number!");

// // //     try {
// // //       const response = await setUpRecaptcha(number);
// // //       setResult(response);
// // //       setFlag(true);
// // //     } catch (err) {
// // //       setError(err.message);
// // //     }
// // //   };

// // //   const verifyOtp = async (e) => {
// // //     e.preventDefault();
// // //     setError("");
// // //     if (otp === "" || otp === null) return;

// // //     try {
// // //       await result.confirm(otp);
// // //       navigate("/success-signup");
// // //     } catch (err) {
// // //       setError(err.message);
// // //     }
// // //   };

// // //   return (
    
// // //     <div className="p-6 bg-white shadow-md rounded-lg max-w-md mx-auto">
// // //        <div className="text-center mb-8">
// // //           <div className="font-Montserrat text-2xl font-bold leading-10  text-[#1A1C1F]">
// // //             Welcome
// // //           </div>
// // //           <div className="text-[#1A1C1F] font-medium text-[14px] mt-1 sm:text-[14px]">
// // //             Welcome to <span className="text-[#E40443] font-semibold">DOOPER</span>, please enter your details
// // //           </div>
// // //         </div>
// // //       {/* <h2 className="text-2xl font-bold mb-4">Login Authentication</h2> */}
// // //       {/* {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>} */}

// // //       {!flag ? (
// // //         <form onSubmit={getOtp}>
// // //           <label htmlFor="mobileNumber" className="text-[#8D98A4] text-sm font-normal">
// // //             Phone Number
// // //           </label>
// // //           <div className="mb-4">
// // //             <PhoneInput
// // //               defaultCountry="IN"
// // //               value={number}
// // //               onChange={setNumber}
// // //               placeholder="Enter Phone Number"
// // //               className="w-full px-4 py-2 border border-gray-300 rounded"
// // //             />
// // //             <div id="recaptcha-container" />
// // //           </div>
// // //           <button type="submit" className="w-full py-2 bg-red-600 text-white rounded "disabled={isButtonDisabled}>
// // //             Send OTP
// // //           </button>
// // //           <div className="flex items-center justify-between mt-4 ">
// // //           <hr className="flex-1 bg-[#B8BFC7] h-[1px]" />
// // //           <span className="text-[#B8BFC7] text-xs">Already have an account?</span>
// // //           <hr className="flex-1 bg-[#B8BFC7] h-[1px]" />
// // //         </div>
// // //          <SecondaryButton title="Log In" action={() => navigate('/')} />

// // //           <div className="flex flex-col mt-4">
// // //           <div className="flex items-center text-sm font-normal text-[#000000]">
// // //             <input type="checkbox" className="mr-2 h-4 w-4 border-2 border-[#4B465C]" />
// // //             By signing up you agree to <a href="#" className="text-[#E40443]">Terms of use</a>
// // //           </div>
// // //           <div className="flex items-center text-sm font-normal text-[#000000] ">
// // //             <input type="checkbox" className="mr-2 h-4 w-4 border-2 border-[#000000]" />
// // //             Get updates on WhatsApp
// // //           </div>
// // //         </div>
// // //           <div className="text-center mt-4 text-[#5B6572] text-sm font-normal">
// // //           Join the community of smart and experienced doctors. Login to access your personalized dashboard, track your record or process and get informed by our services
// // //         </div>
// // //         </form>
// // //       ) : (
// // //         <form onSubmit={verifyOtp}>
// // //           <div className="mb-4">
// // //             <input
// // //               type="text"
// // //               placeholder="Enter OTP"
// // //               onChange={(e) => setOtp(e.target.value)}
// // //               className="w-full px-4 py-2 border border-gray-300 rounded"
// // //             />
// // //           </div>
// // //           <button type="submit" className="w-full py-2 bg-red-600 text-white rounded ">
// // //             Verify
// // //           </button>
// // //         </form>
        
        
// // //       )}
// // //     </div>
    
// // //   );
// // // };

// // // export default SignupStep1;



// // //firebase with backend
// // //working for SignupStep1.jsx
// // import React, { useState } from 'react';
// // import { useContext } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import PhoneInput from 'react-phone-number-input';
// // import 'react-phone-number-input/style.css';
// // import {
// //   RecaptchaVerifier,
// //   signInWithPhoneNumber,
// // } from 'firebase/auth';
// // import { auth } from '../firebase';
// // import SecondaryButton from './SecondaryButton';
// // import Context from '../context/AppContext';

// // const SignupStep1 = () => {
// //   const navigate = useNavigate();
// //   const [mobileNumber, setMobileNumber] = useState('');
// //   const [otp, setOtp] = useState('');
// //   const [error, setError] = useState('');
// //   const [flag, setFlag] = useState(false);
// //   const [result, setResult] = useState('');
// //   const [isButtonDisabled, setIsButtonDisabled] = useState(false);
// //   const { setMobileNumber: setGlobalMobileNumber } = useContext(Context);

// //   const setUpRecaptcha = (number) => {
// //     const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});
// //     recaptchaVerifier.render();
// //     return signInWithPhoneNumber(auth, number, recaptchaVerifier);
// //   };

// //   const handleSendOtp = async (e) => {
// //     e.preventDefault();
// //     setError('');
// //     // setError('invalid verification code');
// //     setIsButtonDisabled(true);

// //     try {
// //       // Step 1: Check if the user already exists in the database
// //       const checkUserResponse = await axios.post('/api/auth/signup/checkuserexistance', { phoneNumber: mobileNumber });
      
// //       if (checkUserResponse.status === 200) {
// //         // User exists, show error
// //         setError('A user with this mobile number already exists. Please log in instead.');
// //         setIsButtonDisabled(false);
// //         return;
// //       }
// //     } catch (error) {
// //       if (error.response && error.response.status === 409) {
// //         setError('A user with this mobile number already exists. Please log in instead.');
// //         setIsButtonDisabled(false);
// //         return;
// //       } else if (error.request) {
// //         setError('No response received from the server. Please check your internet connection and try again.');
// //       } else {
// //         setError('An error occurred while processing your request. Please try again.');
// //       }
// //       console.error('Error:', error);
// //       setIsButtonDisabled(false);
// //       return;
// //     }

// //     // Step 2: If the user does not exist, proceed with OTP sending
// //     try {
// //       setGlobalMobileNumber(mobileNumber); // Save mobile number in global context
// //       const response = await setUpRecaptcha(mobileNumber);
// //       setResult(response);
// //       setFlag(true);
// //     } catch (err) {
// //       setError(err.message);
// //       setIsButtonDisabled(false);
// //     }
// //   };

// //   const handleVerifyOtp = async (e) => {
// //     e.preventDefault();
// //     setError('');
    
// //     if (otp === '' || otp === null) return;

// //     try {
// //       await result.confirm(otp);
// //       navigate('/success-signup');
// //     } catch (err) {
// //       setError(err.message);
// //     }
// //   };

// //   return (
// //     <div className="p-6 bg-white rounded-lg max-w-md mx-auto">
// //       <div className="text-center mb-8">
// //         <div className="font-Montserrat text-2xl font-bold leading-10 text-[#1A1C1F]">Welcome</div>
// //         <div className="text-[#1A1C1F] font-medium text-[14px] mt-1 sm:text-[14px]">
// //           Welcome to <span className="text-[#E40443] font-semibold">DOOPER</span>, please enter your details
// //         </div>
// //       </div>
      
// //       {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

// //       {!flag ? (
// //         <form onSubmit={handleSendOtp}>
// //           <label htmlFor="mobileNumber" className="text-[#8D98A4] text-sm font-normal">Phone Number</label>
// //           <div className="mb-4">
// //             <PhoneInput
// //               defaultCountry="IN"
// //               value={mobileNumber}
// //               onChange={setMobileNumber}
// //               placeholder="Enter Phone Number"
// //               className="w-full px-4 py-2 border border-gray-300 rounded"
// //             />
// //             <div id="recaptcha-container" />
// //           </div>
// //           <button type="submit" className="w-full py-2 bg-red-600 text-white rounded" disabled={isButtonDisabled}>
// //             Send OTP
// //           </button>
// //           <div className="flex items-center justify-between mt-4">
// //             <hr className="flex-1 bg-[#B8BFC7] h-[1px]" />
// //             <span className="text-[#B8BFC7] text-xs">Already have an account?</span>
// //             <hr className="flex-1 bg-[#B8BFC7] h-[1px]" />
// //           </div>
// //           <SecondaryButton title="Log In" action={() => navigate('/login')} />

// //           <div className="flex flex-col mt-4">
// //             <div className="flex items-center text-sm font-normal text-[#000000]">
// //               <input type="checkbox" className="mr-2 h-4 w-4 border-2 border-[#4B465C]" />
// //               By signing up you agree to <a href="#" className="text-[#E40443]">Terms of use</a>
// //             </div>
// //             <div className="flex items-center text-sm font-normal text-[#000000]">
// //               <input type="checkbox" className="mr-2 h-4 w-4 border-2 border-[#000000]" />
// //               Get updates on WhatsApp
// //             </div>
// //           </div>

// //           <div className="text-center mt-4 text-[#5B6572] text-sm font-normal">
// //             Join the community of smart and experienced doctors. Login to access your personalized dashboard, track your record or process and get informed by our services
// //           </div>
// //         </form>
// //       ) : (
// //         <form onSubmit={handleVerifyOtp}>
// //           <div className="mb-4">
// //             <input
// //               type="text"
// //               placeholder="Enter OTP"
// //               onChange={(e) => setOtp(e.target.value)}
// //               className="w-full px-4 py-2 border border-gray-300 rounded"
// //             />
// //           </div>
// //           <button type="submit" className="w-full py-2 bg-red-600 text-white rounded">
// //             Verify
// //           </button>
// //         </form>
// //       )}
// //     </div>
// //   );
// // };

// // export default SignupStep1;


// // //working on localhost but issue with aws
// // import React, { useState } from 'react';
// // import { useContext } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import PhoneInput from 'react-phone-number-input';
// // import 'react-phone-number-input/style.css';
// // import {
// //   RecaptchaVerifier,
// //   signInWithPhoneNumber,
// // } from 'firebase/auth';
// // import { auth } from '../firebase';
// // import SecondaryButton from './SecondaryButton';
// // import Context from '../context/AppContext';

// // const SignupStep1 = () => {
// //   const navigate = useNavigate();
// //   const [mobileNumber, setMobileNumber] = useState('');
// //   const [otp, setOtp] = useState('');
// //   const [error, setError] = useState('');
// //   const [flag, setFlag] = useState(false);
// //   const [result, setResult] = useState('');
// //   const [isButtonDisabled, setIsButtonDisabled] = useState(false);
// //   const { setMobileNumber: setGlobalMobileNumber } = useContext(Context);

// //   const setUpRecaptcha = (number) => {
// //     const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});
// //     recaptchaVerifier.render();
// //     return signInWithPhoneNumber(auth, number, recaptchaVerifier);
// //   };

// //   const handleSendOtp = async (e) => {
// //     e.preventDefault();
// //     setError('');
// //     setIsButtonDisabled(true);

// //     try {
// //       // Step 1: Check if the user already exists in the database
// //       const checkUserResponse = await axios.post('/api/auth/signup/checkuserexistance', { phoneNumber: mobileNumber });
      
// //       if (checkUserResponse.status === 200) {
// //         // User exists, show error
// //         setError('A user with this mobile number already exists. Please log in instead.');
// //         setIsButtonDisabled(false);
// //         return;
// //       }
// //     } catch (error) {
// //       if (error.response && error.response.status === 409) {
// //         setError('A user with this mobile number already exists. Please log in instead.');
// //         setIsButtonDisabled(false);
// //         return;
// //       } else if (error.request) {
// //         setError('No response received from the server. Please check your internet connection and try again.');
// //       } else {
// //         setError('An error occurred while processing your request. Please try again.');
// //       }
// //       console.error('Error:', error);
// //       setIsButtonDisabled(false);
// //       return;
// //     }

// //     // Step 2: If the user does not exist, proceed with OTP sending
// //     try {
// //       setGlobalMobileNumber(mobileNumber); // Save mobile number in global context
// //       const response = await setUpRecaptcha(mobileNumber);
// //       setResult(response);
// //       setFlag(true);
// //     } catch (err) {
// //       setError(err.message);
// //       setIsButtonDisabled(false);
// //     }
// //   };

// //   const handleVerifyOtp = async (e) => {
// //     e.preventDefault();
// //     setError('');
// //     if (otp === '' || otp === null) return;

// //     try {
// //       await result.confirm(otp);
// //       navigate('/success-signup');
// //     } catch (err) {
// //       setError(err.message);
// //     }
// //   };

// //   return (
// //     <div className="p-6 bg-white rounded-lg max-w-md mx-auto">
// //       <div className="text-center mb-8">
// //         <div className="font-Montserrat text-2xl font-bold leading-10 text-[#1A1C1F]">Welcome</div>
// //         <div className="text-[#1A1C1F] font-medium text-[14px] mt-1 sm:text-[14px]">
// //           Welcome to <span className="text-[#E40443] font-semibold">DOOPER</span>, please enter your details
// //         </div>
// //       </div>
      
// //       {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

// //       {!flag ? (
// //         <form onSubmit={handleSendOtp}>
// //           <label htmlFor="mobileNumber" className="text-[#8D98A4] text-sm font-normal">Phone Number</label>
// //           <div className="mb-4">
// //             <PhoneInput
// //               defaultCountry="IN"
// //               value={mobileNumber}
// //               onChange={setMobileNumber}
// //               placeholder="Enter Phone Number"
// //               className="w-full px-4 py-2 border border-gray-300 rounded"
// //             />
// //             <div id="recaptcha-container" />
// //           </div>
// //           <button type="submit" className="w-full py-2 bg-red-600 text-white rounded" disabled={isButtonDisabled}>
// //             Send OTP
// //           </button>
// //           <div className="flex items-center justify-between mt-4">
// //             <hr className="flex-1 bg-[#B8BFC7] h-[1px]" />
// //             <span className="text-[#B8BFC7] text-xs">Already have an account?</span>
// //             <hr className="flex-1 bg-[#B8BFC7] h-[1px]" />
// //           </div>
// //           <SecondaryButton title="Log In" action={() => navigate('/login')} />

// //           <div className="flex flex-col mt-4">
// //             <div className="flex items-center text-sm font-normal text-[#000000]">
// //               <input type="checkbox" className="mr-2 h-4 w-4 border-2 border-[#4B465C]" />
// //               By signing up you agree to <a href="#" className="text-[#E40443]">Terms of use</a>
// //             </div>
// //             <div className="flex items-center text-sm font-normal text-[#000000]">
// //               <input type="checkbox" className="mr-2 h-4 w-4 border-2 border-[#000000]" />
// //               Get updates on WhatsApp
// //             </div>
// //           </div>

// //           <div className="text-center mt-4 text-[#5B6572] text-sm font-normal">
// //             Join the community of smart and experienced doctors. Login to access your personalized dashboard, track your record or process and get informed by our services
// //           </div>
// //         </form>
// //       ) : (
// //         <form onSubmit={handleVerifyOtp}>
// //           <div className="mb-4">
// //             <input
// //               type="text"
// //               placeholder="Enter OTP"
// //               onChange={(e) => setOtp(e.target.value)}
// //               className="w-full px-4 py-2 border border-gray-300 rounded"
// //             />
// //           </div>
// //           <button type="submit" className="w-full py-2 bg-red-600 text-white rounded">
// //             Verify
// //           </button>
// //         </form>
// //       )}
// //     </div>
// //   );
// // };

// // export default SignupStep1;

// -----------------------------------------------------------------

// import React, { useState } from 'react';
// import { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import PhoneInput from 'react-phone-number-input';
// import 'react-phone-number-input/style.css';
// import {
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
// } from 'firebase/auth';
// import { auth } from '../firebase'; // Ensure Firebase config is correctly set up for AWS
// import SecondaryButton from './SecondaryButton';
// import Context from '../context/AppContext';

// const SignupStep1 = () => {
//   const navigate = useNavigate();
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');
//   const [flag, setFlag] = useState(false);
//   const [result, setResult] = useState('');
//   const [isButtonDisabled, setIsButtonDisabled] = useState(false);
//   const [mobileNumber, setMobileNumber] = useState('');
//   const { setMobileNumber: setGlobalMobileNumber } = useContext(Context);

//   const setUpRecaptcha = (number) => {
//     const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
//       size: 'invisible', // Change this based on UI requirements
//     });
//     recaptchaVerifier.render();
//     return signInWithPhoneNumber(auth, number, recaptchaVerifier);
//   };

//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsButtonDisabled(true);

//     try {
//       // Step 1: Check if the user already exists in the database
//       const checkUserResponse = await axios.post(`api/auth/signup/checkuserexistance`, { 
//         phoneNumber: mobileNumber 
//       });
      
//       if (checkUserResponse.status === 200) {
//         setError('A user with this mobile number already exists. Please log in instead.');
//         setIsButtonDisabled(false);
//         return;
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 409) {
//         setError('A user with this mobile number already exists. Please log in instead.');
//         setIsButtonDisabled(false);
//         return;
//       } else if (error.request) {
//         setError('No response from the server. Check your connection.');
//       } else {
//         setError('An error occurred. Please try again.');
//       }
//       console.error('Error:', error);
//       setIsButtonDisabled(false);
//       return;
//     }

//     // Step 2: If the user does not exist, proceed with OTP sending
//     try {
//       setGlobalMobileNumber(mobileNumber); // Save mobile number in global context
//       const response = await setUpRecaptcha(mobileNumber);
//       setResult(response);
//       setFlag(true);
//     } catch (err) {
//       setError(err.message);
//       setIsButtonDisabled(false);
//     }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     setError('');
//     if (otp === '' || otp === null) return;

//     try {
//       await result.confirm(otp);
//       navigate('/success-signup');
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-lg max-w-md mx-auto">
//       <div className="text-center mb-8">
//         <div className="font-Montserrat text-2xl font-bold leading-10 text-[#1A1C1F]">Welcome</div>
//         <div className="text-[#1A1C1F] font-medium text-[14px] mt-1 sm:text-[14px]">
//           Welcome to <span className="text-[#E40443] font-semibold">DOOPER</span>, please enter your details
//         </div>
//       </div>
      
//       {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

//       {!flag ? (
//         <form onSubmit={handleSendOtp}>
//           <label htmlFor="mobileNumber" className="text-[#8D98A4] text-sm font-normal">Phone Number</label>
//           <div className="mb-4">
//             <PhoneInput
//               defaultCountry="IN"
//               value={mobileNumber}
//               onChange={setMobileNumber}
//               placeholder="Enter Phone Number"
//               className="w-full px-4 py-2 border border-gray-300 rounded"
//             />
//             <div id="recaptcha-container" />
//           </div>
//           <button type="submit" className="w-full py-2 bg-red-600 text-white rounded" disabled={isButtonDisabled}>
//             Send OTP
//           </button>
//           <SecondaryButton title="Log In" action={() => navigate('/login')} />

//           <div className="text-center mt-4 text-[#5B6572] text-sm font-normal">
//             Join the community of smart and experienced doctors. Login to access your personalized dashboard.
//           </div>
//         </form>
//       ) : (
//         <form onSubmit={handleVerifyOtp}>
//           <div className="mb-4">
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               onChange={(e) => setOtp(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded"
//             />
//           </div>
//           <button type="submit" className="w-full py-2 bg-red-600 text-white rounded">
//             Verify
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default SignupStep1;


import { useEffect, useState } from "react";
import { useContext } from "react";
import { Authenticate, initOTPless, verifyOTP } from "../utils/initOtpless";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { useAvailabilityContext } from "../AvailabilityContext";
import SecondaryButton from "./SecondaryButton";
import Context from '../context/AppContext';

function SignupStep1() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [activeSection, setActiveSection] = useState("PHONE");
  const [mobileNumber, setMobileNumber] = useState('');
  const { setMobileNumber: setGlobalMobileNumber } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    initOTPless(handleUserData);
  }, []);

  const handleUserData = async (otplessUser) => {
    console.log(otplessUser);

    const identityValue =
      otplessUser?.identities?.[0]?.identityValue || "No Identity Found";
    setMobileNumber(identityValue);
    setGlobalMobileNumber(identityValue);
  

    try {
      const response = await axios.post("/api/auth/signup/checkuserexistance", {
        phoneNumber: identityValue,
      });

      if (response.data.userExists) {
        navigate("/login");
      } else {
        alert(response.data.token);
        localStorage.setItem("token", response.data.token);
        navigate("/success-signup");
      }
    } catch (error) {
      console.error("Error checking user existence:", error);
      alert("User already exist please login.");
    }

    localStorage.setItem("otplessUser", JSON.stringify(otplessUser));
  };

  const switchActiveSection = (e) => {
    setActiveSection(e.target.value);
    setPhone("");
    setEmail("");
  };

  const handleProceed = async () => {
    try {
      if (activeSection === "PHONE") {
        const res = await Authenticate({ channel: "PHONE", phone });
        if (res.success) {
          document.getElementById("mobile-input").disabled = true;
        }
      } else if (activeSection === "EMAIL") {
        const res = await Authenticate({ channel: "EMAIL", email });
        if (res.success) {
          document.getElementById("email-input").disabled = true;
        }
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      alert("An error occurred during authentication.");
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const res = await verifyOTP({
        channel: activeSection,
        otp,
        phone,
        email,
      });
      if (res.success) {
        document.getElementById("otp-input").disabled = true;
        setOtp("Verified");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      alert("An error occurred during OTP verification.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="font-Montserrat text-2xl font-bold leading-10 text-[#1A1C1F]">
          Welcome Back
        </div>
        <div className="text-[#1A1C1F] font-medium text-[14px] mt-1 sm:text-[14px]">
          Welcome back to{" "}
          <span className="text-[#E40443] font-semibold">DOOPER</span>, please
          log in to continue
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full space-y-4">
        <div>
          <input
            type="radio"
            id="mobile"
            name="section"
            value="PHONE"
            checked={activeSection === "PHONE"}
            onChange={switchActiveSection}
          />
          <label htmlFor="mobile">Mobile</label>
          {/* <input
          type="radio"
          id="email"
          name="section"
          value="EMAIL"
          checked={activeSection === 'EMAIL'}
          onChange={switchActiveSection}
        />
        <label htmlFor="email">Email</label> */}
        </div>

        {activeSection === "PHONE" && (
          <div id="mobile-section">
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded"
              id="mobile-input"
              placeholder="Enter mobile number"
              onChange={(e) => setPhone(e.target.value)}
            />
            <button
              onClick={handleProceed}
              className="w-full py-2 bg-red-600 text-white rounded"
            >
              Proceed
            </button>
          </div>
        )}

        {/* {activeSection === "EMAIL" && (
          <div id="email-section">
            <input
              id="email-input"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleProceed} >Proceed</button>
          </div>
        )} */}

        <div id="otp-section">
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded"
            id="otp-input"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            minLength={6}
            maxLength={6}
          />
          <button
            onClick={handleVerifyOTP}
            className="w-full py-2 bg-red-600 text-white rounded"
          >
            Verify OTP
          </button>
        </div>

        <button
          onClick={() =>
            Authenticate({ channel: "OAUTH", channelType: "WHATSAPP" })
          }
        >
          Authenticate with WhatsApp
        </button>
        {/* <button onClick={() => Authenticate({ channel: 'OAUTH', channelType: 'GOOGLE' })}>
        Authenticate with Gmail
      </button> */}
        <div className="flex items-center justify-between mt-4">
          <hr className="flex-1 bg-[#B8BFC7] h-[1px]" />
          <span className="text-[#B8BFC7] text-xs">
            Already have an account?
          </span>
          <hr className="flex-1 bg-[#B8BFC7] h-[1px]" />
        </div>

        <SecondaryButton title="Login" action={() => navigate("/login")} />
      </div>
      <div className="flex flex-col mt-4">
        <div className="flex items-center text-sm font-normal text-[#000000]">
          <input
            type="checkbox"
            className="mr-2 h-4 w-4 border-2 border-[#4B465C]"
          />
          By signing up you agree to{" "}
          <a href="#" className="text-[#E40443]">
            Terms of use
          </a>
        </div>
        <div className="flex items-center text-sm font-normal text-[#000000]">
          <input
            type="checkbox"
            className="mr-2 h-4 w-4 border-2 border-[#000000]"
          />
          Get updates on WhatsApp
        </div>
      </div>

      <div className="text-center mt-4 text-[#5B6572] text-sm font-normal">
        Join the community of smart and experienced doctors. Login to access
        your personalized dashboard, track your record or process and get
        informed by our services
      </div>
    </div>
  );
}

export default SignupStep1;
