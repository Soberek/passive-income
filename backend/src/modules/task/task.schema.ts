import { z } from "zod";

export const TaskSchema = z.object({
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

export const TaskCreateSchema = TaskSchema.omit({ taskId: true, createdAt: true });
export const TaskUpdateSchema = TaskCreateSchema.partial();

export type Task = z.infer<typeof TaskSchema>;
export type TaskCreateType = z.infer<typeof TaskCreateSchema>;
export type TaskUpdateType = z.infer<typeof TaskUpdateSchema>;
