

// import notificationModel from '../models/Notification.js'; // adjust path if needed
// import { io } from '../config/socket.js'; // socket.io server
// // ⚠️ No direct conn import here — we use req.conn

// // ==============================
// // Create Notification (PWA ➝ DRA or DRA ➝ PWA)
// // ==============================

// // export const createNotification = async (req, res) => {
// //   try {
// //     const {
// //       message,
// //       for: target,       // 'DRA' or 'PWA'
// //       userId,            // Only for PWA target
// //       serviceType,
// //       bookingId,
// //       draName,
// //       draId,
// //       patientName,
// //       patientId
// //     } = req.body;

// //     // ✅ Build the Notification model from the request's DB connection (PWA DB)
// //     const Notification = notificationModel(req.conn);

// //     const notification = new Notification({
// //       message,
// //       for: target,
// //       userId,
// //       serviceType,
// //       bookingId,
// //       draName,
// //       draId,
// //       patientName,
// //       patientId
// //     });

// //     await notification.save();

// //     // ✅ Real-time event
// //     if (target === 'DRA') {
// //       io.emit('newBooking', {
// //         message,
// //         serviceType,
// //         bookingId,
// //         patientName,
// //         patientId
// //       });
// //     } else if (target === 'PWA' && userId) {
// //       io.to(userId.toString()).emit('bookingAccepted', {
// //         message,
// //         bookingId,
// //         draName,
// //         draId
// //       });
// //     }

// //     res.status(201).json({ success: true, notification });

// //   } catch (error) {
// //     console.error('❌ Error creating notification:', error);
// //     res.status(500).json({ success: false, message: 'Internal Server Error' });
// //   }
// // };

// export const createNotification = async (req, res) => {
//   try {
//     const {
//       message,
//       for: target,       // 'DRA' or 'PWA'
//       userId,            // Only for 'PWA' target
//       serviceType,
//       bookingId,
//       draName,
//       draId,
//       patientName
//     } = req.body;

//     const Notification = notificationModel(req.conn);
//     let patientMobile = null;

//     // ✅ Only when sending from PWA ➝ DRA
//     if (target === 'DRA' && bookingId) {
//       let bookingDoc = null;

//       // 👉 Use correct model based on serviceType
//       if (serviceType === 'HomeCare') {
//         const HomeModel = req.conn.model('Home23');
//         bookingDoc = await HomeModel.findOne({ 'bookings.bookingId': bookingId }, { 'bookings.$': 1 });
//         patientMobile = bookingDoc?.bookings?.[0]?.mobileNumber;
//       } else if (serviceType === 'Vaccination') {
//         const VaccinationModel = req.conn.model('vaccination10');
//         bookingDoc = await VaccinationModel.findOne({ 'bookings.bookingId': bookingId }, { 'bookings.$': 1 });
//         patientMobile = bookingDoc?.bookings?.[0]?.mobileNumber;
//       } else if (serviceType === 'UrgentCare') {
//         const UrgentModel = req.conn.model('UrgentCase');
//         bookingDoc = await UrgentModel.findOne({ 'bookings.bookingId': bookingId }, { 'bookings.$': 1 });
//         patientMobile = bookingDoc?.bookings?.[0]?.mobileNumber;
//       } else if (serviceType === 'Nursing') {
//         const NursingModel = req.conn.model('Nursing23');
//         bookingDoc = await NursingModel.findOne({ 'bookings.bookingId': bookingId }, { 'bookings.$': 1 });
//         patientMobile = bookingDoc?.bookings?.[0]?.mobileNumber;
//       }
//     }

//     // ✅ Create notification with mobile
//     const notification = new Notification({
//       message,
//       for: target,
//       userId,
//       serviceType,
//       bookingId,
//       draName,
//       draId,
//       patientName,
//       patientMobile // ✅ attach here
//     });

//     await notification.save();

//     // ✅ Emit
//     if (target === 'DRA') {
//       io.emit('newBooking', {
//         message,
//         serviceType,
//         bookingId,
//         patientName,
//         patientMobile
//       });
//     } else if (target === 'PWA' && userId) {
//       io.to(userId.toString()).emit('bookingAccepted', {
//         message,
//         bookingId,
//         draName,
//         draId
//       });
//     }

//     res.status(201).json({ success: true, notification });

//   } catch (error) {
//     console.error('❌ Error creating notification:', error);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// };




// // ==============================
// // Get Notifications (for DRA or PWA)
// // ==============================

// export const getNotifications = async (req, res) => {
//   try {
//     const { userId, role } = req.query;

//     const Notification = notificationModel(req.conn);

