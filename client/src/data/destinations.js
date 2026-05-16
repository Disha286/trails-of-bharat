// Combined destinations data — All Indian destinations
import { destinationsNorth } from './destinationsNorth.js';
import { destinationsSouth } from './destinationsSouth.js';
import { destinationsEast } from './destinationsEast.js';

export const destinations = [
  ...destinationsNorth,
  ...destinationsSouth,
  ...destinationsEast,
];

export const categories = [
  { id: 'eco',       label: 'Eco Tourism', emoji: '🌿', color: '#16a34a', bg: '#f0fdf4' },
  { id: 'heritage',  label: 'Heritage',    emoji: '🏯', color: '#d97706', bg: '#fffbeb' },
  { id: 'adventure', label: 'Adventure',   emoji: '🧗', color: '#0284c7', bg: '#f0f9ff' },
  { id: 'spiritual', label: 'Spiritual',   emoji: '🕌', color: '#9333ea', bg: '#fdf4ff' },
  { id: 'tribal',    label: 'Tribal',      emoji: '🎭', color: '#e11d48', bg: '#fff1f2' },
  { id: 'beaches',   label: 'Beaches',     emoji: '🏖️', color: '#0891b2', bg: '#ecfeff' },
  { id: 'wildlife',  label: 'Wildlife',    emoji: '🐅', color: '#15803d', bg: '#f0fdf4' },
];

export const states = [
  'All States',
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar',
  'Delhi','Goa','Gujarat','Himachal Pradesh',
  'Jammu & Kashmir','Jharkhand','Karnataka','Kerala','Ladakh',
  'Madhya Pradesh','Maharashtra','Manipur','Meghalaya',
  'Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana',
  'Tripura','Uttar Pradesh','Uttarakhand','West Bengal',
  'Andaman & Nicobar',
];

export const getDestinationById = (id) => destinations.find((d) => d.id === id);

export default destinations;
