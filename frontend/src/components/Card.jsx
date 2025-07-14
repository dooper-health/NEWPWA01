
// -------------Working New code-------

// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import Context from '../context/AppContext';

// const Card = ({ type, filterStatus, onClickAction }) => {
//   const { mobileNumber } = useContext(Context);
//   const [bookings, setBookings] = useState([]);
//   const [userDetails, setUserDetails] = useState({});
//   const [error, setError] = useState(null);

//   // Determine API endpoint based on booking type
//   const getApiEndpoint = () => {
//     switch (type) {
//       case 'medicine':
//         return '/api/sd3/medicine';
//       case 'lab':
//         return '/api/sd3/lab';
//       case 'home':
//         return '/api/sd3/home';
//       case 'nursing':
//         return '/api/sd3/nursing';
//       case 'vaccine':
//         return '/api/sd3/vaccine';
//       default:
//         return '';
//     }
//   };

//   useEffect(() => {
//     const fetchBookings = async () => {
//       if (!mobileNumber) return;

//       try {
//         const endpoint = getApiEndpoint();
//         if (!endpoint) return;

//         const response = await axios.post(endpoint, { phoneNumber: mobileNumber });
//         setBookings(response.data);
//         setError(null);
//       } catch (error) {
//         setError('Failed to fetch bookings');
//         setBookings([]);
//       }
//     };

//     const fetchUserDetails = async () => {
//       if (!mobileNumber) return;

//       try {
//         const response = await axios.get(`/api/documents/mobile/${mobileNumber}`);
//         setUserDetails(response.data);
//       } catch (error) {
//         console.error('Failed to fetch user details:', error);
//       }
//     };

//     fetchBookings();
//     fetchUserDetails();
//   }, [mobileNumber, type]);

//   // Function to render booking details based on type
//   const renderBookingDetails = (booking) => {
//     // const bookingDate = new Date(booking.startDate).toLocaleDateString();
//     const bookingDate = booking.startDate;
//     const bookingTime = booking.timeslot || booking.serviceTime || booking.shiftTime;

//     return (
//       <div className="flex justify-between items-center">
//         <div>
//           <div className="text-lg font-bold text-red-500">#{booking.bookingId}</div>
//           <div className="text-gray-500">
//             {bookingDate} • {bookingTime}
//           </div>
//           <div className="mt-2 text-sm">
//             <div className="font-semibold text-gray-700">Patient Name:</div>
//             <div>{booking.patientName}</div>
//             <div>OTP: {booking.bookingOtp}</div>
//             <div className="text-gray-500">
//               Age: {userDetails.age || booking.patientAge} | Gender: {userDetails.gender || booking.patientGender} |
//               Blood Group: {userDetails.bloodGroup} | Height: {userDetails.height} | Weight: {userDetails.weight}
//             </div>
//           </div>
//           <div className="mt-2">
//             {renderBadge(type)}
//           </div>
//         </div>
//         {/* <div>
//           <div className="text-red-500 font-bold">Cancelled</div>
//         </div> */}
//       </div>
//     );
//   };

//   // Function to render the type badge
//   const renderBadge = (type) => {
//     const typeMap = {
//       medicine: "Medicine",
//       lab: "Lab Test",
//       home: "Home Care",
//       nursing: "Nursing",
//       vaccine: "Vaccination",
//     };

//     const colorMap = {
//       medicine: "bg-red-500",
//       lab: "bg-pink-500",
//       home: "bg-blue-500",
//       nursing: "bg-yellow-500",
//       vaccine: "bg-green-500",
//     };

//     return (
//       <span
//         className={`text-white px-3 py-1 rounded-full text-xs font-semibold ${colorMap[type]}`}
//       >
//         {typeMap[type]}
//       </span>
//     );
//   };

//   // Function to filter bookings based on filterStatus
//   const getFilteredBookings = () => {
//     if (filterStatus === 'All') return bookings;
//     return bookings.filter(booking => booking.status.toLowerCase() === filterStatus.toLowerCase());
//   };

//   return (
//     <div className="w-full p-4">
//       <h2 className="text-2xl font-semibold mb-4">Bookings</h2>
//       {mobileNumber ? (
//         <div className="mb-4 text-gray-600">Fetching bookings for: {mobileNumber}</div>
//       ) : (
//         <p>No phone number available.</p>
//       )}
//       {error && <p className="text-red-500">{error}</p>}
//       <div>
//         {bookings.length > 0 ? (
//           <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {getFilteredBookings().map((booking) => (
//               <li
//                 key={booking.bookingId}
//                 onClick={() => onClickAction(booking)}
//                 className="border p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//               >
//                 {renderBookingDetails(booking)}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No bookings found for this phone number.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Card;




