import { app } from './main.ts'
import { superdeno, describe, it, asserts } from '/dev_deps.ts'
import { TodoItem } from './db/models/TodoItem.ts'

const { assertEquals, assertObjectMatch } = asserts

describe("/todos", () => {
  it('GET /todos', async () => {
    const todoItem = {
      title: 'Test title',
      content: 'Test content'
    }
    await TodoItem.create(todoItem);

    await superdeno(app)
      .get("/todos")
      .expect((res) => {
        assertEquals(res.body.length, 1)
        const [returnedTodoItem] = res.body
        assertObjectMatch(returnedTodoItem, todoItem)
      });
  })
});
