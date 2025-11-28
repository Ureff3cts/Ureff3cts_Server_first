import { FastifyInstance } from "fastify";

/**
 * API Key Authentication Middleware
 *
 * Validates incoming requests by checking for a valid API key in the x-api-key header.
 * Requests without a valid API key will receive a 401 Unauthorized response.
 *
 * @param app - FastifyInstance to attach the middleware to
 * @throws 401 Unauthorized if the API key is missing or invalid
 */
export function registerAuthMiddleware(app: FastifyInstance) {
  app.addHook("onRequest", async (req, reply) => {
    const apiKey = req.headers["x-api-key"];
    if (apiKey !== process.env.API_KEY) {
      reply.code(401).send({ error: "Unauthorized" });
    }
  });
}
