import { Redis } from "ioredis";

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
});

redisClient.on("connect", () => {
  console.log("Redis server is connected");
});

redisClient.on("close", () => {
  console.log("Connection closed");
});

redisClient.on("end", () => {
  console.log("Connection fully ended (destroyed)");
});

redisClient.on("error", (error) => {
  console.log("Redis server error", error);
});

export default redisClient;
