import { DataSource } from "typeorm";
import { User } from "../entities/user.entity";
import { News } from "../entities/news.entity";
import { Diploma } from "../entities/diploma.entity";
import { Profile } from "../entities/profile.entites";

export const TestConnection = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "postgres",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "appuser",
  password: process.env.DB_PASS || "app_password",
  database: process.env.DB_NAME || "appdb",
  entities: [User, Profile, News, Diploma],
  synchronize: true,
  logging: false,
});
