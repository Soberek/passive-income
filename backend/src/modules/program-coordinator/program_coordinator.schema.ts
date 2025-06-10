import z from "zod";

export const ProgramCoordinatorSchema = z.object({
  coordinatorId: z.number().int(),
  programId: z.number().int(),
  institutionId: z.number().int(),
  contactId: z.number().int(),
  schoolYearId: z.number().int(),
  createdAt: z.date(),
});

export const programCoordinatorCreateSchema = ProgramCoordinatorSchema.omit({ coordinatorId: true, createdAt: true });
export const programCoordinatorUpdateSchema = ProgramCoordinatorSchema.partial().omit({
  coordinatorId: true,
  createdAt: true,
});

export type ProgramCoordinatorType = z.infer<typeof ProgramCoordinatorSchema>;
export type ProgramCoordinatorCreateType = z.infer<typeof programCoordinatorCreateSchema>;
export type ProgramCoordinatorUpdateType = z.infer<typeof programCoordinatorUpdateSchema>;
