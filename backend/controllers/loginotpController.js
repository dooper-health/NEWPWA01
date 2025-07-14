//jwt working 2
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateOtp = () => {
  return crypto.randomInt(1000, 9999).toString();
};

const sendOtp2 = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const user = await User.findOne({ mobile: phoneNumber });

    if (!user) {
      return res.status(404).json({ message: 'Please register first.' });
    }

    const otp = generateOtp();
    user.otp = otp;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({ otp });
  } catch (err) {
    console.error('Error during OTP generation:', err);
    res.status(500).json({ msg: 'Error during OTP generation', error: err.message });
  }
};

const checkOtp2 = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;

    const user = await User.findOne({ mobile: phoneNumber });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.otp) {
      return res.status(400).json({ message: 'No OTP generated' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Generate JWT
    const token = jwt.sign({ phoneNumber: phoneNumber }, process.env.JWT_SECRET, { expiresIn: '2h' });

    user.otp = undefined;
    user.jwt = token;
    user.jwtExpiration = new Date(Date.now() + 2 * 60 * 60 * 1000);
    await user.save({ validateBeforeSave: false });

    res.status(200).json({ message: 'OTP verified successfully.', token });
  } catch (error) {
    console.error('Error during OTP verification:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export { sendOtp2, checkOtp2 };
