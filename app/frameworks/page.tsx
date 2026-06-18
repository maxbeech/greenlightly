import type { Metadata } from "next";
import Link from "next/link";
import { FRAMEWORKS } from "@/lib/frameworks";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/ui";
import { pageMeta, breadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "AI compliance frameworks for small teams",
  description:
    "Plain-English guides to the AI governance frameworks you're measured on — the EU AI Act, NIST AI RMF, ISO 42001 and SOC 2 — and the practical first steps for a team without a compliance department.",
  path: "/frameworks",
  keywords: ["ai compliance", "eu ai act compliance", "nist ai rmf", "iso 42001", "ai governance framework"],
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Frameworks", path: "/frameworks" }])} />
      <div className="border-b border-slate-200 bg-dotgrid">
        <Section className="py-12">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">AI compliance frameworks</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            The rules that decide how you must govern AI — explained for teams without a compliance department, with the
            practical first steps for each. An AI usage policy and a tool register cover most of what they ask for.
          </p>
        </Section>
      </div>
      <Section className="grid gap-5 py-12 md:grid-cols-2">
        {FRAMEWORKS.map((f) => (
          <Link key={f.slug} href={`/frameworks/${f.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-brand-300 hover:shadow-sm">
            <div className="flex items-baseline justify-between">
              <h2 className="text-xl font-bold text-slate-900 group-hover:text-brand-700">{f.name}</h2>
              <span className="text-xs text-slate-400">{f.authority}</span>
            </div>
            <p className="mt-1 text-sm font-medium text-slate-500">{f.fullName}</p>
            <p className="mt-3 line-clamp-3 text-sm text-slate-600">{f.summary}</p>
            <span className="mt-4 inline-block text-sm font-semibold text-brand-700">Read the guide →</span>
          </Link>
        ))}
      </Section>
    </>
  );
}
