import './db/db.ts';
import { Application, Router } from './deps.ts';
import { TodoItem } from '/db/models/TodoItem.ts';

const router = new Router();
router
  .get('/', async (context) => {
    const items = await TodoItem.all();

    context.response.body = items;
  })
  .post('/', async (context) => {
    const { value } = context.request.body({ type: 'json' });
    const { title, content } = await value;

    const item = await TodoItem.create({ title, content });

    context.response.body = item;
  })
  .put('/:id', async (context) => {
    const { value } = context.request.body({ type: 'json' });
    const { title, content } = await value;
    const { id } = context.params;
    const item = await TodoItem.find(id);

    item.title = title;
    item.content = content;

    await item.update();

    context.response.body = item;
  })
  .delete('/:id', async (context) => {
    const { id } = context.params;
    const item = await TodoItem.find(id);
    await item.delete();

    context.response.body = item;
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8001 });
