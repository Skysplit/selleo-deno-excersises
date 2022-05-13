import { pogo } from "/deps.ts";

export const app = pogo.server({
  port: +(Deno.env.get("APP_PORT") ?? 3000),
});
