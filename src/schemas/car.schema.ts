import { z } from "zod";
import { returnUserSchema } from "./user.schema";

export const carSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().nullish(),
  brand: z.string().min(1),
  year: z.number().positive(),
  km: z.number().nonnegative(),
  user: returnUserSchema
});

export const createCarSchema = carSchema.omit({ id: true, user: true }).extend({
  userId: z.string().min(1)
});
export const updateCarSchema = createCarSchema.partial();

export const searchCarSchema = z.object({
  userId: z.string().min(1)
})