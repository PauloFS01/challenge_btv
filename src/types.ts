import { Request, Response } from "express";
import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";

export interface MyContext {
  em: EntityManager<IDatabaseDriver<Connection>>;
  req: Request;
  res: Response;
  payload: { id: string };
}
