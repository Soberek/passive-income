import z from "zod";

export const schoolProgramParticipationSchema = z.object({
  participationId: z.number(),
  schoolId: z.number().min(1),
  programId: z.number().min(1),
  schoolYearId: z.number().min(1),
});

export const schoolProgramParticipationCreateSchema = schoolProgramParticipationSchema.omit({
  participationId: true,
});
export const schoolProgramParticipationUpdateSchema = schoolProgramParticipationCreateSchema.partial();

export type SchoolProgramParticipationType = z.infer<typeof schoolProgramParticipationSchema>;
export type schoolProgramParticipationCreateType = z.infer<typeof schoolProgramParticipationCreateSchema>;
export type schoolProgramParticipationUpdateType = z.infer<typeof schoolProgramParticipationUpdateSchema>;
