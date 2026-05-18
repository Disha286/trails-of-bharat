import Review from '../models/Review.js';
import Destination from '../models/Destination.js';

const analyzeSentiment = (text) => {
  const positive = ['amazing', 'beautiful', 'stunning', 'excellent', 'wonderful', 'fantastic', 'great', 'brilliant', 'magnificent', 'breathtaking', 'loved', 'perfect', 'incredible', 'awesome', 'superb'];
  const negative = ['terrible', 'awful', 'bad', 'disappointing', 'horrible', 'worst', 'poor', 'dreadful', 'pathetic', 'disgusting', 'unhelpful', 'waste', 'avoid', 'dirty', 'dangerous'];

  const lower = text.toLowerCase();
  const posCount = positive.filter(w => lower.includes(w)).length;
  const negCount = negative.filter(w => lower.includes(w)).length;

  if (posCount > negCount) return { sentiment: 'positive', confidence: 0.85 };
  if (negCount > posCount) return { sentiment: 'negative', confidence: 0.85 };
  return { sentiment: 'neutral', confidence: 0.5 };
};

export const createReview = async (req, res) => {
  try {
    console.log('createReview called');
    const { destinationId, rating, comment } = req.body;
    const existing = await Review.findOne({ userId: req.user.id, destinationId });
    if (existing) {
      return res.status(400).json({ message: 'You have already reviewed this destination' });
    }
    const { sentiment, confidence } = analyzeSentiment(comment);
    const review = await Review.create({
      userId: req.user.id,
      destinationId,
      rating,
      comment,
      sentimentScore: sentiment,
      sentimentConfidence: confidence
    });
    const allReviews = await Review.find({ destinationId });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    await Destination.findByIdAndUpdate(destinationId, {
      rating: Math.round(avgRating * 10) / 10,
      reviewCount: allReviews.length
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getReviewsByDestination = async (req, res) => {
  try {
    const reviews = await Review.find({ destinationId: req.params.destinationId })
      .populate('userId', 'name')
      .sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getSentimentSummary = async (req, res) => {
  try {
    const reviews = await Review.find({ destinationId: req.params.destinationId });
    const summary = {
      total: reviews.length,
      positive: reviews.filter(r => r.sentimentScore === 'positive').length,
      negative: reviews.filter(r => r.sentimentScore === 'negative').length,
      neutral: reviews.filter(r => r.sentimentScore === 'neutral').length
    };
    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};