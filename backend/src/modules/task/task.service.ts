import { TaskRepository } from "./task.repository";
import type { CreatableServiceI, DeletableServiceI, UpdatableServiceI, ReadableServiceI } from "../../types/index.type";
import { TaskSchema, TaskCreateSchema, TaskUpdateSchema, TaskCreateType } from "./task.schema";
import { Task } from "./task.schema";
export class TaskService
  implements
    CreatableServiceI<Task, "taskId">,
    DeletableServiceI<Task, "taskId">,
    UpdatableServiceI<Task, "taskId">,
    ReadableServiceI<Task, "taskId">
{
  private repository: TaskRepository;

  constructor(repository: TaskRepository) {
    this.repository = repository;
  }

  add = (entity: TaskCreateType): number | null => {
    const parsedData = { ...entity, date: new Date(entity.date) };
    const validation = TaskCreateSchema.safeParse(parsedData);
    if (!validation.success) {
      console.error("Validation failed:", validation.error.issues);
      throw new Error("Failed to create task");
    }
    return this.repository.add(entity);
  };

  getAll = (): Task[] => {
    return this.repository.getAll();
  };

  getById = (id: number): Task | null => {
    const validation = TaskSchema.shape.taskId.safeParse(id);
    if (!validation.success) {
      console.error("Validation failed:", validation.error.issues);
      throw new Error("Invalid task ID");
    }
    return this.repository.getById(id);
  };

  update = (id: number, entity: Partial<Task>): boolean => {
    const idValidation = TaskSchema.shape.taskId.safeParse(id);
    const entityValidation = TaskUpdateSchema.safeParse(entity);
    if (!entityValidation.success) {
      console.error("Validation failed:", entityValidation.error.issues);
      throw new Error("Failed to update task");
    }
    if (!idValidation.success) {
      throw new Error("Invalid task ID: " + JSON.stringify(idValidation.error.issues));
    }
    return this.repository.update(id, entity);
  };

  delete = (id: number): boolean => {
    const validation = TaskSchema.shape.taskId.safeParse(id);
    if (!validation.success) {
      throw new Error("Invalid task ID: " + JSON.stringify(validation.error.issues));
    }
    return this.repository.delete(id);
  };
}
