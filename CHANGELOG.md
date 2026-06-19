# Changelog

## 2026-06-19 (later): Premium redesign, interactive illustrations, bug fixes

- **New visual identity.** Moved off the default emerald-on-white look to a warm
  paper background, a deep pine brand scale, a Fraunces display serif paired with
  Inter, and a traffic-signal motif (stop / caution / go) that maps directly to
  the risk bands. New signal logo mark, header, footer and shared button system.
- **Interactive, abstract product illustrations.** The home hero now shows a live
  "tool register" console (real tool names and risk bands) that cycles on its own,
  pauses on hover and lets you tap a tool to change its signal. New reusable app
  mockups for the policy document, the risk directory (with a radial risk gauge)
  and attestations, all fed by real data so they never drift from the app.
- **UI mockups across the marketing site.** Every "how it works" step now shows the
  surface it describes, framed in an app window. Pricing, directory, frameworks,
  blog and the rest were rebuilt around shared page primitives.
- **Removed the AI-design tells.** Stripped every em and en dash from user-facing
  copy and rewrote the phrasing in a plainer founder voice. Added a test that fails
  the build if an em or en dash reappears in any source string.
- **Bug fixes.** Stripe Business upgrades now provision the correct plan (session
  metadata was missing, so the webhook defaulted everyone to Team); session cookies
  are only `Secure` in production (they silently broke local-dev login); the Business
  upgrade button disables itself when no price is configured; the personal-org
  creation race no longer throws on a brand-new account's first load; attestation
  links require a saved policy; and every workspace read now verifies org membership
  in-query so a tenant can never read another tenant's data.

## 2026-06-19: Real product: live signup, dashboard & billing

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
