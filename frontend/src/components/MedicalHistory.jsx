// import React, { useState, useEffect, useContext } from 'react';
// import add from "../assets/icons/plus-icon.svg";
// import deleteIcon from "../assets/icons/close.svg";
// import axios from 'axios';
// import Context from '../context/AppContext';

// export default function MedicalHistory() {
//   const { mobileNumber } = useContext(Context);
//   const [diseases, setDiseases] = useState([]);
//   const [newDisease, setNewDisease] = useState('');
//   const [hasDisease, setHasDisease] = useState('No');

//   useEffect(() => {
//     const fetchDiseases = async () => {
//       try {
//         const response = await axios.get(`/api/diseases/${mobileNumber}`);
//         if (response.data && response.data.diseases) {
//           const fetchedDiseases = response.data.diseases.map((disease, index) => ({ id: index + 1, title: disease }));
//           setDiseases(fetchedDiseases);
//           setHasDisease(fetchedDiseases.length > 0 ? 'No' : 'Yes');
//         }
//       } catch (error) {
//         console.error('Error fetching diseases:', error);
//       }
//     };

//     fetchDiseases();
//   }, [mobileNumber]);

//   const handleAddDisease = () => {
//     if (newDisease.trim() && hasDisease === 'Yes') {
//       setDiseases([...diseases, { id: diseases.length + 1, title: newDisease }]);
//       setNewDisease('');
//     }
//   };

//   const handleSaveDetails = async () => {
//     try {
//       const diseasesToSave = diseases.map(disease => disease.title);
//       await axios.post('/api/updateDiseases', {
//         mobileNumber,
//         diseases: diseasesToSave
//       });
//       alert('Info saved successfully');
//     } catch (error) {
//       console.error('Error saving diseases:', error);
//       // Provide user feedback, e.g., show an error message
//     }
//   };

//   return (
//     <div className='flex flex-col gap-[32px] bg-white p-[32px] sm:mx-0 mx-[10px] rounded-[16px] sm:min-w-[500px] sm:w-fit'>
//       <div className='flex flex-col gap-[24px]'>
//         <div className='flex flex-col gap-[8px]'>
//           <p className='text-[#8D98A4] text-[12px] font-[500] leading-[116%]'>Any Disease</p>
//           <select 
//             className='outline-none text-[#5B6572] text-[14px] font-[500] leading-[116%] border border-[#EEF0F3] py-[12px] px-[16px] rounded-[8px] w-full'
//             value={hasDisease}
//             onChange={(e) => setHasDisease(e.target.value)}
//           >
//             <option value="No">No</option>
//             <option value="Yes">Yes</option>
//           </select>
//         </div>
//         <div className="flex flex-col sm:w-[443px]">
//           {hasDisease === 'Yes' && (
//             <>
//               <label className='text-[#8D98A4] text-xs w-full font-Montserrat'>Add Disease</label>
//               <div className='flex justify-between items-center w-full rounded-[8px] border border-[#EEF0F3] py-[6px] pl-[16px] pr-[6px] mb-[12px]'>
//                 <input
//                   type='text'
//                   id='disease'
//                   placeholder='abcd'
//                   value={newDisease}
//                   onChange={(e) => setNewDisease(e.target.value)}
//                   className='text-[14px] font-[500] leading-[116%] outline-none bg-transparent'
//                 />
//                 <img src={add} alt="Add disease" className='cursor-pointer bg-primary01 w-[32px] p-[8px] rounded-[8px]' onClick={handleAddDisease} />
//               </div>
//             </>
//           )}
//           <div className='flex flex-wrap gap-[8px] mb-[12px]'>
//             {diseases.map((disease, index) => (
//               <div key={index} className='cursor-pointer flex gap-[4px] items-center w-fit bg-[#F4F4F4]/40 border border-[#EEF0F3] px-[12px] py-[8px] rounded-[8px]'>
//                 <p className='text-[12px] text-[#5B6572] font-[500] leading-[116%]'>{disease.title}</p>
//                 <img className='w-[14px]' src={deleteIcon} alt="Delete disease" onClick={() => setDiseases(diseases.filter((_, i) => i !== index))} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <div>
//         <button className='bg-[#41B079] text-[14px] text-white font-[600] leading-[116%] px-[24px] py-[8px] rounded-[8px]' onClick={handleSaveDetails}>
//           Save Details
//         </button>
//       </div>
//     </div>
//   );
// }









