import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isDbConfigured, getSession } from "@/lib/auth";
import { AuthForm } from "@/components/AuthForm";
import { SetupPending } from "@/components/SetupPending";
import { Section } from "@/components/ui";
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
      <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
      <p className="mt-1 text-sm text-slate-600">
        {selected && selected.id !== "free" ? `Starting with the ${selected.name} plan ($${selected.price}/mo) — you can add billing after signup. ` : ""}
        Set up your team&apos;s AI governance in minutes. Free to start, no card required.
      </p>
      <div className="mt-6"><AuthForm mode="signup" action={signupAction} /></div>
      <p className="mt-6 text-center text-sm text-slate-500">Already have an account? <Link href="/login" className="font-semibold text-brand-700">Log in</Link></p>
      <p className="mt-3 text-center text-xs text-slate-400">By creating an account you agree to our <Link href="/terms" className="underline">Terms</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.</p>
    </Section>
  );
}
