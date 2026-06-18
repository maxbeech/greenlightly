import type { Metadata } from "next";
import Link from "next/link";
import { PLANS } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/ui";
import { pageMeta, faqLd, breadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Pricing — free AI policy, paid AI governance",
  description: "Greenlightly is free for the AI usage policy generator and the full AI Tool Risk Directory. Paid Team ($49/mo) and Business ($149/mo) plans add a shared tool register, versioned policy and employee attestation tracking.",
  path: "/pricing",
  keywords: ["ai governance software pricing", "ai compliance software"],
});

const FAQS = [
  { q: "What's free?", a: "The AI usage policy generator and the entire AI Tool Risk Directory are free forever, with no signup or credit card." },
  { q: "What do paid plans add?", a: "A shared, living register of approved/restricted AI tools, a versioned company policy, employee attestation tracking with a shareable link, and exportable compliance reports — the evidence auditors and customers ask for." },
  { q: "Is there a trial?", a: "Yes — Team and Business plans include a 14-day trial. No charge until it ends." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={faqLd(FAQS)} />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }])} />
      <div className="border-b border-slate-200 bg-dotgrid">
        <Section className="py-12 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Simple, honest pricing</h1>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">Start free. Upgrade when you need a shared register and the evidence to prove your team follows the rules.</p>
        </Section>
      </div>

      <Section className="grid items-start gap-6 py-12 md:grid-cols-3">
        {PLANS.map((p) => (
          <div key={p.id} className={`flex flex-col rounded-2xl border bg-white p-6 ${"featured" in p && p.featured ? "border-brand-500 shadow-lg ring-1 ring-brand-200" : "border-slate-200 shadow-sm"}`}>
            {"featured" in p && p.featured && <span className="mb-2 inline-block rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-semibold text-brand-800">Most popular</span>}
            <h2 className="text-lg font-bold text-slate-900">{p.name}</h2>
            <div className="mt-2"><span className="text-4xl font-extrabold tracking-tight text-slate-900">${p.price}</span><span className="ml-1 text-sm text-slate-500">/ {p.cadence}</span></div>
            <p className="mt-2 text-sm text-slate-600">{p.blurb}</p>
            <ul className="mt-5 flex-1 space-y-2 text-sm text-slate-700">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2"><span className="mt-0.5 text-brand-600">✓</span>{f}</li>
              ))}
            </ul>
            <Link href={p.href} className={`mt-6 rounded-xl px-4 py-2.5 text-center text-sm font-semibold ${"featured" in p && p.featured ? "bg-brand-600 text-white hover:bg-brand-700" : "border border-slate-300 text-slate-700 hover:border-slate-400"}`}>{p.cta}</Link>
          </div>
        ))}
      </Section>

      <div className="border-t border-slate-200 bg-slate-50">
        <Section className="py-12">
          <h2 className="text-xl font-bold text-slate-900">Pricing FAQ</h2>
          <dl className="mt-5 grid gap-6 md:grid-cols-3">
            {FAQS.map((f) => (
              <div key={f.q}><dt className="font-semibold text-slate-900">{f.q}</dt><dd className="mt-1.5 text-sm text-slate-600">{f.a}</dd></div>
            ))}
          </dl>
        </Section>
      </div>
    </>
  );
}
