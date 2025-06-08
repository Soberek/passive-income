import z from "zod";

export const actionTypeSchema = z.object({
  actionTypeId: z.number().min(1).optional(),
  name: z.string().min(2).max(100),
});

export type ActionType = z.infer<typeof actionTypeSchema>;
export const actionTypeCreateSchema = actionTypeSchema.omit({ actionTypeId: true });
export const actionTypeUpdateSchema = actionTypeCreateSchema.partial();
