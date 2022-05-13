import { TodoItem } from "/db/models/TodoItem.ts";
import { Router } from '/deps.ts'

const api = Router();

api.get("/", async function (_, res) {
  const todos = await TodoItem.all();
  res.json(todos);
});

api.post("/", async function (req, res) {
  const response = await TodoItem.create(req.body);
  res.json(response);
});

api.put("/:id", async function (req, res) {
  const todoId = req.params.id
  await TodoItem.where('id', todoId).update(req.body);
  const response = await TodoItem.find(todoId)
  res.json(response)
})

api.delete("/:id", async function (req, res) {
  const todo = await TodoItem.find(req.params.id);
  await TodoItem.deleteById(req.params.id);
  res.send(todo);
});

export default api
