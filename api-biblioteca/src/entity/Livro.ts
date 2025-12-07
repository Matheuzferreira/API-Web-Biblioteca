// src/entity/Livro.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"; // ESTE IMPORT ESTAVA FALTANDO OU INCOMPLETO

@Entity()
export class Livro {

    @PrimaryGeneratedColumn()
    id!: number; // Adicione "!"

    @Column()
    titulo!: string; // Adicione "!"

    @Column()
    autor!: string; // Adicione "!"

    @Column({ unique: true })
    isbn!: string; // Adicione "!"

    @Column()
    anoPublicacao!: number; // Adicione "!"

    @Column({ default: true })
    disponivel!: boolean; // Adicione "!"
}