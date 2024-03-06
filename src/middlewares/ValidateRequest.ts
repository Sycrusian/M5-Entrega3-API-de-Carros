import { NextFunction, Request, Response } from "express";
import { IRequestSchemas } from "../interfaces/validation.interface";
import { AppError } from "../errors/AppError";

export class ValidateRequest {
  public static execute(schemas: IRequestSchemas) {
    return async (req: Request, _: Response, next: NextFunction) => {
      if (schemas.params) {
        req.params = await schemas.params.parseAsync(req.params);
      }
      if (schemas.body) {
        req.body = await schemas.body.parseAsync(req.body);
        if (Object.keys(req.body).length === 0) {
          throw new AppError(400, "Invalid request.");
        }
      }
      if (req.query.search && schemas.query) {
        req.query = await schemas.query.parseAsync(req.query);
      }
      next();
    }
  }
}