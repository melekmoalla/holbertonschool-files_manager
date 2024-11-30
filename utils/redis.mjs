import redis from 'redis';

class RedisClient {
    constructor() {
        this.client = redis.createClient();
        
        this.client.on('error', (err) => {
            console.error('Redis error:', err);
        });
    }

    // Function to check if Redis is alive
    isAlive() {
        return this.client.connected;
    }

    // Function to get a value from Redis by key
    async get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    // Function to set a value in Redis with an expiration time
    async set(key, value, duration) {
        return new Promise((resolve, reject) => {
            this.client.setex(key, duration, value, (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    // Function to delete a key in Redis
    async del(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;
