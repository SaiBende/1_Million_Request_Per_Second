/**
 * You can imagine that in the real-world, you would have a script like this
 * that you'll run in the background to sync data from Redis to Postgres
 * at a controlled pace to avoid overwhelming the database.
 */

async function syncWorker() {
  console.log("Worker started...");

  while (true) {
    try {
      // pop an ID from the queue
      const result = await redis.brpop("codes:sync_queue", 0);
      const id = result[1];

      // Fetch the full data from Redis
      const data = await redis.hgetall(`code:${id}`);

      if (!data || !data.code) {
        console.error(`Missing data for ID ${id}`);
        continue;
      }

      // Safe Insert into Postgres
      // We use ON CONFLICT DO NOTHING to be idempotent
      await DB.query(
        `INSERT INTO codes (id, code, created_at) VALUES ($1, $2, $3)
         ON CONFLICT (id) DO NOTHING`,
        [data.id, data.code, data.created_at],
      );
    } catch (err) {
      console.error("Sync failed:", err);
      // In a real app, you would push the ID back to someplace to retry later
    }
  }
}

syncWorker();