// -----------------



// ///KamalCode

// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import Context from '../context/AppContext'
// import patientimage from '../assets/images/patientimage.png'

// const Card = ({ type, filterStatus, onClickAction }) => {
//   const { mobileNumber } = useContext(Context);
//   const [bookings, setBookings] = useState([]);
//   const [userDetails, setUserDetails] = useState({});
//   const [error, setError] = useState(null);

//   // Determine API endpoint based on booking type
//   const getApiEndpoint = () => {
//     switch (type) {
//       case 'medicine':
//         return '/api/sd3/medicine';
//       case 'lab':
//         return '/api/sd3/lab';
//       case 'home':
//         return '/api/sd3/home';
//       case 'nursing':
//         return '/api/sd3/nursing';
//       case 'vaccine':
//         return '/api/sd3/vaccine';
//       default:
//         return '';
//     }
//   };


//   /*

//   useEffect(() => {
//     const fetchBookings = async () => {
//       if (!mobileNumber) return;

//       try {
//         const endpoint = getApiEndpoint();
//         if (!endpoint) return;

//         const response = await axios.post(endpoint, { phoneNumber: mobileNumber });
//         setBookings(response.data);
//         setError(null);
//       } catch (error) {
//         setError('Failed to fetch bookings');
//         setBookings([]);
//       }
//     };

//     const fetchUserDetails = async () => {
//       if (!mobileNumber) return;

//       try {
//         const response = await axios.get(`/api/documents/mobile/${mobileNumber}`);
//         setUserDetails(response.data);
//       } catch (error) {
//         console.error('Failed to fetch user details:', error);
//       }
//     };

//     fetchBookings();
//     fetchUserDetails();
//   }, [mobileNumber, type]);

//   */



//   // KamalCode STart

//   useEffect(() => {
//   const fetchBookings = async () => {
//     if (!mobileNumber) return;

//     try {
//       const endpoint = getApiEndpoint();
//       if (!endpoint) return;

//       const response = await axios.post(endpoint, { phoneNumber: mobileNumber });
//       setBookings(response.data);
//       setError(null);

//       // 🩺 Optionally: call notification API only for medicine type
//       if (type === 'medicine' && response.data.length > 0) {
//         // Get first bookingId (or loop if you prefer)
//         const bookingId = response.data[0].bookingId;
//         const patientName = response.data[0].patientName;

//         // Fire notification API (optional: wrap in try/catch)
//         await axios.post('/api/notifications/pwa-to-pharmacy/medicine', {
//           bookingId,
//           patientName
//         });
//         console.log('Notification sent for medicine bookingId:', bookingId);
//       }

//       //Vaccination

//       //   if (type === 'vaccine' && response.data.length > 0) {
//       //   // Get first bookingId (or loop if you prefer)
//       //   const bookingId = response.data[0].bookingId;
//       //   const patientName = response.data[0].patientName;

//       //   // Fire notification API (optional: wrap in try/catch)
//       //   await axios.post('/api/notifications/pwa-to-pharmacy/vaccination', {
//       //     bookingId,
//       //     patientName
//       //   });
//       //   console.log('Notification sent for vaccination bookingId:', bookingId);
//       // }

//     } catch (error) {
//       setError('Failed to fetch bookings');
//       setBookings([]);
//       console.error('Error fetching bookings or sending notification:', error);
//     }
//   };

//   const fetchUserDetails = async () => {
//     if (!mobileNumber) return;

//     try {
//       const response = await axios.get(`/api/documents/mobile/${mobileNumber}`);
//       setUserDetails(response.data);
//     } catch (error) {
//       console.error('Failed to fetch user details:', error);
//     }
//   };

//   fetchBookings();
//   fetchUserDetails();
// }, [mobileNumber, type]);

// // // useEffect(() => {
// //   const fetchBookings = async () => {
// //     if (!mobileNumber) return;

// //     try {
// //       const endpoint = getApiEndpoint();
// //       if (!endpoint) return;

// //       const response = await axios.post(endpoint, { phoneNumber: mobileNumber });
// //       setBookings(response.data);
// //       setError(null);

