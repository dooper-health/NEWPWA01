import mongoose from 'mongoose';
import NotificationModel from '../models/Notification.js';

// POST /api/notifications/lab
// export const notifyLab = async (req, res) => {
//   try {
//     const { message, bookingId, testName, patientMobile, patientName } = req.body;
//     const notification = await Notification.create({
//       message,
//       for: 'Lab',
//       bookingId,
//       serviceType: 'Lab',
    
//       patientMobile,
//       patientName,
//       status: 'incoming',
//     });
//     res.status(201).json({ success: true, notification });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

// export const notifyLab = async (req, res) => {
//   try {
//     const { message, testName, patientMobile, patientName } = req.body;
//     const notification = await Notification.create({
//       message,
//       for: 'Lab',
      
//       serviceType: 'Lab',
    
//       patientMobile,
//       patientName,
//       status: 'incoming',
//     });
//     res.status(201).json({ success: true, notification });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

export const notifyLab = async (req, res) => {
  try {
    console.log('notifyLab called with body:', req.body);
    
    const { message, bookingId, testName, patientMobile, patientName, labId, labName } = req.body;

    // Validate required fields
    if (!patientMobile) {
      return res.status(400).json({ success: false, error: 'patientMobile is required' });
    }
    if (!patientName) {
      return res.status(400).json({ success: false, error: 'patientName is required' });
    }

    // Use the default mongoose connection
    const Notification = NotificationModel(mongoose);

    // Create notification with all available data
    const notification = await Notification.create({
      message: message || `New lab test request for ${testName || 'lab tests'}`,
      for: 'Lab',
      bookingId: bookingId || null,
      serviceType: 'Lab',
      labId: labId || 'default-lab-id',
      labName: labName || 'Lab',
      patientMobile,
      patientName,
      status: 'incoming',
    });

    console.log('Notification created successfully:', notification);
    res.status(201).json({ success: true, notification });
  } catch (err) {
    console.error('Error in notifyLab:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};



// POST /api/notifications/user
export const notifyUser = async (req, res) => {
  try {
    const { message, bookingId, testName, patientMobile, patientName, userId } = req.body;
    const notification = await Notification.create({
      message,
      for: 'PWA',
      bookingId,
      serviceType: 'Lab',
      patientMobile,
      patientName,
      userId,
      status: 'accepted',
    });
    res.status(201).json({ success: true, notification });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/notifications/:recipientId?type=PWA|DRA
export const getNotifications = async (req, res) => {
  try {
    const { recipientId } = req.params;
    const { type } = req.query; // 'PWA' or 'DRA'
    let filter = { };
    if (type === 'PWA') filter = { for: 'PWA', userId: recipientId };
    else if (type === 'DRA') filter = { for: 'DRA', draId: recipientId };
    else return res.status(400).json({ success: false, error: 'Invalid type' });
    const notifications = await Notification.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, notifications });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}; 




export const getAcceptedNotifications = async (req, res) => {
  try {
    const conn = req.conn2 || mongoose; // Use the correct connection
    const Notification = NotificationModel(conn);


    const notifications = await Notification.find({
      status: 'accepted'
    }).sort({ createdAt: -1 });


    res.json({ success: true, notifications });
  } catch (err) {
    console.error('Error in getAcceptedNotifications:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};
