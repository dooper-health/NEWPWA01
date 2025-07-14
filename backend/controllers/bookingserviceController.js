// // backend/controllers/bookingserviceController.js
// import BookingforUrgent from '../models/BookingforUrgent.js';

// // Get all urgent bookings
// const getUrgentBookings = async (req, res) => {
//   try {
//     const bookings = await BookingforUrgent.find();
//     res.json(bookings);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };

// // Get booking by ID
// const getBookingById = async (req, res) => {
//   try {
//     const booking = await BookingforUrgent.findById(req.params.id);
//     if (!booking) {
//       return res.status(404).json({ msg: 'Booking not found' });
//     }
//     res.json(booking);
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === 'ObjectId') {
//       return res.status(404).json({ msg: 'Booking not found' });
//     }
//     res.status(500).send('Server Error');
//   }
// };

// export { getUrgentBookings, getBookingById };

//booking2
// import User from '../models/User.js';
// import UserBookings from '../models/BookingforUrgent.js';

// const getUrgentBookings = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const userBookings = await UserBookings.findOne({ userId });

//     if (!userBookings) {
//       return res.status(404).json({ message: 'No bookings found' });
//     }

//     res.json(userBookings.bookings);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };

// const getBookingById = async (req, res) => {
//   try {
//     const { userId, id } = req.params;

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const userBookings = await UserBookings.findOne({ userId });

//     if (!userBookings) {
//       return res.status(404).json({ message: 'No bookings found' });
//     }

//     const booking = userBookings.bookings.id(id);
//     if (!booking) {
//       return res.status(404).json({ msg: 'Booking not found' });
//     }

//     res.json(booking);
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === 'ObjectId') {
//       return res.status(404).json({ msg: 'Booking not found' });
//     }
//     res.status(500).send('Server Error');
//   }
// };

// export { getUrgentBookings, getBookingById };


// // booking05
// import User from '../models/User.js';
// import UserBookings from '../models/BookingforUrgent.js';

// const getUrgentBookings = async (req, res) => {
//   try {
//     const { mobileNumber } = req.body; 

//     const user = await User.findOne({ mobile: mobileNumber });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     const userBookings = await UserBookings.findOne({ userId: user._id });

//     if (!userBookings) {
//       return res.status(404).json({ message: 'No bookings found' });
//     }

//     res.json(userBookings.bookings);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };

// const getBookingById = async (req, res) => {
//   try {
//     const { mobileNumber} = req.body;
//     const {id } = req.params;  

//     const user = await User.findOne({ mobile: mobileNumber }); 
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const userBookings = await UserBookings.findOne({ userId: user._id });

//     if (!userBookings) {
//       return res.status(404).json({ message: 'No bookings found' });
//     }

//     const booking = userBookings.bookings.id(id);
//     if (!booking) {
//       return res.status(404).json({ message: 'Booking not found' });
//     }

//     res.json(booking);
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === 'ObjectId') {
//       return res.status(404).json({ message: 'Booking not found' });
//     }
//     res.status(500).send('Server Error');
//   }
// };

// export { getUrgentBookings, getBookingById };



//practice
// backend/controllers/bookingserviceController.js
import UserBookings from '../models/BookingforUrgent.js';

// Get all urgent bookings
export const getUrgentBookings = async (req, res) => {
  try {
    const bookings = await UserBookings.find();
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get booking by ID
export const getBookingById = async (req, res) => {
  try {
    const userBookings = await UserBookings.findOne({ 'bookings._id': req.params.id });

    if (!userBookings) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    const booking = userBookings.bookings.id(req.params.id);
    res.json(booking);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Booking not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Update booking status from Pending to Completed
export const endService = async (req, res) => {
  try {
    const { id } = req.params;
    const userBookings = await UserBookings.findOne({ 'bookings._id': id });

    if (!userBookings) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const booking = userBookings.bookings.id(id);
    if (booking.status !== 'Pending') {
      return res.status(400).json({ message: 'Booking is not in Pending status' });
    }

    booking.status = 'Completed';

    await userBookings.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
