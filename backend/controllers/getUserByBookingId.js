import User1 from '../models/User1.js';

export const getUserByBookingId = async (req, res) => {
    const { bookingId } = req.params;

    try {
        const bookingObjectId = ObjectId(bookingId);

        const user = await User1.aggregate([
            {
                $match: {
                    'bookings.bookingId': bookingObjectId 
                }
            },
            {
                $lookup: {
                    from: 'bookings',
                    localField: 'bookings.bookingId',
                    foreignField: '_id',
                    as: 'bookings'
                }
            }
        ]);

        if (!user || user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user[0]); 
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export default getUserByBookingId;
