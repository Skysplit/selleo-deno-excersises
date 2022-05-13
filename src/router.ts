import { TodoItem } from "/db/models/TodoItem.ts";
import { Router } from "./deps.ts";

const router = new Router();
router
  .get("/", async (context) => {
    const items = await TodoItem.all();

    context.response.body = items;
  })
  .get("/hello", (context) => {
    context.response.body = "hello deno";
  })
  .post("/", async (context) => {
    const { value } = context.request.body({ type: "json" });
    const { title, content } = await value;

    const item = await TodoItem.create({ title, content });

    context.response.body = item;
  })
  .patch("/:id", async (context) => {
    const { value } = context.request.body({ type: "json" });
    const { title, content } = await value;
    const { id } = context.params;
    const item = await TodoItem.find(id);

    item.title = title;
    item.content = content;

    await item.update();

    context.response.body = item;
  })
  .delete("/:id", async (context) => {
    const { id } = context.params;
    const item = await TodoItem.find(id);
    await item.delete();

    context.response.body = item;
  });

export default router;
