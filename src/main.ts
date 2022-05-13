import "./db/db.ts";
import { TodoItem } from "/db/models/TodoItem.ts";
import { opine, json } from '/deps.ts'

const app = opine();

app.use(json());

app.get("/todos", async function (_, res) {
  const todos = await TodoItem.all()
  res.json(todos)
});

app.post("/todos", async function (req, res) {
  const response = await TodoItem.create(req.body)
  res.json(response)
});

app.put("/todos/:id", async function (req, res) {
  const todoId = req.params.id
  await TodoItem.where('id', todoId).update(req.body);
  const response = await TodoItem.find(todoId)
  res.json(response)
})

app.listen(
  3000,
  () => console.log("server has started on http://localhost:3000 🚀"),
);
