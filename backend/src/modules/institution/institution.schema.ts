import z from "zod";
import { Institution as InstitutionI, InstitutionCreateDTO, InstitutionUpdateDTO } from "../../../../shared/types";

export const institutionSchema = z.object({
  institutionId: z.number().min(1),
  name: z.string().min(2).max(100),
  address: z.string().min(2).max(100),
  email: z.string().email().max(100),
  postalCode: z.string().min(2).max(10),
  municipality: z.string().min(2).max(100),
  city: z.string().min(2).max(100),
  phone: z.string().min(2).max(20).optional(),
}) satisfies z.ZodType<InstitutionI>;

export const institutionCreateSchema = institutionSchema.omit({
  institutionId: true,
}) satisfies z.ZodType<InstitutionCreateDTO>;
export const institutionUpdateSchema = institutionSchema.partial() satisfies z.ZodType<InstitutionUpdateDTO>;

export type Institution = z.infer<typeof institutionSchema>;
export type InstitutionCreateType = z.infer<typeof institutionCreateSchema>;
export type InstitutionUpdateType = z.infer<typeof institutionUpdateSchema>;
