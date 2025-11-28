app.addHook("onRequest", async (req, reply) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== process.env.API_KEY) {
    reply.code(401).send({ error: "Unauthorized" });
  }
});
