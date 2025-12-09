import { Router } from "express";
import { LivroController } from "../controller/LivroController";

const routes = Router();
const controller = new LivroController();

routes.get("/", controller.listar);
routes.get("/:id", controller.buscarPorId);
routes.post("/", controller.criar);
routes.put("/:id", controller.atualizar);
routes.delete("/:id", controller.remover);

export default routes;
