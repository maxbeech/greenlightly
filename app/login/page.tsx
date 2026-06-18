import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isDbConfigured, getSession } from "@/lib/auth";
import { AuthForm } from "@/components/AuthForm";
import { SetupPending } from "@/components/SetupPending";
import { Section } from "@/components/ui";
import { loginAction } from "../auth-actions";

export const metadata: Metadata = { title: "Log in", robots: { index: false } };

export default async function Page() {
  if (!isDbConfigured()) return <SetupPending what="Accounts" />;
  if (await getSession()) redirect("/dashboard");
  return (
    <Section className="max-w-md py-20">
      <h1 className="text-2xl font-bold text-slate-900">Log in to Greenlightly</h1>
      <p className="mt-1 text-sm text-slate-600">Access your team&apos;s AI tool register, policy and attestations.</p>
      <div className="mt-6"><AuthForm mode="login" action={loginAction} /></div>
      <p className="mt-6 text-center text-sm text-slate-500">New here? <Link href="/signup" className="font-semibold text-brand-700">Create an account</Link></p>
    </Section>
  );
}
