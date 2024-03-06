import "reflect-metadata";
import { container } from "tsyringe";
import { CarServices } from "../../services/CarServices";
import { prisma } from "../../database/prisma";
import { carCreateMock, carListMock, carUpdateMock } from "../mocks/car.mocks";

describe("Unit Test: Car Services", () => {
  const services = container.resolve(CarServices);

  beforeEach(async () => {
    await prisma.car.deleteMany();
  });

  afterAll(async () => {
    await prisma.car.deleteMany();
  });

  test("Create Car should work correctly", async () => {
    const car = await services.create(carCreateMock);
    expect(car.id).toBeDefined();
    expect(car.name).toBe(carCreateMock.name);
    expect(car.description).toBe(carCreateMock.description);
    expect(car.brand).toBe(carCreateMock.brand);
    expect(car.year).toBe(carCreateMock.year);
    expect(car.km).toBe(carCreateMock.km);
  });

  test("Read All Cars should work correctly", async () => {
    for (const car of carListMock) {
      await prisma.car.create({ data: car });
    }
    const cars = await services.readAll();
    expect(cars).toHaveLength(3);
    for (let i = 0; i < cars.length; i++) {
      expect(cars[i].name).toBe(carListMock[i].name);
      expect(cars[i].brand).toBe(carListMock[i].brand);
      expect(cars[i].year).toBe(carListMock[i].year);
      expect(cars[i].km).toBe(carListMock[i].km);
    }
  });

  test("Read one Car should work correctly", async () => {
    const data = await prisma.car.create({ data: carCreateMock });
    const car = await services.read(data);
    expect(car.name).toBe(carCreateMock.name);
    expect(car.description).toBe(carCreateMock.description);
    expect(car.brand).toBe(carCreateMock.brand);
    expect(car.year).toBe(carCreateMock.year);
    expect(car.km).toBe(carCreateMock.km);
  });

  test("Update Car should work correctly", async () => {
    const createdCar = await prisma.car.create({ data: carCreateMock });
    const car = await services.update(createdCar.id, carUpdateMock);
    expect(car.name).toBe(carCreateMock.name);
    expect(car.description).toBe(carUpdateMock.description);
    expect(car.km).toBe(carUpdateMock.km);
  });

  test("Delete Car should work correctly", async () => {
    const car = await prisma.car.create({ data: carCreateMock });
    await services.delete(car.id);
    const data = await prisma.car.findMany();
    expect(data).toHaveLength(0);
  });

});