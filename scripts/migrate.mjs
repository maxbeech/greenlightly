// Applies db/schema.sql to the Neon database via psql. Run: npm run migrate
// Loads the connection string from .env.local (prefers the unpooled URL for DDL).
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const env = {};
for (const line of readFileSync(new URL("../.env.local", import.meta.url), "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m) env[m[1]] = m[2].replace(/^"|"$/g, "");
}
const url = env.DATABASE_URL_UNPOOLED || env.POSTGRES_URL_NON_POOLING || env.DATABASE_URL;
if (!url) { console.error("No database URL in .env.local"); process.exit(1); }

const schemaPath = new URL("../db/schema.sql", import.meta.url).pathname;
try {
  const out = execFileSync("psql", [url, "-v", "ON_ERROR_STOP=1", "-f", schemaPath], { encoding: "utf8" });
  console.log(out.trim());
  console.log("✓ migration applied");
} catch (e) {
  console.error("migration failed:", e.message);
  process.exit(1);
}
