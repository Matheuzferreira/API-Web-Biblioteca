
import { AppDataSource } from "../data-source";
import { Livro } from "../entity/Livro";

export class LivroRepository {
    private ormRepository = AppDataSource.getRepository(Livro);

   
    async buscarTodos(): Promise<Livro[]> {
        return this.ormRepository.find();
    }

    
    async buscarPorId(id: number): Promise<Livro | null> {
        return this.ormRepository.findOneBy({ id });
    }

    
    async salvar(livro: Partial<Livro>): Promise<Livro> {
        return this.ormRepository.save(livro);
    }

    
    async excluir(id: number): Promise<void> {
        await this.ormRepository.delete(id);
    }
}