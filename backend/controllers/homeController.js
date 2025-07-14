// controllers/bookingController.js
import multer from 'multer';
import mongoose from 'mongoose';
import Grid from 'gridfs-stream';
import { GridFsStorage } from 'multer-gridfs-storage';
import moment from 'moment';
import Document from '../models/Home.js'; // Assuming Document is the model
import User from '../models/User.js'; // Import User model
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

export const Home = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).send({ error: err.message });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).send({ error: 'No files were uploaded.' });
    }

    const { phoneNumber, patientName, patientGender, startDate, timeSlot, height, weight, bloodGroup, careType } = req.body;

    // Validate required fields
    if (!phoneNumber) {
      return res.status(400).send({ error: 'phoneNumber is required' });
    }
    if (!patientName) {
      return res.status(400).send({ error: 'patientName is required' });
    }
    if (!patientGender) {
      return res.status(400).send({ error: 'patientGender is required' });
    }
    if (!startDate) {
      return res.status(400).send({ error: 'startDate is required' });
    }
    if (!timeSlot) {
      return res.status(400).send({ error: 'timeslot is required' });
    }

    const formattedStartDate = moment(startDate).format('DD/MM/YY');

    let cost;
    switch (careType) {
      case 'DailyBasis':
        cost = 1499;
        break;
      case 'WeeklyBasis':
        cost = 6999;
        break;
      case 'MonthlyBasis':
        cost = 29999;
        break;
      default:
        return res.status(400).json({ message: 'Invalid care type' });
    }

    try {
      console.log('Finding user by phone number:', phoneNumber);
      const user = await User.findOne({ mobile: phoneNumber });
      if (!user) {
        console.error('User not found');
        return res.status(404).send({ error: 'User not found' });
      }

      const userId = user._id;

      console.log('Finding or creating document for user ID:', userId);
      let labDocument = await Document.findOne({ userId });
      if (!labDocument) {
        console.log('Creating new document for user ID:', userId);
        labDocument = new Document({ userId, bookings: [] });
      }

      const booking = {
        mobileNumber:phoneNumber,
        files: req.files.map(file => file.id),
        patientName,
        patientGender,
        startDate: formattedStartDate,
        timeSlot,
        height,
        weight,
        bloodGroup,
        prescriptionId: req.files.map(file => file.id),
        careType,
        cost
      };

      console.log('Adding new booking to the document');
      labDocument.bookings.push(booking);

      console.log('Saving document');
      await labDocument.save();

      console.log('Document saved successfully');
      res.status(201).json(labDocument);
    } catch (error) {
      console.error('Error saving document:', error);
      res.status(500).send({ error: 'Failed to save document', details: error.message });
    }
  });
};







// WorkingCode
export const getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Find the document that contains the booking with the given ID
    const document = await Document.findOne({ 'bookings._id': bookingId });

    if (!document) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Find the specific booking from the array
    const booking = document.bookings.id(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking ID not found in user document' });
    }

    res.status(200).json({ booking });
  } catch (error) {
    console.error('Error retrieving booking:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


// KamalCode start
// export const getBookingById = async (req, res) => {
//   try {
//     const { homeId } = req.params;

//     if (!homeId || typeof homeId !== 'string') {
//       return res.status(400).json({ message: 'Invalid or missing homeId in request' });
//     }

//     // Find the document that contains a booking with this homeId
//     const document = await Document.findOne({ 'bookings.homeId': homeId });

//     if (!document) {
//       return res.status(404).json({ message: 'No document found with this homeId' });
//     }

//     // Find the booking inside the bookings array with the matching homeId
//     const booking = document.bookings.find(
//       (b) => typeof b?.homeId === 'string' && b.homeId === homeId
//     );

//     if (!booking) {
//       return res.status(404).json({
//         message: 'Home ID not found in user document',
//         allHomeIds: document.bookings.map((b) => b?.homeId || 'undefined'),
//       });
//     }

//     return res.status(200).json({ booking });

//   } catch (error) {
//     console.error('Error retrieving booking by homeId:', error);
//     return res.status(500).json({
//       message: 'Internal server error',
//       error: error.message
//     });
//   }
// };





// KamalCode End
