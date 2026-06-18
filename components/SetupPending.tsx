import Link from "next/link";
import { Section } from "@/components/ui";

// Shown on account/billing routes when the DB/Stripe env isn't configured.
// We never fake a signup — we tell the truth and point to the free product,
// which is fully live and needs no account.
export function SetupPending({ what = "Accounts" }: { what?: string }) {
  return (
    <Section className="max-w-xl py-24 text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-amber-100 text-amber-700 text-xl">⚙</div>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">{what} aren&apos;t enabled here</h1>
      <p className="mt-2 text-slate-600">
        This deployment isn&apos;t connected to its database or payment keys. Everything you need today is already free
        and live — no account required.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm font-semibold">
        <Link href="/ai-usage-policy-generator" className="rounded-lg bg-brand-600 px-5 py-2.5 text-white hover:bg-brand-700">Generate a policy (free)</Link>
        <Link href="/tools" className="rounded-lg border border-slate-300 px-5 py-2.5 text-slate-700 hover:border-slate-400">Browse the tool directory</Link>
      </div>
    </Section>
  );
}
