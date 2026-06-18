-- Greenlightly schema (Postgres / Neon). Custom email+password auth; tenant
-- scoping is enforced in queries (org_id on every tenant table). Idempotent.

create extension if not exists "pgcrypto";

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  full_name text,
  created_at timestamptz not null default now()
);

create table if not exists orgs (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'My team',
  plan text not null default 'free',              -- free | team | business
  stripe_customer_id text,
  stripe_subscription_id text,
  created_by uuid not null references users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists org_members (
  org_id uuid not null references orgs(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  role text not null default 'owner',             -- owner | admin | member
  created_at timestamptz not null default now(),
  primary key (org_id, user_id)
);

create table if not exists tool_register (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references orgs(id) on delete cascade,
  tool_slug text not null,
  name text not null,
  status text not null default 'review',          -- approved | restricted | review | prohibited
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

create index if not exists idx_members_user on org_members(user_id);
create index if not exists idx_register_org on tool_register(org_id);
create index if not exists idx_policies_org on policies(org_id);
create index if not exists idx_attest_org on attestations(org_id);
create index if not exists idx_attest_token on attestations(token);
