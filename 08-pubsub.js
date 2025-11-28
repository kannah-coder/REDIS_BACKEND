const Redis = require("ioredis");

async function pubsubExample() {
  // Create publisher and subscriber
  const publisher = new Redis();
  const subscriber = new Redis();

  // 1. Subscribe to a channel
  subscriber.subscribe("myChannel", () => {
    console.log("Subscriber listening on: myChannel");
  });

  // 2. Receive messages
  subscriber.on("message", (channel, message) => {
    console.log(`📩 Received from ${channel}: ${message}`);
  });

  // 3. Publish messages every 2 seconds
  setInterval(() => {
    const msg = "Hello at " + new Date().toLocaleTimeString();
    console.log("📤 Publishing:", msg);
    publisher.publish("myChannel", msg);
  }, 2000);
}

pubsubExample();
