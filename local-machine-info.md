# Local Machine Information

> Collected on 2026-11-12

## System

| Item | Value |
|---|---|
| Hostname | DESKTOP-DSR1LHM |
| Manufacturer | Dell Inc. |
| Model | Latitude 7400 |
| Motherboard | 07WDVW |
| Operating System | Windows 11 Pro (64-bit) |
| OS Version | 10.0.26200 |

## CPU

| Item | Value |
|---|---|
| Processor | Intel(R) Core(TM) i7-8665U @ 1.90 GHz |
| Architecture | x64 |
| Physical Cores | 4 |
| Logical Processors (Threads) | 8 |
| Base / Current Clock | 1.91 GHz |
| Max Clock Speed | 2.11 GHz |
| L2 Cache | 1 MB (1024 KB) |
| L3 Cache | 8 MB (8192 KB) |

## Memory (RAM)

| Item | Value |
|---|---|
| Installed RAM | 16 GB (15.81 GB usable) |
| Memory Module | 1 x 16 GB (DIMM A) |
| Rated Speed | 2667 MHz |
| Configured Speed | 2400 MHz |
| Type | DDR4 (SMBIOS type 26) |
| Free RAM (at time of check) | 2.21 GB |

## GPU

| Item | Value |
|---|---|
| GPU | Intel(R) UHD Graphics 620 (integrated) |
| Adapter RAM | 1 GB (shared) |
| Driver Version | 31.0.101.2137 |

## Storage

| Drive | Size | Free |
|---|---|---|
| C: | 198.42 GB | 23.75 GB |
| D: | 138.64 GB | 33.40 GB |
| E: | 138.67 GB | 90.70 GB |

## Development Tools

| Tool | Version |
|---|---|
| Node.js | v22.19.0 |
| npm | 10.9.3 |

## Notes for RPS Benchmarking

- 4 physical cores / 8 threads means PM2 clustering tops out around 8 worker processes
- 16 GB RAM is enough for Node.js/Fastify/Redis experiments, but not for running Redis Cluster + load generator + database on the same machine realistically
- Integrated UHD Graphics 620 — no GPU acceleration for any workload
- For meaningful 1M RPS testing, the load generator (AutoCannon) should run on a separate machine to avoid competing for the same CPU
