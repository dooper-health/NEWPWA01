

// import React, { useContext, useEffect, useState } from 'react';
// import Dcs from '../assets/images/Doctor-sample-1.svg';
// import editIcon from '../assets/icons/edit-pencil-2.svg';
// import deleteIcon from '../assets/icons/delete-icon.svg';
// import SecondaryButton from './SecondaryButton';
// import axios from 'axios';
// import Context from '../context/AppContext';

// export default function FamilyMembers() {
//   const { mobileNumber } = useContext(Context);
//   const [familyMembers, setFamilyMembers] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentMember, setCurrentMember] = useState({ name: '', relation: '', phone: '', mobileNumber });

//   const fetchFamilyMembers = async () => {
//     try {
//       const response = await axios.get(`/api/familyMembers/${mobileNumber}`);
//       setFamilyMembers(response.data);
//     } catch (error) {
//       console.error('Error fetching family members:', error);
//     }
//   };
  
//   useEffect(() => {
//     fetchFamilyMembers();
//   }, [mobileNumber]);

//   const handleAddClick = () => {
//     setIsEditing(true);
//     setCurrentMember({ name: '', relation: '', phone: '', mobileNumber });
//   };

//   const handleEditClick = (member) => {
//     setIsEditing(true);
//     setCurrentMember(member);
//   };

//   const handleDeleteClick = async (id) => {
//     try {
//       await axios.delete(`/api/familyMembers/${id}`);
//       setFamilyMembers(familyMembers.filter(member => member._id !== id));
//     } catch (error) {
//       console.error('Error deleting family member:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentMember({ ...currentMember, [name]: value });
//   };

//   const handleSave = async () => {
//     try {
//       let response;
//       if (currentMember._id) {
//         response = await axios.put(`/api/familyMembers/${currentMember._id}`, currentMember);
//         setFamilyMembers(familyMembers.map(member => member._id === currentMember._id ? response.data : member));
//       } else {
//         response = await axios.post('/api/familyMembers', currentMember);
//         setFamilyMembers([...familyMembers, response.data]);
//       }
//       setIsEditing(false);
//       setCurrentMember({ name: '', relation: '', phone: '', mobileNumber });
//       // Call fetchFamilyMembers again to update state
//       await fetchFamilyMembers(); 
//     } catch (error) {
//       console.error('Error saving family member:', error);
//     }
//   };

//   return (
//     <div className='flex flex-col gap-[32px] bg-white p-[32px] sm:mx-0 mx-[10px] rounded-[16px] sm:min-w-[588px] w-[350px] sm:w-fit'>
//       <div className='flex flex-col gap-[24px]'>
//         <div className='sm:mx-0 sm:-ml-[100px] md:ml-[30px] lg:ml-[50px] xl:ml-[70px] justify-center'>
//           <SecondaryButton title="+ Add Family Members" action={handleAddClick} />
//         </div>
//         {isEditing && (
//           <div className='flex flex-col gap-[16px] bg-[#f8f8f8] p-[20px] rounded-[8px]'>
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               value={currentMember.name}
//               onChange={handleChange}
//               className='outline-none text-[#5B6572] text-[14px] font-[500] leading-[116%] border-b border-[#EEF0F3] p-[8px]'
//             />
//             <input
//               type="text"
//               name="relation"
//               placeholder="Relation"
//               value={currentMember.relation}
//               onChange={handleChange}
//               className='outline-none text-[#5B6572] text-[14px] font-[500] leading-[116%] border-b border-[#EEF0F3] p-[8px]'
//             />
//             <input
//               type="text"
//               name="phone"
//               placeholder="Phone"
//               value={currentMember.phone}
//               onChange={handleChange}
//               className='outline-none text-[#5B6572] text-[14px] font-[500] leading-[116%] border-b border-[#EEF0F3] p-[8px]'
//             />
//             <div className='sm:mx-0 -ml-[67px] sm:-ml-[100px] md:ml-[30px] lg:ml-[50px] xl:ml-[70px] justify-center'>
//               <SecondaryButton title="Save" action={handleSave} />
//             </div>
//           </div>
//         )}
//         {familyMembers.map(member => (
//           <div key={member._id} className='flex items-center gap-[8px] p-[20px] border-b border-[#EEF0F3] sm:mx-0 -ml-[20px]'>
//             <img src={Dcs} alt="icon" className='sm:w-[88px] w-[66px] h-[88px] rounded-[50%]'/>
//             <div className='w-full flex flex-col gap-[4px]'>
//               <h1 className='text-[16px] font-[600] leading-[110%]'>{member.name}</h1>
//               <p className='text-primary01 text-[12px] font-[500] leading-[116%]'>{member.relation}</p>
//               <p className='text-[#5B6572] text-[10px] font-[500] leading-[116%]'>{member.phone}</p>
//             </div>
//             <div className='flex gap-[16px]'>
//               <img className="p-[6px] rounded-[4px] bg-[#E5FFF2]" src={editIcon} alt="edit" onClick={() => handleEditClick(member)} />
//               <img className="p-[6px] rounded-[4px] bg-[#FFE9E6]" src={deleteIcon} alt="delete" onClick={() => handleDeleteClick(member._id)} />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import React, { useContext, useEffect, useState } from 'react';
import Dcs from '../assets/images/Doctor-sample-1.svg';
import editIcon from '../assets/icons/edit-pencil-2.svg';
import deleteIcon from '../assets/icons/delete-icon.svg';
import SecondaryButton from './SecondaryButton';
import axios from 'axios';
import Context from '../context/AppContext';

