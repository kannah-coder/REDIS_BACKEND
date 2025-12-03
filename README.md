 # Redis Backend Project

## Project Overview

This project demonstrates a backend system using **Redis** for various operations like caching, data storage, streams, lists, and geospatial data. It is built with **Node.js** and uses Redis as the main in-memory data store.

it is temporary data storage.
Redis is ideal for applications that require **high-speed access** to frequently used data.

---

REDIS_BACKEND/
│
├── node_modules/
│
├── .gitignore
├── package.json
├── package-lock.json
│
├── client.js
├── example.js
├── myclient.js
│
├── 01-string.js   <-- (NEW: this is your string.js file)
├── 02-list.js
├── 03-sets.js
├── 04-HashSet.js
├── 05-sortedSet.js
├── 06-streams.js
├── 07-geo.js
├── 08-pubsub.js
│
├── practice.js
└── README.md

---

## Features

* Store and retrieve simple key-value pairs
* Manage lists and queues
* Use streams for event/message processing
* Geospatial data storage and querying
* Expiry management for cache items
* Pub/Sub and background job processing (optional)
* Simple Node.js backend to interact with Redis

---

## Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/kannah-coder/REDIS_BACKEND.git
cd REDIS_BACKEND
```

2. Install dependencies:

```bash
npm install
```

3. Start Redis server (local or Docker):

```bash
redis-server
```

4. Run the backend:

```bash
node app.js
```

---

## Redis Operations in This Project

### 1. Key-Value

```javascript
await client.set("name", "Alice");
const name = await client.get("name");
```

### 2. Expiry

```javascript
await client.set("tempKey", "value");
await client.expire("tempKey", 60); // expires in 60 seconds
```

### 3. Lists

```javascript
await client.lpush("mylist", "item1");
await client.rpop("mylist");
```

### 4. LMOVE (like RPOPLPUSH)

```javascript
await client.lmove("source", "destination", "RIGHT", "LEFT");
```

### 5. Streams

```javascript
await client.xadd("mystream", "*", "user", "Alice", "action", "login");
const messages = await client.xrange("mystream", "-", "+");
```

### 6. Geospatial

```javascript
await client.geoadd("locations", 12.9716, 77.5946, "Bangalore");
const nearby = await client.georadius("locations", 77.5946, 12.9716, 10, "km");
```

### 7. Pub/Sub (Optional)

```javascript
await client.subscribe("channel1");
await client.publish("channel1", "Hello subscribers!");
```
 
 
---

## Best Practices

* Use `.gitignore` to avoid committing `node_modules` and `.env` files
* Always close Redis connections when done
* Use Redis TTL (expire) for cache keys
* Use Streams for event-driven architectures
* Use geospatial commands for location-based data efficiently

---
THANK YOU
---

 






