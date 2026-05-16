import Destination from '../models/Destination.js';
import Review from '../models/Review.js';
import Listing from '../models/Listing.js';
import User from '../models/User.js';

// Visitors count by state (based on reviews as proxy for visits)
export const getVisitorsByState = async (req, res) => {
  try {
    const data = await Review.aggregate([
      {
        $lookup: {
          from: 'destinations',
          localField: 'destinationId',
          foreignField: '_id',
          as: 'destination'
        }
      },
      { $unwind: '$destination' },
      {
        $group: {
          _id: '$destination.state',
          visitors: { $sum: 1 }
        }
      },
      { $sort: { visitors: -1 } },
      { $project: { state: '$_id', visitors: 1, _id: 0 } }
    ]);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Average sentiment score per destination
export const getSentimentAnalytics = async (req, res) => {
  try {
    const data = await Review.aggregate([
      {
        $group: {
          _id: '$destinationId',
          positive: {
            $sum: { $cond: [{ $eq: ['$sentimentScore', 'positive'] }, 1, 0] }
          },
          negative: {
            $sum: { $cond: [{ $eq: ['$sentimentScore', 'negative'] }, 1, 0] }
          },
          neutral: {
            $sum: { $cond: [{ $eq: ['$sentimentScore', 'neutral'] }, 1, 0] }
          },
          total: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'destinations',
          localField: '_id',
          foreignField: '_id',
          as: 'destination'
        }
      },
      { $unwind: '$destination' },
      {
        $project: {
          destination: '$destination.name',
          positive: 1,
          negative: 1,
          neutral: 1,
          total: 1,
          _id: 0
        }
      }
    ]);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Top destinations by rating and review count
export const getTopDestinations = async (req, res) => {
  try {
    const data = await Destination.find()
      .sort({ rating: -1, reviewCount: -1 })
      .limit(10)
      .select('name state category rating reviewCount');

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Listings by category
export const getListingsByCategory = async (req, res) => {
  try {
    const data = await Listing.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      { $project: { category: '$_id', count: 1, _id: 0 } }
    ]);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Overall platform stats
export const getPlatformStats = async (req, res) => {
  try {
    const [destinations, reviews, listings, users] = await Promise.all([
      Destination.countDocuments(),
      Review.countDocuments(),
      Listing.countDocuments(),
      User.countDocuments()
    ]);

    res.status(200).json({
      destinations,
      reviews,
      listings,
      users
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};