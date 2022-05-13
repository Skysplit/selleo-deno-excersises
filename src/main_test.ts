import { app } from './main.ts'
import { superdeno, describe, it, asserts, beforeEach } from '/dev_deps.ts'
import { TodoItem } from './db/models/TodoItem.ts'

const { assertEquals, assertObjectMatch } = asserts

describe("/todos", () => {
  beforeEach(async () => {
    await TodoItem.truncate()
  })

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

  it('PUT /todos:id', async () => {
    const createdTodoItem = await TodoItem.create({
      title: 'Test title',
      content: 'Test content'
    });

    const updateFields = {
      title: 'Updated title',
      checked: true
    }

    await superdeno(app)
      .put(`/todos/${createdTodoItem.id}`)
      .send(updateFields)
      .expect(res => {
        const updatedTodoItem = res.body
        assertEquals(updatedTodoItem.title, updateFields.title)
        assertEquals(updatedTodoItem.content, createdTodoItem.content)
        assertEquals(updatedTodoItem.checked, updateFields.checked)
      })

      const updatedTodoItem = await TodoItem.find(String(createdTodoItem.id))
      assertEquals(updatedTodoItem.title, updateFields.title)
      assertEquals(updatedTodoItem.content, createdTodoItem.content)
      assertEquals(updatedTodoItem.checked, updateFields.checked)

  })
});
