import Medicine23 from '../models/Nursing.js'; // Adjust the import path according to your file structure

// Controller function to fetch all bookings
export const getNursing = async (req, res) => {
  try {
    const phoneNumber = req.body.phoneNumber;
    // Fetch all bookings excluding the 'prescriptionId' field
    if (!phoneNumber) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    // const labs = await Medicine23.find({}, { 'bookings.prescriptionId': 0 });
    const labs = await Medicine23.find({ 'bookings.mobileNumber': phoneNumber }, { 'bookings.prescriptionId': 0 });
    // Extracting bookings from each lab document
    const bookings = labs.flatMap(lab => lab.bookings);

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookings', error });
  }
};
