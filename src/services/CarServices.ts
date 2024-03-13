import { injectable } from "tsyringe";
import { Car, CreateCar, UpdateCar } from "../interfaces/car.interface";
import { prisma } from "../database/prisma";
import { carSchema } from "../schemas/car.schema";

@injectable()
export class CarServices {
  public async create(data: CreateCar): Promise<Car> {
    const car = await prisma.car.create({ data, include: { user: true } });
    return carSchema.parse(car);
  }

  public async readAll(): Promise<Car[]> {
    const cars = await prisma.car.findMany({ include: { user: true } });
    return carSchema.array().parse(cars);
  }

  public async readFromUser(userId: string): Promise<Car[]> {
    const cars = await prisma.car.findMany({ where: { user: { id: userId } }, include: { user: true } });
    return carSchema.array().parse(cars);
  }

  public async read(car: Car): Promise<Car> {
    return carSchema.parse(car);
  }

  public async update(id: string, data: UpdateCar): Promise<Car> {
    const car = await prisma.car.update({ data, where: { id }, include: { user: true } });
    return carSchema.parse(car);
  }

  public async delete(id: string): Promise<void> {
    await prisma.car.delete({ where: { id } });
  }
}