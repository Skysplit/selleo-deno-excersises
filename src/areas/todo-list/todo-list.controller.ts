import { Content, Controller, Get, QueryParam, Body, Post, Param, Patch, Delete } from "https://deno.land/x/alosaur@v0.34.0/mod.ts";
import { Item } from './todo-item.type.ts';
;import { TodoListService } from './todo-list.service.ts'


@Controller("/todo-list")
export class TodoListController {
  todoListService: TodoListService
  constructor(){
    this.todoListService = new TodoListService()
  }

  @Get()
  async getTodoList() {
    return this.todoListService.getTodoList()
  }

  @Post()
  async addTodoItem(@Body() body: Item ) {
    return this.todoListService.addTodoItem(body)
  }

  @Patch('/:todoId')
  async updateTodoItem(@Param('todoId') todoId: number, @Body() body: Item){
    return this.todoListService.updateTodoItem(todoId, body)
  }

  @Delete('/:todoId')
  async removeTodoItem(@Param('todoId') todoId: number){
    return this.todoListService.removeTodoItem(todoId)
  }
}