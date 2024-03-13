import { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError";
import { ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";

export class HandleErrors {
  public static execute(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ error: err.message });
    }

    if (err instanceof ZodError) {
      return res.status(400).json(err);
    }

    if (err instanceof JsonWebTokenError) {
      return res.status(401).json({ error: err.message });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
}