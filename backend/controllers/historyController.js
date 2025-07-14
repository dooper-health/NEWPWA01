import User from '../models/User.js';
import UserBookings from '../models/BookingforUrgent.js';

export const getHistory = async (req, res) => {
  const { phoneNumber } = req.body; // Destructure phoneNumber from req.body
  console.log(phoneNumber);
  try {
    // Use mobile instead of phoneNumber in the findOne query
    const user = await User.findOne({ mobile: phoneNumber });

    if (!user) {
      return res.status(404).send('User not found');
    }

    const userBookings = await UserBookings.findOne({ userId: user._id }).populate('userId');

    if (!userBookings) {
      return res.status(404).send('No bookings found for this user');
    }

    const completedBookings = userBookings.bookings
      .filter(booking => booking.status === 'Completed')
      .map(booking => ({
        bookingId: booking.bookingId,
        date: booking.date,
        charges: booking.charges
      }));

    res.json(completedBookings);
  } catch (error) {
    res.status(500).send(error);
  }
};
