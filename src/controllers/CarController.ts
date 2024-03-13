import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { CarServices } from "../services/CarServices";
import { createCarSchema } from "../schemas/car.schema";

@injectable()
export class CarController {
  constructor(@inject("CarServices") private services: CarServices) {}

  public async create(req: Request, res: Response): Promise<Response> {
    const response = await this.services.create(req.body);
    return res.status(201).json(response);
  }

  public async readAll(req: Request, res: Response): Promise<Response> {
    if (req.query.userId) {
      const response = await this.services.readFromUser(req.query.userId as string);
      return res.status(200).json(response);
    }
    const response = await this.services.readAll();
    return res.status(200).json(response);
  }

  public async read(req: Request, res: Response): Promise<Response> {
    const response = await this.services.read(res.locals.car);
    return res.status(200).json(response);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const id = res.locals.car.id;
    const response = await this.services.update(id, req.body);
    return res.status(200).json(response);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const id = res.locals.car.id;
    await this.services.delete(id);
    return res.status(204).send();
  }
}