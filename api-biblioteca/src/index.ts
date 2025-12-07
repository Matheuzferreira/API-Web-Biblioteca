import "reflect-metadata";
import express, { Express } from "express";
import { AppDataSource } from "./data-source";
import { LivroController } from "./controller/LivroController";

AppDataSource.initialize().then(async () => {
    const app: Express = express();
    const port = 3000;

    app.use(express.json());

    const livroController = new LivroController();

    app.post("/api/livros", (req, res) => livroController.criar(req as express.Request, res as express.Response));
    app.get("/api/livros", (req, res) => livroController.lerTodos(req as express.Request, res as express.Response));
    app.get("/api/livros/:id", (req, res) => livroController.lerPorId(req as express.Request, res as express.Response));
    app.put("/api/livros/:id", (req, res) => livroController.atualizar(req as express.Request, res as express.Response));
    app.delete("/api/livros/:id", (req, res) => livroController.excluir(req as express.Request, res as express.Response));

    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });

}).catch(error => console.log(error));