//     const filter = role === 'DRA'
//       ? { for: 'DRA' }
//       : { for: 'PWA', userId };

//     const notifications = await Notification.find(filter).sort({ createdAt: -1 });

//     res.status(200).json({ success: true, notifications });
//   } catch (error) {
//     console.error('❌ Error fetching notifications:', error);
//     res.status(500).json({ success: false, message: 'Failed to fetch notifications' });
//   }
// };






import mongoose from 'mongoose';
import notificationModel from '../models/Notification.js'; // Path may vary
import userBookingMdModel from '../models/UserBookingMd.js';
import userBookingVdModel from '../models/UserBookingVd.js';
import { io } from '../config/socket.js';

const userBookingMdSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookings: [{
    bookingId: String,
    mobileNumber: String,
    status: String
  }]
});

const userBookingVdSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookings: [{
    bookingId: String,
    mobileNumber: String,
    status: String
  }]
});

// ==============================
// Enhanced Booking Creation Notification Trigger
// ==============================
export const triggerBookingNotification = async (bookingData, serviceType, conn) => {
  try {
    const Notification = notificationModel(conn);
    const { mobileNumber, patientName, bookingId } = bookingData;
    
    const message = `New ${serviceType} booking request from ${patientName}`;
    
    const notification = new Notification({
      message,
      for: 'Pharmacy',
      serviceType,
      bookingId,
      patientName,
      patientMobile: mobileNumber,
      status: 'pending'
    });

    await notification.save();

    // Emit real-time notification to all pharmacies
    if (typeof io !== 'undefined') {
      io.emit('newBookingRequest', {
        message,
        serviceType,
        bookingId,
        patientName,
        patientMobile: mobileNumber,
        timestamp: new Date()
      });
    }

    console.log(`✅ Notification triggered for ${serviceType} booking: ${bookingId}`);
    return notification;
  } catch (error) {
    console.error(`❌ Error triggering notification for ${serviceType} booking:`, error);
    throw error;
  }
};

