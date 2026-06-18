import Link from "next/link";
import { SITE } from "@/lib/site";
import { TOOLS } from "@/lib/ai-tools";
import { scoreTool } from "@/lib/risk";
import { FRAMEWORKS } from "@/lib/frameworks";
import { JsonLd } from "@/components/JsonLd";
import { RiskPill, Pill, Section } from "@/components/ui";
import { softwareAppLd, faqLd } from "@/lib/seo";

const HOME_FAQS = [
  { q: "What is AI governance?", a: "AI governance is how an organisation sets rules for using AI safely and legally — typically an AI usage policy, a register of which AI tools are approved, and a way to show staff have read the rules. It's how you avoid 'shadow AI', where employees use unapproved tools that may train on or leak your data." },
  { q: "Do small companies need an AI usage policy?", a: "Yes. Once anyone on your team uses ChatGPT, Copilot or similar for work, you have AI risk: confidential data can leak into tools that train on it. A short AI usage policy plus an approved-tools list is the cheapest, fastest control — and it's now expected by SOC 2 auditors and the EU AI Act's AI-literacy duty." },
  { q: "Is Greenlightly free?", a: "The AI usage policy generator and the full AI Tool Risk Directory are free, forever, with no login. Paid Team and Business plans add a shared tool register, versioned policy, employee attestation tracking and exportable compliance reports." },
  { q: "How accurate is the AI Tool Risk Directory?", a: "Every fact is compiled from the vendor's own privacy policy, DPA and trust centre, with source links. Version-sensitive claims we couldn't confirm are shown as 'Unverified' rather than guessed — always check the linked source before relying on a fact." },
];

