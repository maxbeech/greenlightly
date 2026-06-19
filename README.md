# Greenlightly

**Greenlight AI at work.** AI governance for teams without a compliance
department: generate an AI usage policy, see which AI tools are safe to use, and
track that your team has read the rules.

- **Free, no signup:** [AI Usage Policy Generator](/ai-usage-policy-generator) ·
  [AI Tool Risk Directory](/tools) (20+ tools rated from their own policies) ·
  framework guides (EU AI Act, NIST AI RMF, ISO 42001, SOC 2) · blog.
- **Paid (Team/Business):** shared AI tool register, versioned policy, employee
  attestation tracking, exportable compliance reports.

## Stack

Next.js 16 (App Router, TS) + Tailwind 4 on Vercel. The public site is fully
static/ISR (no backend). The account layer uses **Neon Postgres** with
self-contained email+password auth (`bcryptjs` + `jose` JWT) and **Stripe** for
billing, all live in production (Stripe runs in test mode). See
[SETUP.md](./SETUP.md).

Design uses a warm-paper palette with a deep pine brand and a traffic-signal
motif (stop / caution / go) that maps to the risk bands, with a Fraunces display
serif over Inter. Shared primitives live in `components/ui.tsx`,
`components/page.tsx` and `components/brand.tsx`; the interactive marketing
illustrations are in `components/console.tsx`, `components/mockups.tsx` and
`components/marketing.tsx`.

## Data

The AI Tool Risk Directory is `data/ai-tools.json`, with facts compiled from each
vendor's official privacy policy, DPA and trust centre, with source links and a
confidence flag. Unverifiable facts are marked `null` / "Unverified" rather than
guessed. Risk scoring is transparent and deterministic (`lib/risk.ts`).

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # unit tests (policy, risk, tools, seo, frameworks, site, no-em-dash)
npm run build    # production build
```

_Guidance only, not legal advice. Verify vendor facts against their official
sources before relying on them._
