import { NextFunction, Request, Response } from "express";
import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/AppError";

@injectable()
export class CarMiddlewares {
  public async verifyCarExists(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const car = await prisma.car.findFirst({ where: { id }, include: { user: true } });
    if (!car) {
      throw new AppError(404, "Car not found");
    }
    res.locals.car = car;
    return next();
  }

  public async getUserInBody(req: Request, res: Response, next: NextFunction) {
    req.body.userId = res.locals.token.id;
    return next();
  }

  public async verifyUserOwnsCar(_req: Request, res: Response, next: NextFunction) {
    const providedUserId = res.locals.token.id;
    const carUserId = res.locals.car.user.id;
    if (providedUserId != carUserId) {
      throw new AppError(403, "User must be the car owner");
    }
    return next();
  }
}