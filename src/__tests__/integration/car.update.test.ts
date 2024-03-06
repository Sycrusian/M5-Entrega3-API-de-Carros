import { randomUUID } from "crypto";
import { prisma } from "../../database/prisma";
import { request } from "../utils/request";
import { carCreateMock, carUpdateInvalidMock, carUpdateMock } from "../mocks/car.mocks";

describe("Integration Tests: Update Car Route", () => {
  beforeEach(async () => {
    await prisma.car.deleteMany();
  });

  afterAll(async () => {
    await prisma.car.deleteMany();
  });

  test("Should be able to update Car correctly", async () => {
    const newCar = await prisma.car.create({ data: carCreateMock });
    const updatedCar = await request.patch(`/cars/${newCar.id}`).send(carUpdateMock).expect(200).then(response  => response.body);
    expect(updatedCar.name).toBe(carCreateMock.name);
    expect(updatedCar.description).toBe(carUpdateMock.description);
    expect(updatedCar.km).toBe(carUpdateMock.km);
  });

  test("Should throw an error when car doesn't exist", async () => {
    const id = randomUUID();
    const error = await request.patch(`/cars/${id}`).send(carUpdateMock).expect(404).then(response => response.body);
    expect(error.error).toBe("Car not found.");
  });

  test("Should throw an error when update body is invalid", async () => {
    const car = await prisma.car.create({ data: carCreateMock });
    const error = await request.patch(`/cars/${car.id}`).send(carUpdateInvalidMock).expect(400).then(response => response.body);
    expect(error.error).toBe("Invalid request.");
  });
});