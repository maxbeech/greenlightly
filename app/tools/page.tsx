import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS, toolsByCategory, CATEGORY_LABELS, DATASET_GENERATED, type Category } from "@/lib/ai-tools";
import { scoreTool } from "@/lib/risk";
import { JsonLd } from "@/components/JsonLd";
import { RiskPill, Section } from "@/components/ui";
import { pageMeta, datasetLd, breadcrumbLd, faqLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "AI Tool Risk Directory — is that AI tool safe for work?",
  description:
    "How 20+ popular AI tools handle your data — whether they train on it, retention, SOC 2, GDPR DPA and HIPAA status — each rated for default at-work use and sourced from the vendor's own policies. ChatGPT, Claude, Gemini, Copilot, Otter and more.",
  path: "/tools",
  keywords: ["ai tool risk", "is chatgpt safe for work", "ai tool directory", "ai vendor risk", "which ai tools are safe"],
});

const FAQS = [
  { q: "How are the risk ratings calculated?", a: "Each tool is scored on the data exposure an employee creates by using its default/consumer tier at work: whether it trains on your inputs, retention, and whether it holds SOC 2, ISO 27001, a GDPR DPA, EU data residency, SSO and a HIPAA BAA. The score is transparent — every point is explained on the tool's page." },
  { q: "Are these facts official?", a: "Yes — compiled from each vendor's privacy policy, DPA and trust centre, with source links on every tool page. Anything we couldn't verify is shown as 'Unverified' rather than guessed." },
  { q: "Which AI tools are safest for work?", a: "Tools that don't train on your data and hold SOC 2 / a GDPR DPA score lowest — on their business tiers, assistants like ChatGPT Enterprise, Claude for Work and Microsoft 365 Copilot rate well. Image tools that train on all inputs (e.g. Midjourney) rate highest-risk." },
];

export default function Page() {
  const grouped = toolsByCategory();
  const order = Object.keys(grouped) as Category[];
  return (
    <>
      <JsonLd data={datasetLd({ name: "AI Tool Risk Directory", description: metadata.description as string, path: "/tools", count: TOOLS.length })} />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "AI Tool Risk Directory", path: "/tools" }])} />
      <JsonLd data={faqLd(FAQS)} />

      <div className="border-b border-slate-200 bg-dotgrid">
        <Section className="py-12">
          <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">AI Tool Risk Directory</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Before your team uses an AI tool at work, know how it treats your data. We rate {TOOLS.length} popular tools for
            default at-work use — whether they train on your inputs, how long they keep data, and which certifications they
            hold — all sourced from the vendor's own policies.
          </p>
          <p className="mt-2 text-sm text-slate-500">Facts compiled {DATASET_GENERATED}. Always confirm against the linked source before relying on a fact.</p>
        </Section>
      </div>

      <Section className="py-10">
        {order.map((cat) => (
          <div key={cat} className="mb-10">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">{CATEGORY_LABELS[cat] ?? cat}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {grouped[cat].map((t) => {
                const r = scoreTool(t);
                return (
                  <Link key={t.slug} href={`/tools/${t.slug}`} className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand-300 hover:shadow-sm">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-slate-900 group-hover:text-brand-700">{t.name}</span>
                      <RiskPill band={r.band} score={r.score} />
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{t.vendor}</p>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-600">{t.notableRisk}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </Section>

      <div className="border-t border-slate-200 bg-slate-50">
        <Section className="py-12">
          <h2 className="text-xl font-bold text-slate-900">About the directory</h2>
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
