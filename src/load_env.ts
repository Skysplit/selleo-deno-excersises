import { config } from "/deps.ts";

await config({ path: "./.env", export: true });
