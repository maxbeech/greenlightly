# Changelog

## 2026-06-19 — Real product: live signup, dashboard & billing

- **Accounts are live.** Replaced the env-gated stub with real email+password
  auth (bcryptjs + jose JWT) on **Neon Postgres** (provisioned via Vercel
  Marketplace). Signup → workspace works end-to-end, no external provider.
- **Stripe billing live (test mode):** real Checkout for Team/Business, webhook
  updates the plan, customer billing portal, and paid-feature gating
  (attestations are Team+).
- **Trust & legal pages:** Privacy, Terms, Security and Contact (a compliance
  product needs them); linked from the footer and signup.
- **Directory search/filter:** search by tool/vendor + filter by category and
  risk band, with empty states.
- **Marketing:** real stats band (computed from the dataset), honest
  positioning vs enterprise tools.

## 2026-06-18 — Initial launch

First public release of Greenlightly — AI governance for teams without a
compliance department.

### Public (live, no backend)
- **AI Usage Policy Generator** — tailored, downloadable (Markdown / PDF), no signup.
- **AI Tool Risk Directory** — 22 popular AI tools rated for default at-work use,
  with data-handling facts sourced from each vendor's own policies (unverifiable
  facts shown as "Unverified", never guessed) and a transparent risk score.
- Programmatic per-tool pages ("Is X safe for work?").
- Framework guides: EU AI Act, NIST AI RMF, ISO 42001, SOC 2.
- SEO blog (5 launch posts) and GEO artifacts (JSON-LD, `llms.txt`, sitemap).

### Account / paid (env-gated — see SETUP.md)
- Supabase magic-link auth + RLS multi-tenant workspace.
- AI tool register (approve / restrict / review / prohibited).
- Versioned company AI policy + employee attestation links with a public sign page.
- Stripe Team ($49/mo) and Business ($149/mo) plans with checkout + webhook.

### Engineering
- Next.js 16 (App Router, TS) + Tailwind 4 on Vercel; public site fully static/ISR.
- 456 unit assertions across policy generation, risk scoring, dataset integrity,
  SEO builders and frameworks.
