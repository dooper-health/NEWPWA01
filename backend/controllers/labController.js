// //final code
// import multer from 'multer';
// import mongoose from 'mongoose';
// import Grid from 'gridfs-stream';
// import { GridFsStorage } from 'multer-gridfs-storage';
// import moment from 'moment';
// import Document from '../models/Lab.js'; // Assuming Document is the model
// import User from '../models/User.js'; // Import User model
// import dotenv from 'dotenv';
// dotenv.config();

// const conn = mongoose.connection;
// let gfs;
// conn.once('open', () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
// });

// const storage = new GridFsStorage({
//   url: process.env.MONGO_URI,
//   file: (req, file) => {
//     return {
//       filename: Date.now() + '-' + file.originalname,
//       bucketName: 'uploads'
//     };
//   }
// });

// const upload = multer({ storage }).array('prescription', 10);

// export const Lab = (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(400).send({ error: err.message });
//     }

//     if (!req.files || req.files.length === 0) {
//       return res.status(400).send({ error: 'No files were uploaded.' });
//     }

//     const { phoneNumber, Lab, patientName, patientAge, patientGender, startDate, timeslot, dhaCharge,details} = req.body;

//     if (!phoneNumber) {
//       return res.status(400).send({ error: 'phoneNumber is required' });
//     }
//     if (!Lab) {
//       return res.status(400).send({ error: 'Lab is required' });
//     }
//     if (!patientName) {
//       return res.status(400).send({ error: 'patientName is required' });
//     }
//     if (!patientAge) {
//       return res.status(400).send({ error: 'patientAge is required' });
//     }
//     if (!patientGender) {
//       return res.status(400).send({ error: 'patientGender is required' });
//     }
//     if (!startDate) {
//       return res.status(400).send({ error: 'startDate is required' });
//     }
//     if (!timeslot) {
//       return res.status(400).send({ error: 'timeslot is required' });
//     }

//     const formattedStartDate = moment(startDate).format('DD/MM/YY');

//     try {
//       // Step 1: Find the user by phone number
//       const user = await User.findOne({ mobile: phoneNumber });
//       if (!user) {
//         return res.status(404).send({ error: 'User not found' });
//       }

//       // Step 2: Get the user ID
//       const userId = user._id;

//       // Step 3: Find or create a lab document for the user
//       let labDocument = await Document.findOne({ userId });
//       if (!labDocument) {
//         labDocument = new Document({ userId, bookings: [] });
//       }

//       // Step 4: Create a new booking
//       const booking = {
//         mobileNumber:phoneNumber,
//         files: req.files.map(file => file.id),
//         Lab,
//         patientName,
//         patientAge,
//         patientGender,
//         startDate: formattedStartDate,
//         timeslot,
//         dhaCharge,
//         details,
//         prescriptionId: req.files.map(file => file.id) // Store the file ID
//       };

//       // Step 5: Add the new booking to the user's bookings array
//       labDocument.bookings.push(booking);

//       // Step 6: Save the document
//       await labDocument.save();

//       res.status(201).json(labDocument);
//     } catch (error) {
//       res.status(500).send({ error: 'Failed to save document' });
//     }
//   });
// };


// //final code
// import multer from 'multer';
// import mongoose from 'mongoose';
// import Grid from 'gridfs-stream';
// import { GridFsStorage } from 'multer-gridfs-storage';
// import moment from 'moment';
// import Document from '../models/Lab.js'; // Assuming Document is the model
// import User from '../models/User.js'; // Import User model
// import dotenv from 'dotenv';
// dotenv.config();

// const conn = mongoose.connection;
// let gfs;
// conn.once('open', () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
// });

// const storage = new GridFsStorage({
//   url: process.env.MONGO_URI,
//   file: (req, file) => {
//     return {
//       filename: Date.now() + '-' + file.originalname,
//       bucketName: 'uploads'
//     };
//   }
// });

// const upload = multer({ storage }).array('prescription', 10);

// export const Lab = (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(400).send({ error: err.message });
//     }

//     if (!req.files || req.files.length === 0) {
//       return res.status(400).send({ error: 'No files were uploaded.' });
//     }

//     const { phoneNumber, Lab, patientName, patientAge, patientGender, startDate, timeslot, dhaCharge,details} = req.body;

//     if (!phoneNumber) {
//       return res.status(400).send({ error: 'phoneNumber is required' });
//     }
//     if (!Lab) {
//       return res.status(400).send({ error: 'Lab is required' });
//     }
//     if (!patientName) {
//       return res.status(400).send({ error: 'patientName is required' });
//     }
//     if (!patientAge) {
//       return res.status(400).send({ error: 'patientAge is required' });
//     }
//     if (!patientGender) {
//       return res.status(400).send({ error: 'patientGender is required' });
//     }
//     if (!startDate) {
//       return res.status(400).send({ error: 'startDate is required' });
//     }
//     if (!timeslot) {
//       return res.status(400).send({ error: 'timeslot is required' });
//     }

