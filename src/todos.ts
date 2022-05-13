import { TodoItem } from "/db/models/TodoItem.ts";
import { Router, validate, required, isString } from "/deps.ts";

const api = Router();

api.get("/", async function (req, res) {
  const { query }  = req
  const todos = await TodoItem.where(query).get();
  res.json(todos);
});

api.post("/", async function (req, res) {
  const body = req.parsedBody;

  const [passes, errors] = await validate(body, {
    title: [required, isString],
    content: [required, isString],
  });

  if (passes) {
    const { title, content } = body;
    req.body = { title, content };
  } else {
    res.json(errors).setStatus(400);
  }

  const response = await TodoItem.create(req.body);
  res.json(response);
});

api.put("/:id", async function (req, res) {
  const todoId = req.params.id;
  await TodoItem.where("id", todoId).update(req.body);
  const response = await TodoItem.find(todoId);
  res.json(response);
});

api.delete("/:id", async function (req, res) {
  const todo = await TodoItem.find(req.params.id);
  await TodoItem.deleteById(req.params.id);
  res.send(todo);
});

export default api;
