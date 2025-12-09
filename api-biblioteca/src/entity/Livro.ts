import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("livros")
export class Livro {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  titulo!: string;

  @Column({ type: "varchar" })
  autor!: string;

  @Column({ type: "varchar" })
  isbn!: string;

  @Column({ type: "int" })
  anoPublicacao!: number;

  @Column({ type: "boolean" })
  disponivel!: boolean;
}
