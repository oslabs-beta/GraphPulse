import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        length: 15
    })
    username!: string

    @Column()
    email!: string

    @Column()
    password!: string
}