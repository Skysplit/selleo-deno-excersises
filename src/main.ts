import "/load_env.ts";
import "/db/db.ts";
import "/routers/todos.router.ts";
import { app } from "/app.ts";

console.log("App starting");
console.log(`http://${app.options.hostname}:${app.options.port}`);

await app.start();
