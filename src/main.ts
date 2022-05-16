import { App } from "https://deno.land/x/alosaur@v0.34.0/mod.ts";
import { TodoListArea } from "./areas/todo-list/todo-list.area.ts";

const app = new App({
  areas: [TodoListArea],
  logging: false,
});

app.listen();
