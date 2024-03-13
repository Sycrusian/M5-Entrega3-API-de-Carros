import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/AppError";
import { returnUserSchema } from "../schemas/user.schema";

@injectable()
export class UserMiddlewares {
  public async verifyEmailExists(req: Request, _res: Response, next: NextFunction) {
    const email = req.body.email;
    const user = await prisma.user.findFirst({ where: { email }});
    if (user) {
      throw new AppError(409, "E-mail already registered");
    }
    return next();
  }

  public async verifyLoginInfo(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({ where: { email }});
    if (!user) {
      throw new AppError(401, "E-mail and password doesn't match");
    }
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      throw new AppError(401, "E-mail and password doesn't match");
    }
    res.locals.user = returnUserSchema.parse(user);
    return next();
  }

  public async verifyToken(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization;
    if (!auth) {
      throw new AppError(401, "Token is required");
    }
    const token = auth.split(" ")[1];
    if (!token) {
      throw new AppError(401, "Token is required");
    }
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret as string);
    res.locals.token = decoded;
    return next();
  }
}