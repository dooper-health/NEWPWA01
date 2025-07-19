import React, { useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from './PrimaryButton';
import add from '../assets/icons/plus-icon.svg';
import deleteIcon from '../assets/icons/close.svg';
import UploadIcon from '../assets/icons/upload-file-icon.svg';
import axios from 'axios';
import Context from '../context/AppContext';
import { allLabs } from '../components/labData'; // Adjust import path to your project structure
import { toast } from 'react-toastify';


export default function LabModal(props) {
  const navigate = useNavigate();
  const { mobileNumber } = useContext(Context); // Access phone number from context


  const fileRef = useRef();
  const [labs, setLabs] = useState([]);
  const [formData, setFormData] = useState({
    patientName: '',
    patientAge: '',
    patientGender: '',
    startDate: '',
    timeslot: '',
    files: [],
    Lab: '',
    details: '',
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [filteredLabs, setFilteredLabs] = useState([]);


  const handleFileChange = (e) => {
    const files = [...e.target.files];
    setSelectedFiles(files.map(file => file.name));
    setFormData({ ...formData, files });
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });


    if (name === 'Lab') {
      const filtered = allLabs.filter(lab => lab.name.toLowerCase().includes(value.toLowerCase()));
      setFilteredLabs(filtered);
    }
  };


  const handleAddLab = (lab) => {
    setLabs([...labs, lab]);
    setFormData({ ...formData, Lab: '' });
    setFilteredLabs([]);
  };


  const handleRemoveLab = (index) => {
    setLabs(labs.filter((_, i) => i !== index));
  };


  const validateForm = () => {
    const newErrors = {};
    if (!formData.patientName.trim()) newErrors.patientName = 'Patient Name is required';
    if (!formData.patientAge.trim()) newErrors.patientAge = 'Patient Age is required';
    if (!formData.patientGender.trim()) newErrors.patientGender = 'Patient Gender is required';
    if (!formData.startDate.trim()) newErrors.startDate = 'Start Date is required';
    if (!formData.timeslot.trim()) newErrors.timeslot = 'Timeslot is required';
    return newErrors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Debug: Check if mobileNumber is available
    console.log('mobileNumber from context:', mobileNumber);
    console.log('formData.patientName:', formData.patientName);

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }


    const data = new FormData();
    data.append('phoneNumber', mobileNumber);
    labs.forEach((lab, index) => {
      data.append(`Lab[${index}]`, lab.name);
    });
    data.append('patientName', formData.patientName);
    data.append('patientAge', formData.patientAge);
    data.append('patientGender', formData.patientGender);
    data.append('startDate', formData.startDate);
    data.append('timeslot', formData.timeslot);
    data.append('details', formData.details);


    formData.files.forEach(file => {
      data.append('prescription', file);
    });


    try {
      console.log('Starting lab booking process...');
      
      // First API: Create lab booking
      console.log('Calling first API: /api/sd/lab');
      const response = await axios.post('/api/sd/lab', data);
      console.log('First API response:', response.data);
      
      if (response.data.success) {
        console.log('First API successful, calling second API...');
        
        // Second API: Send notification to lab
        try {
          const notificationData = {
            message: `New Lab booking request for ${labs.map(lab => lab.name).join(', ')}`,
            bookingId: response.data.bookingId,
            testName: labs.map(lab => lab.name).join(', '),
            patientMobile: mobileNumber,
            patientName: formData.patientName,
          };
          
          console.log('Sending notification data:', notificationData);
          console.log('Calling second API: /api/notifications-bidirectional/lab');
          
          const notificationResponse = await axios.post('/api/notifications-bidirectional/lab', notificationData);
          console.log('Second API response:', notificationResponse.data);
          console.log('Notification sent to lab successfully');
          
        } catch (notificationError) {
          console.error('Failed to send notification to lab:', notificationError);
          console.error('Error details:', notificationError.response?.data);
          console.error('Error status:', notificationError.response?.status);
          // Don't fail the booking if notification fails
          toast.warning('Booking created but notification failed to send');
        }
        
        toast.success(`Lab booking sent successfully! Booking ID: ${response.data.bookingId}`);
        navigate('/bookings');
        props.onClose(false);
      } else {
        console.error('First API failed:', response.data);
        toast.error('Failed to create lab booking');
      }
    } catch (error) {
      console.error('Error in lab booking process:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Failed to create lab booking. Please try again.');
      }
    }
  };


  const timeslots = [
    "8:00 AM - 9:00 AM", "9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM", "1:00 PM - 2:00 PM", "2:00 PM - 3:00 PM", "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM", "5:00 PM - 6:00 PM", "6:00 PM - 7:00 PM", "7:00 PM - 8:00 PM",
    "8:00 PM - 9:00 PM", "9:00 PM - 10:00 PM", "10:00 PM - 11:00 PM", "11:00 PM - 12:00 AM",
    "12:00 AM - 1:00 AM", "1:00 AM - 2:00 AM", "2:00 AM - 3:00 AM", "3:00 AM - 4:00 AM",
    "4:00 AM - 5:00 AM", "5:00 AM - 6:00 AM", "6:00 AM - 7:00 AM", "7:00 AM - 8:00 AM"
  ];


  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/30" onClick={() => props.onClose(false)}></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] bg-white sm:w-[800px] w-[300px] sm:h-[690px] h-[700px] rounded-[8px] sm:p-[32px] p-[20px] overflow-auto overflow-x-hidden">
        <h5 className="sm:text-[28px] text-[18px] text-[#1A1C1F] font-600 not-italic leading-4 sm:pb-[32px] pb-[10px] font-Montserrat font-semibold">
          Lab Services
        </h5>
        <form onSubmit={handleSubmit}>
        <div className="flex sm:flex-row flex-col space-x-5">
        <div className="flex flex-col sm:w-[443px] w-[250px]">
              <label className='text-[#8D98A4] text-xs w-full font-Montserrat'>Enter Lab</label>
              <div className='flex justify-between items-center w-full rounded-[8px] border border-[#EEF0F3] py-[6px] pl-[16px] pr-[6px] mb-[12px]'>
                <input
                  type='text'
                  id='Lab'
                  placeholder='Lab'
                  className='text-[14px] font-[500] leading-[116%] outline-none bg-transparent'
                  name='Lab'
                  value={formData.Lab}
                  onChange={handleInputChange}
                />
                <img
                  src={add}
                  className='cursor-pointer bg-primary01 w-[32px] p-[8px] rounded-[8px]'
                  onClick={() => handleAddLab({ name: formData.Lab })}
                  alt="Add Lab"
                />
              </div>


              {/* Display filtered lab suggestions */}
              {filteredLabs.length > 0 && (
                // <div className='bg-white border border-[#EEF0F3] rounded-[8px] p-[8px]'>
                //   {filteredLabs.map((lab, index) => (
                //     <div
                //       key={index}
                //       className='cursor-pointer p-[8px] hover:bg-gray-200'
                //       onClick={() => handleAddLab(lab)}
                //     >
                //       <p className='text-[14px] font-[500] leading-[116%]'>{lab.name}  </p>
                //        <p className='text-xs text-[#3fdf87] m-1 '> ₹{lab.price} </p>
                //        <p className='text-xs text-[#8D98A4]'>{lab.description}</p>
                       
                //     </div>
                //   ))}
                // </div>
                <div className='bg-white border border-[#EEF0F3] rounded-[8px] p-[8px] max-h-[300px] overflow-auto'>
  {filteredLabs.map((lab, index) => (
    <div
      key={index}
      className='cursor-pointer p-[8px] hover:bg-gray-200'
      onClick={() => handleAddLab(lab)}
    >
      <p className='text-[14px] font-[500] leading-[116%]'>{lab.name}</p>
      <p className='text-xs text-[#3fdf87] m-1'>₹{lab.price}</p>
      <p className='text-xs text-[#8D98A4]'>{lab.description}</p>
    </div>
  ))}
</div>


              )}


              <div className='grid sm:grid-cols-3 grid-cols-2 gap-[8px] mb-[12px]'>
                {labs.map((lab, index) => (
                  <div
                    key={index}
                    className='cursor-pointer flex gap-[4px] items-center w-fit bg-[#F4F4F4]/40 border border-[#EEF0F3] sm:px-[12px] px-[10px] sm:py-[8px] py-[6px] rounded-[8px]'
                  >
                    <p className='text-[12px] text-[#5B6572] font-[500] leading-[116%]'>{lab.name}</p>
                    <img
                      className='w-[14px]'
                      src={deleteIcon}
                      alt="Delete Lab"
                      onClick={() => handleRemoveLab(index)}
                    />
                  </div>
                ))}
              </div>


              <label className='text-[#8D98A4] text-xs w-full font-Montserrat'>Patient Name</label>
              <input
                type='text'
                name='patientName'
                placeholder='Enter Patient Name'
                className='border border-[#EEF0F3] rounded-[8px] p-[12px] mb-[12px]'
                value={formData.patientName}
                onChange={handleInputChange}
              />
              {errors.patientName && <p className='text-red-500 text-xs'>{errors.patientName}</p>}


              <label className='text-[#8D98A4] text-xs w-full font-Montserrat'>Patient Age</label>
              <input
                type='text'
                name='patientAge'
                placeholder='Enter Patient Age'
                className='border border-[#EEF0F3] rounded-[8px] p-[12px] mb-[12px]'
                value={formData.patientAge}
                onChange={handleInputChange}
              />
              {errors.patientAge && <p className='text-red-500 text-xs'>{errors.patientAge}</p>}


              <div className="flex flex-col w-full gap-[8px]">
                <label className="text-[#8D98A4] text-xs font-Montserrat">Gender</label>
                <div className="flex items-center border border-[#EEF0F3] px-[16px] py-[12px] rounded">
                  <select
                    className="text-[14px] text-[#5B6572] font-[500] leading-[116%] w-full outline-none"
                    name="patientGender"
                    value={formData.patientGender}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                {errors.patientGender && <p className="text-red-500 text-xs h-10 -mt-1">{errors.patientGender}</p>}
              </div>


              <label className='text-[#8D98A4] text-xs w-full font-Montserrat'>Start Date</label>
              <input
                type='date'
                name='startDate'
                className='border border-[#EEF0F3] rounded-[8px] p-[12px] mb-[12px]'
                value={formData.startDate}
                onChange={handleInputChange}
              />
              {errors.startDate && <p className='text-red-500 text-xs'>{errors.startDate}</p>}


              <label className='text-[#8D98A4] text-xs w-full font-Montserrat'>Timeslot</label>
              <select
                name='timeslot'
                className='border border-[#EEF0F3] rounded-[8px] p-[12px] mb-[12px]'
                value={formData.timeslot}
                onChange={handleInputChange}
              >
                <option value=''>Select Timeslot</option>
                {timeslots.map((slot, index) => (
                  <option key={index} value={slot}>{slot}</option>
                ))}
              </select>
              {errors.timeslot && <p className='text-red-500 text-xs'>{errors.timeslot}</p>}


              <label className='text-[#8D98A4] text-xs w-full font-Montserrat'>Details</label>
              <textarea
                name='details'
                placeholder='Additional details'
                className='border border-[#EEF0F3] rounded-[8px] p-[12px] mb-[12px]'
                value={formData.details}
                onChange={handleInputChange}
              ></textarea>


