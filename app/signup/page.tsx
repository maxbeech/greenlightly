import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isDbConfigured, getSession } from "@/lib/auth";
import { AuthForm } from "@/components/AuthForm";
import { SetupPending } from "@/components/SetupPending";
import { Section } from "@/components/ui";
import { SignalMark } from "@/components/brand";
import { PLANS } from "@/lib/site";
import { signupAction } from "../auth-actions";

export const metadata: Metadata = { title: "Create your account", robots: { index: false } };

export default async function Page({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  if (!isDbConfigured()) return <SetupPending what="Accounts" />;
  if (await getSession()) redirect("/dashboard");
  const { plan } = await searchParams;
  const selected = PLANS.find((p) => p.id === plan);
  return (
    <Section className="max-w-md py-20">
      <div className="rounded-[1.4rem] border border-line bg-white p-8 shadow-sm">
        <SignalMark size={36} />
        <h1 className="mt-5 font-display text-2xl font-semibold text-ink">Create your account</h1>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">
          {selected && selected.id !== "free" ? `Starting with the ${selected.name} plan ($${selected.price}/mo). You can add billing after signup. ` : ""}
          Set up your team&apos;s AI governance today. Free to start, no card required.
        </p>
        <div className="mt-6"><AuthForm mode="signup" action={signupAction} /></div>
      </div>
      <p className="mt-6 text-center text-sm text-ink-faint">Already have an account? <Link href="/login" className="font-semibold text-brand-700 hover:underline">Log in</Link></p>
      <p className="mt-3 text-center text-xs text-ink-faint">By creating an account you agree to our <Link href="/terms" className="underline hover:text-ink">Terms</Link> and <Link href="/privacy" className="underline hover:text-ink">Privacy Policy</Link>.</p>
    </Section>
  );
}
