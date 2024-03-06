import { randomUUID } from "crypto";
import { prisma } from "../../database/prisma";
import { request } from "../utils/request";
import { carCreateMock } from "../mocks/car.mocks";

describe("Integration Tests: Car Delete Route", () => {
  beforeEach(async () => {
    await prisma.car.deleteMany();
  });

  afterAll(async () => {
    await prisma.car.deleteMany();
  });

  test("Should be able to delete Car correctly", async () => {
    const car = await prisma.car.create({ data: carCreateMock });
    await request.delete(`/cars/${car.id}`).expect(204);
    const data = await prisma.car.findMany();
    expect(data).toHaveLength(0);
  });

  test("Should throw an error if Car doesn't exist", async () => {
    const id = randomUUID();
    const error = await request.delete(`/cars/${id}`).expect(404).then(response => response.body);
    expect(error.error).toBe("Car not found.");
  });
});