# 1_Million_Request_Per_Second
# 1 Million Requests Per Second: A Performance Deep Dive

Welcome to this project, which explores the challenges and architectural strategies required to handle **1 million HTTP requests per second**. This repository serves as a companion to a comprehensive engineering deep dive that bridges the gap between theoretical system design and real-world high-scale deployment.

### What You Will Find Here

This project demonstrates how to optimize infrastructure for extreme traffic, moving beyond simple application logic to explore:

*   **Multi-threading and Clustering:** How to fully leverage CPU resources using *Node.js* and *C++*.
*   **Database Bottlenecks:** Insights into why traditional storage-based databases (like *PostgreSQL*) struggle at massive scales.
*   **In-Memory Solutions:** Implementing *Redis* in cluster mode to handle high-concurrency read/write operations.
*   **Infrastructure at Scale:** Using *AWS* for load testing and orchestration to achieve, monitor, and verify colossal traffic results.

### Why This Matters

Handling millions of requests isn't just about raw power; it's about efficient design, understanding hardware utilization, and making intelligent tradeoffs between memory and storage. Whether you are scaling an existing system or preparing for your next high-traffic application, these experiments provide a foundation for thinking like a production-ready engineer.


### Project Tech Stack

To achieve the goal of handling **1 million HTTP requests per second**, the project utilizes a robust, high-performance infrastructure. Below is the core technology stack used throughout the experiments:

*   **Programming Languages:**

    *   *Node.js*: Used for initial prototyping and handling standard API requests.
    *   *C++*: Chosen for maximum performance in high-stakes environments where *Node.js* reaches its limits.

*   **Frameworks & Libraries:**

    *   *Fastify*: A low-overhead web framework for *Node.js*.
    *   *CP*: A custom, zero-dependency framework built to match *Fastify* performance.
    *   *Drogon*: A high-performance *C++* web framework used for the final colossal tests.
    *   *RapidJSON*: Employed for efficient JSON parsing in *C++*.

*   **Databases & Storage:**

    *   *PostgreSQL*: A powerful, open-source relational database used for storage-based operations.
    *   *Redis*: An in-memory data structure store used to bypass disk I/O bottlenecks and handle high-concurrency needs. It is deployed in **Cluster Mode** for scaling.

*   **Infrastructure & Tooling:**

    *   *AWS (Amazon Web Services)*: The cloud platform providing the infrastructure, including *EC2* instances and *RDS*.
    *   *AutoCannon*: A benchmarking tool used to generate massive traffic loads and test system limits.
    *   *PM2*: A production process manager used to handle clustering and utilize multiple CPU cores.

### Understanding CPU Utilization and Threading

To achieve extreme performance at the scale of millions of requests per second, rigorous resource monitoring is mandatory. Without a granular understanding of how your hardware processes tasks, it is impossible to optimize for high-concurrency environments.

#### 1. Core Utilization

At the most fundamental level, you must understand the activity of individual CPU cores. A core is either performing work (executing instructions) or it is **idle** (doing nothing).

*   **Definition:** Core utilization measures the percentage of time a specific processor core is actively executing tasks versus being idle over a defined period.

*   **Formula:**
    $$\text{Utilization} = left( \frac{\text{Total Time} - \text{Idle Time}}{\text{Total Time}} \right) \times 100$$

*   **Key Concept:** An idle core is one that is performing no operations—it is essentially waiting for instructions. By tracking the idle time against the total time elapsed, you can calculate exactly how much "breathing room" or processing capacity that specific core has.

#### 2. Total CPU Utilization

When working with modern multi-core CPUs, you need to interpret how system monitors report total usage. There are two standard methods:

*   **Method 1 (Additive):** This method sums the utilization percentages of all individual cores. If you have a 4-core processor and all cores are fully utilized, the system will report **400%** utilization. This is useful for seeing the total "processing debt" across the entire machine.

*   **Method 2 (Average):** This method calculates the average utilization across all cores, resulting in a scale of **0% to 100%**. This provides a cleaner view of overall system load relative to its total capacity.

#### 3. Threading and Concurrency

Threading is the mechanism used to divide the workload of an application into smaller, concurrent units of execution.

*   **Single-Threaded Execution:** In a single-threaded process, the application can only utilize **one CPU core** at any given moment. Regardless of how many cores the machine has, a single-threaded program cannot perform two operations truly simultaneously. It can only switch between tasks rapidly, which may create an illusion of parallelism.

*   **Multi-Threading:** To fully harness the power of modern multi-core hardware, developers use multi-threading. By spawning multiple threads, a program can distribute tasks across all available CPU cores, enabling true parallel execution.

*   **Critical Considerations:**

    *   **Performance Scaling:** Multi-threading is essential for high-throughput systems, as it prevents a single core from becoming a bottleneck.
    *   **Synchronization:** When multiple threads access shared resources, you encounter **race conditions**—scenarios where the outcome depends on the unpredictable timing of thread execution. To prevent data corruption, developers must use synchronization primitives like **semaphores** or **mutexes** to ensure that threads coordinate access to resources correctly.