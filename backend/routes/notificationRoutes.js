import express from 'express';
import { 
  createNotification, 
  getNotifications,
  createPharmacyNotification,
  createNotificationToPWA,
  getPharmacyNotificationsForPharmacy,
  getPharmacyNotificationsForPWA,
  createVaccinationPharmacyNotification,
  createMedicinePharmacyNotification,
  createVaccinationNotificationToPWA,
  createMedicineNotificationToPWA,
  markNotificationAsRead,
  deleteNotification,
  getNotificationCount
} from '../controllers/notificationController.js';

const router = express.Router();

// ==============================
// Legacy Routes (for backward compatibility)
// ==============================
router.post('/', (req, res, next) => {
  console.log('✅ POST /api/notifications received');
  next();
}, createNotification);

router.get('/dra', getNotifications);

// ==============================
// PWA to Pharmacy Notifications
// ==============================
router.post('/pwa-to-pharmacy', createPharmacyNotification);
router.post('/pwa-to-pharmacy/medicine', createMedicinePharmacyNotification);
router.post('/pwa-to-pharmacy/vaccination', createVaccinationPharmacyNotification);

// ==============================
// Pharmacy to PWA Notifications (after pharmacy accepts booking)
// ==============================
router.post('/pharmacy-to-pwa', createNotificationToPWA);
router.post('/pharmacy-to-pwa/medicine', createMedicineNotificationToPWA);
router.post('/pharmacy-to-pwa/vaccination', createVaccinationNotificationToPWA);

// ==============================
// Get Notifications
// ==============================
router.get('/pharmacy', getPharmacyNotificationsForPharmacy); // Pharmacy dashboard
router.get('/pwa', getPharmacyNotificationsForPWA); // PWA dashboard

// ==============================
// Notification Management
// ==============================
router.put('/:notificationId/read', markNotificationAsRead);
router.delete('/:notificationId', deleteNotification);
router.get('/count', getNotificationCount);

export default router;