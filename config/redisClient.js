// redisClient.js
const Redis = require('ioredis');
const redis = new Redis(); // or your Redis config
module.exports = redis;
