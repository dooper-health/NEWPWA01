# Notification System Implementation

This document explains the comprehensive notification system implemented for the PWA application, enabling real-time communication between patients and pharmacies.

## 🎯 Overview

The notification system provides:
- **Real-time notifications** when patients create bookings
- **Pharmacy acceptance/rejection** notifications to patients
- **Socket.IO integration** for instant updates
- **Comprehensive API endpoints** for notification management
- **Enhanced UI components** for better user experience

## 🏗️ Architecture

### Backend Components

1. **Notification Controller** (`backend/controllers/notificationController.js`)
   - Handles all notification CRUD operations
   - Manages real-time socket events
   - Provides booking acceptance/rejection logic

2. **Notification Model** (`backend/models/Notification.js`)
   - Enhanced schema with status tracking
   - Indexes for better performance
   - Support for multiple notification types

3. **Socket Configuration** (`backend/config/socket.js`)
   - Real-time communication setup
   - User room management
   - Event handling

### Frontend Components

1. **Notifications Component** (`frontend/src/components/Notifications.jsx`)
   - Real-time notification display
   - Socket connection management
   - Notification actions (read, delete)

2. **Notification Badge** (`frontend/src/components/NotificationBadge.jsx`)
   - Unread count display
   - Real-time updates
   - Navbar integration

3. **Pharmacy Dashboard** (`frontend/src/components/PharmacyDashboard.jsx`)
   - Pharmacy booking management
   - Accept/reject functionality
   - Real-time booking requests

## 🚀 API Endpoints

### Notification Management

#### Create Notifications
```http
POST /api/notifications/pwa-to-pharmacy
POST /api/notifications/pwa-to-pharmacy/medicine
POST /api/notifications/pwa-to-pharmacy/vaccination
```

#### Pharmacy to Patient Notifications
```http
POST /api/notifications/pharmacy-to-pwa
POST /api/notifications/pharmacy-to-pwa/medicine
POST /api/notifications/pharmacy-to-pwa/vaccination
```

#### Get Notifications
```http
GET /api/notifications/pharmacy          # For pharmacy dashboard
GET /api/notifications/pwa?mobileNumber=1234567890  # For patient dashboard
```

#### Notification Actions
```http
PUT /api/notifications/:id/read          # Mark as read
DELETE /api/notifications/:id            # Delete notification
GET /api/notifications/count?mobileNumber=1234567890  # Get unread count
```

## 📡 Real-time Events

### Socket Events

#### Patient to Pharmacy
- `newPharmacyBooking` - New booking request
- `newBookingRequest` - General booking notification

#### Pharmacy to Patient
- `pharmacyBookingAccepted` - Booking accepted by pharmacy
- `bookingAccepted` - Legacy booking acceptance

### Event Data Structure

```javascript
// New Booking Request
{
  message: "New Medicine booking request from John Doe",
  serviceType: "Medicine",
  bookingId: "JOHN251234",
  patientName: "John Doe",
  patientMobile: "1234567890",
  timestamp: "2024-01-15T10:30:00Z"
}

// Booking Accepted
{
  message: "Pharmacy ABC accepted your Medicine booking",
  serviceType: "Medicine",
  bookingId: "JOHN251234",
  pharmacyName: "Pharmacy ABC",
  pharmacyId: "pharm123",
  timestamp: "2024-01-15T10:35:00Z"
}
```

## 🔧 Implementation Details

### Automatic Notification Triggers

The system automatically triggers notifications when bookings are created:

#### Medicine Booking
```javascript
// In medicineController.js
await triggerBookingNotification(
  {
    mobileNumber: phoneNumber,
    patientName,
    bookingId: latestBooking.bookingId
  },
  'Medicine',
  mongoose
);
```

#### Vaccination Booking
```javascript
// In vaccinationServiceController.js
await triggerBookingNotification(
  {
    mobileNumber: phoneNumber,
    patientName,
    bookingId: latestBooking.bookingId
  },
  'Vaccination',
  mongoose
);
```

### Frontend Integration

#### Socket Connection Setup
```javascript
import io from 'socket.io-client';

// For Vite, use import.meta.env instead of process.env
const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');
socket.emit('register', mobileNumber);

socket.on('pharmacyBookingAccepted', (data) => {
  // Handle booking acceptance
});

socket.on('newBookingRequest', (data) => {
  // Handle new booking request
});
```

#### Notification Badge Usage
```javascript
import NotificationBadge from './components/NotificationBadge';

<NotificationBadge onClick={() => navigate('/notifications')} />
```

## 🎨 UI Features

### Patient Dashboard
- Real-time notification updates
- Unread count badge
- Mark as read functionality
- Delete notifications
- Service type indicators
- Pharmacy acceptance notifications

