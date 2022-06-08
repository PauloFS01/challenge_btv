import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    glob: "!(*.d).{js,ts}",
  },
  entities: [Post],
  dbName: "quotesdb",
  type: "postgresql",
  password: "admin",
  debug: process.env.NODE_ENV !== "production",
} as Parameters<typeof MikroORM.init>[0];
