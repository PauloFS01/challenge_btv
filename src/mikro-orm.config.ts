import { Post } from "./entities/Post";
import { User } from "./entities/User";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    glob: "!(*.d).{js,ts}",
  },
  entities: [Post, User],
  dbName: process.env.DB_NAME,
  type: process.env.DB_TYPE,
  password: process.env.DB_PASSWD,
  debug: process.env.NODE_ENV !== "production",
} as Parameters<typeof MikroORM.init>[0];
