import { Application } from "https://deno.land/x/abc@v1.3.3/mod.ts";
import { TodoItem } from "/db/models/TodoItem.ts";
import { initDb } from "./db/db.ts";

await initDb();
const app = new Application();
console.log("http://localhost:8080/");

app.get("/todoitems", async (req) => {
  console.log(TodoItem.table);
  const toDoItems = await TodoItem.all();
  console.log(toDoItems);
  const json = JSON.stringify(toDoItems);
  console.log(json);
  return json;
});

app.start({ port: 8080 });
