import { Request, Response } from "express";
import { LivroRepository } from "../repository/LivroRepository";

export class LivroController {
  async criar(req: Request, res: Response) {
    const dados = req.body;
    const livro = await LivroRepository.criar(dados);
    return res.status(201).json(livro);
  }

  async listar(req: Request, res: Response) {
    const livros = await LivroRepository.listar();
    return res.json(livros);
  }

  async buscarPorId(req: Request, res: Response) {
    const id = Number(req.params.id);
    const livro = await LivroRepository.buscarPorId(id);

    if (!livro) {
      return res.status(404).json({ erro: "Livro não encontrado" });
    }

    return res.json(livro);
  }

  async atualizar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const dados = req.body;

    await LivroRepository.atualizar(id, dados);

    return res.json({ mensagem: "Livro atualizado" });
  }

  async remover(req: Request, res: Response) {
    const id = Number(req.params.id);

    await LivroRepository.remover(id);

    return res.json({ mensagem: "Livro removido" });
  }
}
