import type { Metadata } from "next";
import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { AuthForm } from "@/components/AuthForm";
import { SetupPending } from "@/components/SetupPending";
import { Section } from "@/components/ui";
import { PLANS } from "@/lib/site";

export const metadata: Metadata = { title: "Create your account", robots: { index: false } };

export default async function Page({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  if (!isSupabaseConfigured()) return <SetupPending what="Accounts" />;
  const { plan } = await searchParams;
  const selected = PLANS.find((p) => p.id === plan);
  return (
    <Section className="max-w-md py-20">
      <h1 className="text-2xl font-bold text-slate-900">Start your 14-day trial</h1>
      <p className="mt-1 text-sm text-slate-600">
        {selected ? `You picked the ${selected.name} plan — $${selected.price}/${selected.cadence}. ` : ""}
        Create your account to set up your team&apos;s AI governance. No card required to start.
      </p>
      <div className="mt-6"><AuthForm mode="signup" /></div>
      <p className="mt-6 text-center text-sm text-slate-500">Already have an account? <Link href="/login" className="font-semibold text-brand-700">Log in</Link></p>
    </Section>
  );
}
