import express from 'express';
import {
  createReview,
  getReviewsByDestination,
  getSentimentSummary
} from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createReview);
router.get('/:destinationId', getReviewsByDestination);
router.get('/:destinationId/sentiment', getSentimentSummary);

export default router;