<div className="flex flex-col w-full gap-[8px]">
            <label className="text-[#8D98A4] text-xs font-Montserrat">Upload Prescription</label>
            <div className="border border-[#EEF0F3] py-[6px] pl-[16px] pr-[6px] mb-[12px] rounded-[8px]">
              <div className="flex justify-between items-center cursor-pointer">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*, .pdf"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="flex items-center gap-[8px]" onClick={() => fileRef.current.click()}>
                  <img src={UploadIcon} alt="Upload" />
                  <p className="text-[14px] text-[#5B6572] font-[500] leading-[116%]">Click to upload</p>
                </div>
              </div>
              {selectedFiles.length > 0 && (
                <ul className="mt-2">
                  {selectedFiles.map((fileName, index) => (
                    <li key={index} className="text-[12px] text-[#5B6572] font-[500] leading-[116%]">{fileName}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>


         
            </div>
            <div className="flex sm:justify-between flex-col sm:pl-[20px] pl-0 sm:pr-[20px] pr-0 sm:mt-0 mt-[8px] sm:border-l-2">
          <div className="flex flex-row justify-between sm:pb-[16px] pb-[8px] sm:border-b-2">
              <p className="text-[14px] text-[#8D98A4] font-Montserrat">
                Home Sample Collection Charge
              </p>
              <div className="flex sm:items-end">
                <p className="text-[14px] font-[500] font-Montserrat">Rs. 100</p>
              </div>
            </div>
            <div className="w-[221px] h-[120px] flex flex-col sm:justify-end mt-10">
            <p className="text-[#E40443] text-[12px] text-400">
                lab test price to be sent as Quotation after pharmacy accepts. DRA Charge is Mandatory.
              </p>
              <div className="sm:ml-[0px] ml-[65px] mt-3   ">
                <PrimaryButton title="Request Quotation" action={handleSubmit} />
               
              </div>
            </div>
          </div>
           
            </div>
           
        </form>
      </div>
    </div>
  );
}


