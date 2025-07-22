import mongoose from 'mongoose';
import notificationModel from '../models/Notification.js';

export const getCombinedPwaNotifications = async (req, res) => {
  try {
    const { mobileNumber } = req.query;

    if (!mobileNumber) {
      return res.status(400).json({
        success: false,
        message: 'Mobile number is required',
      });
    }

    const conn = req.conn || mongoose;
    const Notification = notificationModel(conn);

    // Define medicine23 model if not already registered
    const MedicineModel = conn.models.medicine23 || conn.model('medicine23', new mongoose.Schema({
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      bookings: [{
        bookingId: String,
        mobileNumber: String,
        status: String,
      }],
    }));

    // Step 1: Fetch userId from medicine23 by mobile number
    const bookingDoc = await MedicineModel.findOne(
      { 'bookings.mobileNumber': mobileNumber },
      { userId: 1 }
    );

    if (!bookingDoc) {
      return res.status(404).json({
        success: false,
        message: `No bookings found for mobile number '${mobileNumber}' in medicine23.`,
      });
    }

    const userId = bookingDoc.userId;

    // Step 2: Fetch PWA notifications
    const pwaNotifications = await Notification.find({
      for: 'PWA',
      userId: userId,
    }).sort({ createdAt: -1 }).limit(50);

    // Step 3: Fetch accepted notifications (filtered by userId, optional)
    const acceptedNotifications = await Notification.find({
      status: 'accepted',
      userId: userId, // Optional: remove if you want all accepted
    }).sort({ createdAt: -1 });

    // Return combined data
    res.status(200).json({
      success: true,
      userId,
      pwaNotifications,
      acceptedNotifications,
    });

  } catch (error) {
    console.error('❌ Error in getCombinedPwaNotifications:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch notifications' });
  }
};
