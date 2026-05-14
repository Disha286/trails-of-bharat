import Groq from 'groq-sdk';
import Itinerary from '../models/Itinerary.js';

export const generateItinerary = async (req, res) => {
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const { destination, days, interests, state } = req.body;

    if (!destination || !days || !interests) {
      return res.status(400).json({ message: 'Destination, days and interests are required' });
    }

    const prompt = `
      You are an expert India travel planner for the trails-of-bharat platform.
      Create a detailed ${days}-day itinerary for ${destination}, ${state || 'India'}.
      The traveller is interested in: ${interests}.

      Return ONLY a valid JSON object in this exact format, no extra text, no markdown:
      {
        "destination": "${destination}",
        "days": ${days},
        "summary": "2-3 sentence overview of the trip",
        "itinerary": [
          {
            "day": 1,
            "title": "Day title",
            "morning": "Morning activity description",
            "afternoon": "Afternoon activity description",
            "evening": "Evening activity description",
            "tips": "One practical tip for the day"
          }
        ],
        "bestTimeToVisit": "months",
        "estimatedBudget": "budget range in INR per person",
        "localFood": ["dish1", "dish2", "dish3"],
        "packingTips": ["tip1", "tip2", "tip3"]
      }
    `;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      response_format: { type: 'json_object' }
    });

    const text = completion.choices[0]?.message?.content;
    const itineraryData = JSON.parse(text);

    res.status(200).json({
      success: true,
      data: itineraryData
    });

  } catch (error) {
    res.status(500).json({ message: 'Failed to generate itinerary', error: error.message });
  }
};

export const saveItinerary = async (req, res) => {
  try {
    const { destination, days, interests, state, itineraryData } = req.body;

    const itinerary = await Itinerary.create({
      userId: req.user.id,
      destination,
      state,
      days,
      interests,
      itineraryData
    });

    res.status(201).json(itinerary);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getUserItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(itineraries);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};