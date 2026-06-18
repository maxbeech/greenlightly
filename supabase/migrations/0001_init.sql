-- Greenlightly schema: multi-tenant AI governance workspace.
-- Every tenant table carries org_id and is protected by RLS keyed on org
-- membership via a SECURITY DEFINER helper (recursion-safe).

create extension if not exists "pgcrypto";

create table if not exists orgs (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'My team',
  plan text not null default 'free',           -- free | team | business
  stripe_customer_id text,
  stripe_subscription_id text,
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists org_members (
  org_id uuid not null references orgs(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'owner',           -- owner | admin | member
  email text,
  created_at timestamptz not null default now(),
  primary key (org_id, user_id)
);

create table if not exists tool_register (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references orgs(id) on delete cascade,
  tool_slug text not null,
  name text not null,
  status text not null default 'review',        -- approved | restricted | review | prohibited
  data_allowed text,                            -- e.g. "no customer data"
  notes text,
  updated_at timestamptz not null default now(),
  unique (org_id, tool_slug)
);

create table if not exists policies (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references orgs(id) on delete cascade,
  version int not null default 1,
  content_md text not null,
  input_json jsonb,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists attestations (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references orgs(id) on delete cascade,
  policy_id uuid references policies(id) on delete set null,
  token text not null unique default encode(gen_random_bytes(12), 'hex'),
  name text,
  email text,
  acknowledged_at timestamptz,
  created_at timestamptz not null default now()
);

-- Recursion-safe membership check used by RLS.
create or replace function is_org_member(target uuid)
returns boolean language sql security definer stable set search_path = public as $$
  select exists (select 1 from org_members m where m.org_id = target and m.user_id = auth.uid());
$$;

alter table orgs enable row level security;
alter table org_members enable row level security;
alter table tool_register enable row level security;
alter table policies enable row level security;
alter table attestations enable row level security;

create policy orgs_member_rw on orgs for all using (is_org_member(id)) with check (is_org_member(id) or created_by = auth.uid());
create policy members_self on org_members for all using (is_org_member(org_id)) with check (user_id = auth.uid() or is_org_member(org_id));
create policy register_rw on tool_register for all using (is_org_member(org_id)) with check (is_org_member(org_id));
create policy policies_rw on policies for all using (is_org_member(org_id)) with check (is_org_member(org_id));
create policy attest_member_rw on attestations for all using (is_org_member(org_id)) with check (is_org_member(org_id));

-- Public attestation: anyone with the token may read their row and sign it.
-- (Exposed via a SECURITY DEFINER RPC rather than a broad anon policy.)
create or replace function attest_get(t text)
returns table (org_name text, version int, content_md text, acknowledged boolean)
language sql security definer stable set search_path = public as $$
  select o.name, p.version, p.content_md, (a.acknowledged_at is not null)
  from attestations a join orgs o on o.id = a.org_id
  left join policies p on p.id = a.policy_id
  where a.token = t;
$$;

create or replace function attest_sign(t text, signer_name text, signer_email text)
returns void language sql security definer set search_path = public as $$
  update attestations set name = signer_name, email = signer_email, acknowledged_at = now()
  where token = t and acknowledged_at is null;
$$;

grant execute on function attest_get(text) to anon, authenticated;
grant execute on function attest_sign(text, text, text) to anon, authenticated;
