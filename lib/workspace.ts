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

  // Deterministic: always resolve to the user's OLDEST membership.
  const member = await sql`select org_id from org_members where user_id = ${user.id} order by created_at limit 1`;
  if (member.length) {
    const o = await sql`select id, name, plan, stripe_customer_id from orgs where id = ${member[0].org_id}`;
    return (o[0] as Org) ?? null;
  }

  // Create the personal org + membership atomically, guarded against a
  // concurrent first-load creating a duplicate (CTE only inserts if the user
  // has no membership yet).
  const name = (user.email.split("@")[1] ?? "My team").replace(/\..*/, "");
  const created = await sql`
    with new_org as (
      insert into orgs (name, created_by)
      select ${name}, ${user.id}
      where not exists (select 1 from org_members where user_id = ${user.id})
      returning id, name, plan, stripe_customer_id
    ), link as (
      insert into org_members (org_id, user_id, role)
      select id, ${user.id}, 'owner' from new_org
      on conflict (org_id, user_id) do nothing
    )
    select * from new_org`;
  if (!created.length) {
    // Lost the race: another request created it. Resolve the existing one.
    // Guard against the brief window where the winner's membership row isn't
    // visible yet (each Neon HTTP statement is its own round-trip).
    const m = await sql`select org_id from org_members where user_id = ${user.id} order by created_at limit 1`;
    if (!m.length) return null;
    const o = await sql`select id, name, plan, stripe_customer_id from orgs where id = ${m[0].org_id}`;
    return (o[0] as Org) ?? null;
  }
  const org = created[0] as Org;
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

// Reads verify the current session is a member of the requested org via an
// `exists` sub-select (no extra round-trip), so a caller can never read another
// tenant's data even if it passed a foreign org id.
export async function getRegister(orgId: string): Promise<RegisterRow[]> {
  const sql = getSql();
  const user = await getSession();
  if (!sql || !user) return [];
  return (await sql`select id, tool_slug, name, status, notes from tool_register
    where org_id = ${orgId} and exists (select 1 from org_members where org_id = ${orgId} and user_id = ${user.id})
    order by name`) as RegisterRow[];
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
  const user = await getSession();
  if (!sql || !user) return [];
  // Cast timestamps to text: the driver returns timestamptz as Date objects,
  // and the UI formats them as strings (.slice).
  return (await sql`select id, version, content_md, created_at::text as created_at from policies
    where org_id = ${orgId} and exists (select 1 from org_members where org_id = ${orgId} and user_id = ${user.id})
    order by version desc`) as PolicyRow[];
}

export async function savePolicy(orgId: string, contentMd: string, inputJson: unknown): Promise<void> {
  const sql = getSql();
  const user = await getSession();
  if (!sql || !user || !(await memberOrgId(orgId, user.id))) return;
  const latest = await sql`select coalesce(max(version), 0) as v from policies where org_id = ${orgId}`;
  const version = Number(latest[0].v) + 1;
  // input_json is a jsonb column — Postgres won't implicitly cast a text param,
  // so cast explicitly.
  await sql`insert into policies (org_id, version, content_md, input_json)
            values (${orgId}, ${version}, ${contentMd}, ${JSON.stringify(inputJson)}::jsonb)`;
}

export async function getAttestations(orgId: string): Promise<AttestationRow[]> {
  const sql = getSql();
  const user = await getSession();
  if (!sql || !user) return [];
  return (await sql`select id, token, name, email, acknowledged_at::text as acknowledged_at, created_at::text as created_at from attestations
    where org_id = ${orgId} and exists (select 1 from org_members where org_id = ${orgId} and user_id = ${user.id})
    order by created_at desc`) as AttestationRow[];
}

export async function createAttestationLink(orgId: string): Promise<string | null> {
  const sql = getSql();
  const user = await getSession();
  if (!sql || !user || !(await memberOrgId(orgId, user.id))) return null;
  // An attestation link points at a specific policy version, so require one to
  // exist first (the UI also disables the button until a policy is saved).
  const pol = await sql`select id from policies where org_id = ${orgId} order by version desc limit 1`;
  if (!pol.length) return null;
  const r = await sql`insert into attestations (org_id, policy_id) values (${orgId}, ${pol[0].id}) returning token`;
  return r[0]?.token ?? null;
}
