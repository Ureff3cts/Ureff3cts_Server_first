import { FastifyInstance } from "fastify";
import { Storage } from "./storage";

export function registerRoutes(app: FastifyInstance, store: Storage) {
  app.put<{ Params: { key: string }; Body: { value: string } }>(
    "/kv/:key",
    {
      schema: {
        body: {
          type: "object",
          required: ["value"],
          properties: {
            value: { type: "string" }
          }
        }
      }
    },
    async (req, reply) => {
      const { key } = req.params;
      const { value } = req.body;
      store.put(key, value);
      reply.code(204).send();
    }
  );

  app.get<{ Params: { key: string } }>("/kv/:key", async (req, reply) => {
    const { key } = req.params;
    const value = store.get(key);
    if (value) {
      reply.send({ value });
    } else {
      reply.code(404).send();
    }
  });

  app.delete<{ Params: { key: string } }>("/kv/:key", async (req, reply) => {
    const { key } = req.params;
    store.delete(key);
    reply.code(204).send();
  });
}

