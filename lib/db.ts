import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

// Single Postgres entry point (Neon serverless driver — HTTP, ideal for Vercel
// functions). The public site needs none of this; the account layer is gated on
// isDbConfigured() and degrades to an honest setup-pending state otherwise.

const DB_URL =
  process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? process.env.DATABASE_URL_UNPOOLED ?? "";

export function isDbConfigured(): boolean {
  return Boolean(DB_URL && process.env.AUTH_SECRET);
}

let _sql: NeonQueryFunction<false, false> | null = null;

// Returns a tagged-template SQL function, or null when unconfigured.
export function getSql(): NeonQueryFunction<false, false> | null {
  if (!DB_URL) return null;
  if (!_sql) _sql = neon(DB_URL);
  return _sql;
}
