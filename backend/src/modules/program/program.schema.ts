import { z } from "zod";

export const programSchema = z.object({
  programId: z.number().min(1),
  name: z.string().min(2).max(100),
  description: z.string().optional(),
});
export const programCreateSchema = programSchema.omit({ programId: true });

export const programUpdateSchema = programCreateSchema.partial();
