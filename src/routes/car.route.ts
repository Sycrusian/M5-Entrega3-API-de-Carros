import { Router } from "express";
import { container } from "tsyringe";
import { CarServices } from "../services/CarServices";

export const carRouter = Router();

container.registerSingleton("CarServices", CarServices);

carRouter.post("/");      // Rota de inserção de carros.
carRouter.get("/");       // Rota de leitura de carros.
carRouter.get("/:id");    // Rota de leitura individual de carros.
carRouter.patch("/:id");  // Rota de atualização de carro.
carRouter.delete("/:id"); // Rota de exclusão de carro.