// //       if (type === 'medicine' && response.data.length > 0) {
// //         // Find first booking with status === 'incoming'
// //         const incomingBooking = response.data.find(
// //           (booking) => booking.status && booking.status.toLowerCase() === 'incoming'
// //         );

// //         if (incomingBooking) {
// //           const bookingId = incomingBooking.bookingId;
// //           const patientName = incomingBooking.patientName;

// //           // Call notification API
// //           await axios.post('/api/notifications/pwa-to-pharmacy/medicine', {
// //             bookingId,
// //             patientName
// //           });

// //           console.log('Notification sent for incoming medicine bookingId:', bookingId);
// //         }
// //       }

// //     } catch (error) {
// //       setError('Failed to fetch bookings');
// //       setBookings([]);
// //       console.error('Error fetching bookings or sending notification:', error);
// //     }
// //   };

// //   const fetchUserDetails = async () => {
// //     if (!mobileNumber) return;

// //     try {
// //       const response = await axios.get(`/api/documents/mobile/${mobileNumber}`);
// //       setUserDetails(response.data);
// //     } catch (error) {
// //       console.error('Failed to fetch user details:', error);
// //     }
// //   };

// //   fetchBookings();
// //   fetchUserDetails();
// // }, [mobileNumber, type]);


//   // KamalCode End

//   // Function to render booking details based on type
//   const renderBookingDetails = (booking) => {
//     const bookingDate = booking.startDate;
//     const bookingTime = booking.timeslot || booking.serviceTime || booking.shiftTime;
//     const bookingtitle = (booking.Lab  ||booking.Medicine || booking.Vaccine || '[]').join(', '); // Parsing symptoms


//     return (
//       <div className="p-4 rounded-lg border border-gray-300 shadow-md">
//         <div className="flex justify-between items-center mb-4">
//           <div>
//             <div className="text-xl font-bold text-pink-600">#{booking.bookingId}</div>
//             <div> {bookingtitle}</div>
//             <div className="text-gray-500 flex items-center space-x-2">
//               <span>{bookingDate}</span>
//               <span>•</span>
//               <span>{bookingTime}</span>
//             </div>
//           </div>
//           <div>
//             {/* <span className="text-xs bg-red-500 text-white py-1 px-3 rounded-full">{booking.Rank}</span> */}
//           </div>
//         </div>
//         <div className="border-t border-gray-200 pt-4 flex items-center space-x-4">
//           <img
//             src={patientimage}
//             alt="Patient"
//             className="w-16 h-16 rounded-full"
//           />
//           <div>
//             <div className="font-bold text-lg">{booking.patientName}</div>
//             <div className="text-gray-600 text-sm">
//               Age: {userDetails.age || booking.patientAge} | Gender: {userDetails.gender || booking.patientGender} |
//               Blood Group: {userDetails.bloodGroup || 'O+'} | Height: {userDetails.height || '6"3'} | Weight: {userDetails.weight || '76'}
//             </div>
//           </div>
//         </div>
//         <div className="flex justify-end mt-4">
//           {/* <button className="text-sm text-white bg-green-500 px-4 py-1 rounded-full">{booking.status}</button> */}
//           {booking.status === 'incoming' ? (
//     <button className="text-sm text-white bg-green-500 px-4 py-1 rounded-full">
//       booking created
//     </button>
//   ) : booking.status === 'pending' ? (
//     <button className="text-sm text-white bg-yellow-500 px-4 py-1 rounded-full">
//       booking in process
//     </button>
//   ) : (
//     <button className="text-sm text-white bg-red-500 px-4 py-1 rounded-full">
//       {booking.status}
//     </button>
//   )}
//         </div>
//       </div>
//     );
//   };

//   // Function to filter bookings based on filterStatus
//   const getFilteredBookings = () => {
//     if (filterStatus === 'All') return bookings;
//     return bookings.filter(booking => booking.status.toLowerCase() === filterStatus.toLowerCase());
//   };

//   return (
//     <div className="w-full p-4">
//       <h2 className="text-2xl font-semibold mb-4">Bookings</h2>
//       {mobileNumber ? (
//         <div className="mb-4 text-gray-600">Fetching bookings for: {mobileNumber}</div>
//       ) : (
//         <p>No phone number available.</p>
//       )}
//       {error && <p className="text-red-500">{error}</p>}
//       <div>
//         {bookings.length > 0 ? (
//           <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {getFilteredBookings().map((booking) => (
//               <li
//                 key={booking.bookingId}
//                 onClick={() => onClickAction(booking)}
//                 className="cursor-pointer"
//               >
//                 {renderBookingDetails(booking)}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No bookings found for this phone number.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Card;





