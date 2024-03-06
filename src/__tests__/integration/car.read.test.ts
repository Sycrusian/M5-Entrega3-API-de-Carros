import { randomUUID } from "crypto";
import { prisma } from "../../database/prisma";
import { carCreateMock, carListMock } from "../mocks/car.mocks";
import { request } from "../utils/request";

describe("Integration Tests: Read Car Routes", () => {
  beforeEach(async () => {
    await prisma.car.deleteMany();
  });

  afterAll(async () => {
    await prisma.car.deleteMany();
  });

  test("Should be able to read all cars", async () => {
    for (const car of carListMock) {
      await prisma.car.create({ data: car });
    }
    const cars = await request.get("/cars").expect(200).then(response => response.body);
    expect(cars).toHaveLength(3);
    for (let i = 0; i < cars.length; i++) {
      expect(cars[i].name).toBe(carListMock[i].name);
      expect(cars[i].brand).toBe(carListMock[i].brand);
      expect(cars[i].year).toBe(carListMock[i].year);
      expect(cars[i].km).toBe(carListMock[i].km);
    }
  });

  test("Should be able to read one car", async () => {
    const newCar = await prisma.car.create({ data: carCreateMock});
    const car = await request.get(`/cars/${newCar.id}`).expect(200).then(response => response.body);
    expect(car.id).toBe(newCar.id);
    expect(car.name).toBe(newCar.name);
    expect(car.description).toBe(newCar.description);
    expect(car.brand).toBe(newCar.brand);
    expect(car.year).toBe(newCar.year);
    expect(car.km).toBe(newCar.km);
  });

  test("Should throw an error when car doesn't exist", async () => {
    const id = randomUUID();
    const error = await request.get(`/cars/${id}`).expect(404).then(response => response.body);
    expect(error.error).toBe("Car not found.");
  });
});