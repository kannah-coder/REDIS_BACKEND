 const client = require("./client.js");

async function init() {

    console.log("======= STRING OPERATIONS =======");

    await client.set("name", "Kannah");
    console.log("SET name ->", await client.get("name"));

    await client.set("count", 10);
    console.log("GET count ->", await client.get("count"));

    await client.incr("count");
    console.log("INCR count ->", await client.get("count"));

    await client.decr("count");
    console.log("DECR count ->", await client.get("count"));

    await client.expire("count", 5);
    console.log("TTL count ->", await client.ttl("count"));


    console.log("\n======= DELETE KEY =======");
    console.log("DEL name ->", await client.del("name"));
}
init();