import { Request, Response } from "express";
import { LivroRepository } from "../repository/LivroRepository";
import { Livro } from "../entity/Livro";

export class LivroController {
    private repository = new LivroRepository();

    async criar(req: Request, res: Response) {
        const novoLivro: Livro = req.body;

        if (!novoLivro.titulo || !novoLivro.autor || !novoLivro.isbn) {
            return res.status(400).json({ mensagem: "Título, Autor e ISBN são obrigatórios." });
        }

        try {
            const livroSalvo = await this.repository.salvar(novoLivro);
            res.status(201).json(livroSalvo);
        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao cadastrar livro." });
        }
    }

    async lerTodos(req: Request, res: Response) {
        try {
            const livros = await this.repository.buscarTodos();
            res.json(livros);
        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao buscar livros." });
        }
    }

    async lerPorId(req: Request, res: Response) {
        const idString = req.params.id;

        if (!idString || isNaN(parseInt(idString))) {
            return res.status(400).json({ mensagem: "ID inválido ou ausente." });
        }

        const id = parseInt(idString);

        try {
            const livro = await this.repository.buscarPorId(id);

            if (!livro) {
                return res.status(404).json({ mensagem: "Livro não encontrado." });
            }

            res.json(livro);
        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao buscar livro." });
        }
    }

    async atualizar(req: Request, res: Response) {
        const idString = req.params.id;
        const dadosAtualizados = req.body;

        if (!idString || isNaN(parseInt(idString))) {
            return res.status(400).json({ mensagem: "ID inválido ou ausente." });
        }

        const id = parseInt(idString);

        try {
            let livroExistente = await this.repository.buscarPorId(id);

            if (!livroExistente) {
                return res.status(404).json({ mensagem: "Livro não encontrado para atualização." });
            }

            const livroAtualizado = await this.repository.salvar({ ...livroExistente, ...dadosAtualizados });
            res.json(livroAtualizado);
        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao atualizar livro." });
        }
    }

    async excluir(req: Request, res: Response) {
        const idString = req.params.id;

        if (!idString || isNaN(parseInt(idString))) {
            return res.status(400).json({ mensagem: "ID inválido ou ausente." });
        }

        const id = parseInt(idString);

        try {
            const livro = await this.repository.buscarPorId(id);

            if (!livro) {
                return res.status(404).json({ mensagem: "Livro não encontrado para exclusão." });
            }

            await this.repository.excluir(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao excluir livro." });
        }
    }
}