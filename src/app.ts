import "./db/db.ts";
import { Application } from "./deps.ts";
import router from "./router.ts";

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
