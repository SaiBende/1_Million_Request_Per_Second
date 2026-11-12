import crypto from "crypto";
import { redis } from "./database/redis.js";

const generateCode = () => {
  // 375 random bytes becomes 500 Base64 characters
  return crypto.randomBytes(375).toString("base64").substring(0, 500);
};

let cachedMaxId = 0;
let lastCacheUpdate = 0;

// Helper to get max ID with caching to improve performance and save Redis calls.
// Only used in /code-fast GET endpoint.
async function getMaxId() {
  const now = Date.now();
  // Refresh only if cache is older than 500ms
  if (now - lastCacheUpdate > 500) {
    const maxIdStr = await redis.get("codes:seq");
    if (maxIdStr) {
      cachedMaxId = parseInt(maxIdStr, 10);
      lastCacheUpdate = now;
    }
  }
  return cachedMaxId;
}

export { generateCode, getMaxId };
