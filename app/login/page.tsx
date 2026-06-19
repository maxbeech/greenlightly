import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isDbConfigured, getSession } from "@/lib/auth";
import { AuthForm } from "@/components/AuthForm";
import { SetupPending } from "@/components/SetupPending";
import { Section } from "@/components/ui";
import { SignalMark } from "@/components/brand";
import { loginAction } from "../auth-actions";

export const metadata: Metadata = { title: "Log in", robots: { index: false } };

export default async function Page() {
  if (!isDbConfigured()) return <SetupPending what="Accounts" />;
  if (await getSession()) redirect("/dashboard");
  return (
    <Section className="max-w-md py-20">
      <div className="rounded-[1.4rem] border border-line bg-white p-8 shadow-sm">
        <SignalMark size={36} />
        <h1 className="mt-5 font-display text-2xl font-semibold text-ink">Welcome back</h1>
        <p className="mt-1 text-sm text-ink-soft">Access your team&apos;s AI tool register, policy and attestations.</p>
        <div className="mt-6"><AuthForm mode="login" action={loginAction} /></div>
      </div>
      <p className="mt-6 text-center text-sm text-ink-faint">New here? <Link href="/signup" className="font-semibold text-brand-700 hover:underline">Create an account</Link></p>
    </Section>
  );
}
