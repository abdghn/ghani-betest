const redis = require('redis');
const { promisify } = require('util');

const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

redisClient.connect().catch(console.error);

module.exports = redisClient;
