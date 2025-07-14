// import React, { useEffect, useState } from 'react'
// import backButton from '../assets/icons/arrow-left-black-icon.svg'
// import { Outlet, useLocation, useNavigate } from 'react-router-dom'
// export default function EditProfile() {
//     const [card, setCard] = useState('edit-profile');
//     const navigate = useNavigate();         
//     useEffect(()=>{
//         const pathname = window.location.pathname.split('/');
//         setCard(pathname[pathname.length-1]);
//     },[]);
//   return (
//     <div className=' flex flex-col gap-[16px] font-Montserrat sm:px-[120px] px-[15px] '>
//         <div className='cursor-pointer flex gap-[8px] items-center pt-[24px] pb-[8px]' onClick={()=>navigate('/user')}>
//             <img src={backButton} alt='back' />
//             <h1 className='text-[22px] font-[700] leading-[32px]'>Edit Profile</h1>
//         </div>
//         <div className='sm:w-full w-[310px] flex border-b border-[#E1E5E8]'>
            
//             <div className={`cursor-pointer sm:text-[16px] text-[14px] font-[500] leading-[110%] py-[10px] px-[16px] ${card === 'edit-profile' ? 'border-b border-[#E40443]': 'text-[#8D98A4] '}`} onClick={()=> { navigate('/user/edit-profile'); const pathname = window.location.pathname.split('/'); setCard(pathname[pathname.length-1]);}}>Basic Details</div>

//             <p className={`cursor-pointer sm:text-[16px] text-[14px] font-[500] leading-[110%] py-[10px] px-[16px] ${card === 'important-details' ? 'border-b border-[#E40443]': 'text-[#8D98A4] '}`} onClick={()=>{ navigate('/user/edit-profile/important-details'); const pathname = window.location.pathname.split('/'); setCard(pathname[pathname.length-1]);}}>Important Details</p>

//             <p className={`cursor-pointer sm:text-[16px] text-[14px] font-[500] leading-[110%] py-[10px] px-[16px] ${card === 'medical-history' ? 'border-b border-[#E40443]': 'text-[#8D98A4] '}`} onClick={()=> { navigate('/user/edit-profile/medical-history'); const pathname = window.location.pathname.split('/'); setCard(pathname[pathname.length-1]);}}>Medical History</p>

//             <p className={`cursor-pointer sm:text-[16px] text-[14px] font-[500] leading-[110%] py-[10px] px-[16px] ${card === 'family-details' ? 'border-b border-[#E40443]': 'text-[#8D98A4] '}`} onClick={()=> { navigate('/user/edit-profile/family-details'); const pathname = window.location.pathname.split('/'); setCard(pathname[pathname.length-1]);}}>Family Details</p>
//         </div>
//         <div className='sm:w-full'>
//             <Outlet />
//         </div>
//     </div>
//   )
// }


//practice garbage code byy vishal


import React, { useEffect, useState } from 'react'
import backButton from '../assets/icons/arrow-left-black-icon.svg'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
export default function EditProfile() {
    const [card, setCard] = useState('edit-profile');
    const navigate = useNavigate();         
    useEffect(()=>{
        const pathname = window.location.pathname.split('/');
        setCard(pathname[pathname.length-1]);
    },[]);
  return (
    <div className=' flex flex-col gap-[16px] font-Montserrat sm:px-[120px] px-[15px] '>
        <div className='cursor-pointer flex gap-[8px] items-center pt-[24px] pb-[8px]' onClick={()=>navigate('/user')}>
            <img src={backButton} alt='back' />
            <h1 className='text-[22px] font-[700] leading-[32px]'>Edit Profile</h1>
        </div>
        <div className='sm:w-full w-[310px] flex border-b border-[#E1E5E8]'>
            
            <div className={`cursor-pointer sm:text-[16px] text-[14px] font-[500] leading-[110%] py-[10px] px-[16px] ${card === 'edit-profile' ? 'border-b border-[#E40443]': 'text-[#8D98A4] '}`} onClick={()=> { navigate('/user/edit-profile'); const pathname = window.location.pathname.split('/'); setCard(pathname[pathname.length-1]);}}>Basic Details</div>

            <p className={`cursor-pointer sm:text-[16px] text-[14px] font-[500] leading-[110%] py-[10px] px-[16px] ${card === 'important-details' ? 'border-b border-[#E40443]': 'text-[#8D98A4] '}`} onClick={()=>{ navigate('/user/edit-profile/important-details'); const pathname = window.location.pathname.split('/'); setCard(pathname[pathname.length-1]);}}>Important Details</p>

            <p className={`cursor-pointer sm:text-[16px] text-[14px] font-[500] leading-[110%] py-[10px] px-[16px] ${card === 'medical-history' ? 'border-b border-[#E40443]': 'text-[#8D98A4] '}`} onClick={()=> { navigate('/user/edit-profile/medical-history'); const pathname = window.location.pathname.split('/'); setCard(pathname[pathname.length-1]);}}>Medical History</p>

            <p className={`cursor-pointer sm:text-[16px] text-[14px] font-[500] leading-[110%] py-[10px] px-[16px] ${card === 'family-details' ? 'border-b border-[#E40443]': 'text-[#8D98A4] '}`} onClick={()=> { navigate('/user/edit-profile/family-details'); const pathname = window.location.pathname.split('/'); setCard(pathname[pathname.length-1]);}}>Family Details</p>
        </div>
        <div className='sm:w-full'>
            <Outlet />
        </div>
    </div>
  )
}
