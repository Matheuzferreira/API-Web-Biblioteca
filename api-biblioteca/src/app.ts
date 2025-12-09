import express from "express";
import livrosRoutes from "./routes/livros.routes";

const app = express();

app.use(express.json());

// registra a rota
app.use("/livros", livrosRoutes);

export default app;
