import { CreateCar, UpdateCar } from "../../interfaces/car.interface";

export const carCreateMock: CreateCar = {
  name: "Corolla",
  description: "A family car",
  brand: "Toyota",
  year: 2022,
  km: 10000
};

export const carListMock: CreateCar[] = [
  {
    name: "Fiesta",
    brand: "Ford",
    year: 2001,
    km: 100000
  },
  {
    name: "Corolla",
    description: "A family car",
    brand: "Toyota",
    year: 2022,
    km: 10000
  },
  {
    name: "McLaren F1",
		description: "A supercar",
		brand: "McLaren",
		year: 1997,
		km: 5000
  }
];

export const carUpdateMock: UpdateCar = {
  description: "Some car",
  km: 140000
};

export const carInvalidMock = {
  name: "Brasília",
  brand: "Volkswagen",
  year: 1960,
  mileage: 80000
};

export const carUpdateInvalidMock = {
  mileage: 200000
};