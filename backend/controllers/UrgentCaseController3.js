import UrgentCase from "../models/UrgentCaseModel.js";
import User1 from "../models/User1.js";

// Controller to fetch urgent case bookings by phone number
export const getUrgent = async (req, res) => {
  try {
    // Extract phoneNumber from the request body
    const { phoneNumber } = req.body;

    // Validate if phoneNumber is provided
    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    const urgentCases = await UrgentCase.find({
      "bookings.mobileNumber": phoneNumber,
    });

    const urgentBookings = urgentCases.flatMap((caseDoc) => caseDoc.bookings);


    // const user = await User1.findOne({ mobileNumber: phoneNumber });
    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }
    // const userId = user._id;
    // // Fetch urgent cases matching the phoneNumber from the database
    // let urgentCases = await UrgentCase.find({ userId });
    // console.log(urgentCases);

    // const urgentCases = await UrgentCase.find({ mobileNumber: phoneNumber });

    // Check if any cases are found
    if (urgentCases.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No cases found for the provided phone number",
      });
    }

    // Send the fetched data as the response
    res.status(200).json({
      success: true,
      data: urgentBookings,
    });
  } catch (error) {
    // Handle any errors that occur during the fetch operation
    res.status(500).json({
      success: false,
      message: "Failed to fetch urgent cases",
      error: error.message,
    });
  }
};
