import { NextResponse, type NextRequest } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getSql } from "@/lib/db";

// Stripe webhook → updates the org's plan. Verifies the signature and writes
// directly to Postgres (no user session in a webhook). Env-gated.
export async function POST(request: NextRequest) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const sql = getSql();
  if (!stripe || !secret || !sql) return NextResponse.json({ error: "not configured" }, { status: 503 });

  const sig = request.headers.get("stripe-signature") ?? "";
  const body = await request.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err) {
    return NextResponse.json({ error: `signature: ${(err as Error).message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const s = event.data.object as { client_reference_id?: string; customer?: string; subscription?: string; metadata?: Record<string, string> };
    const orgId = s.client_reference_id ?? s.metadata?.org_id;
    if (orgId) await sql`update orgs set plan = ${s.metadata?.plan ?? "team"}, stripe_customer_id = ${s.customer ?? null}, stripe_subscription_id = ${s.subscription ?? null} where id = ${orgId}`;
  } else if (event.type === "customer.subscription.updated" || event.type === "customer.subscription.deleted") {
    const sub = event.data.object as { metadata?: Record<string, string>; status?: string };
    const orgId = sub.metadata?.org_id;
    if (orgId) {
      const plan = event.type === "customer.subscription.deleted" || sub.status === "canceled" ? "free" : sub.metadata?.plan ?? "team";
      await sql`update orgs set plan = ${plan} where id = ${orgId}`;
    }
  }
  return NextResponse.json({ received: true });
}
