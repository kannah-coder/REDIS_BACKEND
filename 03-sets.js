const client = require("./client.js");

async function init() {
    // Clear old sets
    await client.del("bikes:racing:france");
    await client.del("bikes:racing:india");
    await client.del("bikes:mountain:france");

    console.log("Old keys cleared.");

    // -----------------------------
    // 1. SADD (Add items to set)
    // -----------------------------
    await client.sadd("bikes:racing:france", "bike:1");
    await client.sadd("bikes:racing:france", "bike:2");
    await client.sadd("bikes:racing:france", "bike:3");

    await client.sadd("bikes:racing:india", "bike:2");
    await client.sadd("bikes:racing:india", "bike:4");

    await client.sadd("bikes:mountain:france", "bike:3");

    console.log("Values added.");

    // -----------------------------
    // 2. SMEMBERS (Get all values)
    // -----------------------------
    const franceRacing = await client.smembers("bikes:racing:france");
    console.log("France Racing Bikes:", franceRacing);

    // -----------------------------
    // 3. SISMEMBER (Check membership)
    // -----------------------------
    const isExists = await client.sismember("bikes:racing:france", "bike:2");
    console.log("Is bike:2 in France racing set?", isExists ? "Yes" : "No");

    // -----------------------------
    // 4. SREM (Remove an item)
    // -----------------------------
    await client.srem("bikes:racing:france", "bike:1");
    const afterRemove = await client.smembers("bikes:racing:france");
    console.log("After removing bike:1:", afterRemove);

    // -----------------------------
    // 5. SCARD (Size of set)
    // -----------------------------
    const count = await client.scard("bikes:racing:france");
    console.log("Total bikes in France racing:", count);

    // -----------------------------
    // 6. SUNION (Union of sets)
    // -----------------------------
    const unionFranceIndia = await client.sunion("bikes:racing:france", "bikes:racing:india");
    console.log("Union (France + India racing):", unionFranceIndia);

    // -----------------------------
    // 7. SINTER (Common values)
    // -----------------------------
    const commonFranceIndia = await client.sinter("bikes:racing:france", "bikes:racing:india");
    console.log("Intersection (Common racing bikes):", commonFranceIndia);

    // -----------------------------
    // 8. SDIFF (Find difference)
    // -----------------------------
    const onlyFrance = await client.sdiff("bikes:racing:france", "bikes:racing:india");
    console.log("Only France racing bikes:", onlyFrance);

    // -----------------------------
    // 9. DELETE SET
    // -----------------------------
    await client.del("bikes:mountain:france");
    console.log("Deleted mountain france set.");
}

init();
