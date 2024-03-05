import { injectable } from "tsyringe";
import { Car, CreateCar, UpdateCar } from "../interfaces/car.interface";
import { prisma } from "../database/prisma";
import { carSchema } from "../schemas/car.schema";

@injectable()
export class CarServices {
  public async create(data: CreateCar): Promise<Car> {
    const car = await prisma.car.create({ data });
    return carSchema.parse(car);
  }

  public async readAll(): Promise<Car[]> {
    const cars = await prisma.car.findMany();
    return carSchema.array().parse(cars);
  }

  public async read(id: string): Promise<Car> {
    const car = await prisma.car.findFirst({ where: { id }});
    return carSchema.parse(car);
  }

  public async update(id: string, data: any): Promise<Car> {
    const car = await prisma.car.update({ data, where: { id } });
    return carSchema.parse(car);
  }

  public async delete(id: string): Promise<void> {
    await prisma.car.delete({ where: { id } });
  }
}