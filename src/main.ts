import "./db/db.ts";
import { opine, json } from "/deps.ts";
import todosApi from './todos.ts'

export const app = opine();

app.use(json());
app.use('/todos', todosApi)
