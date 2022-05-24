import { FastifyInstance, FastifyPluginCallback } from "fastify";
import ServiceHttpTask from "../../../../domain/task/service";

import configureRoutes from './routes';

const configureRouter = (service: ServiceHttpTask): FastifyPluginCallback => {
  return async function(router: FastifyInstance) {
    router.register(configureRoutes(service), { prefix: '/' });
  }
}

export default configureRouter;
