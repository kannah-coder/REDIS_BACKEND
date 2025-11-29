/*
    FULL REDIS PRACTICE FILE – ioredis
    Author: Kannah
*/

const Redis = require("ioredis");
const client = new Redis(); // localhost:6379

async function redisDemo() {
    console.log("Redis Connected!");

    // ------------------------------
    // 1. BASIC STRING OPERATIONS
    // ------------------------------
    await client.set("name", "kannah");
    console.log("GET name =", await client.get("name"));

    await client.set("count", 1);
    await client.incr("count");
    console.log("INCR count =", await client.get("count"));

    await client.append("name", "_coder");
    console.log("APPEND =", await client.get("name"));

    // TTL / Expire
    await client.set("temp", "hello", "EX", 5);
    console.log("TTL temp =", await client.ttl("temp"));

    // ------------------------------
    // 2. HASH OPERATIONS
    // ------------------------------
    await client.hset("user:1", "name", "John", "age", 25);
    console.log("HGETALL user:1 =", await client.hgetall("user:1"));

    await client.hset("user:1", "city", "Delhi");
    console.log("HGET city =", await client.hget("user:1", "city"));

    // ------------------------------
    // 3. LIST OPERATIONS
    // ------------------------------
    await client.del("mylist");
    await client.lpush("mylist", "apple");
    await client.rpush("mylist", "banana");
    await client.rpush("mylist", "orange");

    console.log("LRANGE =", await client.lrange("mylist", 0, -1));

    console.log("LPOP =", await client.lpop("mylist"));
    console.log("RPOP =", await client.rpop("mylist"));

    // LMOVE like rpoplpush
    await client.lpush("source", "A", "B", "C");
    await client.lpush("destination", "X", "Y");

    await client.lmove("source", "destination", "RIGHT", "LEFT");
    console.log("source list =", await client.lrange("source", 0, -1));
    console.log("destination list =", await client.lrange("destination", 0, -1));

    // ------------------------------
    // 4. SET OPERATIONS
    // ------------------------------
    await client.sadd("fruits", "apple", "mango", "banana");
    await client.srem("fruits", "banana");

    console.log("SMEMBERS fruits =", await client.smembers("fruits"));

    // ------------------------------
    // 5. SORTED SET OPERATIONS
    // ------------------------------
    await client.zadd("scores", 100, "kannah", 200, "rohit", 150, "alex");
    console.log("ZRANGE scores =", await client.zrange("scores", 0, -1, "WITHSCORES"));

    // ------------------------------
    // 6. PUB / SUB
    // ------------------------------
    const sub = new Redis();

    sub.subscribe("news");
    sub.on("message", (channel, msg) => {
        console.log(`Subscriber Received → ${channel}: ${msg}`);
    });

    await client.publish("news", "Hello World from Redis!");

    // ------------------------------
    // 7. STREAMS
    // ------------------------------
    const streamKey = "activity_stream";

    await client.xadd(streamKey, "*", "user", "kannah", "action", "login");
    await client.xadd(streamKey, "*", "user", "alex", "action", "logout");

    const streamData = await client.xread(
        { BLOCK: 1000 },
        { key: streamKey, id: "0-0" }
    );
    console.log("STREAM READ =", JSON.stringify(streamData, null, 2));

    // Consumer Group
    try {
        await client.xgroup("CREATE", streamKey, "group1", "0-0");
    } catch (e) {
        // ignore if group exists
    }

    console.log("XREADGROUP =",
        await client.xreadgroup(
            "GROUP",
            "group1",
            "consumer1",
            { key: streamKey, id: ">" }
        )
    );

    // ------------------------------
    // 8. GEO-SPATIAL
    // ------------------------------
    await client.geoadd(
        "places",
        77.5946, 12.9716, "Bangalore",
        72.8777, 19.0760, "Mumbai",
        77.2090, 28.6139, "Delhi"
    );

    console.log(
        "GEORADIUS 500km from Bangalore =",
        await client.georadius("places", 77.5946, 12.9716, 500, "km")
    );

    // ------------------------------
    // 9. PIPELINE EXAMPLE
    // ------------------------------
    const pipeline = client.pipeline();
    pipeline.set("p1", "hello");
    pipeline.incr("count");
    pipeline.lpush("mylist", "new_item");
    console.log("PIPELINE EXEC =", await pipeline.exec());

    console.log("All Redis Operations Completed.");
}

redisDemo();
