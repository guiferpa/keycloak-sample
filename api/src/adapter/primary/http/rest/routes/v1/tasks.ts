import { FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import HttpStatusCodes from 'http-status-codes';

import ServiceHttpTask from "../../../../../../domain/task/service";
import { Task } from "../../../../../../domain/task/task";

interface TaskPayload {
  name: string;
  description: string;
}

interface CreateTaskRequestProps {
  Body: TaskPayload;
}

const createTask = (service: ServiceHttpTask) => {
  return async function (req: FastifyRequest<CreateTaskRequestProps>, reply: FastifyReply) {
    const task: Task = { ...req.body, done: false };
    reply.code(HttpStatusCodes.CREATED);
    return await service.create(task);
  }
}

const listTasks = (service: ServiceHttpTask) => {
  return async function () {
    return await service.list();
  }
} 

interface GetTaskByIdRequestProps extends RouteGenericInterface {
  Params: {
    id: string;
  }
}

const getTaskById = (service: ServiceHttpTask) => {
  return async function (req: FastifyRequest<GetTaskByIdRequestProps>, reply: FastifyReply) {
    try {
      return await service.getById(req.params.id);
    } catch(err) {
      reply.code(HttpStatusCodes.NOT_FOUND);
      return { message: (err as Error).message };
    }
  }
}

const deleteTaskById = (service: ServiceHttpTask) => {
  return async function (req: FastifyRequest<GetTaskByIdRequestProps>, reply: FastifyReply) {
    reply.code(HttpStatusCodes.NO_CONTENT);
    return await service.deleteById(req.params.id);
  }
}

const configureRoutes = (service: ServiceHttpTask): FastifyPluginCallback => {
  return async function(router) {
    router.post('/', createTask(service));
    router.get('/', listTasks(service));
    router.get('/:id', getTaskById(service));
    router.delete('/:id', deleteTaskById(service));
  }
}

export default configureRoutes;
