import { config } from "/deps.ts";

await config({ path: "./.env.test", export: true });
