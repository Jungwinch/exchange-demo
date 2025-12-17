import { WebSocketServer } from "ws";
import { createClient } from "redis";

const wss = new WebSocketServer({ port: 3002 });
const redis = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379"
});
await redis.connect();

const broadcast = (msg) =>
  wss.clients.forEach(c =>
    c.readyState === 1 && c.send(JSON.stringify(msg))
  );

await redis.subscribe("book:update", msg =>
  broadcast({ type: "BOOK", data: JSON.parse(msg) })
);

await redis.subscribe("trade:executed", msg =>
  broadcast({ type: "TRADE", data: JSON.parse(msg) })
);

console.log("WebSocket running on 3002");