### Pharmacy Dashboard
- Real-time booking requests
- Accept/reject functionality
- Patient information display
- Booking status tracking
- Service type filtering

## 🔒 Security Considerations

1. **Authentication**: All endpoints require proper authentication
2. **Authorization**: Users can only access their own notifications
3. **Input Validation**: All inputs are validated and sanitized
4. **Rate Limiting**: Implement rate limiting for notification endpoints
5. **Socket Security**: Socket connections are validated

## 🚀 Deployment

### Environment Variables

#### Backend (.env)
```bash
MONGO_URI=mongodb://localhost:27017/pwa
SOCKET_URL=http://localhost:5000
```

#### Frontend (.env)
```bash
# Vite requires VITE_ prefix for environment variables
VITE_SOCKET_URL=http://localhost:5000
VITE_API_URL=http://localhost:5000/api
VITE_APP_ENV=development
```

**Important**: In Vite, environment variables must be prefixed with `VITE_` to be accessible in the browser. Use `import.meta.env.VITE_VARIABLE_NAME` instead of `process.env.VARIABLE_NAME`.

### Database Indexes

The notification system includes optimized indexes:

```javascript
// Notification model indexes
schema.index({ for: 1, createdAt: -1 });
schema.index({ patientMobile: 1, createdAt: -1 });
schema.index({ userId: 1, createdAt: -1 });
schema.index({ bookingId: 1 });
```

## 📊 Monitoring

### Key Metrics to Monitor

1. **Notification Delivery Rate**
2. **Socket Connection Stability**
3. **API Response Times**
4. **Error Rates**
5. **User Engagement**

### Logging

The system includes comprehensive logging:

```javascript
console.log('✅ Medicine booking notification triggered successfully');
console.error('❌ Error creating notification:', error);
console.warn('⚠️ Failed to trigger notification:', notificationError);
```

## 🔄 Workflow

### Patient Booking Flow

1. Patient creates medicine/vaccination booking
2. System automatically triggers notification to pharmacies
3. Pharmacies receive real-time notification
4. Pharmacy accepts/rejects booking
5. Patient receives real-time acceptance notification
6. Patient can view notification in dashboard

### Pharmacy Management Flow

1. Pharmacy receives real-time booking requests
2. Pharmacy reviews patient information
3. Pharmacy accepts or rejects booking
4. System sends notification to patient
5. Booking status is updated in database

## 🛠️ Troubleshooting

### Common Issues

1. **Socket Connection Failed**
   - Check socket server is running
   - Verify environment variables
   - Check network connectivity

2. **Notifications Not Appearing**
   - Verify mobile number in context
   - Check API endpoint responses
   - Validate notification model

3. **Real-time Updates Not Working**
   - Check socket event listeners
   - Verify user room registration
   - Check socket server logs

4. **"process is not defined" Error**
   - This occurs when using `process.env` in Vite
   - Use `import.meta.env.VITE_VARIABLE_NAME` instead
   - Ensure environment variables are prefixed with `VITE_`

### Debug Commands

```javascript
// Check socket connection
console.log('Socket connected:', socket.connected);

// Check notification count
console.log('Unread count:', unreadCount);

// Check API response
console.log('API response:', data);

// Check environment variables (Vite)
console.log('Socket URL:', import.meta.env.VITE_SOCKET_URL);
```

### Environment Variable Fix

If you encounter `process is not defined` errors:

1. **Create a `.env` file in the frontend directory:**
   ```bash
   # frontend/.env
   VITE_SOCKET_URL=http://localhost:5000
   VITE_API_URL=http://localhost:5000/api
   ```

2. **Update your code to use `import.meta.env`:**
   ```javascript
   // ❌ Wrong (causes error in Vite)
   const socket = io(process.env.REACT_APP_SOCKET_URL);
   
   // ✅ Correct (works in Vite)
   const socket = io(import.meta.env.VITE_SOCKET_URL);
   ```

3. **Restart your development server:**
   ```bash
   npm run dev
   ```

## 📈 Future Enhancements

1. **Push Notifications**: Implement web push notifications
2. **Email Notifications**: Add email fallback
3. **SMS Notifications**: Add SMS integration
4. **Notification Templates**: Customizable notification messages
5. **Advanced Filtering**: Filter by service type, date, status
6. **Bulk Actions**: Mark multiple notifications as read
7. **Notification Preferences**: User notification settings

## 🤝 Contributing

When contributing to the notification system:

1. Follow ES6 syntax standards
2. Add comprehensive error handling
3. Include proper logging
4. Update documentation
5. Add unit tests
6. Follow the existing code structure
7. Use `import.meta.env` for Vite environment variables

## 📞 Support

For issues or questions about the notification system:

1. Check the troubleshooting section
2. Review the API documentation
3. Check server logs
4. Contact the development team

---

**Last Updated**: January 2024
**Version**: 1.0.0 