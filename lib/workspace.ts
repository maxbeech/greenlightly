// Server-side data access for the team workspace. Runs under the signed-in
// user's RLS context (via the cookie-bound server client). All functions assume
// the caller already checked the user is authenticated.

import { getSupabaseServer } from "@/lib/supabase/server";
import { TOOLS } from "@/lib/ai-tools";

export interface Org { id: string; name: string; plan: string; stripe_customer_id: string | null }
export interface RegisterRow { id: string; tool_slug: string; name: string; status: string; data_allowed: string | null; notes: string | null }
export interface PolicyRow { id: string; version: number; content_md: string; created_at: string }
export interface AttestationRow { id: string; token: string; name: string | null; email: string | null; acknowledged_at: string | null; created_at: string }

// Get the user's org, creating a personal one (seeded with the directory) on
// first visit. Returns null if Supabase isn't configured / no session.
export async function ensureOrg(): Promise<Org | null> {
  const supabase = await getSupabaseServer();
  if (!supabase) return null;
  const { data: auth } = await supabase.auth.getUser();
  const user = auth.user;
  if (!user) return null;

  const { data: membership } = await supabase.from("org_members").select("org_id").eq("user_id", user.id).limit(1).maybeSingle();
  if (membership?.org_id) {
    const { data: org } = await supabase.from("orgs").select("id,name,plan,stripe_customer_id").eq("id", membership.org_id).single();
    return (org as Org) ?? null;
  }

  const name = (user.email?.split("@")[1] ?? "My team").replace(/\..*/, "");
  const { data: org, error } = await supabase.from("orgs").insert({ name, created_by: user.id }).select("id,name,plan,stripe_customer_id").single();
  if (error || !org) return null;
  await supabase.from("org_members").insert({ org_id: org.id, user_id: user.id, role: "owner", email: user.email });
  // Seed the register with the known directory tools (status "review").
  const seed = TOOLS.map((t) => ({ org_id: org.id, tool_slug: t.slug, name: t.name, status: "review" }));
  await supabase.from("tool_register").insert(seed);
  return org as Org;
}

export async function getRegister(orgId: string): Promise<RegisterRow[]> {
  const supabase = await getSupabaseServer();
  if (!supabase) return [];
  const { data } = await supabase.from("tool_register").select("id,tool_slug,name,status,data_allowed,notes").eq("org_id", orgId).order("name");
  return (data as RegisterRow[]) ?? [];
}

export async function setToolStatus(orgId: string, slug: string, name: string, status: string): Promise<void> {
  const supabase = await getSupabaseServer();
  if (!supabase) return;
  await supabase.from("tool_register").upsert({ org_id: orgId, tool_slug: slug, name, status, updated_at: new Date().toISOString() }, { onConflict: "org_id,tool_slug" });
}

export async function getPolicies(orgId: string): Promise<PolicyRow[]> {
  const supabase = await getSupabaseServer();
  if (!supabase) return [];
  const { data } = await supabase.from("policies").select("id,version,content_md,created_at").eq("org_id", orgId).order("version", { ascending: false });
  return (data as PolicyRow[]) ?? [];
}

export async function savePolicy(orgId: string, contentMd: string, inputJson: unknown): Promise<void> {
  const supabase = await getSupabaseServer();
  if (!supabase) return;
  const { data: latest } = await supabase.from("policies").select("version").eq("org_id", orgId).order("version", { ascending: false }).limit(1).maybeSingle();
  const version = (latest?.version ?? 0) + 1;
  await supabase.from("policies").insert({ org_id: orgId, version, content_md: contentMd, input_json: inputJson });
}

export async function getAttestations(orgId: string): Promise<AttestationRow[]> {
  const supabase = await getSupabaseServer();
  if (!supabase) return [];
  const { data } = await supabase.from("attestations").select("id,token,name,email,acknowledged_at,created_at").eq("org_id", orgId).order("created_at", { ascending: false });
  return (data as AttestationRow[]) ?? [];
}

export async function createAttestationLink(orgId: string): Promise<string | null> {
  const supabase = await getSupabaseServer();
  if (!supabase) return null;
  const { data: pol } = await supabase.from("policies").select("id").eq("org_id", orgId).order("version", { ascending: false }).limit(1).maybeSingle();
  const { data } = await supabase.from("attestations").insert({ org_id: orgId, policy_id: pol?.id ?? null }).select("token").single();
  return data?.token ?? null;
}
