import z from "zod";

export const institutionSchema = z.object({
  institutionId: z.number().min(1).optional(),
  name: z.string().min(2).max(100),
  address: z.string().min(2).max(100),
  email: z.string().email().max(100),
  postalCode: z.string().min(2).max(10),
  municipality: z.string().min(2).max(100),
  city: z.string().min(2).max(100),
  phone: z.preprocess((val) => (val === "" ? undefined : val), z.string().min(2).max(20).optional()),
});

export type Institution = z.infer<typeof institutionSchema>;

export const institutionCreateSchema = institutionSchema.omit({ institutionId: true });
export const institutionUpdateSchema = institutionCreateSchema.partial();
