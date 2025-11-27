const redis = require("redis");

const client = redis.createClient();

client.connect();  // very important

module.exports = client;
