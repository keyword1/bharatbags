// testRedis.js
import { createClient } from "redis";

async function testRedis() {
  // 1️⃣ Create Redis client
  const client = createClient({
    url: "redis://127.0.0.1:6379", // default Redis port
  });

  // 2️⃣ Handle errors
  client.on("error", (err) => console.error("Redis error:", err));

  // 3️⃣ Connect to Redis
  await client.connect();
  console.log("✅ Connected to Redis");

  // 4️⃣ Set a key
  await client.set("testKey", "Hello Redis!");
  console.log("🔹 Key set successfully");

  // 5️⃣ Get the key
  const value = await client.get("testKey");
  console.log("🔹 Value from Redis:", value);

  // 6️⃣ Set a key with expiry (10 seconds)
  await client.set("tempKey", "I will expire soon", { EX: 10 });
  console.log("🔹 tempKey set with 10s expiry");

  // 7️⃣ Wait a bit and read again
  setTimeout(async () => {
    const expiredValue = await client.get("tempKey");
    console.log("🔹 tempKey after 12s:", expiredValue);
    await client.quit();
  }, 12000); // 12 seconds later
}

testRedis();
