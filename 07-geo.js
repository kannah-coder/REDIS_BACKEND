const client = require("./client.js");


async function geoSpatialExample() {
  console.log("=== Redis Geospatial Hero Template ===");

  // 1️⃣ Add locations (GEOADD)
  console.log("\nAdding locations...");
  await client.geoadd("cities", 77.5946, 12.9716, "Bangalore"); // longitude, latitude, member
  await client.geoadd("cities", 72.8777, 19.0760, "Mumbai");
  await client.geoadd("cities", 88.3639, 22.5726, "Kolkata");
  await client.geoadd("cities", 77.2090, 28.6139, "Delhi");
  console.log("Locations added!");

  // 2️⃣ Get position of a city (GEOPOS)
  const bangalorePos = await client.geopos("cities", "Bangalore");
  console.log("\nBangalore position:", bangalorePos);

  // 3️⃣ Get distance between two cities (GEODIST)
  const dist = await client.geodist("cities", "Bangalore", "Mumbai", "km");
  console.log("\nDistance between Bangalore and Mumbai:", dist, "km");

  // 4️⃣ Get cities within radius (GEORADIUS / GEORADIUSBYMEMBER)
  console.log("\nCities within 1500 km of Bangalore:");
  const nearby = await client.georadius("cities", 77.5946, 12.9716, 1500, "km", "WITHDIST", "WITHCOORD");
  console.log(nearby);

  console.log("\nCities within 1500 km of Delhi:");
  const nearbyDelhi = await client.georadiusbymember("cities", "Delhi", 1500, "km", "WITHDIST", "WITHCOORD");
  console.log(nearbyDelhi);

  // 5️⃣ Remove a city (ZREM — since geos are stored in a sorted set)
  await client.zrem("cities", "Kolkata");
  console.log("\nRemoved Kolkata");

  // 6️⃣ Get all cities sorted by distance from Bangalore
  console.log("\nCities sorted by distance from Bangalore:");
  const sorted = await client.georadius("cities", 77.5946, 12.9716, 5000, "km", "WITHDIST", "ASC");
  console.log(sorted);

  client.quit();
}

geoSpatialExample();
