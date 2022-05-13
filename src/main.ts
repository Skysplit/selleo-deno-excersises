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

app.get("/todolist", async (context) => {
  return (await TodoItem.all()) as unknown as ToDoItemDTO[];
  // const items =  await TodoItem.all() as unknown as ToDoItemDTO[];
  // console.log({items})
  // await context.render("src/items.html", {items: items})
});

app.get("/todolist/:id", async (context) => {
  const { id } = context.params;
  return (await TodoItem.find(id)) as unknown as ToDoItemDTO;
});

app.post("/todolist", async (context) => {
  const { title, content, checked } = (await context.body) as ToDoItemDTO;
  return await TodoItem.create({ title, content, checked });
});

app.post("/todolist/:id/toggle", async (context) => {
  const { id } = context.params;
  const item = await TodoItem.find(id);
  item.checked = !item.checked;
  return await item.update();
});

app.delete("/todolist/:id", async (context) => {
  const { id } = context.params;
  const item = await TodoItem.find(id);
  return await item.delete();
});

app.start({ port: 8080 });
