import Listing from '../models/Listing.js';

// Get all listings
export const getListings = async (req, res) => {
  try {
    const { category, state } = req.query;
    let filter = { isAvailable: true };

    if (category) filter.category = category;
    if (state) filter['location.state'] = new RegExp(state, 'i');

    const listings = await Listing.find(filter)
      .populate('vendor', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(listings);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single listing
export const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate('vendor', 'name email');

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.status(200).json(listing);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create listing (vendor only)
export const createListing = async (req, res) => {
  try {
    const listing = await Listing.create({
      ...req.body,
      vendor: req.user.id
    });

    res.status(201).json(listing);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update listing (vendor only — own listings)
export const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.vendor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this listing' });
    }

    const updated = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json(updated);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete listing (vendor only — own listings)
export const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.vendor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this listing' });
    }

    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Listing deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get vendor's own listings
export const getVendorListings = async (req, res) => {
  try {
    const listings = await Listing.find({ vendor: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json(listings);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};