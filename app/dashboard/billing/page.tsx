import { ensureOrg } from "@/lib/workspace";
import { isStripeConfigured } from "@/lib/stripe";
import { PLANS } from "@/lib/site";

export default async function BillingPage() {
  const org = await ensureOrg();
  if (!org) return null;
  const stripeOn = isStripeConfigured();
  const paidPlans = PLANS.filter((p) => p.id !== "free");

  const isPaid = org.plan !== "free";
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Billing</h2>
          <p className="text-sm text-slate-500">Current plan: <span className="font-semibold capitalize text-slate-800">{org.plan}</span></p>
        </div>
        {isPaid && stripeOn && (
          <form action="/api/stripe/portal" method="post">
            <button type="submit" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-400">Manage billing</button>
          </form>
        )}
      </div>

      {!stripeOn && (
        <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900 ring-1 ring-amber-100">
          Billing isn&apos;t connected on this deployment yet. Add your Stripe keys to enable upgrades — the workspace is fully usable on the free plan meanwhile.
        </p>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {paidPlans.map((p) => (
          <div key={p.id} className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="font-bold text-slate-900">{p.name}</h3>
            <p className="mt-1 text-2xl font-extrabold text-slate-900">${p.price}<span className="text-sm font-normal text-slate-500"> / {p.cadence}</span></p>
            <ul className="mt-3 space-y-1 text-sm text-slate-600">{p.features.slice(0, 4).map((f) => <li key={f}>• {f}</li>)}</ul>
            <form action="/api/stripe/checkout" method="post" className="mt-4">
              <input type="hidden" name="plan" value={p.id} />
              <button type="submit" disabled={!stripeOn || org.plan === p.id} className="w-full rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50">
                {org.plan === p.id ? "Current plan" : `Upgrade to ${p.name}`}
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
