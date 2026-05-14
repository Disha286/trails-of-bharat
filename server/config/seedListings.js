import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Listing from '../models/Listing.js';
import User from '../models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

const listings = [
  {
    title: 'Pattachitra Painting Workshop',
    category: 'handicrafts',
    price: 1500,
    images: [],
    description: 'Learn the ancient art of Pattachitra painting from a master artisan in Raghurajpur village, Odisha.',
    location: { state: 'Odisha', city: 'Raghurajpur' }
  },
  {
    title: 'Warli Art Masterclass',
    category: 'handicrafts',
    price: 1200,
    images: [],
    description: 'A hands-on workshop on Warli tribal art with a local Warli artist in Palghar district.',
    location: { state: 'Maharashtra', city: 'Palghar' }
  },
  {
    title: 'Bamboo Homestay — Majuli Island',
    category: 'homestays',
    price: 2500,
    images: [],
    description: 'Stay in a traditional bamboo house on Majuli Island with a local Mising tribe family. Meals included.',
    location: { state: 'Assam', city: 'Majuli' }
  },
  {
    title: 'Spiti Valley Mud House Stay',
    category: 'homestays',
    price: 1800,
    images: [],
    description: 'Authentic mud house homestay in Kibber village, Spiti Valley. Experience Buddhist culture and home-cooked meals.',
    location: { state: 'Himachal Pradesh', city: 'Kibber' }
  },
  {
    title: 'Coorg Coffee Estate Homestay',
    category: 'homestays',
    price: 3500,
    images: [],
    description: 'Stay on a working coffee estate in Coorg with plantation walks, bird watching and Kodava cuisine.',
    location: { state: 'Karnataka', city: 'Coorg' }
  },
  {
    title: 'Hornbill Festival Experience',
    category: 'events',
    price: 2000,
    images: [],
    description: 'Guided experience at the Hornbill Festival — the festival of festivals in Nagaland. Includes cultural performances and local food.',
    location: { state: 'Nagaland', city: 'Kisama' }
  },
  {
    title: 'Hampi Utsav Heritage Walk',
    category: 'events',
    price: 800,
    images: [],
    description: 'Guided heritage walk during the Hampi Utsav festival with a certified archaeologist.',
    location: { state: 'Karnataka', city: 'Hampi' }
  },
  {
    title: 'Kaziranga Jeep Safari',
    category: 'ecotourism',
    price: 3200,
    images: [],
    description: 'Early morning jeep safari in Kaziranga National Park with a certified naturalist guide. Spot rhinos, elephants and tigers.',
    location: { state: 'Assam', city: 'Kaziranga' }
  },
  {
    title: 'Dzukou Valley Trek',
    category: 'ecotourism',
    price: 4500,
    images: [],
    description: '2-day guided trek through Dzukou Valley with camping, meals and a local Naga guide included.',
    location: { state: 'Nagaland', city: 'Dzukou' }
  },
  {
    title: 'Sundarbans Mangrove Boat Tour',
    category: 'ecotourism',
    price: 2800,
    images: [],
    description: 'Full day boat tour through the Sundarbans mangrove delta. Spot Royal Bengal tigers, crocodiles and rare birds.',
    location: { state: 'West Bengal', city: 'Sundarbans' }
  },
  {
    title: 'Blue Pottery Workshop — Jaipur',
    category: 'handicrafts',
    price: 900,
    images: [],
    description: 'Learn the Persian-influenced Blue Pottery craft from a Jaipur master craftsman.',
    location: { state: 'Rajasthan', city: 'Jaipur' }
  },
  {
    title: 'Ziro Music Festival Camp',
    category: 'events',
    price: 5000,
    images: [],
    description: 'Camping experience at the Ziro Music Festival in Arunachal Pradesh with festival passes and meals.',
    location: { state: 'Arunachal Pradesh', city: 'Ziro' }
  },
  {
    title: 'Rann of Kutch Desert Stay',
    category: 'homestays',
    price: 4000,
    images: [],
    description: 'Stay in a traditional bhunga hut at the Rann of Kutch during the Rann Utsav festival.',
    location: { state: 'Gujarat', city: 'Kutch' }
  },
  {
    title: 'Auroville Eco Tour',
    category: 'ecotourism',
    price: 1500,
    images: [],
    description: 'Guided eco tour of Auroville — the international township in Pondicherry. Includes organic farm visit and sustainability workshop.',
    location: { state: 'Tamil Nadu', city: 'Auroville' }
  },
  {
    title: 'Madhubani Painting Class',
    category: 'handicrafts',
    price: 1000,
    images: [],
    description: 'Learn the ancient Madhubani painting style from a local artist in Mithila region of Bihar.',
    location: { state: 'Bihar', city: 'Madhubani' }
  }
];

const seedListings = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    // Find a vendor user or create one
    let vendor = await User.findOne({ role: 'vendor' });
    if (!vendor) {
      const bcrypt = await import('bcryptjs');
      const salt = await bcrypt.default.genSalt(10);
      const hashedPassword = await bcrypt.default.hash('vendor123', salt);
      vendor = await User.create({
        name: 'Demo Vendor',
        email: 'vendor@trailsofbharat.com',
        password: hashedPassword,
        role: 'vendor'
      });
      console.log('Demo vendor created');
    }

    await Listing.deleteMany();
    console.log('Existing listings cleared');

    const listingsWithVendor = listings.map(l => ({ ...l, vendor: vendor._id }));
    await Listing.insertMany(listingsWithVendor);
    console.log('15 listings seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
};

seedListings();