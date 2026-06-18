# Configuration

The production deployment is **fully configured** — signup, the team dashboard
and Stripe (test mode) billing are live. This documents how it's wired so it can
be reproduced or moved to live keys.

## Database — Neon Postgres (provisioned)

Provisioned via the Vercel Marketplace and connected to the project, which
auto-injects `DATABASE_URL` (+ `DATABASE_URL_UNPOOLED`, `POSTGRES_*`) for all
environments. The app reads `DATABASE_URL` via `lib/db.ts`.

- Schema lives in `db/schema.sql`. Apply/update it with `npm run migrate`
  (uses `psql` against `DATABASE_URL_UNPOOLED`).
- To re-provision elsewhere: `vercel integration add neon` then `npm run migrate`.

## Auth — self-contained (no external provider)

Email + password (`bcryptjs`) with a signed `jose` JWT in an httpOnly cookie.
Requires `AUTH_SECRET` (set in Vercel). No email/OAuth provider needed, so
signup works out of the box. (Email verification + password reset are a planned
addition — they need a transactional email key.)

## Billing — Stripe (test mode)

Wired with Stripe **test** keys. Two recurring test prices (Team $49, Business
$149) and a webhook endpoint were created via the Stripe API. Env vars (Vercel):
`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PRICE_TEAM`,
`NEXT_PUBLIC_STRIPE_PRICE_BUSINESS`.

**To go live:** swap `STRIPE_SECRET_KEY` for the live key, create live prices +
a live webhook (`/api/stripe/webhook`), and update the price/webhook env vars.

## Local dev

`vercel env pull` writes `.env.local` (gitignored). Then `npm run dev`.
