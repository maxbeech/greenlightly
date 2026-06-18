// Env-gating for the account/paid layer. The public product (marketing,
// policy generator, tool directory, frameworks, blog) needs none of this and
// stays fully live regardless. When these env vars are set, signup, the team
// dashboard and Stripe billing turn on; when absent, those routes show an
// honest "setup pending" state instead of faking data.

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY && process.env.NEXT_PUBLIC_STRIPE_PRICE_TEAM);
}
