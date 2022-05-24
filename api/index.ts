import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import JSONStorage from "./src/adapter/secondary/storage/json/storage";
import ServiceHttpTask from "./src/domain/task/service";
import configureRouter from "./src/adapter/primary/http/rest/router";

const app: FastifyInstance = fastify({ logger: true });

const jsonStorage = new JSONStorage();

const httpService = new ServiceHttpTask(jsonStorage);

app.get('/', async (_: FastifyRequest, reply: FastifyReply) => {
  return { message: "here, everything ok!" };
});

app.register(configureRouter(httpService), { prefix: "/api" });

const run = async (port: string = "8083") => {
  await jsonStorage.loadStorage();

  try {
    await app.listen(port);
    app.log.info(`Sample API's running at ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

run(process.env.PORT).catch(console.error);
