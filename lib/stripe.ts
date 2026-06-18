import Stripe from "stripe";

// Stripe client, created only when a secret key is present. All billing routes
// no-op gracefully (HTTP 503 / setup-pending UI) when this returns null.
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  return key ? new Stripe(key) : null;
}

export function priceForPlan(plan: string): string | undefined {
  if (plan === "team") return process.env.NEXT_PUBLIC_STRIPE_PRICE_TEAM;
  if (plan === "business") return process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS;
  return undefined;
}
