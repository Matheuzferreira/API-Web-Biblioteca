import { AppDataSource } from "../data-source";
import { Livro } from "../entity/Livro";

export const LivroRepository = AppDataSource.getRepository(Livro).extend({
  listar() {
    return this.find();
  },

  buscarPorId(id: number) {
    return this.findOneBy({ id });
  },

  criar(dados: Partial<Livro>) {
    const livro = this.create(dados);
    return this.save(livro);
  },

  atualizar(id: number, dados: Partial<Livro>) {
    return this.update(id, dados);
  },

  remover(id: number) {
    return this.delete(id);
  }
});
