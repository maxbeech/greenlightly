import type { Metadata } from "next";
import { TOOLS } from "@/lib/ai-tools";
import { PolicyGenerator } from "@/components/PolicyGenerator";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/ui";
import { pageMeta, softwareAppLd, faqLd, breadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Free AI Usage Policy Generator",
  description:
    "Generate a tailored AI usage policy for your company in minutes — free, no signup. Covers approved tools, data rules, disclosure and the EU AI Act, NIST AI RMF, ISO 42001 and SOC 2. Download as Markdown or PDF.",
  path: "/ai-usage-policy-generator",
  keywords: ["ai usage policy", "ai usage policy template", "ai acceptable use policy", "ai policy generator", "employee ai policy"],
});

const FAQS = [
  { q: "What should an AI usage policy include?", a: "At minimum: who it applies to, which AI tools are approved, what data may and may not be entered into AI tools, transparency/disclosure rules, any regulatory obligations (EU AI Act, GDPR, HIPAA, SOC 2), and who owns the policy and handles breaches. Greenlightly's generator produces all of these, tailored to your answers." },
  { q: "Is this AI usage policy template free?", a: "Yes — the generator is free with no signup. You can copy the policy, download it as Markdown, or save it as a PDF. It's a starting point; have your own legal or compliance advisor review it before adopting." },
  { q: "How is this different from a static template?", a: "A static template is one-size-fits-all. This generator changes the actual clauses based on your industry, risk stance, what data your team handles, your approved tools and which regulations apply — so you get a policy that fits your company, not a generic document." },
];

export default function Page() {
  const today = new Date().toISOString().slice(0, 10);
  const toolNames = TOOLS.map((t) => t.name);
  return (
    <>
      <JsonLd data={softwareAppLd("AI Usage Policy Generator", metadata.description as string, "/ai-usage-policy-generator")} />
      <JsonLd data={faqLd(FAQS)} />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "AI Usage Policy Generator", path: "/ai-usage-policy-generator" }])} />

      <div className="border-b border-slate-200 bg-dotgrid">
        <Section className="py-12">
          <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Free AI Usage Policy Generator</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Answer a few questions and get a tailored AI usage policy you can adopt today. It adapts to your industry,
            how permissive you want to be, what data your team handles, and the rules you're held to. No signup — copy,
            download or save as PDF.
          </p>
        </Section>
      </div>

      <Section className="py-10">
        <PolicyGenerator today={today} toolNames={toolNames} />
      </Section>

      <div className="border-t border-slate-200 bg-slate-50">
        <Section className="py-12">
          <h2 className="text-xl font-bold text-slate-900">AI usage policy — questions answered</h2>
          <dl className="mt-5 grid gap-6 md:grid-cols-3">
            {FAQS.map((f) => (
              <div key={f.q}>
                <dt className="font-semibold text-slate-900">{f.q}</dt>
                <dd className="mt-1.5 text-sm text-slate-600">{f.a}</dd>
              </div>
            ))}
          </dl>
        </Section>
      </div>
    </>
  );
}
