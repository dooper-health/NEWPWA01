//withjwt
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Generate OTP
const generateOtp = () => {
  return crypto.randomInt(1000, 9999).toString();
};

// Send OTP
const sendOtp = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    console.log('Received request to send OTP to:', phoneNumber);
    
    const existingUser = await User.findOne({ mobile: phoneNumber, signupStatus: true });
    if (existingUser) {
      console.log('User already exists:', existingUser);
      return res.status(409).json({ message: 'User already exists. Please login.' });
    }

    const otp = generateOtp();
    console.log('Generated OTP:', otp);
    
    const user = await User.findOneAndUpdate(
      { mobile: phoneNumber },
      { otpSignup: otp },
      { upsert: true, new: true }
    );
    console.log('User updated/created with OTP:', user);
    
    res.status(200).json({ otp, createdAt: new Date() });
  } catch (err) {
    console.error('Error during OTP generation:', err);
    res.status(500).json({ msg: 'Error during OTP generation', error: err.message });
  }
};

// Check OTP
const checkOtp = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;
    console.log('Received request to check OTP for:', phoneNumber);
    
    const user = await User.findOne({ mobile: phoneNumber });
    if (!user) {
      console.log('User not found for phone number:', phoneNumber);
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.otpSignup !== otp) {
      console.log('Invalid OTP for user:', user);
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Generate JWT
    const token = jwt.sign({ phoneNumber }, process.env.JWT_SECRET, { expiresIn: '2h' });

    await User.findOneAndUpdate(
      { mobile: phoneNumber },
      { $unset: { otpSignup: 1 }, signupStatus: true, jwt: token, jwtExpiration: new Date(Date.now() + 2 * 60 * 60 * 1000) }
    );

    console.log('OTP verified and user updated for phone number:', phoneNumber);
    
    res.status(200).json({ message: 'OTP verified successfully.', token });
  } catch (error) {
    console.error('Error during OTP verification:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export { sendOtp, checkOtp };
