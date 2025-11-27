const client = require('./client.js');

async function sortedSetExample() {
    // 1️⃣ Clear any previous data
    await client.del("leaderboard");

    // 2️⃣ Add elements with scores
    await client.zadd("leaderboard", 100, "Alice");
    await client.zadd("leaderboard", 250, "Bob");
    await client.zadd("leaderboard", 150, "Charlie");

    console.log("Added leaderboard members");

    // 3️⃣ Get all members with scores (ascending)
    const allMembersAsc = await client.zrange("leaderboard", 0, -1, "WITHSCORES");
    console.log("Leaderboard ascending:", allMembersAsc);

    // 4️⃣ Get all members with scores (descending)
    const allMembersDesc = await client.zrevrange("leaderboard", 0, -1, "WITHSCORES");
    console.log("Leaderboard descending:", allMembersDesc);

    // 5️⃣ Get rank of a member (0-based index)
    const rankAlice = await client.zrank("leaderboard", "Alice");
    console.log("Alice rank (asc):", rankAlice);

    const rankBobDesc = await client.zrevrank("leaderboard", "Bob");
    console.log("Bob rank (desc):", rankBobDesc);

    // 6️⃣ Increment score
    await client.zincrby("leaderboard", 50, "Alice");
    console.log("Alice new score:", await client.zscore("leaderboard", "Alice"));

    // 7️⃣ Remove a member
    await client.zrem("leaderboard", "Charlie");
    console.log("After removing Charlie:", await client.zrange("leaderboard", 0, -1, "WITHSCORES"));

    // 8️⃣ Count members in a score range
    const count = await client.zcount("leaderboard", 100, 300);
    console.log("Members with score 100-300:", count);

    // 9️⃣ Get members by score range (with scores)
    const rangeMembers = await client.zrangebyscore("leaderboard", 100, 300, "WITHSCORES");
    console.log("Members with score 100-300:", rangeMembers);
}

sortedSetExample();
