import express from 'express';
import {
  getDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination
} from '../controllers/destinationController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getDestinations);
router.get('/:id', getDestinationById);
router.post('/', protect, restrictTo('admin'), createDestination);
router.put('/:id', protect, restrictTo('admin'), updateDestination);
router.delete('/:id', protect, restrictTo('admin'), deleteDestination);

export default router;