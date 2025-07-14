// // backend/controllers/alertController.js

// import BookingforUrgent from '../models/BookingforUrgent.js';

// // Handle GET request to fetch all urgent bookings
// const getAlert = async (req, res) => {
//   try {
//     const urgentBookings = await BookingforUrgent.find({}, 'patientName date time');
//     res.json(urgentBookings);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export { getAlert };


//practice
// backend/controllers/alertController.js

// import UserBookings from '../models/BookingforUrgent.js';

// // Handle GET request to fetch all urgent bookings
// const getAlert = async (req, res) => {
//   try {
//     const urgentBookings = await UserBookings.find({
//       'bookings.status': { $in: ['Pending', 'Incoming'] }
//     }, 'userId bookings.patientName bookings.date bookings.time');

//     res.json(urgentBookings);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export { getAlert };

import User from '../models/User.js';  // Adjust the import path according to your folder structure
import UserBookings from '../models/BookingforUrgent.js';

export const getAlert = async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    // Find the user by phone number
    const user = await User.findOne({ mobile: phoneNumber });
    console.log(phoneNumber);
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find bookings by user ID
    const userBookings = await UserBookings.findOne({ userId: user._id });

    if (!userBookings) {
      return res.status(404).json({ message: 'No bookings found for this user' });
    }

    // Filter and extract patientName, date, and time from the bookings with status 'Incoming'
    const bookingsInfo = userBookings.bookings
      .filter(booking => booking.status === 'Incoming')
      .map(booking => ({
        patientName: booking.patientName,
        date: booking.date,
        time: booking.time
      }));

    res.status(200).json(bookingsInfo);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
