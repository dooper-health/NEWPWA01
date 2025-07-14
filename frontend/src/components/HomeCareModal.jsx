

import React, { useState, useContext } from "react";
import PrimaryButton from "./PrimaryButton";
import date from "../assets/icons/calender-icon.svg";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Context from '../context/AppContext';

export default function HomeCareModal(props) {
  const { mobileNumber } = useContext(Context);
  const [startDate, setStartDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [prescription, setPrescription] = useState(null);

  const [errors, setErrors] = useState({});


  const hours = [
    { label: "Daily Basis", price: "Rs. 1499" },
    { label: "Weekly Basis", price: "Rs. 6999" },
    { label: "Monthly Basis", price: "Rs. 29999" },
  ];
  
  const careTypeMapping = {
    "Daily Basis": "DailyBasis",
    "Weekly Basis": "WeeklyBasis",
    "Monthly Basis": "MonthlyBasis"
  };
  
  const handleFileChange = (e) => {
    setPrescription(e.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!patientName) newErrors.patientName = "Patient name is required";
    if (!selectedHour) newErrors.selectedHour = "Care type is required";
    if (!startDate) newErrors.startDate = "Start date is required";
    if (!timeSlot) newErrors.timeSlot = "Time slot is required";
    if (!patientGender) newErrors.patientGender = "Patient gender is required";
    // if (!patientAge) newErrors.patientAge = "Patient age is required";
    if (!prescription) newErrors.prescription = "Prescription is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const careType = careTypeMapping[selectedHour];

    const formData = new FormData();
    formData.append("patientName", patientName);
    formData.append("careType", careType);
    formData.append("startDate", startDate);
    formData.append("timeSlot", timeSlot);
    formData.append('phoneNumber', mobileNumber); // Rename 'mobileNumber' to 'phoneNumber'
    formData.append("patientGender", patientGender);
    // formData.append("patientAge", patientAge);
    formData.append("prescription", prescription);

    try {
      const response = await axios.post("/api/sd/home", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(response.data);
      alert("Booking request sent successfully");
      props.onClose(false);
    } catch (error) {
      console.error(error);
      alert("Error sending booking request");
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
      <div
        className="fixed top-0 left-0 right-0 bottom-0 bg-black/30"
        onClick={() => {
          props.onClose(false);
        }}
      ></div>
      <div className="relative bg-white sm:w-[1000px] w-[300px] rounded-[8px] p-[32px] max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col items-center">
          <div className="flex flex-col gap-[24px] sm:items-start items-center">
            <h4 className="text-[28px] text-[#1A1C1F] mr-25 font-600 leading-9 pb-[8px] font-Montserrat font-semibold">
              Nursing Service
            </h4>
   

            {/* <div className="overflow-y-hidden">
  <div className="flex justify-between gap-[8px] max-w-[700px] overflow-x-auto">
    {hours.map((hour, index) => (
      <div
        key={index}
        className={`sm:w-[300px] w-[80px] bg-[#F4F4F4] sm:p-[16px] p-[8px] rounded-[12px] sm:h-[100px] h-[50px] cursor-pointer ${selectedHour === hour.label ? "border-2 border-blue-500" : ""}`}
        onClick={() => setSelectedHour(hour.label)}
      >
        <div className="flex flex-col items-center">
          <p className="text-[#1A1C1F] font-[700] sm:text-[14px] text-[2px] font-Montserrat">
            {hour.label}
          </p>
          <p className="text-[#8D98A4] font-[500] font-Montserrat sm:text-[14px] text-[8px]">
            {hour.price}
          </p>
        </div>
      </div>
    ))}
  </div>
</div> */}


      <div className="overflow-y-hidden ">
  <div className="flex flex-wrap md:flex-nowrap justify-between gap-[8px] max-w-[700px] overflow-x-auto   ">
    {hours.map((hour, index) => (
      <div
        key={index}
        className={`sm:w-[300px] w-[250px] bg-[#F4F4F4] sm:p-[16px] p-[8px] rounded-[12px] sm:h-[100px] h-[70px] cursor-pointer flex justify-between items-center flex-row flex-col   ${selectedHour === hour.label ? "border-2 border-blue-500" : ""}`}
        onClick={() => setSelectedHour(hour.label)}
      >
        <p className="text-[#1A1C1F] font-[700] sm:text-[20px] text-[16px] font-Montserrat">
          {hour.label}
        </p>
        <p className="text-[#8D98A4] font-[500] font-Montserrat sm:text-[16px] text-[12px]  ">
          {hour.price}
        </p>
      </div>
    ))}
  </div>
</div>

{selectedHour && (
  <div className="flex flex-col sm:w-full w-[250px] gap-[8px]">
    <div className="text-[#8D98A4] text-xs font-Montserrat">
      Selected Care Type
    </div>
    <div className="flex items-center border border-[#EEF0F3] px-[16px] py-[12px] rounded">
      <input
        value={selectedHour}
        readOnly
        className="text-[14px] text-[#5B6572] font-[500] leading-[116%] w-full outline-none"
      />
    </div>
  </div>
)}

            {selectedHour && (
  <div className="flex flex-col sm:w-full w-[250px] gap-[8px]">
    <div className="text-[#8D98A4] text-xs font-Montserrat">
      Time Slot
    </div>
    <div className="flex items-center border border-[#EEF0F3] px-[16px] py-[12px] rounded">
      <select
        value={timeSlot}
        onChange={(e) => setTimeSlot(e.target.value)}
        className="text-[14px] text-[#5B6572] font-[500] leading-[116%] w-full outline-none"
      >
        <option value="" disabled>Select a time slot</option>
        <option value="8 Hours">8 Hours</option>
        <option value="12 Hours">12 Hours</option>
        <option value="24 Hours">24 Hours</option>
      </select>
    </div>
    {errors.timeSlot && <p className="text-red-500 text-xs">{errors.timeSlot}</p>}
  </div>
)}

            <div className="flex flex-col sm:w-full w-[250px] gap-[8px]">
              <div className="text-[#8D98A4] text-xs font-Montserrat">
                Patient Name
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="text-[14px] text-[#5B6572] font-[500] leading-[116%] w-full outline-none border border-[#EEF0F3] px-[16px] py-[12px] rounded"
                  placeholder="Enter patient name"
                />
                {errors.patientName && <p className="text-red-500 text-xs">{errors.patientName}</p>}
              </div>
            </div>
            <div className="flex flex-col sm:w-full w-[250px] gap-[8px]">
              <div className="text-[#8D98A4] text-xs font-Montserrat">
                Gender
              </div>
              <div className="flex flex-col">
                <select
                  value={patientGender}
                  onChange={(e) => setPatientGender(e.target.value)}
                  className="text-[14px] text-[#5B6572] font-[500] leading-[116%] w-full outline-none border border-[#EEF0F3] px-[16px] py-[12px] rounded"
                >
                  <option value="" disabled>Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.patientGender && <p className="text-red-500 text-xs">{errors.patientGender}</p>}
              </div>
            </div>
            
            <div className="flex flex-col sm:w-full w-[250px] gap-[8px]">
              <div className="text-[#8D98A4] text-xs font-Montserrat">
                Start Date
              </div>
              <div className="flex items-center border border-[#EEF0F3] px-[16px] py-[12px] rounded">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  placeholderText="Select date"
                  className="text-[14px] text-[#5B6572] font-[500] leading-[116%] w-full outline-none"
                  showPopperArrow={false}
                  onFocus={() => setShowCalendar(true)}
                  onBlur={() => setShowCalendar(false)}
                  open={showCalendar}
                />
                <img src={date} alt="calendar" className="ml-2" />
              </div>
              {errors.startDate && <p className="text-red-500 text-xs">{errors.startDate}</p>}
            </div>
            <div className="flex flex-col sm:w-full w-[250px] gap-[8px]">
              <div className="text-[#8D98A4] text-xs font-Montserrat">
                Upload Prescription
              </div>
              <div className="flex flex-col">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="text-[14px] text-[#5B6572] font-[500] leading-[116%] w-full outline-none border border-[#EEF0F3] px-[16px] py-[12px] rounded"
                />
                {errors.prescription && <p className="text-red-500 text-xs">{errors.prescription}</p>}
              </div>
            </div>
          </div>
           <div className="sm:mx-auto -ml-[50px] -mr-12 ">
              <PrimaryButton
                title="Send Request"
                action={handleSubmit}
                className="w-[197px]"
              />
           </div>
        </div>
      </div>
    </div>
  );
}


