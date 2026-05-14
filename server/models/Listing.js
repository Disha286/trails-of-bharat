import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['handicrafts', 'homestays', 'events', 'ecotourism'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  images: [
    {
      type: String
    }
  ],
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    state: { type: String, required: true },
    city: { type: String }
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model('Listing', listingSchema);