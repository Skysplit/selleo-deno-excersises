import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import {
  PostgresConnector,
  Database,
  Model,
  DataTypes,
} from "https://deno.land/x/denodb@v1.0.40/mod.ts";
import { _castArray } from "/deps.ts";

class Author extends Model {
  static table = "authors";

  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    firstName: DataTypes.string(100),
    lastName: DataTypes.string(100),
  };
}

class Book extends Model {
  static table = "books";

  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.string(100),
  };
}

const connector = new PostgresConnector({
  host: "localhost",
  database: Deno.env.get("POSTGRES_DB")!,
  username: Deno.env.get("POSTGRES_USER")!,
  password: Deno.env.get("POSTGRES_PASSWORD")!,
});

const db = new Database(connector);

db.link([Author, Book]);

console.log(_castArray("test"));
console.log(_castArray([1, 2, 3]));

// console.log(Deno.env.toObject());
