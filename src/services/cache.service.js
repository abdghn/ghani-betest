const redisClient = require("../utils/redisClient");


class CacheService {
    async get(key) {
        try {
            const value = await redisClient.get(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error('Error getting cache:', error);
            throw error;
        }
    }

    async set(key, value, ttl = 3600) { // default TTL is 1 hour
        try {
            await redisClient.setEx(key, ttl, JSON.stringify(value));
        } catch (error) {
            console.error('Error setting cache:', error);
            throw error;
        }
    }

    async del(key) {
        try {
            await redisClient.del(key);
        } catch (error) {
            console.error('Error deleting cache:', error);
            throw error;
        }
    }
}

module.exports = new CacheService();
