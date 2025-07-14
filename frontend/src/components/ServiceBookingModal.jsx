


// import React, { useState, useRef, useContext } from "react";
// import axios from 'axios';
// import PrimaryButton from '../components/PrimaryButton';
// import add from '../assets/icons/plus-icon.svg';
// import deleteIcon from '../assets/icons/close.svg';
// import UploadIcon from '../assets/icons/upload-file-icon.svg';
// import Context from '../context/AppContext';
// import { allSymptoms } from "../components/symptomsData";

// export default function ServiceBookingModal(props) {
//   const { mobileNumber } = useContext(Context);
//   const fileRef = useRef();
//   const [symptoms, setSymptoms] = useState('');
//   const [filteredSymptoms, setFilteredSymptoms] = useState([]);
//   const [selectedSymptoms, setSelectedSymptoms] = useState([]);
//   const [patientName, setPatientName] = useState('');
//   const [patientsNote, setPatientsNote] = useState('');
//   const [videoFile, setVideoFile] = useState(null);

//   const handleFileChange = (event) => {
//     setVideoFile(event.target.files[0]);
//   };

//   const handleAddSymptom = () => {
//     if (symptoms && !selectedSymptoms.includes(symptoms)) {
//       setSelectedSymptoms([...selectedSymptoms, symptoms]);
//       setSymptoms('');
//     }
//   };

//   const handleDeleteSymptom = (symptom) => {
//     setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
//   };

//   const handleSubmit = async () => {
//     try {
//       // Prepare the form data
//       const formData = new FormData();
//       formData.append('file', videoFile);
//       formData.append('symptoms', JSON.stringify(selectedSymptoms));
//       formData.append('patientName', patientName);
//       formData.append('patientsNote', patientsNote);
//       formData.append('mobileNumber', mobileNumber); // Include mobileNumber in the request body

//       // Send the request to the API
//       await axios.post('/api/sd2/urgent', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       props.action(true);
//       props.onClose(false);
//     } catch (error) {
//       console.error('Error submitting the form', error);
//     }
//   };

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setSymptoms(value);
//     if (value) {
//       const suggestions = allSymptoms.filter(symptom =>
//         symptom.name.toLowerCase().includes(value.toLowerCase())
//       );
//       setFilteredSymptoms(suggestions);
//     } else {
//       setFilteredSymptoms([]);
//     }
//   };

//   const handleSelectSuggestion = (symptom) => {
//     setSymptoms(symptom.name);
//     setFilteredSymptoms([]);
//   };




//   return (
//     <div className='fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50'>
//       <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/30' onClick={() => { props.onClose(false) }}></div>
//       <div className='fixed top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] flex flex-col gap-[32px] font-Montserrat bg-white sm:w-[585px] w-[285px] rounded-[8px] p-[32px]'>
//         <h5 className='text-[22px] sm:text:[28px] text-[#1A1C1F] font-[600] font-bold leading-[38px]'>Book {props.bookingType} Case</h5>
//         <div className='flex flex-col items-start'>
//           <div className='flex flex-col gap-[24px] w-full'>
//           <div>
//               <label className='text-[#8D98A4] text-xs w-full font-Montserrat'>Symptoms</label>
//               <div className='flex flex-col gap-[12px] w-full'>
//                 <div className='flex justify-between items-center rounded-[8px] border border-[#EEF0F3] py-[6px] pl-[16px] pr-[6px]'>
//                   <input
//                     type='text'
//                     value={symptoms}
//                     onChange={handleChange}
//                     placeholder='Add symptoms'
//                     className='text-[14px] font-[500] leading-[116%] outline-none bg-transparent'
//                   />
//                   <img
//                     src={add}
//                     className='cursor-pointer bg-primary01 w-[32px] p-[8px] rounded-[8px] -ml-[40px]'
//                     onClick={handleAddSymptom}
//                   />
//                 </div>
//                 {filteredSymptoms.length > 0 && (
//                  <div className='absolute bg-white border border-[#EEF0F3] rounded mt-1 w-[220px] sm:w-[450px] max-h-[300px] overflow-auto z-10'>
//                  {filteredSymptoms.map(symptom => (
//                    <div
//                      key={symptom.id}
//                      className='cursor-pointer px-4 py-2 hover:bg-[#F4F4F4]'
//                      onClick={() => handleSelectSuggestion(symptom)}
//                    >
//                      <p className='text-[14px] font-[500] leading-[116%]'>{symptom.name}</p>
//                      <p className='text-xs text-[#3fdf87] m-1 '>{symptom.price}</p>
//                      <p className='text-xs text-[#8D98A4]'>{symptom.description}</p>
//                    </div>
//                  ))}
//                </div>
//                 )}
//                 <div className='grid grid-cols-3 sm:grid-cols-4 gap-[8px] mt-[12px]'>
//                   {selectedSymptoms.map((symptom, index) => (
//                     <div key={index} className='cursor-pointer flex gap-[4px] items-center w-fit bg-[#F4F4F4]/40 border border-[#EEF0F3] px-[12px] py-[8px] rounded-[8px]'>
//                       <p className='text-[12px] text-[#5B6572] font-[500] leading-[116%]'>{symptom}</p>
//                       <img className='w-[14px]' src={deleteIcon} onClick={() => handleDeleteSymptom(symptom)} />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div className='flex flex-col gap-[8px]'>
//               <label className='text-[#8D98A4] text-xs font-Montserrat'>Select Patient</label>
//               <div className='flex items-center border border-[#EEF0F3] px-[16px] py-[12px] rounded'>
//                 <input type='text' value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder='Patient Name' className='text-[14px] text-[#5B6572] font-[500] leading-[116%] w-full outline-none' />
//               </div>
//             </div>
//             <div className='flex flex-col gap-[8px]'>
//               <label className='text-[#8D98A4] text-xs font-Montserrat'>Patients Note*</label>
//               <div className='flex border border-[#EEF0F3] rounded'>
//                 <textarea value={patientsNote} onChange={(e) => setPatientsNote(e.target.value)} placeholder='Add description Here' className='w-full min-h-[88px] px-[20px] py-[16px] rounded-none focus:outline-none'></textarea>
//               </div>
//             </div>
//             <div className='flex flex-col gap-[8px]'>
//               <label className='text-[#8D98A4] text-xs font-Montserrat'>Video Note*</label>
//               <div
//                 onClick={() => { fileRef.current.click() }}
//                 className="cursor-pointer flex flex-col justify-center items-center border border-[#EEF0F3] px-[20px] py-[16px] rounded-[8px]">
//                 <input
//                   type="file"
//                   ref={fileRef}
//                   style={{ display: "none" }}
//                   onChange={handleFileChange}
//                 />
//                 <img src={UploadIcon} alt="" className="mx-auto" />
//                 <p className='text-[#5B6572] text-[14px] font-[500] leading-[116%]'>Upload</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className=''> 
//           <PrimaryButton title="Confirm Booking" action={handleSubmit} />
//         </div>

