import { PostgresConnector, Database } from "/deps.ts";
import { TodoItem } from "./models/TodoItem.ts";

const connector = new PostgresConnector({
  host: "localhost",
  port: 5432,
  database: Deno.env.get("POSTGRES_DB")!,
  username: Deno.env.get("POSTGRES_USER")!,
  password: Deno.env.get("POSTGRES_PASSWORD")!,
});

export const db = new Database(connector);

db.link([TodoItem]);

await db.sync({ drop: false });
