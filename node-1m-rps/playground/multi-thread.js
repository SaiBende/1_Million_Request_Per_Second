import { Worker, isMainThread } from "worker_threads";
import { fileURLToPath } from "url";

if (isMainThread) {
  // Spawn 12 system level threads
  for (let i = 0; i < 12; i++) {
    new Worker(fileURLToPath(import.meta.url));
  }
} else {
  // Run this in each of the threads
  while (true) {}
}
