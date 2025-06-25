import z from "zod";
import { Task } from "../../../../shared/types";

const TaskSchema = z.object({
  taskId: z.number(),
  referenceNumber: z.string().min(1, "Reference number is required").optional(),
  taskNumber: z.string().optional(),
  institutionId: z.number().min(1, "Institution ID is required"),
  programId: z.number().min(1, "Program ID is required"),
  actionTypeId: z.number().min(1, "Action Type ID is required"),
  description: z.string().optional(),
  date: z.string(),
  actionsCount: z.number().min(0, "Actions count must be at least 0"),
  audienceCount: z.number().min(0, "Audience count must be at least 0"),
  mediaPlatformId: z.number(),
}) satisfies z.ZodType<Task>;

export const TaskSchemaCreate = TaskSchema.omit({
  taskId: true, // Omit taskId for creation
  mediaPlatformId: true, // Omit mediaPlatformId for creation
});

export const TaskSchemaPublicationCreate = TaskSchema.omit({
  taskId: true, // Omit taskId for publication
  referenceNumber: true, // Omit referenceNumber for publication
  institutionId: true, // Omit institutionId for publication
  audienceCount: true, // Omit audienceCount for publication
});

export type TaskCreateType = z.infer<typeof TaskSchemaCreate>;
export type TaskPublicationCreateType = z.infer<typeof TaskSchemaPublicationCreate>;
