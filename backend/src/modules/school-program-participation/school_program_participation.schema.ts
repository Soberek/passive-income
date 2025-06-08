import z from "zod";

export const schoolProgramParticipationSchema = z.object({
  schoolId: z.number().min(1),
  programId: z.number().min(1),
  schoolYearId: z.number().min(1),
});

export type SchoolProgramParticipation = z.infer<typeof schoolProgramParticipationSchema>;
export const schoolProgramParticipationCreateSchema = schoolProgramParticipationSchema.omit({
  schoolYearId: true,
});
export const schoolProgramParticipationUpdateSchema = schoolProgramParticipationCreateSchema.partial();
