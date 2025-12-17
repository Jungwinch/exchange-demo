import { createClient } from "redis";

export const redis = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379"
});

await redis.connect();

export const publish = (channel, payload) =>
  redis.publish(channel, JSON.stringify(payload));


