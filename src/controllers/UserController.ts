import bcrypt from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { UserServices } from "../services/UserServices";
import { Request, Response } from "express";
import { CreateUser } from "../interfaces/user.interface";

@injectable()
export class UserController {
  constructor(@inject("UserServices") private services: UserServices) {}
  
  public async register(req: Request, res: Response): Promise<Response> {
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const newUser: CreateUser = {
      name: req.body.name,
      email: req.body.email,
      password: hashPassword
    };

    const response = await this.services.register(newUser);
    return res.status(201).json(response);
  }

  public async login(_req: Request, res: Response): Promise<Response> {
    const response = await this.services.login(res.locals.user);
    return res.status(200).json(response);
  }

  public async getUser(_req: Request, res: Response): Promise<Response> {
    const token = res.locals.token;
    const id = token.id;
    const response = await this.services.read(id);
    return res.status(200).json(response);
  }
}