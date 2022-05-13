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

app.get("/todoitems", async (context) => {
 return await TodoItem.all() as unknown as ToDoItemDTO[];
  // const items =  await TodoItem.all() as unknown as ToDoItemDTO[];
  // console.log({items})
  // await context.render("src/items.html", {items: items})
});

app.get("/todoitems/:id", async (context) => {
  const { id } = context.params;
  const item = await TodoItem.find(id) as unknown as ToDoItemDTO;
  await context.render("src/index.html", {item: item})

});


app.post("/", async (req) => {
  const { title, content, checked } = (await req.body) as ToDoItemDTO;
  return await TodoItem.create({ title, content, checked });
});

app.put("/", async (req) => {});

app.delete("/", async (req) => {});

app.start({ port: 8080 });
