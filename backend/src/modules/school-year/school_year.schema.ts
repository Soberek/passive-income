import { z } from "zod";

export const schoolYearSchema = z.object({
  schoolYearId: z.number().min(1).optional(),
  year: z.string().min(4).max(4),
});

export type SchoolYear = z.infer<typeof schoolYearSchema>;
export const schoolYearCreateSchema = schoolYearSchema.omit({ schoolYearId: true });
export const schoolYearUpdateSchema = schoolYearCreateSchema.partial();