export default function FamilyMembers() {
  const { mobileNumber } = useContext(Context);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState({ name: '', relation: '', phone: '', mobileNumber });

  const fetchFamilyMembers = async () => {
    try {
      const response = await axios.get(`/api/familyMembers/${mobileNumber}`);
      if (Array.isArray(response.data)) {
        setFamilyMembers(response.data);
      } else {
        setFamilyMembers([]); // Ensure it's an array
      }
    } catch (error) {
      console.error('Error fetching family members:', error);
      setFamilyMembers([]); // Handle error by setting it to an empty array
    }
  };
  
  useEffect(() => {
    fetchFamilyMembers();
  }, [mobileNumber]);

  const handleAddClick = () => {
    setIsEditing(true);
    setCurrentMember({ name: '', relation: '', phone: '', mobileNumber });
  };

  const handleEditClick = (member) => {
    setIsEditing(true);
    setCurrentMember(member);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`/api/familyMembers/${id}`);
      setFamilyMembers(familyMembers.filter(member => member._id !== id));
    } catch (error) {
      console.error('Error deleting family member:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentMember({ ...currentMember, [name]: value });
  };

  const handleSave = async () => {
    try {
      let response;
      if (currentMember._id) {
        response = await axios.put(`/api/familyMembers/${currentMember._id}`, currentMember);
        setFamilyMembers(familyMembers.map(member => member._id === currentMember._id ? response.data : member));
      } else {
        response = await axios.post('/api/familyMembers', currentMember);
        setFamilyMembers([...familyMembers, response.data]);
      }
      setIsEditing(false);
      setCurrentMember({ name: '', relation: '', phone: '', mobileNumber });
      await fetchFamilyMembers(); 
    } catch (error) {
      console.error('Error saving family member:', error);
    }
  };

  return (
    <div className='flex flex-col gap-[32px] bg-white p-[32px] sm:mx-0 mx-[10px] rounded-[16px] sm:min-w-[588px] w-[350px] sm:w-fit'>
      <div className='flex flex-col gap-[24px]'>
        <div className='sm:mx-0 sm:-ml-[100px] md:ml-[30px] lg:ml-[50px] xl:ml-[70px] justify-center'>
          <SecondaryButton title="+ Add Family Members" action={handleAddClick} />
        </div>
        {isEditing && (
          <div className='flex flex-col gap-[16px] bg-[#f8f8f8] p-[20px] rounded-[8px]'>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={currentMember.name}
              onChange={handleChange}
              className='outline-none text-[#5B6572] text-[14px] font-[500] leading-[116%] border-b border-[#EEF0F3] p-[8px]'
            />
            <input
              type="text"
              name="relation"
              placeholder="Relation"
              value={currentMember.relation}
              onChange={handleChange}
              className='outline-none text-[#5B6572] text-[14px] font-[500] leading-[116%] border-b border-[#EEF0F3] p-[8px]'
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={currentMember.phone}
              onChange={handleChange}
              className='outline-none text-[#5B6572] text-[14px] font-[500] leading-[116%] border-b border-[#EEF0F3] p-[8px]'
            />
            <div className='sm:mx-0 sm:-ml-[100px] md:ml-[30px] lg:ml-[50px] xl:ml-[70px] justify-center'>
              <SecondaryButton title="Save" action={handleSave} />
            </div>
          </div>
        )}
        {familyMembers.map(member => (
          <div key={member._id} className='flex items-center gap-[8px] p-[20px] border-b border-[#EEF0F3] sm:mx-0 -ml-[20px]'>
            <img src={Dcs} alt="icon" className='sm:w-[88px] w-[66px] h-[88px] rounded-[50%]'/>
            <div className='w-full flex flex-col gap-[4px]'>
              <h1 className='text-[16px] font-[600] leading-[110%]'>{member.name}</h1>
              <p className='text-primary01 text-[12px] font-[500] leading-[116%]'>{member.relation}</p>
              <p className='text-[#5B6572] text-[10px] font-[500] leading-[116%]'>{member.phone}</p>
            </div>
            <div className='flex gap-[16px]'>
              <img className="p-[6px] rounded-[4px] bg-[#E5FFF2]" src={editIcon} alt="edit" onClick={() => handleEditClick(member)} />
              <img className="p-[6px] rounded-[4px] bg-[#FFE9E6]" src={deleteIcon} alt="delete" onClick={() => handleDeleteClick(member._id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


