import "/load_test_env.ts";
import "/db/db.ts";
import { app } from "/app.ts";
import { TodoItem } from "/db/models/TodoItem.ts";
import { pogo } from "/deps.ts";
import { describe, it, beforeEach, superdeno } from "/dev_deps.ts";

describe("Todos list", () => {
  beforeEach(async () => {
    await TodoItem.truncate();
  });

  describe("GET /todos", () => {
    it("should return list of todos", async () => {
      const { body } = await app.inject({ method: "GET", url: "/todos" });

      console.log(body);
    });

    it("other", () => {
      const { body } = superdeno(app.raw!).get("/todos").send();
    });
  });
});
