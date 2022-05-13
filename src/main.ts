import { Application } from "https://deno.land/x/abc@v1.3.3/mod.ts";
import { TodoItem } from "/db/models/TodoItem.ts";
import { initDb } from "./db/db.ts";
import { ToDoItemDTO } from "./db/models/todoitem.dto.ts";
import * as dejs from "https://deno.land/x/dejs@0.9.3/mod.ts";


await initDb();
const app = new Application();
app.renderer = {
  render<T>(name: string, data: T): Promise<Deno.Reader> {
    return dejs.renderFile(name, data);
  },
};

console.log("http://localhost:8080/");

app.get("/todoitems/:id", async (context) => {
  const { id } = context.params;
  const item = await TodoItem.find(id);
  await context.render("index.html", {item: item})

});

app.get("/todoitems", async (req) => {
  return await TodoItem.all();
});

app.post("/todoitems", async (req) => {
  const { title, content, checked } = (await req.body) as ToDoItemDTO;
  return await TodoItem.create({ title, content, checked });
});

app.put("/todoitems", async (req) => {});

app.delete("/todoitems", async (req) => {});

app.start({ port: 8080 });
