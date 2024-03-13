import jwt from "jsonwebtoken";
import { injectable } from "tsyringe";
import { CreateUser, ReturnUser } from "../interfaces/user.interface";
import { returnUserSchema } from "../schemas/user.schema";
import { prisma } from "../database/prisma";

@injectable()
export class UserServices {
  public async register(data: CreateUser): Promise<ReturnUser> {
    const user = await prisma.user.create({ data });
    return returnUserSchema.parse(user);
  }

  public async login(data: ReturnUser) {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ id: data.id }, secret as string);
    return {
      "token": token,
      "user": data
    };
  }

  public async read(id: string): Promise<ReturnUser> {
    const user = await prisma.user.findFirst({ where: { id }});
    return returnUserSchema.parse(user);
  }
}