import { TaskRepository } from "../repositories/task.repository";
import type { CreatableServiceI, DeletableServiceI, UpdatableServiceI, ReadableServiceI } from "../types/index.type";
import { Task } from "../../../shared/types";
import { z } from "zod";

const TaskSchema = z.object({
  taskId: z.number().min(1),
  referenceNumber: z.string().min(2).max(100),
  taskNumber: z.string().min(2).max(100).optional(),
  institutionId: z.number().min(1),
  programId: z.number().min(1),
  actionTypeId: z.number().min(1),
  description: z.string().min(5).max(500).optional(),
  date: z.date(),
  actionsCount: z.number().min(0),
  audienceCount: z.number().min(0),
  mediaPlatformId: z.number().min(1).optional(),
  createdAt: z.date().optional(),
});

const TaskCreateSchema = TaskSchema.omit({ taskId: true, createdAt: true });
const TaskUpdateSchema = TaskCreateSchema.partial();

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

  add = (entity: Partial<Task>): number | null => {
    const validation = TaskCreateSchema.safeParse(entity);
    if (!validation.success) {
      throw new Error("Invalid task data: " + JSON.stringify(validation.error.issues));
    }
    return this.repository.add(entity);
  };

  getAll = (): Task[] => {
    return this.repository.getAll();
  };

  getById = (id: number): Task | null => {
    const validation = z.number().min(1).safeParse(id);
    if (!validation.success) {
      throw new Error("Invalid task ID: " + JSON.stringify(validation.error.issues));
    }
    return this.repository.getById(id);
  };

  update = (id: number, entity: Partial<Task>): boolean => {
    const idValidation = z.number().min(1).safeParse(id);
    const entityValidation = TaskUpdateSchema.safeParse(entity);
    if (!entityValidation.success) {
      throw new Error("Invalid task data: " + JSON.stringify(entityValidation.error.issues));
    }
    if (!idValidation.success) {
      throw new Error("Invalid task ID: " + JSON.stringify(idValidation.error.issues));
    }
    return this.repository.update(id, entity);
  };

  delete = (id: number): boolean => {
    const validation = z.number().min(1).safeParse(id);
    if (!validation.success) {
      throw new Error("Invalid task ID: " + JSON.stringify(validation.error.issues));
    }
    return this.repository.delete(id);
  };
}
