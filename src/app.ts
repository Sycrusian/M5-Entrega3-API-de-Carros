import "reflect-metadata";
import "express-async-errors";
import "dotenv/config";
import express, { json } from "express";
import helmet from "helmet";
import cors from "cors";
import { carRouter } from "./routes/car.route";
import { HandleErrors } from "./errors/HandleErrors";
import { userRouter } from "./routes/user.route";

export const app = express();

app.use(cors());
app.use(helmet());
app.use(json());

app.use("/users", userRouter);
app.use("/cars", carRouter);

app.use(HandleErrors.execute);