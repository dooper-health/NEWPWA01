// // controllers/bookingController.js
// //final code
// import multer from 'multer';
// import mongoose from 'mongoose';
// import Grid from 'gridfs-stream';
// import { GridFsStorage } from 'multer-gridfs-storage';
// import moment from 'moment';
// import Document from '../models/Nursing.js'; // Assuming Document is the model
// import User from '../models/User.js'; // Import User model

// const conn = mongoose.connection;
// let gfs;
// conn.once('open', () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
// });

// const storage = new GridFsStorage({
//   url: 'mongodb+srv://prachirberiwal:xlPU80g66TxYqMfx@pwacluster.1pzyu.mongodb.net/?retryWrites=true&w=majority&appName=PWAcluster',
//   file: (req, file) => {
//     return {
//       filename: Date.now() + '-' + file.originalname,
//       bucketName: 'uploads'
//     };
//   }
// });

// const upload = multer({ storage }).array('prescription', 10);

// export const Nursing = (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(400).send({ error: err.message });
//     }

//     if (!req.files || req.files.length === 0) {
//       return res.status(400).send({ error: 'No files were uploaded.' });
//     }

//     const { phoneNumber,  patientName, patientAge, patientGender, startDate, timeSlot, height, weight, bloodGroup,careType } = req.body;

//     if (!phoneNumber) {
//       return res.status(400).send({ error: 'phoneNumber is required' });
//     }
//     // if (!Lab) {
//     //   return res.status(400).send({ error: 'Lab is required' });
//     // }
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
//     if (!timeSlot) {
//       return res.status(400).send({ error: 'timeslot is required' });
//     }

//     const formattedStartDate = moment(startDate).format('DD/MM/YY');

//       // Calculate cost based on careType
//   let cost;
//   switch (careType) {
//     case '1Hour':
//       cost = 50;
//       break;
//     case '4Hour':
//       cost = 180;
//       break;
//     case '8Hour':
//       cost = 350;
//       break;
//     case '12Hour':
//       cost = 500;
//       break;
//     case '24Hour':
//       cost = 900;
//       break;
//     default:
//       return res.status(400).json({ message: 'Invalid care type' });
//   }


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
//         files: req.files.map(file => file.id),
//         Lab,
//         patientName,
//         patientAge,
//         patientGender,
//         startDate: formattedStartDate,
//         timeSlot,
//         height,
//         weight,
//         bloodGroup,
//         prescriptionId: req.files.map(file => file.id),// Store the file ID
//         careType,
//         cost

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

// controllers/bookingController.js
import multer from 'multer';
import mongoose from 'mongoose';
import Grid from 'gridfs-stream';
import { GridFsStorage } from 'multer-gridfs-storage';
import moment from 'moment';
import Document from '../models/Nursing.js'; // Assuming Document is the model
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

export const Nursing = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).send({ error: err.message });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).send({ error: 'No files were uploaded.' });
    }

    const { phoneNumber, patientName, patientGender, startDate, timeSlot, height, weight, bloodGroup, careType} = req.body;

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
      case '1Hour':
        cost = 499;
        break;
      case '4Hour':
        cost = 699;
        break;
      case '8Hour':
        cost = 999;
        break;
      case '12Hour':
        cost = 1499;
        break;
      case '24Hour':
        cost = 900;
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
      res.status(500).send({ error: 'Failed to save document' });
    }
  });
};
