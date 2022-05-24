import { PrimaryHttpPort, SecondaryStoragePort } from "./port";
import { Task } from "./task";

class ServiceHttpTask implements PrimaryHttpPort {
  constructor(
    private readonly storage: SecondaryStoragePort
  ) { }

  public async create(task: Task): Promise<Task> {
    return await this.storage.persistTask(task);
  }

  public async list(): Promise<Task[]> {
    return await this.storage.listTasks();
  }

  public async getById(id: string): Promise<Task> {
    return await this.storage.getTaskById(id);
  }

  public async deleteById(id: string): Promise<void> {
    await this.storage.deleteTaskById(id);
  }
}

export default ServiceHttpTask;
