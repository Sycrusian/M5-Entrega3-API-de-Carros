import { prisma } from "../../database/prisma";
import { carCreateMock, carInvalidMock } from "../mocks/car.mocks";
import { request } from "../utils/request";

describe("Integration Test: Create Car Route", () => {
  beforeEach(async () => {
    await prisma.car.deleteMany();
  });

  afterAll(async () => {
    await prisma.car.deleteMany();
  });

  test("Should be able to create Car correctly", async () => {
    const car = await request.post("/cars").send(carCreateMock).expect(201).then(response => response.body);
    expect(car.id).toBeDefined();
    expect(car.name).toBe(carCreateMock.name);
    expect(car.description).toBe(carCreateMock.description);
    expect(car.brand).toBe(carCreateMock.brand);
    expect(car.year).toBe(carCreateMock.year);
    expect(car.km).toBe(carCreateMock.km);
  });

  test("Should throw a 400 error on bad request", async () => {
    const error = await request.post("/cars").send(carInvalidMock).expect(400).then(response => response.body);
    expect(error.name).toBe("ZodError");
  });
});