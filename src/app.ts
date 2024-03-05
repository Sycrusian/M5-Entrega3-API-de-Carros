import "reflect-metadata";
import "express-async-errors";
import "dotenv/config";
import express, { json } from "express";
import helmet from "helmet";
import cors from "cors";

export const app = express();

app.use(cors());
app.use(helmet());
app.use(json());
