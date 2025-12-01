const client = require('./client.js');

async function stringExample() {
  // SET
  await client.set("name", "kannah");
  console.log("SET name:", await client.get("name"));

  // SET with EX seconds
  await client.set("session", "active", { EX: 3 });
  console.log("SET session with expiry:", await client.get("session"));

  // GETRANGE
  await client.set("message", "HelloRedis");
  console.log("GETRANGE message (0-4):", await client.getRange("message", 0, 4));

  // APPEND
  await client.append("message", "_World");
  console.log("APPEND message:", await client.get("message"));

  // INCR
  await client.set("count", 5);
  console.log("INCR count:", await client.incr("count"));

  // DECR
  console.log("DECR count:", await client.decr("count"));

  // MSET
  await client.mSet({
    key1: "value1",
    key2: "value2",
  });
  console.log("MGET key1 & key2:", await client.mGet(["key1", "key2"]));

  // EXPIRE
  await client.expire("key1", 5);
  console.log("TTL key1:", await client.ttl("key1"));
}

stringExample();
