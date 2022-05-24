import { Task } from './task'

export interface PrimaryHttpPort {
  create(task: Task): Promise<Task>;
  list(): Promise<Task[]>;
  getById(id: string): Promise<Task>;
  deleteById(id: string): Promise<void>;
}

export interface SecondaryStoragePort {
  persistTask(task: Task): Promise<Task>;
  listTasks(): Promise<Task[]>;
  getTaskById(taskId: string): Promise<Task>;
  deleteTaskById(taskId: string): Promise<void>;
}
