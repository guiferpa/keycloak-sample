import { FastifyInstance, FastifyPluginCallback } from 'fastify';
import ServiceHttpTask from '../../../../../domain/task/service';

import configureV1Routes from './v1';

const configureRoutes = (service: ServiceHttpTask): FastifyPluginCallback => {
  return async function (router) {
    router.register(configureV1Routes(service), { prefix: '/v1' });
  }
}

export default configureRoutes;
