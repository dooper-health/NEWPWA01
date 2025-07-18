
// // // This file works perfectly with mongoose.createConnection()
// // // import mongoose from 'mongoose';

// // export default (conn) => {
// //   const schema = new mongoose.Schema({
// //     message: { type: String, required: true },
// //     for: { type: String, enum: ['DRA', 'PWA'], required: true },
// //     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// //     serviceType: String,
// //     bookingId: String,
// //     draName: String,
// //     draId: String,
// //     patientName: String,
// //     patientId: String,
// //     isRead: { type: Boolean, default: false },
// //     createdAt: { type: Date, default: Date.now }
// //   });

// //   // ✅ Don't over-check. Just try to define it.
// //   try {
// //     return conn.model('Notification');
// //   } catch (err) {
// //     return conn.model('Notification', schema);
// //   }
// // };





// // ✅ This file works perfectly with mongoose.createConnection()
// import mongoose from 'mongoose';

// export default (conn) => {
//   const schema = new mongoose.Schema({
//     message: { type: String, required: true },
//     for: { type: String, enum: ['DRA', 'PWA'], required: true },
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     serviceType: String,
//     bookingId: String,
//     draName: String,
//     draId: String,
//     patientName: String,
//     patientId: String,
//     isRead: { type: Boolean, default: false },
//     createdAt: { type: Date, default: Date.now }
//   });

//   // ✅ Don't over-check. Just try to define it.
//   try {
//     return conn.model('Notification');
//   } catch (err) {
//     return conn.model('Notification', schema);
//   }
// };




// models/Notification.js
import mongoose from 'mongoose';

export default (conn = mongoose) => {
  const schema = new mongoose.Schema({
    message: { type: String, required: true },
    for: { type: String, enum: ['DRA', 'PWA', 'Pharmacy'], required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    serviceType: String,
    bookingId: String,
    
    // DRA related fields
    draName: String,
    draId: String,
    
    // Pharmacy related fields
    pharmacyName: String,
    pharmacyId: String,
    
    // Patient related fields
    patientName: String,
    patientMobile: String,
    
    // Notification status0
    status: { 
      type: String, 
      enum: ['pending', 'accepted', 'rejected', 'completed','incoming'], 
      default: 'incoming' 
    },
    isRead: { type: Boolean, default: false },
    
    // Timestamps
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  // Update the updatedAt field before saving
  schema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
  });

  // Add indexes for better query performance
  schema.index({ for: 1, createdAt: -1 });
  schema.index({ patientMobile: 1, createdAt: -1 });
  schema.index({ userId: 1, createdAt: -1 });
  schema.index({ bookingId: 1 });

  return conn.models?.Notification || conn.model('Notification', schema);
};
