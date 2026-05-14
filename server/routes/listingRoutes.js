import express from 'express';
import {
  getListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
  getVendorListings
} from '../controllers/listingController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getListings);
router.get('/my-listings', protect, restrictTo('vendor', 'admin'), getVendorListings);
router.get('/:id', getListingById);
router.post('/', protect, restrictTo('vendor', 'admin'), createListing);
router.put('/:id', protect, restrictTo('vendor', 'admin'), updateListing);
router.delete('/:id', protect, restrictTo('vendor', 'admin'), deleteListing);

export default router;