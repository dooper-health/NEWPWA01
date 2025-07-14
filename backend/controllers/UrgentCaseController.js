import UrgentCase from "../models/UrgentCaseModel.js";
import User1 from "../models/User1.js";
import User from "../models/User.js"; // Import User model
import mongoose from "mongoose";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import crypto from "crypto";
import path from "path";
import dotenv from "dotenv";
import { v4 as uuidv4 } from 'uuid';
import { BlobServiceClient } from '@azure/storage-blob'
import { Readable } from 'stream'


dotenv.config(); // Load environment variables

const sasToken = process.env.SAS_TOKEN
const accountName = process.env.ACCOUNT_NAME
const containerName = process.env.CONTAINER_NAME
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING

if (!AZURE_STORAGE_CONNECTION_STRING) {
  throw Error('Azure Storage Connection string not found');
}

// const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net/?${sasToken}`)
// const containerClient = blobServiceClient.getContainerClient(containerName)

// const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`);
const blobServiceClient = BlobServiceClient.fromConnectionString(
  AZURE_STORAGE_CONNECTION_STRING
);

const containerClient = blobServiceClient.getContainerClient(containerName);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 200 * 1024 * 1024 },
});


const uploadVidoeToAzure = async (req, res) => {
  const file = req.file
  if (!file) {
    return "No file Uploaded"
  }
  const blobName = `${uuidv4()}-${file.originalname}`;
  // const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);


  try {

    const uploadOptions = { bufferSize: 4 * 1024 * 1024, maxBuffers: 20 };

    const stream = Readable.from(file.buffer);

    await blockBlobClient.uploadStream(stream, uploadOptions.bufferSize, uploadOptions.maxBuffers, {
      blobHTTPHeaders: { blobContentType: file.mimetype },
    });

    // await blockBlobClient.uploadData(file.buffer, {
    //   blobHTTPHeaders: { blobContentType: file.mimetype }, // Set the correct content type
    // });

    const url = blockBlobClient.url;
    return url;
  } catch (error) {
    console.error("Azure upload error: ", error);
    throw new Error("Failed to upload video to Azure Blob Storage");
  }

}





// // Create storage engine for uploading files
// const storage = new GridFsStorage({
//   url: process.env.MONGO_URI,
//   options: { useNewUrlParser: true, useUnifiedTopology: true },
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString("hex") + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: "uploads", // Save in the 'uploads' collection
//         };
//         resolve(fileInfo);
//       });
//     });
//   },
// });

// const upload = multer({ storage });

export const createUrgentCase = async (req, res) => {

  const { symptoms, patientName, patientsNote, mobileNumber } = req.body;
  console.log(req.body);

  try {
    const videoNote = req.file ? req.file.filename : null; // Get video filename if present
    const videoFileId = req.file ? req.file.id : null; // Get file ID

    const videoNoteUrl = await uploadVidoeToAzure(req, res)
    console.log(videoNoteUrl)

    const user = await User1.findOne({ mobileNumber });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = user._id;

    let urgentCaseDocument = await UrgentCase.findOne({ userId });
    if (!urgentCaseDocument) {

      urgentCaseDocument = new UrgentCase({ userId, bookings: [] });
    }
    console.log("age: ", user.age);
    // Create a new booking entry
    const booking = {
      mobileNumber,
      symptoms,
      patientName,
      patientAge: user.age,
      patientsNote,
      videoNote: videoNoteUrl,
      // videoFileId,
      patientBookingId: uuidv4()
    };

    // Add the new booking to the bookings array
    urgentCaseDocument.bookings.push(booking);

    // Save the updated urgent case document
    await urgentCaseDocument.save();

    // Add reference of the case to the user's urgent cases array if needed
    user.urgentCases = user.urgentCases || [];
    user.urgentCases.push(urgentCaseDocument._id); // Store the case ID in user's array
    await user.save();

    res.status(201).json(urgentCaseDocument);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { upload };
