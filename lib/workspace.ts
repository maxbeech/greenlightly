// Server-side data access for the team workspace (Neon Postgres). Tenant
// scoping is enforced here: every query is keyed on the org the signed-in user
// belongs to. Assumes the caller has a valid session.

import { getSql } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { TOOLS } from "@/lib/ai-tools";

export interface Org { id: string; name: string; plan: string; stripe_customer_id: string | null }
export interface RegisterRow { id: string; tool_slug: string; name: string; status: string; notes: string | null }
export interface PolicyRow { id: string; version: number; content_md: string; created_at: string }
export interface AttestationRow { id: string; token: string; name: string | null; email: string | null; acknowledged_at: string | null; created_at: string }

// Get the user's org, creating a personal one (seeded with the directory) on
// first visit. Returns null if not signed in / DB unconfigured.
export async function ensureOrg(): Promise<Org | null> {
  const sql = getSql();
  const user = await getSession();
  if (!sql || !user) return null;

  const member = await sql`select org_id from org_members where user_id = ${user.id} limit 1`;
  if (member.length) {
    const o = await sql`select id, name, plan, stripe_customer_id from orgs where id = ${member[0].org_id}`;
    return (o[0] as Org) ?? null;
  }

  const name = (user.email.split("@")[1] ?? "My team").replace(/\..*/, "");
  const created = await sql`insert into orgs (name, created_by) values (${name}, ${user.id}) returning id, name, plan, stripe_customer_id`;
  const org = created[0] as Org;
  await sql`insert into org_members (org_id, user_id, role) values (${org.id}, ${user.id}, 'owner')`;
  // Seed the register with the known directory tools (status "review").
  for (const t of TOOLS) {
    await sql`insert into tool_register (org_id, tool_slug, name, status) values (${org.id}, ${t.slug}, ${t.name}, 'review') on conflict (org_id, tool_slug) do nothing`;
  }
  return org;
}

async function memberOrgId(orgId: string, userId: string): Promise<boolean> {
  const sql = getSql();
  if (!sql) return false;
  const r = await sql`select 1 from org_members where org_id = ${orgId} and user_id = ${userId}`;
  return r.length > 0;
}

export async function getRegister(orgId: string): Promise<RegisterRow[]> {
  const sql = getSql();
  if (!sql) return [];
  return (await sql`select id, tool_slug, name, status, notes from tool_register where org_id = ${orgId} order by name`) as RegisterRow[];
}

export async function setToolStatus(orgId: string, slug: string, name: string, status: string): Promise<void> {
  const sql = getSql();
  const user = await getSession();
  if (!sql || !user || !(await memberOrgId(orgId, user.id))) return;
  const allowed = ["approved", "restricted", "review", "prohibited"];
  if (!allowed.includes(status)) return;
  await sql`insert into tool_register (org_id, tool_slug, name, status, updated_at) values (${orgId}, ${slug}, ${name}, ${status}, now())
            on conflict (org_id, tool_slug) do update set status = excluded.status, updated_at = now()`;
}

export async function getPolicies(orgId: string): Promise<PolicyRow[]> {
  const sql = getSql();
  if (!sql) return [];
  return (await sql`select id, version, content_md, created_at from policies where org_id = ${orgId} order by version desc`) as PolicyRow[];
}

export async function savePolicy(orgId: string, contentMd: string, inputJson: unknown): Promise<void> {
  const sql = getSql();
  const user = await getSession();
  if (!sql || !user || !(await memberOrgId(orgId, user.id))) return;
  const latest = await sql`select coalesce(max(version), 0) as v from policies where org_id = ${orgId}`;
  const version = Number(latest[0].v) + 1;
  await sql`insert into policies (org_id, version, content_md, input_json) values (${orgId}, ${version}, ${contentMd}, ${JSON.stringify(inputJson)})`;
}

export async function getAttestations(orgId: string): Promise<AttestationRow[]> {
  const sql = getSql();
  if (!sql) return [];
  return (await sql`select id, token, name, email, acknowledged_at, created_at from attestations where org_id = ${orgId} order by created_at desc`) as AttestationRow[];
}

export async function createAttestationLink(orgId: string): Promise<string | null> {
  const sql = getSql();
  const user = await getSession();
  if (!sql || !user || !(await memberOrgId(orgId, user.id))) return null;
  const pol = await sql`select id from policies where org_id = ${orgId} order by version desc limit 1`;
  const r = await sql`insert into attestations (org_id, policy_id) values (${orgId}, ${pol[0]?.id ?? null}) returning token`;
  return r[0]?.token ?? null;
}
