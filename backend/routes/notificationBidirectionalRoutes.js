import express from 'express';
import { notifyLab, notifyUser, getNotifications,getAcceptedNotifications } from '../controllers/notificationBidirectionalController.js';

const router = express.Router();

// Notify Lab when booking is made
router.post('/lab', notifyLab);

// Notify User when Lab accepts booking
router.post('/user', notifyUser);

// Get notifications for a recipient (user or lab)
router.get('/accepted', getAcceptedNotifications);
router.get('/:recipientId', getNotifications);


export default router; 

///notificationBidirectionalRoutesrg