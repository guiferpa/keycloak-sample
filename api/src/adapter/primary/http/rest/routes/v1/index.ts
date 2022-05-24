import { FastifyPluginCallback } from 'fastify';
import ServiceHttpTask from '../../../../../../domain/task/service';

import configureTaskRoutes from './tasks';

const configureRoutes = (service: ServiceHttpTask): FastifyPluginCallback => {
  return async function (router) {
    router.register(configureTaskRoutes(service), { prefix: '/tasks' });
  }
}

export default configureRoutes;
