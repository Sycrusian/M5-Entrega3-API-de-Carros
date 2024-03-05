import { AnyZodObject } from "zod";

export interface IRequestSchemas {
  params?: AnyZodObject,
  body?: AnyZodObject,
  query?: AnyZodObject
}