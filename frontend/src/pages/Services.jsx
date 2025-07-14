

import React, { useState, useContext } from 'react'
import Context from '../context/AppContext'
import urgentServiceIcon from '../assets/icons/service-heartbeat-urgent-care.svg';
import nonUrgentServiceIcon from '../assets/icons/service-heartbeat-non-urgent-care.svg';
import vaccinationIcon from '../assets/icons/services-vaccination.svg'
import homeNursingServieIcon from '../assets/icons/services-home-nursing.svg';
import medicineServiceIcon from '../assets/icons/service-medicine.svg';
import labTestServieIcon from '../assets/icons/services-lab-tests.svg';
import ServiceBookingCard from '../components/ServiceBookingCard';
import SuccessModal from '../components/SuccessModal';
import { useNavigate } from 'react-router-dom';
import ServiceBookingModal from '../components/ServiceBookingModal'
import Navbar from "../components/Navbar";
import Notificaion from '../assets/icons/notification.png'
import hamburger from '../assets/icons/hamburger.png'
import Footermobile from '../components/Footermobile';
import { Link } from 'react-router-dom';

import WarningModal from '../components/WarningModal';
import VaccinationModal from '../components/VaccinationModal';
import HomeNursingModal from '../components/HomeNursingModal';
import MedicineModal from '../components/MedicineModal';
import LabTestsModal from '../components/LabTestsModal';
import HomeCareModal from '../components/HomeCareModal';
import NursingModal from '../components/NursingModal';
export default function Services() {
    const navigate = useNavigate();
    const {profileCompleted} = useContext(Context);
    const [bookingsModal, setBookingsModal] = useState(false);
    const [bookUrgentService, setBookUrgentService] = useState(false);
    const [bookNonUrgentService, setBookNonUrgentService] = useState(false);
    const [vaccinationModal, setVaccinationModal] = useState(false);
    const [homeNursingModal, setHomeNursingModal] = useState(false);
    const [homeCareModal, setHomeCareModal] = useState(false);
    const [nursingModal, setNursingModal] = useState(false);
    const [medicineModal, setMedicineModal] = useState(false);
    const [labTestModal, setLabTestModal] = useState(false);
    const details = "Experience on-demand first-point medical assistance at your doorstep with Dooper's urgent care solutions. Transform your urgent healthcare experience with our one-stop solution, from tests to medications";
    const {standaloneService, setStandaloneServies} = useContext(Context);

  return (
    <>
    <div className='flex flex-col sm:gap-[40px] gap-[20px] font-Montserrat sm:px-[120px] px-[40px] sm:py-[64px] pt-[30px] sm:pb-0 pb-[140px]'>
   
    <div className='flex justify-between sm:hidden'>
        <div className='flex space-x-2'>
            <img src={hamburger} className='w-[16px] h-[16px]' />
            <h1 className='font-bold text-xl -mt-1.5'>Dashboard</h1>
        </div>
        <Link to="/user/notifications"><div><img src={Notificaion} className='w-[20px] h-[20px]' /></div></Link>
    </div>

        <div className='flex flex-col gap-[24px] '>
            <div className='flex justify-center '>
                <div className='text-[12px] font-[600] leading-[116%] bg-[#F5F6F7] px-[24px] py-[16px] rounded-[8px]'>Services</div>
            </div>     
        </div>
        <div className="cursor-pointer sm:text-[21px] text-[18px] font-[600] leading-[110%] px-[16px] sm:py-[10px] py-[2px] text-black text-center">Urgent Care</div>
        
            
            <div className='flex justify-center sm:w-full w-auto  items-center'>
                <ServiceBookingCard image={urgentServiceIcon} serviceName="Urgent Care" serviceDetail={details} more={"Learn more"} action={setBookUrgentService}/>
            </div> 

            <div className="cursor-pointer sm:text-[21px] text-[18px] font-[600] leading-[110%] px-[16px] sm:py-[10px] py-[2px]  text-black text-center">Standalone Service</div>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full items-center mb-5'>

            {/* <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px]  sm:w-full w-[340px] items-center mb-5 '> */}
                <ServiceBookingCard image={vaccinationIcon} serviceName="Vaccination" action={setVaccinationModal}/>
                <ServiceBookingCard image={homeNursingServieIcon} serviceName="Home Nursing" action={setHomeNursingModal}/>
                <ServiceBookingCard image={medicineServiceIcon} serviceName="Medicine" action={setMedicineModal}/>
                <ServiceBookingCard image={labTestServieIcon} serviceName="Lab Test" action={setLabTestModal}/>
            </div>
            
        {bookUrgentService && <ServiceBookingModal bookingType="Urgent" onClose={setBookUrgentService} action={setBookingsModal}/>}
        {bookNonUrgentService && <ServiceBookingModal bookingType="Non-Urgent" onClose={setBookNonUrgentService} action={setBookingsModal}/>}

        {vaccinationModal && <VaccinationModal onClose={setVaccinationModal} action={setBookingsModal}/> }
        {homeNursingModal && <HomeNursingModal onClose={setHomeNursingModal} setHomeCareModal={setHomeCareModal} setNursingModal={setNursingModal} />}
        {homeCareModal && <HomeCareModal onClose={setHomeCareModal} action={setBookingsModal} /> } 
        {nursingModal && <NursingModal onClose={setNursingModal} action={setBookingsModal} /> } 
        {medicineModal && <MedicineModal onClose={setMedicineModal} action={setBookingsModal}/> }
        {labTestModal && <LabTestsModal onClose={setLabTestModal} action={setBookingsModal}/> }
        {bookingsModal && ( profileCompleted ? <SuccessModal  action={()=>{navigate('/bookings')}} onClose={()=>setBookingsModal(false)}/> : <WarningModal action={()=>{navigate('/bookings-urgent')}} onClose={()=>setBookingsModal(false)} />)}
    </div>
    
    <Footermobile/>
    </>
  )
}
