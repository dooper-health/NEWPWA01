// //practice
// //perfectly running code
// import { generateOtp, verifyOtp, startService } from '../services/otpService.js';
// import Otp from '../models/Otp.js';
// import Timer from '../models/Timer.js';

// const timers = {};

// // Function to create a stopwatch
// // Function to create a stopwatch
// const createStopwatch = (phoneNumber) => {
//   let interval;

//   const start = async () => {
//     if (interval) clearInterval(interval);

//     const timer = await Timer.findOneAndUpdate(
//       { phoneNumber },
//       { $set: { running: true, lastStartTime: new Date() }, $setOnInsert: { hours: 0, minutes: 0, seconds: 0 } },
//       { upsert: true, new: true }
//     );

//     interval = setInterval(async () => {
//       const currentTimer = await Timer.findOne({ phoneNumber });
//       if (!currentTimer.running) {
//         clearInterval(interval);
//         return;
//       }

//       currentTimer.seconds += 1;
//       if (currentTimer.seconds >= 60) {
//         currentTimer.seconds = 0;
//         currentTimer.minutes += 1;
//         if (currentTimer.minutes >= 60) {
//           currentTimer.minutes = 0;
//           currentTimer.hours += 1;
//         }
//       }
//       await currentTimer.save();
//     }, 1000);

//     timers[phoneNumber] = interval;
//   };

//   const stop = async () => {
//     clearInterval(interval);
//     const timer = await Timer.findOne({ phoneNumber });
//     if (timer && timer.running) {
//       timer.running = false;
//       await timer.save();
//     }
//   };

//   return { start, stop };
// };

// // Send OTP
// const sendOtp = async (req, res) => {
//   const { phoneNumber } = req.body;
//   try {
//     const { otp, createdAt } = await generateOtp(phoneNumber);
//     res.status(200).json({ otp, createdAt });
//   } catch (err) {
//     console.error('Error during OTP generation:', err);
//     res.status(500).json({ msg: 'Error during OTP generation', error: err.message });
//   }
// };

// // Check OTP and manage stopwatch
// const checkOtp = async (req, res) => {
//   const { phoneNumber, otp } = req.body;
//   try {
//     const isValid = await verifyOtp(phoneNumber, otp);
//     if (isValid) {
//       const timer = await Timer.findOne({ phoneNumber });
//       const stopwatch = createStopwatch(phoneNumber);

//       // If the stopwatch is running, stop it and stop updating the database
//       if (timer && timer.running) {
//         await stopwatch.stop();
//         res.status(200).json({ message: 'OTP verified successfully. Stopwatch stopped.' });
//       } else {
//         await stopwatch.start();
//         res.status(200).json({ message: 'OTP verified successfully. Stopwatch started.', verifiedAt: new Date() });
//       }

//       // Remove OTP from the database for the verified phone number
//       await Otp.findOneAndDelete({ phoneNumber });
//     } else {
//       res.status(400).json({ message: 'Invalid OTP' });
//     }
//   } catch (error) {
//     console.error('Error during OTP verification:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// export { sendOtp, checkOtp };

// practice
// backend/controllers/otpController.js

import { generateOtp, verifyOtp } from '../services/otpService.js';
import Otp from '../models/Otp.js';
import Timer from '../models/Timer.js';
import User from '../models/User.js';

const phoneNumber = "123123"; // Hardcoded phone number for testing

const timers = {};

const createStopwatch = () => {
  let interval;

  const start = async () => {
    if (interval) clearInterval(interval);

    const timer = await Timer.findOneAndUpdate(
      { phoneNumber },
      { $set: { running: true, lastStartTime: new Date() }, $setOnInsert: { hours: 0, minutes: 0, seconds: 0 } },
      { upsert: true, new: true }
    );

    interval = setInterval(async () => {
      const currentTimer = await Timer.findOne({ phoneNumber });
      if (!currentTimer.running) {
        clearInterval(interval);
        return;
      }

      currentTimer.seconds += 1;
      if (currentTimer.seconds >= 60) {
        currentTimer.seconds = 0;
        currentTimer.minutes += 1;
        if (currentTimer.minutes >= 60) {
          currentTimer.minutes = 0;
          currentTimer.hours += 1;
        }
      }
      await currentTimer.save();
    }, 1000);

    timers[phoneNumber] = interval;
  };

  const stop = async () => {
    clearInterval(interval);
    const timer = await Timer.findOne({ phoneNumber });
    if (timer && timer.running) {
      timer.running = false;
      await timer.save();
    }
  };

  return { start, stop };
};

const sendOtp = async (req, res) => {
  try {
    const { otp, createdAt } = await generateOtp(phoneNumber);
    res.status(200).json({ otp, createdAt });
  } catch (err) {
    console.error('Error during OTP generation:', err);
    res.status(500).json({ msg: 'Error during OTP generation', error: err.message });
  }
};

const checkOtp = async (req, res) => {
  const { otp } = req.body; // Assuming phoneNumber and otp are sent in the request body
  try {
    const isValid = await verifyOtp(phoneNumber, otp);
    console.log(otp)
    if (isValid) {
      const timer = await Timer.findOne({ phoneNumber });
      const stopwatch = createStopwatch();

      if (timer && timer.running) {
        await stopwatch.stop();
        res.status(200).json({ message: 'OTP verified successfully. Stopwatch stopped.' });
      } else {
        await stopwatch.start();
        res.status(200).json({ message: 'OTP verified successfully. Stopwatch started.', verifiedAt: new Date() });
      }

      // Remove OTP from the database for the verified phone number
      await Otp.findOneAndDelete({ phoneNumber, otp }); // Ensure to match phoneNumber and otp
    } else {
      res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error during OTP verification:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export { sendOtp, checkOtp };
