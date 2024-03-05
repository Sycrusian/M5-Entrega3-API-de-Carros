import { z } from "zod";
import { carSchema, createCarSchema, updateCarSchema } from "../schemas/car.schema";

export type Car = z.infer<typeof carSchema>;
export type CreateCar = z.infer<typeof createCarSchema>;
export type UpdateCar = z.infer<typeof updateCarSchema>;