import React, { useState, useEffect, useContext } from 'react';
import add from "../assets/icons/plus-icon.svg";
import deleteIcon from "../assets/icons/close.svg";
import axios from 'axios';
import Context from '../context/AppContext';
import { allDisease } from '../components/allDisease'; // Adjust the import path accordingly
import { toast } from 'react-toastify';

export default function MedicalHistory() {
  const { mobileNumber } = useContext(Context);
  const [diseases, setDiseases] = useState([]);
  const [newDisease, setNewDisease] = useState('');
  const [hasDisease, setHasDisease] = useState('No');
  const [filteredDiseases, setFilteredDiseases] = useState([]);

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const response = await axios.get(`/api/diseases/${mobileNumber}`);
        if (response.data && response.data.diseases) {
          const fetchedDiseases = response.data.diseases.map((disease, index) => ({ id: index + 1, title: disease }));
          setDiseases(fetchedDiseases);
          setHasDisease(fetchedDiseases.length > 0 ? 'No' : 'Yes');
        }
      } catch (error) {
        console.error('Error fetching diseases:', error);
      }
    };

    fetchDiseases();
  }, [mobileNumber]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNewDisease(value);

    if (value.trim()) {
      const suggestions = allDisease.filter(disease =>
        disease.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDiseases(suggestions);
    } else {
      setFilteredDiseases([]);
    }
  };

  const handleAddDisease = (diseaseName) => {
    if (diseaseName.trim() && hasDisease === 'Yes') {
      setDiseases([...diseases, { id: diseases.length + 1, title: diseaseName }]);
      setNewDisease('');
      setFilteredDiseases([]);
    }
  };

  const handleSaveDetails = async () => {
    try {
      const diseasesToSave = diseases.map(disease => disease.title);
      await axios.post('/api/updateDiseases', {
        mobileNumber,
        diseases: diseasesToSave
      });
      // alert('Info saved successfully');
      toast.success('Info saved successfully');
    } catch (error) {
      console.error('Error saving diseases:', error);
      toast.error('Error saving diseases');
    }
  };

  return (
    <div className='flex flex-col gap-[32px] bg-white p-[32px] sm:mx-0 mx-[10px] rounded-[16px] sm:min-w-[500px] sm:w-fit'>
      <div className='flex flex-col gap-[24px]'>
        <div className='flex flex-col gap-[8px]'>
          <p className='text-[#8D98A4] text-[12px] font-[500] leading-[116%]'>Any Disease</p>
          <select 
            className='outline-none text-[#5B6572] text-[14px] font-[500] leading-[116%] border border-[#EEF0F3] py-[12px] px-[16px] rounded-[8px] w-full'
            value={hasDisease}
            onChange={(e) => setHasDisease(e.target.value)}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        <div className="flex flex-col sm:w-[443px]">
          {hasDisease === 'Yes' && (
            <>
              <label className='text-[#8D98A4] text-xs w-full font-Montserrat'>Add Disease</label>
              <div className='flex justify-between items-center w-full rounded-[8px] border border-[#EEF0F3] py-[6px] pl-[16px] pr-[6px] mb-[12px] relative'>
                <input
                  type='text'
                  id='disease'
                  placeholder='Search disease'
                  value={newDisease}
                  onChange={handleInputChange}
                  className='text-[14px] font-[500] leading-[116%] outline-none bg-transparent w-full'
                />
                <img src={add} alt="Add disease" className='cursor-pointer bg-primary01 w-[32px] p-[8px] rounded-[8px]' onClick={() => handleAddDisease(newDisease)} />
                
                {filteredDiseases.length > 0 && (
                  <div className="absolute left-0 right-0 top-[100%] bg-white border border-[#EEF0F3] rounded-[8px] z-10">
                    {filteredDiseases.map((disease, index) => (
                      <div
                        key={index}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                        onClick={() => handleAddDisease(disease.name)}
                      >
                        {disease.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
          <div className='flex flex-wrap gap-[8px] mb-[12px]'>
            {diseases.map((disease, index) => (
              <div key={index} className='cursor-pointer flex gap-[4px] items-center w-fit bg-[#F4F4F4]/40 border border-[#EEF0F3] px-[12px] py-[8px] rounded-[8px]'>
                <p className='text-[12px] text-[#5B6572] font-[500] leading-[116%]'>{disease.title}</p>
                <img className='w-[14px]' src={deleteIcon} alt="Delete disease" onClick={() => setDiseases(diseases.filter((_, i) => i !== index))} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <button className='bg-[#41B079] text-[14px] text-white font-[600] leading-[116%] px-[24px] py-[8px] rounded-[8px]' onClick={handleSaveDetails}>
          Save Details
        </button>
      </div>
    </div>
  );
}
