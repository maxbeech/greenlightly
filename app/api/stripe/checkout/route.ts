import { NextResponse, type NextRequest } from "next/server";
import { getStripe, priceForPlan } from "@/lib/stripe";
import { getUser } from "@/lib/supabase/server";
import { ensureOrg } from "@/lib/workspace";
import { SITE } from "@/lib/site";

// Starts a Stripe Checkout subscription for the signed-in user's org.
export async function POST(request: NextRequest) {
  const stripe = getStripe();
  if (!stripe) return NextResponse.json({ error: "Billing not configured" }, { status: 503 });

  const user = await getUser();
  if (!user) return NextResponse.redirect(`${SITE.url}/login`);

  const form = await request.formData();
  const plan = String(form.get("plan") ?? "team");
  const price = priceForPlan(plan);
  if (!price) return NextResponse.json({ error: "Unknown plan" }, { status: 400 });

  const org = await ensureOrg();
  if (!org) return NextResponse.json({ error: "No workspace" }, { status: 400 });

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price, quantity: 1 }],
    customer_email: user.email ?? undefined,
    client_reference_id: org.id,
    subscription_data: { trial_period_days: 14, metadata: { org_id: org.id, plan } },
    success_url: `${SITE.url}/dashboard?upgraded=1`,
    cancel_url: `${SITE.url}/pricing`,
  });
  return NextResponse.redirect(session.url ?? `${SITE.url}/pricing`, { status: 303 });
}