// ==============================
// Enhanced Pharmacy Notification Creation
// ==============================
export const createPharmacyNotification = async (req, res) => {
  try {
    const {
      serviceType,
      bookingId,
      pharmacyName,
      pharmacyId,
      patientName,
      patientMobile
    } = req.body;

    const conn = req.conn || mongoose;
    const Notification = notificationModel(conn);

    if (!bookingId || !serviceType) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing bookingId or serviceType.' 
      });
    }

    let bookingDoc = null;
    let message = `New ${serviceType} booking request`;

    // Find booking based on service type
    if (serviceType === 'Medicine') {
      const MedicineModel = conn.models.medicine23 || conn.model('medicine23', userBookingMdSchema);
      bookingDoc = await MedicineModel.findOne({ 'bookings.bookingId': bookingId }, { 'bookings.$': 1 });
    } else if (serviceType === 'Vaccination') {
      const VaccinationModel = conn.models.vaccination10 || conn.model('vaccination10', userBookingVdSchema);
      bookingDoc = await VaccinationModel.findOne({ 'bookings.bookingId': bookingId }, { 'bookings.$': 1 });
    } else {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid serviceType. Must be "Medicine" or "Vaccination".' 
      });
    }

    if (!bookingDoc || !bookingDoc.bookings || bookingDoc.bookings.length === 0) {
      console.warn(`Booking not found: ${bookingId} for service: ${serviceType}`);
      return res.status(404).json({ 
        success: false, 
        message: `Booking with ID '${bookingId}' not found for service type '${serviceType}'.` 
      });
    }

    const patientMobileFromDB = bookingDoc.bookings[0].mobileNumber || patientMobile;

    const notification = new Notification({
      message,
      for: 'Pharmacy',
      serviceType,
      bookingId,
      pharmacyName,
      pharmacyId,
      patientName,
      patientMobile: patientMobileFromDB,
      status: 'pending'
    });

    await notification.save();

    // Emit real-time event to pharmacies
    if (typeof io !== 'undefined') {
      io.emit('newPharmacyBooking', { 
        message, 
        serviceType, 
        bookingId, 
        patientName, 
        patientMobile: patientMobileFromDB,
        timestamp: new Date()
      });
    }

    res.status(201).json({ success: true, notification });
  } catch (error) {
    console.error('❌ Error creating pharmacy notification:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// ==============================
// Enhanced Medicine Pharmacy Notification
// ==============================
export const createMedicinePharmacyNotification = async (req, res) => {
  try {
    const { patientMobile, pharmacyName, pharmacyId, patientName } = req.body;

    if (!patientMobile) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing patientMobile.' 
      });
    }

    const conn = req.conn || mongoose;
    const Notification = notificationModel(conn);
    const serviceType = 'Medicine';
    let bookingId = null;
    const message = `New ${serviceType} booking request`;

    // Find booking by patientMobile
    const MedicineModel = conn.models.medicine23 || conn.model('medicine23', userBookingMdSchema);
    const bookingDoc = await MedicineModel.findOne(
      { 'bookings.mobileNumber': patientMobile },
      { 'bookings.$': 1 }
    );

    if (!bookingDoc || !bookingDoc.bookings || bookingDoc.bookings.length === 0) {
      console.warn(`Medicine booking not found for patientMobile: ${patientMobile}`);
      return res.status(404).json({ 
        success: false, 
        message: `No Medicine booking found for patientMobile '${patientMobile}'.` 
      });
    }

    bookingId = bookingDoc.bookings[0].bookingId || null;

    const notification = new Notification({
      message,
      for: 'Pharmacy',
      serviceType,
      bookingId,
      pharmacyName,
      pharmacyId,
      patientName,
      patientMobile,
      status: 'incoming'
    });

    await notification.save();

    // Emit Socket.IO event to pharmacies
    if (typeof io !== 'undefined') {
      io.emit('newPharmacyBooking', {
        message,
        serviceType,
        bookingId,
        patientName,
        patientMobile,
        timestamp: new Date()
      });
    }

    res.status(201).json({ success: true, notification });
  } catch (error) {
    console.error('❌ Error creating medicine pharmacy notification:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// ==============================
// Enhanced Vaccination Pharmacy Notification
// ==============================
export const createVaccinationPharmacyNotification = async (req, res) => {
  try {
    const { patientMobile, pharmacyName, pharmacyId, patientName } = req.body;

    const conn = req.conn || mongoose;
    const Notification = notificationModel(conn);
    const serviceType = 'Vaccination';
    const message = `New ${serviceType} booking request`;

    if (!patientMobile) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing patientMobile.' 
      });
    }

    // Find booking by patientMobile in vaccination10
    const VaccinationModel = conn.models.vaccination10 || conn.model('vaccination10', userBookingVdSchema);
    const bookingDoc = await VaccinationModel.findOne(
      { 'bookings.mobileNumber': patientMobile }, 
      { 'bookings.$': 1 }
    );

    if (!bookingDoc || !bookingDoc.bookings || bookingDoc.bookings.length === 0) {
      console.warn(`Vaccination booking not found for patientMobile: ${patientMobile}`);
      return res.status(404).json({ 
        success: false, 
        message: `Vaccination booking for patientMobile '${patientMobile}' not found.` 
      });
    }

    const bookingId = bookingDoc.bookings[0].bookingId || null;

    const notification = new Notification({
      message,
      for: 'Pharmacy',
      serviceType,
      bookingId,
      pharmacyName,
      pharmacyId,
      patientName,
      patientMobile,
      status: 'incoming'
    });

    await notification.save();

    // Emit event to all pharmacies
    if (typeof io !== 'undefined') {
      io.emit('newPharmacyBooking', { 
        message, 
        serviceType, 
        bookingId, 
        patientName, 
        patientMobile,
        timestamp: new Date()
      });
    }

    res.status(201).json({ success: true, notification });
  } catch (error) {
    console.error('❌ Error creating vaccination pharmacy notification:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// ==============================
// Enhanced PWA Notification Creation
// ==============================
export const createNotificationToPWA = async (req, res) => {
  try {
    const {
      userId,
      serviceType,
      bookingId,
      pharmacyName,
      pharmacyId,
      patientName,
      patientMobile
    } = req.body;

    const conn = req.conn || mongoose;
    const Notification = notificationModel(conn);

    const message = `${pharmacyName} accepted your ${serviceType} booking`;

    const notification = new Notification({
      message,
      for: 'PWA',
      userId,
      serviceType,
      bookingId,
      pharmacyName,
      pharmacyId,
      patientName,
      patientMobile,
      status: 'accepted'
    });

    await notification.save();

    // Emit only to that patient's socket room
    if (typeof io !== 'undefined') {
      io.to(userId.toString()).emit('pharmacyBookingAccepted', {
        message, 
        bookingId, 
        pharmacyName, 
        pharmacyId,
        serviceType,
        timestamp: new Date()
      });
    }

    res.status(201).json({ success: true, notification });
  } catch (error) {
    console.error('❌ Error creating PWA notification:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// ==============================
// Enhanced Medicine Notification to PWA
// ==============================
export const createMedicineNotificationToPWA = async (req, res) => {
  try {
    const {
      userId,
      bookingId,
      pharmacyName,
      pharmacyId,
      patientName,
      patientMobile
    } = req.body;

    const conn = req.conn || mongoose;
    const Notification = notificationModel(conn);
    const serviceType = 'Medicine';
    const message = `${pharmacyName} accepted your ${serviceType} booking`;

    // Verify booking exists
    const MedicineModel = conn.models.Medicine23 || conn.model('Medicine23');
    const bookingExists = await MedicineModel.findOne({ 'bookings.bookingId': bookingId });

    if (!bookingExists) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid bookingId: not found in Medicine23 collection' 
      });
    }

    const notification = new Notification({
      message,
      for: 'PWA',
      userId,
      serviceType,
      bookingId,
      pharmacyName,
      pharmacyId,
      patientName,
      patientMobile,
      status: 'accepted'
    });

    await notification.save();

    // Emit to patient's room
    if (typeof io !== 'undefined') {
      io.to(userId.toString()).emit('pharmacyBookingAccepted', {
        message, 
        bookingId, 
        pharmacyName, 
        pharmacyId, 
        serviceType,
        timestamp: new Date()
      });
    }

    res.status(201).json({ success: true, notification });
  } catch (error) {
    console.error('❌ Error creating PWA Medicine notification:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// ==============================
// Enhanced Vaccination Notification to PWA
// ==============================
export const createVaccinationNotificationToPWA = async (req, res) => {
  try {
    const {
      userId,
      bookingId,
      pharmacyName,
      pharmacyId,
      patientName,
      patientMobile
    } = req.body;

    const conn = req.conn || mongoose;
    const Notification = notificationModel(conn);
    const serviceType = 'Vaccination';
    const message = `${pharmacyName} accepted your ${serviceType} booking`;

    // Verify booking exists
    const VaccinationModel = conn.models.vaccination10 || conn.model('vaccination10');
    const bookingExists = await VaccinationModel.findOne({ 'patientMobile': patientMobile });

    if (!bookingExists) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid booking: not found in vaccination10 collection' 
      });
    }

    const notification = new Notification({
      message,
      for: 'PWA',
      userId,
      serviceType,
      bookingId,
      pharmacyName,
      pharmacyId,
      patientName,
      patientMobile,
      status: 'accepted'
    });

    await notification.save();

    // Emit to patient's room
    if (typeof io !== 'undefined') {
      io.to(userId.toString()).emit('pharmacyBookingAccepted', {
        message, 
        bookingId, 
        pharmacyName, 
        pharmacyId, 
        serviceType,
        timestamp: new Date()
      });
    }

    res.status(201).json({ success: true, notification });
  } catch (error) {
    console.error('❌ Error creating PWA Vaccination notification:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// ==============================
// Enhanced Get Notifications for Pharmacy
// ==============================
export const getPharmacyNotificationsForPharmacy = async (req, res) => {
  try {
    const conn = req.conn || mongoose;
    const Notification = notificationModel(conn);

    const notifications = await Notification.find({ for: 'Pharmacy' })
      .sort({ createdAt: -1 })
      .limit(50); // Limit to prevent performance issues

    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error('❌ Error fetching pharmacy notifications:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch notifications' });
  }
};

// ==============================
// Enhanced Get Notifications for PWA
// ==============================
// export const getPharmacyNotificationsForPWA = async (req, res) => {
//   try {
//     const { mobileNumber } = req.query;

//     if (!mobileNumber) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Mobile number is required' 
//       });
//     }

//     const conn = req.conn || mongoose;
//     const Notification = notificationModel(conn);

//     const notifications = await Notification.find({ 
//       for: 'PWA', 
//       patientMobile: mobileNumber 
//     })
//       .sort({ createdAt: -1 })
//       .limit(50);

//     res.status(200).json({ success: true, notifications });
//   } catch (error) {
//     console.error('❌ Error fetching notifications for PWA:', error);
//     res.status(500).json({ success: false, message: 'Failed to fetch notifications' });
//   }
// };

export const getPharmacyNotificationsForPWA = async (req, res) => {
  try {
    const { mobileNumber } = req.query;

    if (!mobileNumber) {
      return res.status(400).json({ 
        success: false, 
        message: 'Mobile number is required' 
      });
    }

    const conn = req.conn || mongoose;
    const Notification = notificationModel(conn);

    // Load the medicine23 model
    const MedicineModel = conn.models.medicine23 || conn.model('medicine23', new mongoose.Schema({
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      bookings: [{
        bookingId: String,
        mobileNumber: String,
        status: String
      }]
    }));

    // Step 1: Find if mobileNumber exists and fetch userId
    const bookingDoc = await MedicineModel.findOne(
      { 'bookings.mobileNumber': mobileNumber },
      { userId: 1 }
    );

    if (!bookingDoc) {
      return res.status(404).json({ 
        success: false, 
        message: `No bookings found for mobile number '${mobileNumber}' in medicine23.` 
      });
    }

    const userId = bookingDoc.userId;

    // Step 2: Get notifications using userId
    const notifications = await Notification.find({ 
      for: 'PWA', 
       
    })
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({ 
      success: true, 
      userId, 
      notifications 
    });
  } catch (error) {
    console.error('❌ Error fetching notifications for PWA:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch notifications' });
  }
};


// ==============================
// Mark Notification as Read
// ==============================
export const markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const conn = req.conn || mongoose;
    const Notification = notificationModel(conn);

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ 
        success: false, 
        message: 'Notification not found' 
      });
    }

    res.status(200).json({ success: true, notification });
  } catch (error) {
    console.error('❌ Error marking notification as read:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// ==============================
// Delete Notification
// ==============================
export const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const conn = req.conn || mongoose;
    const Notification = notificationModel(conn);

    const notification = await Notification.findByIdAndDelete(notificationId);

    if (!notification) {
      return res.status(404).json({ 
        success: false, 
        message: 'Notification not found' 
      });
    }

    res.status(200).json({ success: true, message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting notification:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// ==============================
// Get Notification Count
// ==============================
export const getNotificationCount = async (req, res) => {
  try {
    const { mobileNumber } = req.query;
    const conn = req.conn || mongoose;
    const Notification = notificationModel(conn);

    const filter = mobileNumber 
      ? { for: 'PWA', patientMobile: mobileNumber, isRead: false }
      : { for: 'Pharmacy', isRead: false };

    const count = await Notification.countDocuments(filter);

    res.status(200).json({ success: true, count });
  } catch (error) {
    console.error('❌ Error getting notification count:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Legacy functions for backward compatibility
export const createNotification = async (req, res) => {
  try {
    const {
      message,
      for: target,
      userId,
      serviceType,
      bookingId,
      draName,
      draId,
      patientName
    } = req.body;

    const conn = req.conn || mongoose;
    const Notification = notificationModel(conn);

    let patientMobile = null;

    if (target === 'DRA' && bookingId) {
      let bookingDoc = null;

      if (serviceType === 'HomeCare') {
        const HomeModel = conn.model('Home23');
        bookingDoc = await HomeModel.findOne({ 'bookings.bookingId': bookingId }, { 'bookings.$': 1 });
        patientMobile = bookingDoc?.bookings?.[0]?.mobileNumber;
      } else if (serviceType === 'Vaccination') {
        const VaccinationModel = conn.model('vaccination10');
        bookingDoc = await VaccinationModel.findOne({ 'bookings.bookingId': bookingId }, { 'bookings.$': 1 });
        patientMobile = bookingDoc?.bookings?.[0]?.mobileNumber;
      } else if (serviceType === 'UrgentCare') {
        const UrgentModel = conn.model('UrgentCase');
        bookingDoc = await UrgentModel.findOne({ 'bookings.bookingId': bookingId }, { 'bookings.$': 1 });
        patientMobile = bookingDoc?.bookings?.[0]?.mobileNumber;
      } else if (serviceType === 'Nursing') {
        const NursingModel = conn.model('Nursing23');
        bookingDoc = await NursingModel.findOne({ 'bookings.bookingId': bookingId }, { 'bookings.$': 1 });
        patientMobile = bookingDoc?.bookings?.[0]?.mobileNumber;
      }
    }

    const notification = new Notification({
      message,
      for: target,
      userId,
      serviceType,
      bookingId,
      draName,
      draId,
      patientName,
      patientMobile
    });

    await notification.save();

    if (target === 'DRA') {
      if (typeof io !== 'undefined') {
        io.emit('newBooking', {
          message,
          serviceType,
          bookingId,
          patientName,
          patientMobile
        });
      }
    } else if (target === 'PWA' && userId) {
      if (typeof io !== 'undefined') {
        io.to(userId.toString()).emit('bookingAccepted', {
          message,
          bookingId,
          draName,
          draId
        });
      }
    }

    res.status(201).json({ success: true, notification });
  } catch (error) {
    console.error('❌ Error creating notification:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const { userId, role } = req.query;
    const conn = req.conn || mongoose;
    const Notification = notificationModel(conn);

    const filter = role === 'DRA'
      ? { for: 'DRA' }
      : { for: 'PWA', userId };

    const notifications = await Notification.find(filter).sort({ createdAt: -1 });

    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error('❌ Error fetching notifications:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch notifications' });
  }
};