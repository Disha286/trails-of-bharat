import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['heritage', 'eco', 'tribal', 'adventure', 'spiritual', 'wildlife'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: [
    {
      type: String
    }
  ],
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  tags: [
    {
      type: String
    }
  ],
  entryFee: {
    type: Number,
    default: 0
  },
  bestTimeToVisit: {
    type: String
  },
  rating: {
    type: Number,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model('Destination', destinationSchema);