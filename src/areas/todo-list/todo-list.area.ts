import { Area } from "https://deno.land/x/alosaur@v0.34.0/mod.ts";
import { TodoListController } from "./todo-list.controller.ts"
import { TodoListService } from "./todo-list.service.ts"

@Area({
  controllers: [TodoListController],
})
export class TodoListArea {}
