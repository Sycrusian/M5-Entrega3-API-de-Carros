import { Router } from "express";
import { container } from "tsyringe";
import { CarServices } from "../services/CarServices";
import { ValidateRequest } from "../middlewares/ValidateRequest";
import { createCarSchema, updateCarSchema } from "../schemas/car.schema";
import { CarMiddlewares } from "../middlewares/CarMiddlewares";
import { CarController } from "../controllers/CarController";

export const carRouter = Router();

container.registerSingleton("CarServices", CarServices);
const controller = container.resolve(CarController);
const mw = container.resolve(CarMiddlewares);

carRouter.post("/", ValidateRequest.execute({ body: createCarSchema }), (req, res) => controller.create(req, res));
carRouter.get("/", (req, res) => controller.readAll(req, res));
carRouter.get("/:id", (req, res, next) => mw.verifyCarExists(req, res, next), (req, res) => controller.read(req, res));
carRouter.patch("/:id", (req, res, next) => mw.verifyCarExists(req, res, next), ValidateRequest.execute({ body: updateCarSchema }), (req, res) => controller.update(req, res));
carRouter.delete("/:id", (req, res, next) => mw.verifyCarExists(req, res, next), (req, res) => controller.delete(req, res));