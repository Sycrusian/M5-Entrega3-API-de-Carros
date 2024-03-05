import { NextFunction, Request, Response } from "express";
import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/AppError";

@injectable()
export class CarMiddlewares {
  public async verifyCarExists(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const car = await prisma.car.findFirst({ where: { id }});
    if (!car) {
      throw new AppError(404, "Car not found.");
    }
    res.locals.car = car;
    return next();
  }
}