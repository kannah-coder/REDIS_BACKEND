const client = require('./client.js'); // make sure this exports ioredis client

async function streamExample() {
  // 1️⃣ Add messages
  await client.xadd("mystream", "*", "user", "Alice", "action", "login");
  await client.xadd("mystream", "*", "user", "Bob", "action", "logout");

  // 2️⃣ Read all messages
  const allMessages = await client.xrange("mystream", "-", "+");
  console.log("All messages:", allMessages);

  // 3️⃣ Create consumer group
  try {
    await client.xgroup("CREATE", "mystream", "group1", "$", "MKSTREAM");
  } catch (err) {
    console.log("Group might already exist:", err.message);
  }

  // 4️⃣ Consumer 1 reads new messages
  const consumer1Msgs = await client.xreadgroup(
    "GROUP", "group1", "consumer1",   // consumer group info
    "COUNT", 10,                      // optional
    "BLOCK", 5000,                    // optional in milliseconds
    "STREAMS", "mystream", ">"        // stream and ID
  );

  console.log("Consumer1 received:", consumer1Msgs);

  // 5️⃣ Acknowledge first message
  if (consumer1Msgs && consumer1Msgs.length) {
    const [streamName, messages] = consumer1Msgs[0];
    const [id] = messages[0];  // messages[0] = [id, [field, value, ...]]
    await client.xack("mystream", "group1", id);
    console.log("Acknowledged message:", id);
  }

  // 6️⃣ Check pending messages
  const pending = await client.xpending("mystream", "group1");
  console.log("Pending:", pending);

  client.quit();
}

streamExample();
