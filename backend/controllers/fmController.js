// controllers/fmController.js
import User1 from '../models/User1.js';
import User from '../models/User.js';

export const getFamilyMembers = async (req, res) => {
  try {
    const user = await User1.findOne({ mobileNumber: req.params.mobileNumber });
    if (!user || !user.familyMembers) {
      return res.status(404).json({ message: 'No family members found' });
    }
    res.json(user.familyMembers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createFamilyMember = async (req, res) => {
  try {
    let user1 = await User1.findOne({ mobileNumber: req.body.mobileNumber });
    if (!user1) {
      // Create new User1 if not found
      user1 = new User1({ mobileNumber: req.body.mobileNumber });
    }
    user1.familyMembers.push(req.body);
    const updatedUser1 = await user1.save();

    // Find or create User and update reference to User1
    let user = await User.findOne({ mobile: req.body.mobileNumber });
    if (!user) {
      user = new User({ mobile: req.body.mobileNumber });
    }
    user.User1 = updatedUser1._id;
    await user.save();

    res.status(201).json(updatedUser1.familyMembers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFamilyMember = async (req, res) => {
  try {
    const user1 = await User1.findOne({ "familyMembers._id": req.params.id });
    if (!user1) {
      return res.status(404).json({ message: 'Family member not found' });
    }
    const member = user1.familyMembers.id(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Family member not found' });
    }
    Object.assign(member, req.body);
    const updatedUser1 = await user1.save();

    // Find or create User and update reference to User1
    let user = await User.findOne({ mobile: user1.mobileNumber });
    if (!user) {
      user = new User({ mobile: user1.mobileNumber });
    }
    user.User1 = updatedUser1._id;
    await user.save();

    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFamilyMember = async (req, res) => {
  try {
    const user1 = await User1.findOne({ "familyMembers._id": req.params.id });
    if (!user1) {
      return res.status(404).json({ message: 'Family member not found' });
    }
    const memberIndex = user1.familyMembers.findIndex(member => member._id.toString() === req.params.id);
    if (memberIndex === -1) {
      return res.status(404).json({ message: 'Family member not found' });
    }
    user1.familyMembers.splice(memberIndex, 1);
    const updatedUser1 = await user1.save();

    // Find or create User and update reference to User1
    let user = await User.findOne({ mobile: user1.mobileNumber });
    if (!user) {
      user = new User({ mobile: user1.mobileNumber });
    }
    user.User1 = updatedUser1._id;
    await user.save();

    res.status(200).json({ message: 'Family member deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};