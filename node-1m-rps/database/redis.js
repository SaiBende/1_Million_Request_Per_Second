import Redis from "ioredis";

const isCluster = process.env.REDIS_CLUSTER === "true";

const redis = isCluster ? new Redis.Cluster([{ port: 7000 }]) : new Redis();

redis.on("ready", () => {
  if (isCluster) {
    console.log(
      `[redis] cluster ready. Total nodes ${redis.nodes().length} (masters: ${redis.nodes("master").length}, replicas: ${redis.nodes("slave").length})`,
    );
  } else {
    console.log("[redis] standalone ready.");
  }
});

redis.on("error", (err) => {
  console.error("Redis Error:", err.message);
});

export { redis };
