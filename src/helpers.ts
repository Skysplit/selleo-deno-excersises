import { pogo, readAll } from "/deps.ts";

export async function json(request: pogo.Request) {
  const text = new TextDecoder().decode(await readAll(request.body));
  return JSON.parse(text) as Record<string, unknown>;
}
