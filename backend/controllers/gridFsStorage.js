// import mongoose from 'mongoose';
// import gridfs from 'mongoose-gridfs';
// import multer from 'multer';

// const mongoURI = 'mongodb://localhost:27017/labatlas';

// const conn = mongoose.createConnection(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// const { model: Attachment } = gridfs({ collection: 'uploads', model: 'Attachment', mongooseConnection: conn });

// const storage = {
//   _handleFile: function (req, file, cb) {
//     const writeStream = Attachment.write({ filename: file.originalname }, file.stream, (error, file) => {
//       if (error) {
//         return cb(error);
//       }
//       cb(null, { id: file._id, filename: file.filename });
//     });
//   },
//   _removeFile: function (req, file, cb) {
//     Attachment.unlinkById(file.id, cb);
//   }
// };

// const upload = multer({ storage });

// export { Attachment, upload };



// import multer from 'multer';
// import { GridFsStorage } from 'multer-gridfs-storage';
// import crypto from 'crypto';
// import path from 'path';
// import mongoose from 'mongoose';

// const mongoURI = 'your_mongodb_uri';

// const storage = new GridFsStorage({
//   url: mongoURI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads' // collection name in MongoDB
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });

// const upload = multer({ storage });

// export default upload;



// import multer from "multer";
// import { GridFsStorage } from "multer-gridfs-storage";
// import crypto from "crypto";
// import path from "path";
// import mongoose from "mongoose";

// const mongoURI = "mongodb://localhost:27017/labatlas";

// const storage = new GridFsStorage({
//   url: mongoURI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString("hex") + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: "uploads",
//         };
//         resolve(fileInfo);
//       });
//     });
//   },
// });

// const upload = multer({ storage });

// export default upload;




import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGO_URI;

const storage = new GridFsStorage({
  url: mongoURI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: 'uploads', // collection name
      };
      resolve(fileInfo);
    });
  },
});

const upload = multer({ storage });

export default upload;
