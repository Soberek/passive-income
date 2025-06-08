import { z } from "zod";

export const schoolSchema = z.object({
  schoolId: z.number().min(1).optional(),
  institutionId: z.number().min(1).optional(),
  director: z.string().min(2).max(100),
});

export const schoolCreateSchema = schoolSchema.omit({ schoolId: true });
export const schoolUpdateSchema = schoolCreateSchema.partial();
