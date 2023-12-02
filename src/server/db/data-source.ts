import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: "postgres",
    url: "postgres://exanapyf:Tltn8qzv43FUjkGxTmzsFheWqcXgpV44@berry.db.elephantsql.com/exanapyf",
    host: "berry.db.elephantsql.com",
    port: 5432,
    username: "exanapyf",
    password: "Tltn8qzv43FUjkGxTmzsFheWqcXgpV44",
    database: "exanapyf",
    synchronize: true,
    logging: true,
    entities: ["./entities/*.*"],
    subscribers: [],
    migrations: [],
})