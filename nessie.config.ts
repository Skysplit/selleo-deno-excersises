import "https://deno.land/x/dotenv@v3.2.0/load.ts";

import {
  ClientPostgreSQL,
  NessieConfig,
} from "https://deno.land/x/nessie@2.0.5/mod.ts";

const client = new ClientPostgreSQL({
  hostname: "localhost",
  port: 5432,
  database: Deno.env.get("POSTGRES_DB")!,
  user: Deno.env.get("POSTGRES_USER")!,
  password: Deno.env.get("POSTGRES_PASSWORD")!,
});

/** This is the final config object */
const config: NessieConfig = {
  client,
  migrationFolders: ["./src/db/migrations"],
  seedFolders: ["./src/db/seeds"],
};

export default config;
