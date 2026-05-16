import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import authRoutes from './routes/authRoutes.js';
import destinationRoutes from './routes/destinationRoutes.js';
import itineraryRoutes from './routes/itineraryRoutes.js';
import listingRoutes from './routes/listingRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Too many requests, please try again later' }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Too many auth attempts, please try again later' }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(helmet());
app.use('/api', limiter);

// Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/itinerary', itineraryRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'trails-of-bharat API is running' });
});

// HTTP + Socket.io server
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Mock transport updates
const transportUpdates = [
  { route: 'Bangalore → Hampi', status: 'On time', type: 'bus', eta: '6h 30m' },
  { route: 'Guwahati → Kaziranga', status: 'Delayed 20 min', type: 'bus', eta: '3h 20m' },
  { route: 'Delhi → Varanasi', status: 'On time', type: 'train', eta: '8h 15m' },
  { route: 'Manali → Spiti', status: 'Weather delay', type: 'bus', eta: '5h 45m' },
  { route: 'Jorhat → Majuli', status: 'On time', type: 'ferry', eta: '1h 30m' }
];

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  const interval = setInterval(() => {
    const update = transportUpdates[Math.floor(Math.random() * transportUpdates.length)];
    socket.emit('transportUpdate', { ...update, timestamp: new Date() });
  }, 30000);
  const immediate = transportUpdates[Math.floor(Math.random() * transportUpdates.length)];
  socket.emit('transportUpdate', { ...immediate, timestamp: new Date() });
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    clearInterval(interval);
  });
});

// DB + Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('DB connection failed:', err));