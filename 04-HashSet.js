const client = require('./client.js');

async function init() {

    // Delete old data
    await client.del("bike:1");

    // HSET → Add fields
    await client.hset("bike:1", {
        name: "RX100",
        speed: "100kmph",
        color: "black"
    });
    console.log("HSET done");

    // HGET → get single field
    console.log("Name:", await client.hget("bike:1", "name"));

    // HGETALL → get all fields
    console.log("All fields:", await client.hgetall("bike:1"));

    // HDEL → remove a field
    await client.hdel("bike:1", "color");
    console.log("After deleting color:", await client.hgetall("bike:1"));

    // HEXISTS → check field
    console.log("Speed exists?", await client.hexists("bike:1", "speed"));

    // HINCRBY → increment a number field
    await client.hset("bike:1", "count", 5);
    await client.hincrby("bike:1", "count", 3);
    console.log("Count after increment:", await client.hget("bike:1", "count"));

}
init();
