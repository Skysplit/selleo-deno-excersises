import "./db/db.ts";
// import { TodoItem } from "/db/models/TodoItem.ts";

// console.log("running");

// const item = await TodoItem.create({ title: "test", content: "test content" });

// console.log({ item });
import { opine } from '/deps.ts'

const app = opine();

app.get("/", function (_, res) {
  res.send("Hello World");
});

app.listen(
  3000,
  () => console.log("server has started on http://localhost:3000 🚀"),
);
