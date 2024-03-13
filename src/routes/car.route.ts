import { Router } from "express";
import { container } from "tsyringe";
import { CarServices } from "../services/CarServices";
import { ValidateRequest } from "../middlewares/ValidateRequest";
import { createCarSchema, searchCarSchema, updateCarSchema } from "../schemas/car.schema";
import { CarMiddlewares } from "../middlewares/CarMiddlewares";
import { CarController } from "../controllers/CarController";
import { UserMiddlewares } from "../middlewares/UserMiddlewares";

export const carRouter = Router();

container.registerSingleton("CarServices", CarServices);
const controller = container.resolve(CarController);
const carMW = container.resolve(CarMiddlewares);
const userMW = container.resolve(UserMiddlewares);

carRouter.post("/",
  (req, res, next) => userMW.verifyToken(req, res, next),
  (req, res, next) => carMW.getUserInBody(req, res, next),
  ValidateRequest.execute({ body: createCarSchema }),
  (req, res) => controller.create(req, res));

carRouter.get("/",
  ValidateRequest.execute({ query: searchCarSchema }),
  (req, res) => controller.readAll(req, res));

carRouter.get("/:id",
  (req, res, next) => carMW.verifyCarExists(req, res, next),
  (req, res) => controller.read(req, res));

carRouter.patch("/:id",
  (req, res, next) => userMW.verifyToken(req, res, next),
  (req, res, next) => carMW.verifyCarExists(req, res, next),
  (req, res, next) => carMW.verifyUserOwnsCar(req, res, next),
  ValidateRequest.execute({ body: updateCarSchema }),
  (req, res) => controller.update(req, res));

carRouter.delete("/:id",
  (req, res, next) => userMW.verifyToken(req, res, next),
  (req, res, next) => carMW.verifyCarExists(req, res, next),
  (req, res, next) => carMW.verifyUserOwnsCar(req, res, next),
  (req, res) => controller.delete(req, res));