// import {
//     Entity,
//     Column,
//     PrimaryGeneratedColumn,
//     OneToMany
// } from "typeorm";
// import { QueryLog } from "./QueryLog";

// @Entity()
// export class User {
//     @PrimaryGeneratedColumn()
//     id!: number

//     @Column({ length: 15 })
//     username!: string

//     @Column()
//     email!: string

//     @Column()
//     password!: string

//     @OneToMany(() => QueryLog, (queryLog) => queryLog.user)
//     queryLogs!: QueryLog[]
// }
