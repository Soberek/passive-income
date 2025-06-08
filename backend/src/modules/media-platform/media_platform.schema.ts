import { z } from "zod";

export const mediaPlatformSchema = z.object({
  mediaPlatformId: z.number().min(1).optional(),
  name: z.string().min(2).max(100),
});

export const mediaPlatformCreateSchema = mediaPlatformSchema.omit({ mediaPlatformId: true });
export const mediaPlatformUpdateSchema = mediaPlatformCreateSchema.partial();
