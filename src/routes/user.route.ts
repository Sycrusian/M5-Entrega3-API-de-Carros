import { Router } from "express";
import { container } from "tsyringe";
import { UserServices } from "../services/UserServices";
import { UserController } from "../controllers/UserController";
import { ValidateRequest } from "../middlewares/ValidateRequest";
import { createUserSchema, loginUserSchema } from "../schemas/user.schema";
import { UserMiddlewares } from "../middlewares/UserMiddlewares";

export const userRouter = Router();

container.registerSingleton("UserServices", UserServices);
const controller = container.resolve(UserController);
const mw = container.resolve(UserMiddlewares);

userRouter.post("/",
  ValidateRequest.execute({ body: createUserSchema }),
  (req, res, next) => mw.verifyEmailExists(req, res, next),
  (req, res) => controller.register(req, res));

userRouter.post("/login",
  ValidateRequest.execute({ body: loginUserSchema }),
  (req, res, next) => mw.verifyLoginInfo(req, res, next),
  (req, res) => controller.login(req, res));

userRouter.get("/",
  (req, res, next) => mw.verifyToken(req, res, next),
  (req, res) => controller.getUser(req, res));