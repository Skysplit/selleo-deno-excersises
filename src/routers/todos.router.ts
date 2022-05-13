import { TodoItem } from "/db/models/TodoItem.ts";
import { app } from "/app.ts";
import { json } from "/helpers.ts";
import { validator } from "/deps.ts";

type ITodoItem = {
  title: string;
  content: string;
  checked?: boolean;
};

app.router.get("/todos", () => {
  return TodoItem.orderBy("id", "asc").all();
});

app.router.get("/todos/{id}", async (request) => {
  const id = +request.params.id;
  const todo = (await TodoItem.find(id)) as TodoItem;

  if (!todo) {
    request.response.code(404);
    return { error: "not_found" };
  }

  return todo;
});

app.router.post("/todos", async (request) => {
  const { title, content } = await json(request);
  const itemFields = { title, content } as ITodoItem;
  const [isValid, errors] = await validator.validate(itemFields, {
    title: [validator.required],
    content: [validator.required],
  });

  if (!isValid) {
    request.response.code(422);
    return errors;
  }

  return await TodoItem.create(itemFields);
});

app.router.put("/todos/{id}", async (request) => {
  const todo = (await TodoItem.find(request.params.id)) as TodoItem;

  if (!todo) {
    request.response.code(404);
    return { error: "not_found" };
  }

  const { title, content, checked } = await json(request);
  const itemFields = { title, content, checked } as ITodoItem;
  const [isValid, errors] = await validator.validate(itemFields, {
    title: [validator.required],
    content: [validator.required],
    checked: [validator.required, validator.isBool],
  });

  if (!isValid) {
    request.response.code(422);
    return { errors };
  }

  Object.assign(todo, itemFields);

  return await todo.update();
});

app.router.delete("/todos/{id}", async (request) => {
  const todo = await TodoItem.find(request.params.id);

  if (!todo) {
    request.response.code(404);
    return { error: "not_found" };
  }

  await todo.delete();

  return todo;
});
