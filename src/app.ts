import "reflect-metadata";
import "express-async-errors";
import "dotenv/config";
import express, { json } from "express";
import helmet from "helmet";
import cors from "cors";
import { carRouter } from "./routes/car.route";

export const app = express();

app.use(cors());
app.use(helmet());
app.use(json());

app.use("/cars", carRouter);