export default function Home() {
  const rated = TOOLS.map((t) => ({ t, r: scoreTool(t) }));
  const sample = ["chatgpt", "claude", "github-copilot", "otter-ai", "midjourney", "notion-ai"]
    .map((s) => rated.find((x) => x.t.slug === s)).filter(Boolean) as { t: (typeof TOOLS)[number]; r: ReturnType<typeof scoreTool> }[];

  return (
    <>
      <JsonLd data={softwareAppLd(SITE.name, SITE.description, "/")} />
      <JsonLd data={faqLd(HOME_FAQS)} />

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-slate-200 bg-dotgrid">
        <Section className="py-16 sm:py-24">
          <Pill tone="brand">New · for teams without a compliance department</Pill>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-6xl">
            Greenlight AI <span className="text-brand-600">at work.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-600">
            Your team already uses ChatGPT, Copilot and a dozen other AI tools. Greenlightly helps you govern them:
            generate an <strong className="font-semibold text-slate-900">AI usage policy</strong> in minutes, see which
            tools are <strong className="font-semibold text-slate-900">safe to use</strong>, and track that everyone
            has read the rules — without hiring a compliance team.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/ai-usage-policy-generator" className="rounded-xl bg-brand-600 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-brand-700">
              Generate your AI policy — free
            </Link>
            <Link href="/tools" className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:border-slate-400">
              Browse the AI Tool Risk Directory →
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-500">No signup. No credit card. {TOOLS.length} AI tools rated from their own privacy policies.</p>
        </Section>
      </div>

      {/* Stats band — real numbers from the dataset, no fabrication */}
      <div className="border-b border-slate-200 bg-white">
        <Section className="grid grid-cols-2 gap-6 py-10 text-center md:grid-cols-4">
          {[
            { n: `${TOOLS.length}`, l: "AI tools rated" },
            { n: `${TOOLS.reduce((s, t) => s + t.sources.length, 0)}+`, l: "facts sourced from vendor policies" },
            { n: `${FRAMEWORKS.length}`, l: "frameworks mapped" },
            { n: "$0", l: "to generate your first policy" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-3xl font-extrabold tracking-tight text-slate-900">{s.n}</div>
              <div className="mt-1 text-sm text-slate-500">{s.l}</div>
            </div>
          ))}
        </Section>
      </div>

      {/* Three pillars */}
      <Section className="grid gap-6 py-16 md:grid-cols-3">
        {[
          { t: "1. Write the policy", d: "Answer a few questions about your team, data and industry. Get a tailored AI usage policy you can download and adopt today — built for the EU AI Act, NIST AI RMF, ISO 42001 and SOC 2.", href: "/ai-usage-policy-generator", cta: "Open the generator" },
          { t: "2. Vet the tools", d: "Look up how 20+ popular AI tools handle your data — whether they train on it, their retention, SOC 2, GDPR DPA and HIPAA status — each rated and sourced.", href: "/tools", cta: "See the directory" },
          { t: "3. Govern the team", d: "On a paid plan, keep a living register of approved/restricted tools, version your policy, and track that every employee has acknowledged it — the evidence auditors ask for.", href: "/pricing", cta: "See plans" },
        ].map((c) => (
          <div key={c.t} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">{c.t}</h2>
            <p className="mt-2 flex-1 text-sm text-slate-600">{c.d}</p>
            <Link href={c.href} className="mt-4 text-sm font-semibold text-brand-700 hover:text-brand-900">{c.cta} →</Link>
          </div>
        ))}
      </Section>

      {/* Directory preview */}
      <div className="border-y border-slate-200 bg-slate-50">
        <Section className="py-16">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Is that AI tool safe for work?</h2>
              <p className="mt-1 text-slate-600">A sample from the AI Tool Risk Directory. Rated for default at-work use.</p>
            </div>
            <Link href="/tools" className="text-sm font-semibold text-brand-700 hover:text-brand-900">View all {TOOLS.length} tools →</Link>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sample.map(({ t, r }) => (
              <Link key={t.slug} href={`/tools/${t.slug}`} className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand-300 hover:shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900 group-hover:text-brand-700">{t.name}</span>
                  <RiskPill band={r.band} score={r.score} />
                </div>
                <p className="mt-1.5 text-xs text-slate-500">{t.vendor} · {t.category}</p>
                <p className="mt-2 line-clamp-2 text-sm text-slate-600">{t.notableRisk}</p>
              </Link>
            ))}
          </div>
        </Section>
      </div>

      {/* Positioning vs enterprise tools — honest, no named competitors disparaged */}
      <Section className="py-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12">
          <h2 className="max-w-2xl text-2xl font-bold tracking-tight text-slate-900">AI governance was built for the Fortune 500. We built it for everyone else.</h2>
          <p className="mt-2 max-w-2xl text-slate-600">The enterprise AI-governance platforms are powerful — and sold through sales teams, priced for big budgets, and aimed at companies that already have a compliance function. Most teams don&apos;t. Greenlightly gives you the parts that actually matter, today.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-6">
              <h3 className="text-sm font-semibold text-slate-500">Enterprise AI governance suites</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>— &ldquo;Book a demo&rdquo;, annual contracts</li>
                <li>— Built for dedicated compliance teams</li>
                <li>— Weeks to onboard</li>
                <li>— Five-figure starting price</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-brand-50 p-6 ring-1 ring-brand-100">
              <h3 className="text-sm font-semibold text-brand-700">Greenlightly</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>✓ Self-serve, free to start</li>
                <li>✓ Built for teams without a compliance hire</li>
                <li>✓ A usable policy in minutes</li>
                <li>✓ $49/mo when you need the team features</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Frameworks */}
      <Section className="py-16">
        <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-slate-500">Built around the frameworks you're measured on</h2>
        <div className="mt-6 flex flex-wrap items-stretch justify-center gap-3">
          {FRAMEWORKS.map((f) => (
            <Link key={f.slug} href={`/frameworks/${f.slug}`} className="rounded-xl border border-slate-200 bg-white px-5 py-4 text-center transition hover:border-brand-300 hover:shadow-sm">
              <div className="font-bold text-slate-900">{f.name}</div>
              <div className="mt-0.5 text-xs text-slate-500">{f.authority}</div>
            </Link>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <div className="border-t border-slate-200 bg-slate-50">
        <Section className="py-16">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Frequently asked questions</h2>
          <dl className="mt-6 grid gap-6 md:grid-cols-2">
            {HOME_FAQS.map((f) => (
              <div key={f.q}>
                <dt className="font-semibold text-slate-900">{f.q}</dt>
                <dd className="mt-1.5 text-sm text-slate-600">{f.a}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 rounded-2xl bg-brand-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white">Get your AI usage policy in 3 minutes</h3>
            <p className="mx-auto mt-1.5 max-w-lg text-brand-50">Free, no signup. Then see which of your tools are safe to use.</p>
            <Link href="/ai-usage-policy-generator" className="mt-5 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-brand-700 transition hover:bg-brand-50">Start now</Link>
          </div>
        </Section>
      </div>
    </>
  );
}
