import Fastify from "fastify";
import { Storage } from "./storage";
import { registerRoutes } from "./api";

const app = Fastify({ logger: true });
const store = new Storage();

// 🔑 Authentication middleware
app.addHook("onRequest", async (req, reply) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== process.env.API_KEY) {
    reply.code(401).send({ error: "Unauthorized" });
  }
});

registerRoutes(app, store);

const PORT = Number(process.env.PORT ?? 8080);

app.listen({ port: PORT, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`🚀 Ureff3cts DB server running at ${address}`);
});
