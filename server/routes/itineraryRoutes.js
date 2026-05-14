import express from 'express';
import {
  generateItinerary,
  saveItinerary,
  getUserItineraries
} from '../controllers/itineraryController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/generate', generateItinerary);
router.post('/save', protect, saveItinerary);
router.get('/:userId', protect, getUserItineraries);

export default router;