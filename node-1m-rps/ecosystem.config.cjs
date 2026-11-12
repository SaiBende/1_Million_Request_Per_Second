module.exports = {
  apps: [
    {
      // Specify F like this: F=express pm2 start ecosystem.config.cjs
      // F indicates the framework to use, Options are: cpeak, express, fastify
      name: process.env.F || "cpeak",
      script: `./${process.env.F || "cpeak"}.js`,
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        REDIS_CLUSTER: "false", // Set to "true" to enable Redis Cluster, otherwise it will use a single Redis instance
        PG_CONNECT: "true", // Set to "true" to enable PostgreSQL connection
      },
    },
  ],
};
