import { inject, injectable } from "tsyringe";
import { CarServices } from "../services/CarServices";

@injectable()
export class CarController {
  constructor(@inject("CarServices") private services: CarServices) {}

  
}