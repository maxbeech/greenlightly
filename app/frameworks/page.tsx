import type { Metadata } from "next";
import Link from "next/link";
import { FRAMEWORKS } from "@/lib/frameworks";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/ui";
import { PageHero } from "@/components/page";
import { pageMeta, breadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "AI compliance frameworks for small teams",
  description:
    "Plain-English guides to the AI governance frameworks you are measured on (the EU AI Act, NIST AI RMF, ISO 42001 and SOC 2), plus the practical first steps for a team without a compliance department.",
  path: "/frameworks",
  keywords: ["ai compliance", "eu ai act compliance", "nist ai rmf", "iso 42001", "ai governance framework"],
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Frameworks", path: "/frameworks" }])} />
      <PageHero
        eyebrow="Frameworks"
        title="AI compliance frameworks"
        intro="The rules that decide how you must govern AI, explained for teams without a compliance department, with the practical first steps for each. An AI usage policy and a tool register cover most of what they ask for."
      />
      <Section className="grid gap-5 py-14 sm:py-16 md:grid-cols-2">
        {FRAMEWORKS.map((f) => (
          <Link key={f.slug} href={`/frameworks/${f.slug}`} className="group rounded-2xl border border-line bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="font-display text-xl font-semibold text-ink group-hover:text-brand-700">{f.name}</h2>
              <span className="flex-none text-xs text-ink-faint">{f.authority}</span>
            </div>
            <p className="mt-1 text-sm font-medium text-ink-faint">{f.fullName}</p>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-soft">{f.summary}</p>
            <span className="mt-4 inline-block text-sm font-semibold text-brand-700">Read the guide →</span>
          </Link>
        ))}
      </Section>
    </>
  );
}
