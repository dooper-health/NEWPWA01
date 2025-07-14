

import React, { useContext, useState, useEffect } from "react";
import axios from 'axios'; // Ensure axios is imported
import Navbar from "../components/Navbar";
import backArrow from "../assets/icons/arrow-left-black-icon.svg";
import Dcs from '../assets/images/Doctor-sample-1.svg';
import { useNavigate, useParams } from "react-router-dom"; // Added useParams
import calenderIcon from "../assets/icons/calender-icon.svg";
import clock from "../assets/icons/clock.svg";
import profilePicture from "../assets/images/Patient-picture.svg";
import linkIcon from "../assets/icons/link-white-icon.svg";
import Steps from "../components/Steps";
import SecondaryButton from "../components/SecondaryButton";
import Context from "../context/AppContext";
import UCRC from "../components/UCRC";
import RatingModal from "../components/RatingModal";

export default function MyBookingsSCVDetails() {
    const navigate = useNavigate();
    const { id } = useParams(); // Extracting id from route parameters
    const { urgentStep, setUrgentStep } = useContext(Context);
    const [ratingModal, setRatingModal] = useState(false);
    const [bookingDetails, setBookingDetails] = useState(null);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                // const response = await axios.get(`/api/user/${mobileNumber}`);
                const response = await axios.get(`/api/standaloneservice/standalone-booking-vaccination-details/${id}`);
                setBookingDetails(response.data);
            } catch (error) {
                console.error("Error fetching booking details:", error);
            }
        };

        fetchBookingDetails();
    }, [id]);

    if (!bookingDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="">
            <div className="hidden sm:block"><Navbar /></div>
            <div className="flex flex-col bg-[#F4F4F4]/50 sm:px-[120px] px-[15px] pt-[24px]">
                <div className="cursor-pointer font-Montserrat flex flex-row font-[700] text-[22px] h-[32px] sm:w-[1077px] pb-[8px] mb-[16px]" onClick={() => { navigate('/bookings') }}>
                    <img
                        src={backArrow}
                        alt="back"
                        className="h-[24px] w-[24px] mt-1 mr-[8px]"
                    />
                    Vaccination Service
                </div>
                <div className="sm:flex sm:flex-row flex-col gap-[30px] mt-[8px] pb-[48px]">
                    <div className="sm:w-[774px] w-[360px] border border-[#EEF0F3] rounded-2xl bg-white">
                        <div className="h-[122px] py-[12px] px-[20px] flex items-start self-stretch">
                            <img
                                src={profilePicture}
                                alt="pro"
                                className="w-[88px] h-[88px]"
                            />
                            <div>
                                <h1 className="font-Montserrat text-[16px] font-semibold ml-[16px] mt-[4px]">
                                    {bookingDetails.patientName}
                                </h1>
                                <h2 className="text-[#5B6572] font-Montserrat text-[16px] font-medium mt-[8px]">
                                    {bookingDetails.address}
                                </h2>
                                <h3 className="text-[#5B6572] font-Montserrat text-[10px] font-medium mt-[8px]">
                                    Age: {bookingDetails.age}  | Gender: {bookingDetails.gender} | Blood Group: {bookingDetails.bloodGroup} <br />
                                    Height: {bookingDetails.height} | Weight: {bookingDetails.weight}
                                </h3>
                            </div>
                        </div>
                        <div className="border-b">
                            <ul className="flex py-[16px] px-[20px] items-center border-y border-[#EEF0F3]">
                                {(bookingDetails.symptoms || []).map((symptom, index) => (
                                    <li key={index} className="py-[8px] px-[12px] items-center rounded-lg border border-[#DBDDDF] text-[12px] font-Montserrat font-medium mr-2">
                                        {symptom}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="h-[84px] py-[20px] px-[20px] border-[#EEF0F3]">
                            <h1 className="font-Montserrat text-[14px] font-[600]">
                                Vaccination Service
                            </h1>
                            <h2 className="flex font-Montserrat text-[12px] font-medium mt-[8px] w-[345px]">
                                <img
                                    src={calenderIcon}
                                    alt="calender"
                                    className="h-4 w-4 mr-[7px]"
                                />
                                {bookingDetails.date}
                            </h2>
                            <h3 className="flex font-Montserrat text-[12px] font-medium mt-[8px] w-[200px]">
                                <img
                                    src={clock}
                                    alt="clock"
                                    className="h-4 w-4 mr-[7px]"
                                />
                                {bookingDetails.time}
                            </h3>
                        </div>
                        <div className="py-[20px] px-[20px] border-t border-[#EEF0F3]">
                            <Steps stepNo="01" step={urgentStep} mainTitle="Created" timing="17, June 2023 | 08:00 AM">
                                <div className="flex flex-col gap-[20px]">
                                    <div className="w-fit">
                                        <SecondaryButton title="Cancel Booking" action={() => { }} />
                                    </div>
                                    <p className="text-[#5B6572] text-[14px] font-[500] leading-[116%]">You can cancel this booking only before DHA not assigned</p>
                                </div>
                            </Steps>
                            <Steps stepNo="02" step={urgentStep} mainTitle="Pharmacy Assigned" timing="18, June 2023" onClickAction={() => { setUrgentStep(2) }}>
                                <div className='flex gap-[8px] sm:p-[20px] py-[20px] border-b border-[#EEF0F3]'>
                                    <img src={Dcs} alt="icon" />
                                    <div>
                                        <h1 className='text-[16px] font-[600] leading-[110%]'>Pharmacy Name</h1>
                                        <p className='text-primary01 text-[12px] font-[500] leading-[116%]'>Location</p>
                                    </div>
                                </div>
                            </Steps>
                            <Steps stepNo="03" step={urgentStep} mainTitle="DHA Assigned" timing="18, June 2023" onClickAction={() => { setUrgentStep(3) }}>
                                <div className='flex gap-[8px] sm:p-[20px] py-[20px] border-b border-[#EEF0F3]'>
                                    <img src={Dcs} alt="icon" />
                                    <div>
                                        <h1 className='text-[16px] font-[600] leading-[110%]'>DHA Name</h1>
                                        <p className='text-primary01 text-[12px] font-[500] leading-[116%]'>Degree</p>
                                    </div>
                                </div>
                            </Steps>
                            <Steps stepNo="04" step={urgentStep} mainTitle="DHA Service Started" timing="18, June 2023" onClickAction={() => { setUrgentStep(4) }}>
                            </Steps>
                            <Steps stepNo="05" step={urgentStep} mainTitle="Completed" timing="18, June 2023" isLast={true} onClickAction={() => { setUrgentStep(6) }}>
                                <div></div>
                            </Steps>
                            {urgentStep > 5 && <button className="flex justify-center items-center text-white text-[14px] font-[600] leading-[116%] bg-[#41B079] w-[300px] h-[36px] py-[24px] rounded-[8px]" onClick={() => { setRatingModal(true) }}>Add Feedback</button>}
                            {ratingModal && <RatingModal onClose={setRatingModal} />}
                        </div>
                    </div>
                    <div>
                        {/* right side */}
                        <UCRC urgentStep={urgentStep} setUrgentStep={setUrgentStep} />
                    </div>
                </div>
            </div>
        </div>
    );
}
