import "./db/db.ts";
import { app } from "/app.ts";
import "/routers/todos.router.ts";

console.log("App starting");
console.log(`http://${app.options.hostname}:${app.options.port}`);
await app.start();