import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Context from '../context/AppContext'
import patientimage from '../assets/images/patientimage.png'

const Card = ({ type, filterStatus, onClickAction }) => {
  const { mobileNumber } = useContext(Context);
  const [bookings, setBookings] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState(null);

  // Determine API endpoint based on booking type
  const getApiEndpoint = () => {
    switch (type) {
      case 'medicine':
        return '/api/sd3/medicine';
      case 'lab':
        return '/api/sd3/lab';
      case 'home':
        return '/api/sd3/home';
      case 'nursing':
        return '/api/sd3/nursing';
      case 'vaccine':
        return '/api/sd3/vaccine';
      default:
        return '';
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      if (!mobileNumber) return;

      try {
        const endpoint = getApiEndpoint();
        if (!endpoint) return;

        const response = await axios.post(endpoint, { phoneNumber: mobileNumber });
        setBookings(response.data);
        setError(null);
      } catch (error) {
        setError('Failed to fetch bookings');
        setBookings([]);
      }
    };

    const fetchUserDetails = async () => {
      if (!mobileNumber) return;

      try {
        const response = await axios.get(`/api/documents/mobile/${mobileNumber}`);
        setUserDetails(response.data);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    };

    fetchBookings();
    fetchUserDetails();
  }, [mobileNumber, type]);

  // Function to render booking details based on type
  const renderBookingDetails = (booking) => {
    const bookingDate = booking.startDate;
    const bookingTime = booking.timeslot || booking.serviceTime || booking.shiftTime;
    const bookingtitle = (booking.Lab  ||booking.Medicine || booking.Vaccine || '[]').join(', '); // Parsing symptoms


    return (
      <div className="p-4 rounded-lg border border-gray-300 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-xl font-bold text-pink-600">#{booking.bookingId}</div>
            <div> {bookingtitle}</div>
            <div className="text-gray-500 flex items-center space-x-2">
              <span>{bookingDate}</span>
              <span>•</span>
              <span>{bookingTime}</span>
            </div>
          </div>
          <div>
            {/* <span className="text-xs bg-red-500 text-white py-1 px-3 rounded-full">{booking.Rank}</span> */}
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4 flex items-center space-x-4">
          <img
            src={patientimage}
            alt="Patient"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <div className="font-bold text-lg">{booking.patientName}</div>
            <div className="text-gray-600 text-sm">
              Age: {userDetails.age || booking.patientAge} | Gender: {userDetails.gender || booking.patientGender} |
              Blood Group: {userDetails.bloodGroup || 'O+'} | Height: {userDetails.height || '6"3'} | Weight: {userDetails.weight || '76'}
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          {/* <button className="text-sm text-white bg-green-500 px-4 py-1 rounded-full">{booking.status}</button> */}
          {booking.status === 'incoming' ? (
    <button className="text-sm text-white bg-green-500 px-4 py-1 rounded-full">
      booking created
    </button>
  ) : booking.status === 'pending' ? (
    <button className="text-sm text-white bg-yellow-500 px-4 py-1 rounded-full">
      booking in process
    </button>
  ) : (
    <button className="text-sm text-white bg-red-500 px-4 py-1 rounded-full">
      {booking.status}
    </button>
  )}
        </div>
      </div>
    );
  };

  // Function to filter bookings based on filterStatus
  const getFilteredBookings = () => {
    if (filterStatus === 'All') return bookings;
    return bookings.filter(booking => booking.status.toLowerCase() === filterStatus.toLowerCase());
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-semibold mb-4">Bookings</h2>
      {mobileNumber ? (
        <div className="mb-4 text-gray-600">Fetching bookings for: {mobileNumber}</div>
      ) : (
        <p>No phone number available.</p>
      )}
      {error && <p className="text-red-500">{error}</p>}
      <div>
        {bookings.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredBookings().map((booking) => (
              <li
                key={booking.bookingId}
                onClick={() => onClickAction(booking)}
                className="cursor-pointer"
              >
                {renderBookingDetails(booking)}
              </li>
            ))}
          </ul>
        ) : (
          <p>No bookings found for this phone number.</p>
        )}
      </div>
    </div>
  );
};

export default Card;