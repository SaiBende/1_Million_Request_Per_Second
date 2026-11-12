/*
 Run this script to migrate data from Postgres to Redis in batches.

 This does not work when Redis is clustered.
*/

import { DB } from "./index.js";
import Redis from "ioredis";

const redis = new Redis();

const BATCH_SIZE = 2000;

async function migrate() {
  console.log("Starting batch migration...");

  let lastId = 0;
  let totalProcessed = 0;

  // First flush existing Redis data to avoid duplicates
  await redis.flushdb();
  console.log("Flushed existing Redis data.");

  while (true) {
    // Fetch a batch of 2000 records
    const rows = await DB.query(
      `SELECT id, code, created_at FROM codes 
       WHERE id > $1 
       ORDER BY id ASC 
       LIMIT $2`,
      [lastId, BATCH_SIZE],
    );

    if (rows.length === 0) break; // No more records, we are done!

    // Prepare redis pipeline
    const pipeline = redis.pipeline();

    for (const row of rows) {
      // Store data in hash
      pipeline.hset(`code:${row.id}`, {
        id: row.id,
        code: row.code,
        created_at: new Date(row.created_at).toISOString(),
      });

      // For unique constraint
      pipeline.sadd("codes:unique", row.code);

      // Update for next batch
      lastId = row.id;
    }

    // Send this batch to Redis
    await pipeline.exec();

    totalProcessed += rows.length;

    // Log progress gradually
    if (totalProcessed % 100000 === 0) {
      console.log(`Processed ${totalProcessed} records...`);
    }
  }

  // Set the auto-increment sequence to the final max id
  await redis.set("codes:seq", lastId);

  console.log(`Migration Finished. Total records: ${totalProcessed}`);
  process.exit();
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
