import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Destination from '../models/Destination.js';

dotenv.config();

const destinations = [
  {
    name: 'Kaziranga National Park',
    state: 'Assam',
    category: 'wildlife',
    description: 'Home to the world largest population of Indian one-horned rhinoceroses, spread across 430 sq km of alluvial grasslands and wetlands.',
    images: [],
    coordinates: { lat: 26.6638, lng: 93.3698 },
    tags: ['wildlife', 'rhino', 'UNESCO', 'jungle safari'],
    entryFee: 250,
    bestTimeToVisit: 'November to April',
    rating: 4.8
  },
  {
    name: 'Hampi',
    state: 'Karnataka',
    category: 'heritage',
    description: 'Ruins of the Vijayanagara Empire spread across 4100 hectares of boulder-strewn landscape. A UNESCO World Heritage Site.',
    images: [],
    coordinates: { lat: 15.3350, lng: 76.4600 },
    tags: ['UNESCO', 'ruins', 'history', 'temples', 'boulders'],
    entryFee: 40,
    bestTimeToVisit: 'October to February',
    rating: 4.7
  },
  {
    name: 'Dzukou Valley',
    state: 'Nagaland',
    category: 'adventure',
    description: 'A hidden valley at 2452 metres above sea level, famous for seasonal flowers and pristine trekking trails along the Nagaland-Manipur border.',
    images: [],
    coordinates: { lat: 25.5333, lng: 94.1167 },
    tags: ['trekking', 'valley', 'flowers', 'northeast', 'hills'],
    entryFee: 0,
    bestTimeToVisit: 'June to September',
    rating: 4.9
  },
  {
    name: 'Raghurajpur',
    state: 'Odisha',
    category: 'tribal',
    description: 'A heritage crafts village where every household is a family of artists practicing Pattachitra painting, palm leaf engraving, and stone carving.',
    images: [],
    coordinates: { lat: 19.8900, lng: 85.9000 },
    tags: ['crafts', 'Pattachitra', 'village', 'art', 'tribal'],
    entryFee: 0,
    bestTimeToVisit: 'October to March',
    rating: 4.5
  },
  {
    name: 'Spiti Valley',
    state: 'Himachal Pradesh',
    category: 'adventure',
    description: 'A cold desert mountain valley at 3800 metres, dotted with ancient Buddhist monasteries, stark landscapes and remote villages.',
    images: [],
    coordinates: { lat: 32.2461, lng: 78.0339 },
    tags: ['mountains', 'monastery', 'desert', 'adventure', 'Buddhist'],
    entryFee: 0,
    bestTimeToVisit: 'May to October',
    rating: 4.9
  },
  {
    name: 'Majuli Island',
    state: 'Assam',
    category: 'eco',
    description: 'The worlds largest river island on the Brahmaputra, home to Neo-Vaishnavite monasteries called Satras and a thriving tribal culture.',
    images: [],
    coordinates: { lat: 26.9500, lng: 94.1667 },
    tags: ['island', 'eco', 'monastery', 'tribal', 'Brahmaputra'],
    entryFee: 0,
    bestTimeToVisit: 'October to March',
    rating: 4.6
  },
  {
    name: 'Khajuraho',
    state: 'Madhya Pradesh',
    category: 'heritage',
    description: 'A group of Hindu and Jain temples famous for their nagara-style architectural symbolism and erotic sculptures. UNESCO World Heritage Site.',
    images: [],
    coordinates: { lat: 24.8318, lng: 79.9199 },
    tags: ['UNESCO', 'temples', 'sculpture', 'history', 'architecture'],
    entryFee: 40,
    bestTimeToVisit: 'October to March',
    rating: 4.6
  },
  {
    name: 'Coorg',
    state: 'Karnataka',
    category: 'eco',
    description: 'The Scotland of India — rolling coffee plantations, misty hills, waterfalls and a unique Kodava culture tucked in the Western Ghats.',
    images: [],
    coordinates: { lat: 12.3375, lng: 75.8069 },
    tags: ['coffee', 'hills', 'plantation', 'waterfall', 'Western Ghats'],
    entryFee: 0,
    bestTimeToVisit: 'October to March',
    rating: 4.7
  },
  {
    name: 'Varanasi Ghats',
    state: 'Uttar Pradesh',
    category: 'spiritual',
    description: 'One of the worlds oldest continuously inhabited cities. The ghats along the Ganges are the spiritual heart of India — a place of rituals, life and death.',
    images: [],
    coordinates: { lat: 25.3176, lng: 82.9739 },
    tags: ['spiritual', 'Ganges', 'ghats', 'ritual', 'ancient'],
    entryFee: 0,
    bestTimeToVisit: 'October to March',
    rating: 4.8
  },
  {
    name: 'Ziro Valley',
    state: 'Arunachal Pradesh',
    category: 'tribal',
    description: 'Home to the Apatani tribe, known for their sustainable agricultural practices and unique cultural traditions. A UNESCO tentative heritage site.',
    images: [],
    coordinates: { lat: 27.5833, lng: 93.8333 },
    tags: ['tribal', 'Apatani', 'valley', 'northeast', 'UNESCO'],
    entryFee: 0,
    bestTimeToVisit: 'March to October',
    rating: 4.7
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    await Destination.deleteMany();
    console.log('Existing destinations cleared');

    await Destination.insertMany(destinations);
    console.log('10 destinations seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
};

seedDB();