import Stripe from "stripe";

// Stripe client, created only when a secret key is present. All billing routes
// degrade gracefully (HTTP 503 / setup-pending UI) when this returns null.
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  return key ? new Stripe(key) : null;
}

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY && process.env.NEXT_PUBLIC_STRIPE_PRICE_TEAM);
}

export function priceForPlan(plan: string): string | undefined {
  if (plan === "team") return process.env.NEXT_PUBLIC_STRIPE_PRICE_TEAM;
  if (plan === "business") return process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS;
  return undefined;
}

// A specific paid plan can be checked out only if Stripe is configured AND that
// plan has a price set. Used to enable/disable each upgrade button individually
// so a button never leads to a dead end.
export function planAvailable(plan: string): boolean {
  return isStripeConfigured() && Boolean(priceForPlan(plan));
}
