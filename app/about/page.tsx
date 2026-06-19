import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { Section, btn } from "@/components/ui";
import { PageHero } from "@/components/page";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About Greenlightly",
  description: "Why Greenlightly exists: AI governance built for the millions of teams that use AI every day but do not have a compliance department.",
  path: "/about",
});

export default function Page() {
  return (
    <>
      <PageHero eyebrow="About" title="AI governance for the rest of us" />
      <Section className="max-w-2xl py-12 sm:py-16">
        <div className="space-y-5 text-lg leading-relaxed text-ink-soft">
          <p>Almost every team now uses AI at work, and almost none of the small ones have a compliance department to govern it. The tools that do exist for AI governance are enterprise platforms sold through sales teams and priced for the Fortune 500.</p>
          <p>{SITE.name} is the opposite. It is a self-serve tool that gives a small or mid-sized team the three things that actually matter: a clear AI usage policy, an honest and sourced view of how each AI tool treats your data, and a way to prove your team has read the rules.</p>
          <p>Everything we publish about AI tools is compiled from the vendors&apos; own privacy policies, DPAs and trust centres, with source links. Anything we cannot verify, we mark as unverified rather than guess. We would rather say &ldquo;check the source&rdquo; than be confidently wrong about your compliance.</p>
          <p className="text-sm text-ink-faint">Greenlightly provides guidance, not legal advice. Always confirm vendor facts against their official policies, and have a qualified advisor review any policy before you adopt it.</p>
        </div>
        <Link href="/ai-usage-policy-generator" className={`mt-9 ${btn("primary", "lg")}`}>Generate your AI policy →</Link>
      </Section>
    </>
  );
}
