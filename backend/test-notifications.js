// Test script for notification system
import mongoose from 'mongoose';
import { triggerBookingNotification } from './controllers/notificationController.js';

// Test data
const testBookingData = {
  mobileNumber: '1234567890',
  patientName: 'Test Patient',
  bookingId: 'TEST123456'
};

const testServiceType = 'Medicine';

// Connect to database
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/pwa', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Test notification trigger
async function testNotificationTrigger() {
  try {
    console.log('🧪 Testing notification trigger...');
    
    const result = await triggerBookingNotification(
      testBookingData,
      testServiceType,
      mongoose
    );
    
    console.log('✅ Notification triggered successfully:', result);
    
    // Test fetching notifications
    console.log('🧪 Testing notification fetch...');
    
    const Notification = require('./models/Notification.js')(mongoose);
    const notifications = await Notification.find({ 
      patientMobile: testBookingData.mobileNumber 
    }).sort({ createdAt: -1 });
    
    console.log('✅ Notifications fetched:', notifications.length);
    console.log('📋 Latest notification:', notifications[0]);
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    mongoose.disconnect();
  }
}

// Run test
testNotificationTrigger(); 