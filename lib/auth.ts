import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { getSql, isDbConfigured } from "./db";

// Self-contained email+password auth. Sessions are stateless JWTs in an
// httpOnly cookie (signed with AUTH_SECRET). No external email/OAuth provider
// required, so signup works the moment the DB + secret are configured.

const COOKIE = "mc_session";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days
const secretKey = () => new TextEncoder().encode(process.env.AUTH_SECRET ?? "");

export interface SessionUser { id: string; email: string }
export { isDbConfigured };

export function validatePassword(pw: string): string | null {
  if (pw.length < 8) return "Password must be at least 8 characters.";
  return null;
}
function normalizeEmail(e: string): string { return e.trim().toLowerCase(); }
function looksLikeEmail(e: string): boolean { return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e); }

async function setSession(user: SessionUser): Promise<void> {
  const token = await new SignJWT({ email: user.email })
    .setProtectedHeader({ alg: "HS256" }).setSubject(user.id)
    .setIssuedAt().setExpirationTime("30d").sign(secretKey());
  const c = await cookies();
  // `secure` only in production: browsers drop Secure cookies over http://, which
  // would silently break login in local dev and on non-TLS previews.
  c.set(COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: MAX_AGE });
}

export async function getSession(): Promise<SessionUser | null> {
  if (!isDbConfigured()) return null;
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return { id: String(payload.sub), email: String(payload.email) };
  } catch { return null; }
}

export async function destroySession(): Promise<void> {
  (await cookies()).delete(COOKIE);
}

export async function signup(email: string, password: string, fullName?: string): Promise<{ ok: boolean; error?: string }> {
  const sql = getSql();
  if (!sql) return { ok: false, error: "Accounts are not configured on this deployment yet." };
  const e = normalizeEmail(email);
  if (!looksLikeEmail(e)) return { ok: false, error: "Enter a valid email address." };
  const pwErr = validatePassword(password);
  if (pwErr) return { ok: false, error: pwErr };
  const existing = await sql`select id from users where email = ${e}`;
  if (existing.length) return { ok: false, error: "An account with that email already exists. Try logging in." };
  const hash = await bcrypt.hash(password, 10);
  const rows = await sql`insert into users (email, password_hash, full_name) values (${e}, ${hash}, ${fullName ?? null}) returning id, email`;
  await setSession({ id: rows[0].id, email: rows[0].email });
  return { ok: true };
}

export async function login(email: string, password: string): Promise<{ ok: boolean; error?: string }> {
  const sql = getSql();
  if (!sql) return { ok: false, error: "Accounts are not configured on this deployment yet." };
  const e = normalizeEmail(email);
  const rows = await sql`select id, email, password_hash from users where email = ${e}`;
  if (!rows.length) return { ok: false, error: "No account with that email, or wrong password." };
  const valid = await bcrypt.compare(password, rows[0].password_hash);
  if (!valid) return { ok: false, error: "No account with that email, or wrong password." };
  await setSession({ id: rows[0].id, email: rows[0].email });
  return { ok: true };
}
