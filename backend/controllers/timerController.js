// import Timer  from "../models/Timer";

// export const getTimer = async (req, res) => {
//   const { phoneNumber } = req.params;

//   try {
//     const timer = await Timer.findOne({ phoneNumber });

//     if (timer) {
//       res.json({
//         hours: timer.hours,
//         minutes: timer.minutes,
//         seconds: timer.seconds
//       });
//     } else {
//       res.status(404).json({ message: 'Timer not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching timer', error });
//   }
// };

// export default {getTimer};

// timerController.js
// timerController.js

// backend/controllers/timerController.js

import Timer from '../models/Timer.js';

// Controller function to fetch hours, minutes, seconds
export const fetchTime = async (req, res) => {
  try {
    const phoneNumber = "123123"; // Hardcoded phone number for testing

    // Fetch the timer document from the database
    const timer = await Timer.findOne({ phoneNumber });

    if (!timer) {
      return res.status(404).json({ message: 'Timer not found' });
    }

    // Destructure the timer object to extract hours, minutes, seconds
    const { hours, minutes, seconds } = timer;

    res.status(200).json({ hours, minutes, seconds });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {fetchTime};