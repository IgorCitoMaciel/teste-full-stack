import { DataSource } from "typeorm";
import { User } from "../../domain/entities/User";
import * as dotenv from "dotenv";

dotenv.config();

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_DATABASE || "teste-db",
  entities: [User],
  migrations: [__dirname + "/../../migrations/*.ts"],
  synchronize: false,
});

export default AppDataSource;
