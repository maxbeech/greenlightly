import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { Section } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About Greenlightly",
  description: "Why Greenlightly exists: AI governance built for the millions of teams that use AI every day but don't have a compliance department.",
  path: "/about",
});

export default function Page() {
  return (
    <Section className="max-w-2xl py-14">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">About {SITE.name}</h1>
      <div className="mt-6 space-y-5 text-slate-700">
        <p>Almost every team now uses AI at work — and almost none of the small ones have a compliance department to govern it. The tools that do exist for AI governance are enterprise platforms sold through sales teams, priced for the Fortune 500.</p>
        <p>{SITE.name} is the opposite: a self-serve tool that gives a small or mid-sized team the three things that actually matter. A clear AI usage policy. An honest, sourced view of how each AI tool treats your data. And a way to prove your team has read the rules.</p>
        <p>Everything we publish about AI tools is compiled from the vendors' own privacy policies, DPAs and trust centres, with source links — and anything we can't verify we mark as unverified rather than guess. We'd rather say &ldquo;check the source&rdquo; than be confidently wrong about your compliance.</p>
        <p className="text-sm text-slate-500">Greenlightly provides guidance, not legal advice. Always confirm vendor facts against their official policies and have a qualified advisor review any policy before you adopt it.</p>
      </div>
      <Link href="/ai-usage-policy-generator" className="mt-8 inline-block rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700">Generate your AI policy →</Link>
    </Section>
  );
}
