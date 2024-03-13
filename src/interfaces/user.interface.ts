import { z } from "zod";
import { createUserSchema, loginUserSchema, returnUserSchema, updateUserSchema, userSchema } from "../schemas/user.schema";

export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type ReturnUser = z.infer<typeof returnUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;