# Turning on accounts & billing

The public site is live with no configuration. To enable signup, the team
dashboard and paid plans:

## 1. Supabase (accounts + dashboard)

1. Create a free project at [supabase.com](https://supabase.com).
2. In the SQL editor, run [`supabase/migrations/0001_init.sql`](./supabase/migrations/0001_init.sql).
3. In **Authentication → URL Configuration**, add your site URL and
   `https://<your-domain>/auth/callback` as a redirect URL.
4. From **Project Settings → API**, set Vercel env vars:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server only)

That's enough for magic-link signup, the tool register, versioned policies and
attestations.

## 2. Stripe (paid plans) — optional

1. In [dashboard.stripe.com](https://dashboard.stripe.com), create two recurring
   prices (Team $49/mo, Business $149/mo).
2. Set env vars: `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PRICE_TEAM`,
   `NEXT_PUBLIC_STRIPE_PRICE_BUSINESS`.
3. Add a webhook to `https://<your-domain>/api/stripe/webhook` for
   `checkout.session.completed`, `customer.subscription.updated` and
   `customer.subscription.deleted`; set `STRIPE_WEBHOOK_SECRET`.

Until Stripe is configured, the billing page shows an honest "not connected"
state and the workspace runs on the free plan.

## Keeping the directory fresh

The AI Tool Risk Directory lives in [`data/ai-tools.json`](./data/ai-tools.json).
Edit it (or regenerate with the research workflow) and redeploy — the directory,
per-tool pages, `llms.txt` and sitemap all rebuild from it.