//       </div>
//     </div>
//   );
// }


import React, { useState, useRef, useContext } from "react";
import axios from 'axios';
import PrimaryButton from '../components/PrimaryButton';
import add from '../assets/icons/plus-icon.svg';
import deleteIcon from '../assets/icons/close.svg';
import UploadIcon from '../assets/icons/upload-file-icon.svg';
import Context from '../context/AppContext';
import { allSymptoms } from "../components/symptomsData";
import { toast } from "react-toastify";
// import Context from '../context/AppContext';


export default function ServiceBookingModal(props) {
  // const { mobileNumber } = useContext(Context);
  const { mobileNumber } = useContext(Context); // Access phone number from context

  const fileRef = useRef();
  const [symptoms, setSymptoms] = useState('');
  const [filteredSymptoms, setFilteredSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [patientName, setPatientName] = useState('');
  const [patientsNote, setPatientsNote] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleFileChange = (event) => {
    setVideoFile(event.target.files[0]);
  };

  const handleAddSymptom = () => {
    if (symptoms && !selectedSymptoms.includes(symptoms)) {
      setSelectedSymptoms([...selectedSymptoms, symptoms]);
      setSymptoms('');
    }
  };

  const handleDeleteSymptom = (symptom) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('moibleNumber', mobileNumber);
      formData.append('file', videoFile);
      formData.append('symptoms', JSON.stringify(selectedSymptoms));
      formData.append('patientName', patientName);
      formData.append('patientsNote', patientsNote);
      // formData.append('mobileNumber', mobileNumber);
      const token = localStorage.getItem("token");
      console.log('Token:', token);

      await axios.post('/api/sd2/urgent', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      toast.success("Urgent Booking sent successfully");

      props.action(true);
      props.onClose(false);
    } catch (error) {
      console.error('Error submitting the form', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSymptoms(value);
    if (value) {
      const suggestions = allSymptoms.filter(symptom =>
        symptom.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSymptoms(suggestions);
    } else {
      setFilteredSymptoms([]);
    }
  };

  const handleSelectSuggestion = async (symptom) => {
    if (symptom.name && !selectedSymptoms.includes(symptom.name)) {
      setSelectedSymptoms([...selectedSymptoms, symptom.name]);
      setSymptoms(''); // Clear the input
      setFilteredSymptoms([]); // Clear the suggestions
      // await handleSubmit(); // Submit the form directly
    }
  };

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50'>
      <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/30' onClick={() => { props.onClose(false) }}></div>
      <div className='fixed top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] flex flex-col gap-[32px] font-Montserrat bg-white sm:w-[585px] w-[285px] rounded-[8px] p-[32px]'>
        <h5 className='text-[22px] sm:text:[28px] text-[#1A1C1F] font-[600] font-bold leading-[38px]'>Book {props.bookingType} Case</h5>
        <div className='flex flex-col items-start'>
          <div className='flex flex-col gap-[24px] w-full'>
            <div>
              <label className='text-[#8D98A4] text-xs w-full font-Montserrat'>Symptoms</label>
              <div className='flex flex-col gap-[12px] w-full'>
                <div className='flex justify-between items-center rounded-[8px] border border-[#EEF0F3] py-[6px] pl-[16px] pr-[6px]'>
                  <input
                    type='text'
                    value={symptoms}
                    onChange={handleChange}
                    placeholder='Add symptoms'
                    className='text-[14px] font-[500] leading-[116%] outline-none bg-transparent'
                  />
                  <img
                    src={add}
                    className='cursor-pointer bg-primary01 w-[32px] p-[8px] rounded-[8px] -ml-[40px]'
                    onClick={handleAddSymptom}
                  />
                </div>
                {filteredSymptoms.length > 0 && (
                  <div className='absolute bg-white border border-[#EEF0F3] rounded mt-1 w-[220px] sm:w-[450px] max-h-[300px] overflow-auto z-10'>
                    {filteredSymptoms.map(symptom => (
                      <div
                        key={symptom.id}
                        className='cursor-pointer px-4 py-2 hover:bg-[#F4F4F4]'
                        onClick={() => handleSelectSuggestion(symptom)}
                      >
                        <p className='text-[14px] font-[500] leading-[116%]'>{symptom.name}</p>
                        <p className='text-xs text-[#3fdf87] m-1 '>{symptom.price}</p>
                        <p className='text-xs text-[#8D98A4]'>{symptom.description}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div className='grid grid-cols-3 sm:grid-cols-4 gap-[8px] mt-[12px]'>
                  {selectedSymptoms.map((symptom, index) => (
                    <div key={index} className='cursor-pointer flex gap-[4px] items-center w-fit bg-[#F4F4F4]/40 border border-[#EEF0F3] px-[12px] py-[8px] rounded-[8px]'>
                      <p className='text-[12px] text-[#5B6572] font-[500] leading-[116%]'>{symptom}</p>
                      <img className='w-[14px]' src={deleteIcon} onClick={() => handleDeleteSymptom(symptom)} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-[8px]'>
              <label className='text-[#8D98A4] text-xs font-Montserrat'>Select Patient</label>
              <div className='flex items-center border border-[#EEF0F3] px-[16px] py-[12px] rounded'>
                <input type='text' value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder='Patient Name' className='text-[14px] text-[#5B6572] font-[500] leading-[116%] w-full outline-none' />
              </div>
            </div>
            <div className='flex flex-col gap-[8px]'>
              <label className='text-[#8D98A4] text-xs font-Montserrat'>Patients Note*</label>
              <div className='flex border border-[#EEF0F3] rounded'>
                <textarea value={patientsNote} onChange={(e) => setPatientsNote(e.target.value)} placeholder='Add description Here' className='w-full min-h-[88px] px-[20px] py-[16px] rounded-none focus:outline-none'></textarea>
              </div>
            </div>
            {/* <div className='flex flex-col gap-[8px]'>
              <label className='text-[#8D98A4] text-xs font-Montserrat'>Video Note*</label>
              <div
                onClick={() => { fileRef.current.click() }}
                className="cursor-pointer flex flex-col justify-center items-center border border-[#EEF0F3] px-[20px] py-[16px] rounded-[8px]">
                <input
                  type="file"
                  ref={fileRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <img src={UploadIcon} alt="" className="mx-auto" />
                <p className='text-[#5B6572] text-[14px] font-[500] leading-[116%]'>Upload</p>
              </div>
            </div> */}
            <div className='flex flex-col gap-[8px]'>
              <label className='text-[#8D98A4] text-xs font-Montserrat'>Video Note*</label>
              <div
                onClick={() => { fileRef.current.click() }}
                className="cursor-pointer flex flex-col justify-center items-center border border-[#EEF0F3] px-[20px] py-[16px] rounded-[8px]">
                <input
                  type="file"
                  ref={fileRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                {videoFile ? (
                  <p className='text-[#5B6572] text-[14px] font-[500] leading-[116%]'>{videoFile.name}</p>
                ) : (
                  <>
                    <img src={UploadIcon} alt="" className="mx-auto" />
                    <p className='text-[#5B6572] text-[14px] font-[500] leading-[116%]'>Upload</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-center'>
          {loading ? (
            <div title="Creating Booking..." className="flex items-center justify-center font-Montserrat font-semibold text-sm text-white leading-[116%] bg-primary01 sm:px-4 px-8 mx-7 py-3 rounded-lg w-full sm:ml-0 ml-0 mt-2 mb-3 space-x-2">
              <div className='bg-blue-600 animate-spin h-5 w-5 border-4 border-t-4 border-blue-500 rounded-full' />
              <span>Creating Booking...</span>
            </div>
          ) : (
            <PrimaryButton
              title="Confirm Booking"
              action={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
}


