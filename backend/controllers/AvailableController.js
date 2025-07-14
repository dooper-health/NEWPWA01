//pracitce
// backend/controllers/withdrawController.js
import Earning from '../models/Earning.js';
import User from '../models/User.js';

export const getAvailable = async (req, res) => {
  const { phoneNumber } = req.body; // Destructure phoneNumber from req.body

  try {
    // Find the user by phoneNumber
    const user = await User.findOne({ mobile: phoneNumber });
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Find the earnings for the user
    const earning = await Earning.findOne({ userId: user._id });
    if (!earning) {
      return res.status(404).send('Earnings not found for user');
    }

    // Ensure availableBalance is set initially to totalEarnings
    if (!earning.availableBalance) {
      earning.availableBalance = earning.totalEarnings;
      await earning.save();
    }

    
    // Destructure required fields from earnings
    const { availableBalance, totalRedeemed } = earning;
    // Send response with the available balance and total redeemed
    res.json({
      availableBalance,
      totalRedeemed,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

