import Destination from '../models/Destination.js';

// Get all destinations
export const getDestinations = async (req, res) => {
  try {
    const { category, state, search } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (state) filter.state = new RegExp(state, 'i');
    if (search) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const destinations = await Destination.find(filter).sort({ createdAt: -1 });
    res.status(200).json(destinations);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single destination
export const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    res.status(200).json(destination);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create destination (admin only)
export const createDestination = async (req, res) => {
  try {
    const destination = await Destination.create(req.body);
    res.status(201).json(destination);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update destination (admin only)
export const updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    res.status(200).json(destination);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete destination (admin only)
export const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    res.status(200).json({ message: 'Destination deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};