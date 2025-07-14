// // import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import Context from '../context/AppContext';

// const Card3 = ({ filterStatus, onClickAction }) => {
//   const { mobileNumber } = useContext(Context);
//   const [bookings, setBookings] = useState([]);
//   const [userDetails, setUserDetails] = useState({});
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUrgentBookings = async () => {
//       if (!mobileNumber) return;

//       try {
//         const response = await axios.post('/api/sd3/urgent', { phoneNumber: mobileNumber });
//         console.log('API Response:', response.data); // Debugging line
//         console.log(response.data)
//         setBookings(response.data.data || []);
//         setError(null);
//       } catch (error) {
//         console.error('Error fetching urgent bookings:', error); // Debugging line
//         setError('Failed to fetch urgent bookings');
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

//     fetchUrgentBookings();
//     fetchUserDetails();
//   }, [mobileNumber]);

//   const renderBookingDetails = (booking) => {
//     const bookingDate = booking.startDate || booking.createdAt;
//     const symptoms = JSON.parse(booking.symptoms[0] || '[]').join(', '); // Parsing symptoms

//     return (
//       <div className="flex justify-between items-center">
//         <div>
//           <div className="text-lg font-bold text-red-500">#{booking.bookingId}</div>
//           <div className="text-gray-500">
//             {new Date(bookingDate).toLocaleDateString()} {/* Formatting date */}
//           </div>
//           <div className="mt-2 text-sm">
//             <div className="font-semibold text-gray-700">Patient Name:</div>
//             <div>{booking.patientName}</div>
//             <div className="text-gray-500">
//               Symptoms: {symptoms}
//             </div>
//             <div className="mt-2">
//               {renderBadge()}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderBadge = () => (
//     <span className="text-white px-3 py-1 rounded-full text-xs font-semibold bg-green-500">
//       Urgent
//     </span>
//   );

//   const getFilteredBookings = () => {
//     if (filterStatus === 'All') return bookings;
//     return bookings.filter(booking => booking.status?.toLowerCase() === filterStatus.toLowerCase());
//   };

//   return (
//     <div className="w-full p-4">
//       <h2 className="text-2xl font-semibold mb-4">Urgent Bookings</h2>
//       {mobileNumber ? (
//         <div className="mb-4 text-gray-600">Fetching urgent bookings for: {mobileNumber}</div>
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
//           <p>No urgent bookings found for this phone number.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Card3;


import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Context from '../context/AppContext';
import patientimage from '../assets/images/patientimage.png'


const Card3 = ({ filterStatus, onClickAction }) => {
  const { mobileNumber } = useContext(Context);
  const [bookings, setBookings] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUrgentBookings = async () => {
      if (!mobileNumber) return;

      try {
        const response = await axios.post('/api/sd3/urgent', { phoneNumber: mobileNumber });
        console.log('API Response:', response.data); // Debugging line
        console.log(response.data);
        setBookings(response.data.data || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching urgent bookings:', error); // Debugging line
        setError('Failed to fetch urgent bookings');
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

    fetchUrgentBookings();
    fetchUserDetails();
  }, [mobileNumber]);

  const renderBadge = () => (
    <span className="text-white px-3 py-1 rounded-full text-xs font-semibold bg-green-500">
      Urgent
    </span>
  );

  const renderBookingDetails = (booking) => {
    const bookingDate = booking.startDate || booking.createdAt;
    const symptoms = JSON.parse(booking.symptoms[0] || '[]').join(', '); // Parsing symptoms

    return (
      <div className="p-4 rounded-lg border border-gray-300 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-xl font-bold text-red-500">#{booking.bookingId}</div>
            <div className="text-gray-500 flex items-center space-x-2">
              <span>{new Date(bookingDate).toLocaleDateString()}</span>
              <span>•</span>
              <span>{new Date(bookingDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
          {renderBadge()}
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
              Symptoms: {symptoms || 'N/A'}
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

  const getFilteredBookings = () => {
    if (filterStatus === 'All') return bookings;
    return bookings.filter(booking => booking.status?.toLowerCase() === filterStatus.toLowerCase());
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-semibold mb-4">Urgent Bookings</h2>
      {mobileNumber ? (
        <div className="mb-4 text-gray-600">Fetching urgent bookings for: {mobileNumber}</div>
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
                className="cursor-pointer transition-shadow duration-200 hover:shadow-lg"
              >
                {renderBookingDetails(booking)}
              </li>
            ))}
          </ul>
        ) : (
          <p>No urgent bookings found for this phone number.</p>
        )}
      </div>
    </div>
  );
};

export default Card3;
