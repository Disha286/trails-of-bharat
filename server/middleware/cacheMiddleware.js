import Redis from 'ioredis';

let redis = null;

const getRedis = () => {
  if (!redis) {
    redis = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379');
    redis.on('error', (err) => {
      console.log('Redis not available, skipping cache:', err.message);
    });
  }
  return redis;
};

export const cache = (duration) => async (req, res, next) => {
  try {
    const client = getRedis();
    const key = `cache:${req.originalUrl}`;
    const cached = await client.get(key);

    if (cached) {
      console.log('Cache hit:', key);
      return res.status(200).json(JSON.parse(cached));
    }

    res.sendResponse = res.json;
    res.json = async (body) => {
      try {
        await client.setex(key, duration, JSON.stringify(body));
      } catch (err) {
        console.log('Cache set failed:', err.message);
      }
      res.sendResponse(body);
    };

    next();
  } catch (error) {
    next();
  }
};