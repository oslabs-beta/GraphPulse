import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: "postgres",
    url: "postgres://exanapyf:Tltn8qzv43FUjkGxTmzsFheWqcXgpV44@berry.db.elephantsql.com/exanapyf",
    // host: "localhost",
    // port: 5432,
    // username: "test",
    // password: "test",
    // database: "test",
    synchronize: true,
    logging: true,
    entities: ["./entities/*.*"],
    subscribers: [],
    migrations: [],
})