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
  const {done} = context.queryParams
  let items
  if(done !== undefined && (done === 'true' || done === 'fasle') )   {
    items =  await TodoItem.orderBy('id').where('checked', '=', done).all() as unknown as ToDoItemDTO[];
  } else {
    items =  await TodoItem.orderBy('id').all() as unknown as ToDoItemDTO[];
  }
  await context.render("src/items.html", {items: items})
});

app.get("/todolist/:id", async (context) => {
  const { id } = context.params;
  return (await TodoItem.find(id)) as unknown as ToDoItemDTO;
});

app.post("/todolist", async (context) => {
  const { title, content, checked } = (await context.body) as ToDoItemDTO;
   await TodoItem.create({ title, content, checked });
   context.redirect("/todolist");
});

app.get("/todolist/:id/toggle", async (context) => {
  const { id } = context.params;
  const item = await TodoItem.find(id);
  item.checked = !item.checked;
  await item.update();
  context.redirect("/todolist");
});

app.delete("/todolist/:id", async (context) => {
  const { id } = context.params;
  const item = await TodoItem.find(id);
   await item.delete();
   context.redirect("/todolist");
});

app.start({ port: 8080 });
