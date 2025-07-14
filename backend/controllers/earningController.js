// // // backend/controllers/earningController.js
// // import BookingforUrgent from '../models/BookingforUrgent.js';

// // export const getEarnings = async (req, res) => {
// //   try {
// //     const completedBookings = await BookingforUrgent.find({ status: 'Completed' });
// //     const totalCompletedBookings = completedBookings.length;
// //     const totalEarnings = totalCompletedBookings * 500;

// //     res.status(200).json({
// //       totalCompletedBookings,
// //       totalEarnings
// //     });
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// //practice
// import mongoose from 'mongoose';
// import User from '../models/User.js'; // Adjust the import path according to your project structure
// import UserBookings from '../models/BookingforUrgent.js'; // Adjust the import path according to your project structure
// import Earning from '../models/Earning.js'; // Adjust the import path according to your project structure

// export const getEarnings = async (req, res) => {
//   const { phoneNumber } = req.body; // Destructure phoneNumber from req.body
//   console.log(phoneNumber);
//   try {
//     // Use mobile instead of phoneNumber in the findOne query
//     const user = await User.findOne({ mobile: phoneNumber });
//     if (!user) {
//       return res.status(404).send('User not found');
//     }

//     const userBookings = await UserBookings.findOne({ userId: user._id }).populate('userId');

//     if (!userBookings) {
//       return res.status(404).send('No bookings found for this user');
//     }

//     const completedBookings = userBookings.bookings.filter(booking => booking.status === 'Completed');

//     const totalCompletedBookings = completedBookings.length;
//     const totalEarnings = totalCompletedBookings * 500;

//     // Update or create the Earning document for the user
//     await Earning.findOneAndUpdate(
//       { userId: user._id },
//       {
//         totalCompletedBookings,
//         totalEarnings,
//       },
//       { new: true, upsert: true } // Create a new document if one doesn't exist
//     );

//     res.json({
//       totalCompletedBookings,
//       totalEarnings,
//     });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };


//practice
import mongoose from 'mongoose';
import User from '../models/User.js'; // Adjust the import path according to your project structure
import UserBookings from '../models/BookingforUrgent.js'; // Adjust the import path according to your project structure
import Earning from '../models/Earning.js'; // Adjust the import path according to your project structure

export const getEarnings = async (req, res) => {
  const { phoneNumber } = req.body; // Destructure phoneNumber from req.body
  console.log(phoneNumber);
  try {
    // Use mobile instead of phoneNumber in the findOne query
    const user = await User.findOne({ mobile: phoneNumber });
    if (!user) {
      console.log('Alert: User not found');
      return res.status(404).send('User not found');
    }

    const userBookings = await UserBookings.findOne({ userId: user._id }).populate('userId');

    if (!userBookings) {
      console.log('Alert: No bookings found for this user');
      return res.status(404).send('No bookings found for this user');
    }

    const completedBookings = userBookings.bookings.filter(booking => booking.status === 'Completed');

    const totalCompletedBookings = completedBookings.length;
    const totalEarnings = completedBookings.reduce((sum, booking) => sum + booking.charges, 0);

    // Update or create the Earning document for the user
    await Earning.findOneAndUpdate(
      { userId: user._id },
      {
        totalCompletedBookings,
        totalEarnings,
      },
      { new: true, upsert: true } // Create a new document if one doesn't exist
    );

    res.json({
      totalCompletedBookings,
      totalEarnings,
    });
  } catch (error) {
    console.log('Alert: Server error', error.message);
    res.status(500).send(error);
  }
};

