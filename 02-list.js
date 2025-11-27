// list_practice.js
const client = require("./client.js");

async function init() {

    console.log("\n======= LIST OPERATIONS PRACTICE =======");

    // CLEAR LIST BEFORE START
    await client.del("fruits");

    // LPUSH (add left)
    await client.lpush("fruits", "apple");
    await client.lpush("fruits", "mango");

    // RPUSH (add right)
    await client.rpush("fruits", "banana");
    await client.rpush("fruits", "orange");

    console.log("LRANGE fruits ->", await client.lrange("fruits", 0, -1));


    // LPOP (remove from left)
    console.log("LPOP fruits ->", await client.lpop("fruits"));

    // RPOP (remove from right)
    console.log("RPOP fruits ->", await client.rpop("fruits"));


    // LINDEX (get by index)
    console.log("LINDEX fruits[0] ->", await client.lindex("fruits", 0));


    // LLEN (length)
    console.log("LLEN fruits ->", await client.llen("fruits"));


    // LSET (update a value at index)
    await client.lset("fruits", 0, "grapes");
    console.log("After LSET ->", await client.lrange("fruits", 0, -1));


    // LREM (remove element by value)
    await client.lrem("fruits", 1, "banana");  // remove 1 occurrence
    console.log("After LREM banana ->", await client.lrange("fruits", 0, -1));


    // LINSERT (insert before/after)
    await client.linsert("fruits", "AFTER", "grapes", "kiwi");
    console.log("After LINSERT ->", await client.lrange("fruits", 0, -1));


    console.log("\n======= MOVING OPERATIONS =======");

    await client.del("source");
    await client.del("destination");

    await client.rpush("source", "one", "two", "three");

    // RPOPLPUSH (move last → destination.left)
    console.log("RPOPLPUSH ->", await client.rpoplpush("source", "destination"));
    console.log("source ->", await client.lrange("source", 0, -1));
    console.log("destination ->", await client.lrange("destination", 0, -1));


    // LMOVE (any direction → any direction)
    await client.rpoplpush("source", "destination");
    console.log("LMOVE (RIGHT → LEFT)");
    console.log("source ->", await client.lrange("source", 0, -1));
    console.log("destination ->", await client.lrange("destination", 0, -1));


    console.log("\nAll LIST operations completed!");
}

init();
