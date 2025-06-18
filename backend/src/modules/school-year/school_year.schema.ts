import { z, ZodType } from "zod";
import { SchoolYear as SchoolYearI } from "../../../../shared/types";

export const schoolYearSchema = z.object({
  schoolYearId: z.number().min(1),
  year: z.enum(["2024/2025", "2025/2026", "2026/2027", "2027/2028"]),
}) satisfies ZodType<SchoolYearI>;

export type SchoolYear = z.infer<typeof schoolYearSchema>;
export const schoolYearCreateSchema = schoolYearSchema.omit({ schoolYearId: true });
export const schoolYearUpdateSchema = schoolYearCreateSchema.partial();
