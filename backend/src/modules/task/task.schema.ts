import { z, ZodType } from "zod";

import { Task as TaskI } from "../../../../shared/types";

export const TaskSchema = z.object({
  taskId: z.number().min(1),
  referenceNumber: z.string().min(2).max(100),
  taskNumber: z.string().min(2).max(100).optional(),
  institutionId: z.number().min(1),
  programId: z.number().min(1),
  actionTypeId: z.number().min(1),
  description: z.string().min(5).max(500).optional(),
  date: z.string().min(10).max(10), // YYYY-MM-DD
  actionsCount: z.number().min(0),
  audienceCount: z.number().min(0),
  mediaPlatformId: z.number().min(1).optional(),
  createdAt: z.date().optional(),
}) satisfies ZodType<TaskI>;

export const TaskCreateSchema = TaskSchema.omit({ taskId: true, createdAt: true });
export const TaskUpdateSchema = TaskCreateSchema.partial();

export type Task = z.infer<typeof TaskSchema>;
export type TaskCreateType = z.infer<typeof TaskCreateSchema>;
export type TaskUpdateType = z.infer<typeof TaskUpdateSchema>;
