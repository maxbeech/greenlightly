// Public attestation lookups (no auth — access is by the unguessable token).
import { getSql } from "@/lib/db";

export interface AttestView { orgName: string; version: number | null; contentMd: string | null; acknowledged: boolean }

export async function getAttestation(token: string): Promise<AttestView | null> {
  const sql = getSql();
  if (!sql) return null;
  const rows = await sql`
    select o.name as org_name, p.version, p.content_md, (a.acknowledged_at is not null) as acknowledged
    from attestations a join orgs o on o.id = a.org_id
    left join policies p on p.id = a.policy_id
    where a.token = ${token}`;
  if (!rows.length) return null;
  const r = rows[0];
  return { orgName: r.org_name, version: r.version ?? null, contentMd: r.content_md ?? null, acknowledged: Boolean(r.acknowledged) };
}

export async function signAttestation(token: string, name: string, email: string): Promise<boolean> {
  const sql = getSql();
  if (!sql) return false;
  if (!name.trim() || !email.trim()) return false;
  const r = await sql`update attestations set name = ${name.trim()}, email = ${email.trim().toLowerCase()}, acknowledged_at = now()
                      where token = ${token} and acknowledged_at is null returning id`;
  return r.length > 0;
}
