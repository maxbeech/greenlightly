import type { Metadata } from "next";
import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { AuthForm } from "@/components/AuthForm";
import { SetupPending } from "@/components/SetupPending";
import { Section } from "@/components/ui";

export const metadata: Metadata = { title: "Log in", robots: { index: false } };

export default function Page() {
  if (!isSupabaseConfigured()) return <SetupPending what="Accounts" />;
  return (
    <Section className="max-w-md py-20">
      <h1 className="text-2xl font-bold text-slate-900">Log in to Greenlightly</h1>
      <p className="mt-1 text-sm text-slate-600">Access your team&apos;s AI tool register, policy and attestations.</p>
      <div className="mt-6"><AuthForm mode="login" /></div>
      <p className="mt-6 text-center text-sm text-slate-500">New here? <Link href="/signup" className="font-semibold text-brand-700">Create an account</Link></p>
    </Section>
  );
}
