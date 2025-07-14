// practice 02
import multer from 'multer';
import mongoose from 'mongoose';
import Grid from 'gridfs-stream';
import { GridFsStorage } from 'multer-gridfs-storage';
import moment from 'moment';
import Document from '../models/MedicineModel.js'; // Assuming Document is the model
import User from '../models/User.js'; // Import User model
import { triggerBookingNotification } from './notificationController.js';
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

export const createMedicine = (req, res) => {
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
    if (!details) {
      return res.status(400).send({ error: 'details are required' });
    }

    const formattedStartDate = moment(startDate).format('DD/MM/YY');

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
        mobileNumber: phoneNumber,
        files: req.files.map(file => file.id),
        Medicine: Lab,
        patientName,
        patientAge,
        patientGender,
        startDate: formattedStartDate,
        timeslot,
        dhaCharge,
        details,
        prescriptionId: req.files.map(file => file.id)
      };

      // Step 5: Add the new booking to the user's bookings array
      labDocument.bookings.push(booking);

      // Step 6: Save the document
      await labDocument.save();

      // Step 7: Trigger notification for pharmacy
      try {
        const latestBooking = labDocument.bookings[labDocument.bookings.length - 1];
        await triggerBookingNotification(
          {
            mobileNumber: phoneNumber,
            patientName,
            bookingId: latestBooking.bookingId
          },
          'Medicine',
          mongoose
        );
        console.log('✅ Medicine booking notification triggered successfully');
      } catch (notificationError) {
        console.error('⚠️ Failed to trigger notification:', notificationError);
        // Don't fail the booking creation if notification fails
      }
      
      res.status(201).json(labDocument);
    } catch (error) {
      console.error('❌ Error creating medicine booking:', error);
      res.status(500).send({ error: 'Failed to save document' });
    }
  });
};
