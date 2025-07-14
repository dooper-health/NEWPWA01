// // Import necessary modules
// import express from 'express';
// import User1 from '../models/User1.js'; // Adjust the path as per your project structure

// const router = express.Router();

// // Route to fetch user details by mobile number
// router.get('/api/user/:mobileNumber', async (req, res) => {
//     const { mobileNumber } = req.params;

//     try {
//         // Find user by mobile number in the User1 collection
//         const user = await User1.findOne({ mobileNumber });

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json(user);
//     } catch (error) {
//         console.error('Error fetching user details:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// export default router;






// import User1 from '../models/User1.js'; // Ensure correct path

// // Controller to get user details by mobile number
// export const getUserDetailsByMobileNumber = async (req, res) => {
//   try {
//     const user = await User1.findOne({ mobileNumber: req.params.mobileNumber })
//     //   .populate('urgentCases')
//       .populate('medicines')
//       .populate('vaccinations')
//     //   .populate('homeCareRequests')
//     //   .populate('nursingCareRequests')
//     //   .populate('labtests');

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json(user);
//   } catch (error) {
//     console.error('Error fetching user details:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };





import User1 from '../models/User1.js'; // Ensure correct path
import VaccinationService from '../models/vaccination.js'; // Ensure correct path

// Controller to get user details by mobile number
export const getUserDetailsByMobileNumber = async (req, res) => {
  try {
    const user = await User1.findOne({ mobileNumber: req.params.mobileNumber })
    //   .populate('urgentCases')
      .populate('medicines')
      .populate('vaccinations')
    //   .populate('homeCareRequests')
    //   .populate('nursingCareRequests')
    //   .populate('labtests');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch related vaccination details
    const vaccinations = await VaccinationService.find({ userId: user._id });

    res.json({ user, vaccinations });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
