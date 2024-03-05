import { z } from "zod";

export const carSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string(),
  brand: z.string().min(1),
  year: z.number().positive(),
  km: z.number().nonnegative()
});

export const createCarSchema = carSchema.omit({ id: true });
export const updateCarSchema = createCarSchema.partial();