import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne
} from "typeorm";
import { User } from "./User";

@Entity()
export class QueryLog {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    query_name!: string

    @Column()
    timestamp!: Date

    @Column()
    depth!: number

    @Column()
    latency!: number

    @ManyToOne(() => User, (user) => user.queryLogs )
    user!: User
}