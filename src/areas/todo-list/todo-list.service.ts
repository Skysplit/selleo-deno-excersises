import { Injectable } from "https://deno.land/x/alosaur@v0.34.0/mod.ts";
import { Item } from './todo-item.type.ts'
import "/db/db.ts";
import { TodoItem } from "/db/models/TodoItem.ts";

export class TodoListService {
  async getTodoList() {
    return await TodoItem.all()
  }

  async addTodoItem({title, content}: Item ) {
    return await TodoItem.create({title, content})
  }

  async updateTodoItem(todoId: number, body: Item){
    await TodoItem.where('id', todoId).update(body)
    return await TodoItem.find(todoId)
  }

  async removeTodoItem(todoId: number){
    return await TodoItem.deleteById(todoId)
  }
}