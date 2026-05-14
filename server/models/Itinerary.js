import mongoose from 'mongoose';

const itinerarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  state: {
    type: String
  },
  days: {
    type: Number,
    required: true
  },
  interests: {
    type: String,
    required: true
  },
  itineraryData: {
    type: Object,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Itinerary', itinerarySchema);