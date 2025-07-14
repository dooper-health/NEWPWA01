
// import React, { useContext } from 'react'
// import done from '../assets/icons/success-icon.svg'
// import { Link, useNavigate } from 'react-router-dom'
// import Context from '../context/AppContext'
// export default function Successful(props) {
//   const navigate = useNavigate();
//   const {setProfileCompleted} = useContext(Context)
//   return (
//     <div className='flex flex-col justify-between h-full sm:-ml-[20px] sm:-mt-0 -mt-[100px]'>
//       <div></div>
//       <div className='flex flex-col items-center '>
//         <img src={done} alt="" srcset="" className='mx-auto w-[200px] h-[200px]'/>
//         <h1 className='font-Montserrat mx-auto h-[28px] font-[700] text-[27px] leading-[28px] mt-[40px]'>Successful</h1>
//         <h2 className='text-center font-Montserrat text-[14px] font-[500] leading-[116%] mx-auto mt-[7px]'>{props.isSignupSuccess ? 'Account created successfully. Now setup your profile':'OPT Is verified successfully'}</h2>
//         <Link to={props.isSignupSuccess ? '/signup-profile-setup':'/home'} className= 'text-center mt-[40px] sm:w-[416px] w-[350px] h-[44px] bg-[#FCE6EC] rounded-[8px] text-[14px] font-[600] font-Montserrat text-[#E40443] pt-[12px]'>Continue</Link>
//         {props.isSignupSuccess && <Link to="#" className='text-center text-[#8D98A4] text-[14px] font-Montserrat font-[500] leading-[116%] mt-[16px]' onClick={()=>{setProfileCompleted(false); navigate('/home')}}>Skip for now</Link>}
//       </div>
//       <div className='text-center text-[16px] font-Montserrat font-[400] leading-[170%]'>
//         {props.isSignupSuccess ? 'We are working in KOTA only':''}
//       </div>
//     </div>
//   )
// }




import React, { useContext } from 'react'
import done from '../assets/icons/success-icon.svg'
import { Link, useNavigate } from 'react-router-dom'
import Context from '../context/AppContext'
export default function Successful() {
  const navigate = useNavigate();
  
  // const {setProfileCompleted} = useContext(Context)
  const { mobileNumber } = useContext(Context);

  return (
    <div className='flex flex-col justify-between h-full sm:-ml-[20px] sm:-mt-0 -mt-[100px]'>
      <div></div>
      <div className='flex flex-col items-center '>
        <img src={done} alt="" srcset="" className='mx-auto w-[200px] h-[200px]'/>
        <h1 className='font-Montserrat mx-auto h-[28px] font-[700] text-[27px] leading-[28px] mt-[40px]'>Successful</h1>
        <h2 className='text-center font-Montserrat text-[14px] font-[500] leading-[116%] mx-auto mt-[7px]'>Account created successfully. Now setup your profile':'OTP Is verified successfully</h2>
        <Link to='/signup-profile-setup' className= 'text-center mt-[40px] sm:w-[416px] w-[350px] h-[44px] bg-[#FCE6EC] rounded-[8px] text-[14px] font-[600] font-Montserrat text-[#E40443] pt-[12px]'>Continue</Link>
      </div>
      {/* <div className='text-center text-[16px] font-Montserrat font-[400] leading-[170%]'>
        {props.isSignupSuccess ? 'We are working in KOTA only':''}
      </div> */}
    </div>
  )
}
