import Link from "next/link";
import { Section, btn } from "@/components/ui";

// Shown on account/billing routes when the DB/Stripe env isn't configured.
// We never fake a signup: we tell the truth and point to the free product,
// which is fully live and needs no account.
export function SetupPending({ what = "Accounts" }: { what?: string }) {
  return (
    <Section className="max-w-xl py-24 text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-amber-100 text-amber-700">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 8v4l2.5 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <h1 className="mt-5 font-display text-2xl font-semibold text-ink">{what} are not enabled here</h1>
      <p className="mt-2 leading-relaxed text-ink-soft">
        This deployment is not connected to its database or payment keys. Everything you need today is already free and
        live, with no account required.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link href="/ai-usage-policy-generator" className={btn("primary")}>Generate a policy (free)</Link>
        <Link href="/tools" className={btn("secondary")}>Browse the tool directory</Link>
      </div>
    </Section>
  );
}
