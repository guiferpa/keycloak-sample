import path from 'path';
import fs from 'fs';
import util from 'util'
import { v4 as uuid } from 'uuid';

import { SecondaryStoragePort as TaskSecondaryStoragePort } from '../../../../domain/task';
import { Task } from '../../../../domain/task/task';

interface TaskModel {
  id: string;
  name: string;
  description: string;
  done: boolean;
}

class JSONStorage implements TaskSecondaryStoragePort {
  private memory: TaskModel[] = [];
  private path: string = "";

  constructor(
    private readonly filename: string = ".storage/data.json"
  ) {
    this.path = path.join(__dirname, "../../../../../", this.filename);
  }

  public async loadStorage(): Promise<void> {
    try {
      const content = await util.promisify(fs.readFile)(this.path, { encoding: "utf-8" });
      this.memory = JSON.parse(content.toString());
    } catch (err) {
      await util.promisify(fs.mkdir)(path.dirname(this.path), { recursive: true });
      await util.promisify(fs.writeFile)(this.path, Buffer.from(JSON.stringify([])));
    }
  }

  private async persitOnStorage(): Promise<void> {
    const data = Buffer.from(JSON.stringify(this.memory), "utf-8");
    await util.promisify(fs.writeFile)(this.path, data);
  }

  public async persistTask(task: Task): Promise<Task> {
    const { name = "", description = "", done = false } = task;
    const ntask: TaskModel = { id: uuid(), name, description, done };
    this.memory = [...this.memory, ntask];
    await this.persitOnStorage();
    return ntask as Task;
  }

  public async getTaskById(taskId: string): Promise<Task> {
    const result = this.memory.filter(({ id }) => id === taskId);
    if (result.length < 1) throw new Error("task not found");
    return result[0] as Task;
  }

  public async listTasks(): Promise<Task[]> {
    return this.memory as Task[];
  }

  public async deleteTaskById(taskId: string): Promise<void> {
    this.memory = this.memory.filter(({ id }) => id !== taskId);
    await this.persitOnStorage();
  }
}

export default JSONStorage;
