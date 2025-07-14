// //local database 
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 50000, // Increase timeout to 50 seconds
//       socketTimeoutMS: 45000, // Set socket timeout to 45 seconds
//     });
//     const conn2 = await mongoose.connect(process.env.MONGO_URI2, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 50000, // Increase timeout to 50 seconds
//       socketTimeoutMS: 45000, // Set socket timeout to 45 seconds
//     });


//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (err) {
//     console.error(`Error: ${err.message}`);
//     process.exit(1);
//   }
// };

// export default connectDB;


// //cloud database
// // import mongoose from 'mongoose';
// // const connectDB = async () => {
// //   try {
// //     const conn = await mongoose.connect(process.env.MONGO_URI|| 'mongodb+srv://dooper:zaKnkcwomfgnzy0j@cluster0.baaa2xr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
// //       useNewUrlParser: true,
// //       useUnifiedTopology: true,
// //       serverSelectionTimeoutMS: 50000, // Increase timeout to 50 seconds
// //       socketTimeoutMS: 45000, // Set socket timeout to 45 seconds
// //     });
// //     console.log(`MongoDB Connected: ${conn.connection.host}`);
// //   } catch (err) {
// //     console.error(`Error: ${err.message}`);
// //     process.exit(1);
// //   }
// // };
// // export default connectDB;



import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    // First DB: use default connection
    const conn1 = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected (default): ${conn1.connection.host}`);

    // Second DB: create separate connection
    const conn2 = await mongoose.createConnection(process.env.MONGO_URI2, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected (second): ${conn2.host}`);

    // Optional: export both connections if you need
    return { default: mongoose.connection, second: conn2 };
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
