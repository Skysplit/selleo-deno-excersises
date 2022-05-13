import "./db/db.ts";
import { TodoItem } from "/db/models/TodoItem.ts";

console.log("running");

const item = await TodoItem.create({ title: "test", content: "test content" });

console.log({ item });