//     const formattedStartDate = moment(startDate).format('DD/MM/YY');

//     try {
//       // Step 1: Find the user by phone number
//       const user = await User.findOne({ mobile: phoneNumber });
//       if (!user) {
//         return res.status(404).send({ error: 'User not found' });
//       }

//       // Step 2: Get the user ID
//       const userId = user._id;

//       // Step 3: Find or create a lab document for the user
//       let labDocument = await Document.findOne({ userId });
//       if (!labDocument) {
//         labDocument = new Document({ userId, bookings: [] });
//       }

//       // Step 4: Create a new booking
//       const booking = {
//         mobileNumber:phoneNumber,
//         files: req.files.map(file => file.id),
//         Lab,
//         patientName,
//         patientAge,
//         patientGender,
//         startDate: formattedStartDate,
//         timeslot,
//         dhaCharge,
//         details,
//         prescriptionId: req.files.map(file => file.id) // Store the file ID
//       };

//       // console.log(booking)
//       // Step 5: Add the new booking to the user's bookings array
//       labDocument.bookings.push(booking);

//       // Step 6: Save the document
//       await labDocument.save();

//       console.log(labDocument)

//       res.status(201).json(labDocument);
//     } catch (error) {
//       res.status(500).send({ error: 'Failed to save document' });
//     }
//   });
// };
//final code
import multer from 'multer';
import mongoose from 'mongoose';
import Grid from 'gridfs-stream';
import { GridFsStorage } from 'multer-gridfs-storage';
import moment from 'moment';
import Document from '../models/Lab.js'; // Assuming Document is the model
import User from '../models/User.js'; // Import User model
import NotificationModel from '../models/Notification.js';
import dotenv from 'dotenv';
dotenv.config();

const conn = mongoose.connection;
let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return {
      filename: Date.now() + '-' + file.originalname,
      bucketName: 'uploads'
    };
  }
});

const upload = multer({ storage }).array('prescription', 10);

// Helper to get Notification model
const Notification = NotificationModel(mongoose);

// Generate unique booking ID
const generateBookingId = () => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `LAB${timestamp.slice(-6)}${random}`;
};

export const Lab = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send({ error: err.message });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).send({ error: 'No files were uploaded.' });
    }

    const { phoneNumber, Lab, patientName, patientAge, patientGender, startDate, timeslot, dhaCharge, details } = req.body;

    if (!phoneNumber) {
      return res.status(400).send({ error: 'phoneNumber is required' });
    }
    if (!Lab) {
      return res.status(400).send({ error: 'Lab is required' });
    }
    if (!patientName) {
      return res.status(400).send({ error: 'patientName is required' });
    }
    if (!patientAge) {
      return res.status(400).send({ error: 'patientAge is required' });
    }
    if (!patientGender) {
      return res.status(400).send({ error: 'patientGender is required' });
    }
    if (!startDate) {
      return res.status(400).send({ error: 'startDate is required' });
    }
    if (!timeslot) {
      return res.status(400).send({ error: 'timeslot is required' });
    }

    const formattedStartDate = moment(startDate).format('DD/MM/YY');
    const bookingId = generateBookingId();

    try {
      // Step 1: Find the user by phone number
      const user = await User.findOne({ mobile: phoneNumber });
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }

      // Step 2: Get the user ID
      const userId = user._id;

      // Step 3: Find or create a lab document for the user
      let labDocument = await Document.findOne({ userId });
      if (!labDocument) {
        labDocument = new Document({ userId, bookings: [] });
      }

      // Step 4: Create a new booking
      const booking = {
        bookingId: bookingId,
        mobileNumber: phoneNumber,
        files: req.files.map(file => file.id),
        Lab,
        patientName,
        patientAge: Number(patientAge), // Ensure patientAge is a number
        patientGender,
        startDate: formattedStartDate,
        timeslot,
        dhaCharge: dhaCharge || 100, // Ensure dhaCharge is a number, use 0 if undefined
        details,
        prescriptionId: req.files.map(file => file.id) // Store the file ID
      };

      // Step 5: Add the new booking to the user's bookings array
      labDocument.bookings.push(booking);

      // Step 6: Save the document
      await labDocument.save();

      // Step 7: Create notification for Lab
      try {
        await Notification.create({
          message: `New Lab booking request for ${Lab}`,
          for: 'Lab',
          bookingId: bookingId,
          serviceType: 'Lab',
          labId: 'default-lab-id', // You can replace this with actual lab ID if available
          labName: Lab,
          patientMobile: phoneNumber,
          patientName: patientName,
          status: 'incoming',
        });
      } catch (notificationError) {
        console.error('Failed to create notification:', notificationError);
        // Don't fail the booking if notification fails
      }

      console.log('Lab booking created with ID:', bookingId);

      res.status(201).json({
        success: true,
        message: 'Lab booking created successfully',
        bookingId: bookingId,
        labDocument: labDocument
      });
    } catch (error) {
      console.error('Lab booking error:', error);
      res.status(500).send({ error: 'Failed to save document' });
    }
  });
};
