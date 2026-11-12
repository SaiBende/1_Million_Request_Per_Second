# Overview

This is the main repository that we used in the [Handling 1 Million Requests per Second Video](https://youtu.be/W4EwfEU8CGA).

### Setup

To be able to run the code, you need to have Node.js, Redis, and Postgres installed.

Clone the repository and create a file in the database directory called `keys.js` and put the following content in there:

```javascript
/**
 * If you have a freshly installed Postgres with the default config,
 * these should work even if you don't have the benchmark database
 * created. But if you have changed anything, like adding a password,
 * please make sure to specify the correct value.
 */
const keys = {
  dbUser: "<your-postgres-username>",
  dbHost: "localhost",
  dbDatabase: "benchmark",
  dbPassword: "",
  dbPort: 5432,
};

export default keys;
```

Once done, run this command from the root directory to install the dependencies:

```
npm install
```

Then, initialize the Postgres database by running:

```
npm run seed
```

Now, you can run either the Express.js, Fastify, or Cpeak version (all have the same logic). They are just 3 different frameworks for Node.js.

```
node cpeak.js
```

or `node express.js` or `node fastify.js`.

Then you should get a log like this:

```
Cpeak server running at http://localhost:3000
[redis] standalone ready.
[postgres] connected successfully to benchmark.
```

**Redis cluster mode**: If you want to run the app with Redis in cluster mode, use the [redis.sh](redis.sh) file to set it up.

---

### Environment Variables

You can customize how the application runs by passing these 2 environment variables:

- `REDIS_CLUSTER` to indicate whether the app should connect to Redis cluster mode or not. Default: "false"
- `PG_CONNECT` to indicate whether the app should connect to Postgres database. Default: "true"

Example:

```
PG_CONNECT=false REDIS_CLUSTER=true node express.js
```

Output should be:

```
Express server running at http://localhost:3001
[redis] cluster ready. Total nodes 30 (masters: 15, replicas: 15)
```

---

### Node.js Cluster Mode

If you want to run the app in cluster mode, you can use PM2 for it. Check first if you have pm2 installed by running `pm2 --version` and if you don't have it, install it by running `npm install -g pm2`.

Then you can start the app in cluster mode by running:

```
pm2 start ecosystem.config.cjs
```

Check the `ecosystem.config.cjs` to change the [environment variables](#environment-variables).

The above command will run the cpeak server by default. If you want it to run Express or Fastify instead, specify the F environment variable like this:

```
F=express pm2 start ecosystem.config.cjs
```

or `F=fastify pm2 start ecosystem.config.cjs` to start the Fastify server.

You can run `pm2 logs` to check the logs of the application when running in cluster mode.

---

### Other Commands

When seeding the database, specify the -r option to indicate how many records should be added to the database:

```
npm run seed -- -r 20000000
```

_This will insert 20 million records into the codes table._

To move all the Postgres data over to Redis, run:

```
npm run migrate
```

_This does not work with Redis in cluster mode._
