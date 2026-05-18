import express from 'express';
import {
  getVisitorsByState,
  getSentimentAnalytics,
  getTopDestinations,
  getListingsByCategory,
  getPlatformStats
} from '../controllers/analyticsController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/visitors', protect, restrictTo('admin'), getVisitorsByState);
router.get('/sentiment', protect, restrictTo('admin'), getSentimentAnalytics);
router.get('/top-destinations', protect, restrictTo('admin'), getTopDestinations);
router.get('/listings-by-category', protect, restrictTo('admin'), getListingsByCategory);
router.get('/stats', protect, restrictTo('admin'), getPlatformStats);

export default router;