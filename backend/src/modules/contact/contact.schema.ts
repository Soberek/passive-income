import { z } from "zod";

export const contactSchema = z.object({
  contactId: z.number().min(1).optional(),
  firstName: z.string().min(2).max(100),
  lastName: z.string().min(2).max(100),
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

export const contactCreateSchema = contactSchema.omit({ contactId: true });
export const contactUpdateSchema = contactCreateSchema.partial();

export type Contact = z.infer<typeof contactSchema>;
export type CreateContactDto = z.infer<typeof contactCreateSchema>;
export type UpdateContactDto = z.infer<typeof contactUpdateSchema>;
