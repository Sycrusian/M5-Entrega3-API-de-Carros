import { z } from "zod";

export const userSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1)
});

export const createUserSchema = userSchema.omit({ id: true });
export const updateUserSchema = createUserSchema.partial();
export const returnUserSchema = userSchema.omit({ password: true });
export const loginUserSchema = userSchema.pick({ email: true, password: true });