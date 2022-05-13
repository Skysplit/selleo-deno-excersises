import "./load_env_test.ts";
import { superoak } from "https://deno.land/x/superoak/mod.ts";
import { db } from "../db/db.ts";
import app from "../app.ts";
import { afterEach, describe, it } from "https://deno.land/std/testing/bdd.ts";
import { assertObjectMatch } from "https://deno.land/std@0.139.0/testing/asserts.ts";
import { TodoItem } from "../db/models/TodoItem.ts";

describe("tests", () => {
  afterEach(async () => {
    await db.sync({ drop: true });
  });

  it("it should support the Oak framework", async () => {
    const request = await superoak(app);
    await request.get("/hello").expect("hello deno");
  });

  it("it should add todo item", async () => {
    const itemDto = { title: "superoak", content: "test" };

    const request = await superoak(app);
    const { body } = await request
      .post("/")
      .set("Content-Type", "application/json")
      .send(itemDto)
      .expect(200);

    assertObjectMatch(body, itemDto);
  });

  it("it should update todo item", async () => {
    const item = await TodoItem.create({ title: "item", content: "content" });
    const itemDto = { title: "superoak", content: "test" };

    const request = await superoak(app);
    const { body } = await request
      .patch(`/${item.id}`)
      .set("Content-Type", "application/json")
      .send(itemDto)
      .expect(200);

    assertObjectMatch(body, itemDto);
  });

  it("it should delete todo item", async () => {
    const item = await TodoItem.create({ title: "item", content: "content" });
    const { id } = item;

    const request = await superoak(app);
    await request
      .delete(`/${id}`)
      .set("Content-Type", "application/json")
      .expect(200);

    const isDeleted = await TodoItem.find(`${id}`);
  });
});
