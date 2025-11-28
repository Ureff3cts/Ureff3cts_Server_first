import Fastify from "fastify";
import { Storage } from "./storage";
import { registerRoutes } from "./api";

const app = Fastify({ logger: true });
const store = new Storage();

registerRoutes(app, store);

app.listen({ port: 8080 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`🚀 Ureff3cts DB server running at ${address}`);
});

