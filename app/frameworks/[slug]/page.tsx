import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FRAMEWORKS, getFramework } from "@/lib/frameworks";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/ui";
import { pageMeta, faqLd, breadcrumbLd, articleLd } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return FRAMEWORKS.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const f = getFramework(slug);
  if (!f) return {};
  return pageMeta({
    title: `${f.name} for small teams: what it requires`,
    description: `${f.summary.slice(0, 150)} What ${f.name} means for a team without a compliance department, and how an AI usage policy helps.`,
    path: `/frameworks/${f.slug}`,
    keywords: [f.name.toLowerCase(), `${f.name.toLowerCase()} compliance`, `${f.name.toLowerCase()} for small business`, "ai governance"],
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f = getFramework(slug);
  if (!f) notFound();

  return (
    <>
      <JsonLd data={faqLd(f.faqs)} />
      <JsonLd data={articleLd({ title: `${f.name}: what it requires`, description: f.summary, path: `/frameworks/${f.slug}`, date: f.reviewed })} />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Frameworks", path: "/frameworks" }, { name: f.name, path: `/frameworks/${f.slug}` }])} />

      <div className="border-b border-line bg-paper-glow">
        <Section className="py-10 sm:py-12">
          <nav className="text-sm text-ink-faint"><Link href="/frameworks" className="hover:text-brand-700">← Frameworks</Link></nav>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-5xl">{f.name}</h1>
          <p className="mt-2 text-sm font-medium text-ink-faint">{f.fullName} · {f.authority}</p>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{f.summary}</p>
        </Section>
      </div>

      <Section className="py-10 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,300px)]">
          <div className="max-w-2xl">
            <h2 className="font-display text-xl font-semibold text-ink">Who it applies to</h2>
            <p className="mt-2 leading-relaxed text-ink-soft">{f.appliesTo}</p>

            <h2 className="mt-9 font-display text-xl font-semibold text-ink">Key points</h2>
            <div className="mt-3 space-y-3">
              {f.keyPoints.map((k) => (
                <div key={k.h} className="rounded-xl border border-line bg-white p-4">
                  <h3 className="font-semibold text-ink">{k.h}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{k.p}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-9 font-display text-xl font-semibold text-ink">What a small team should do</h2>
            <p className="mt-2 leading-relaxed text-ink-soft">{f.forSmb}</p>
            <div className="mt-4 rounded-xl bg-brand-50 p-4 text-sm text-brand-900 ring-1 ring-inset ring-brand-100">
              <strong>How a policy helps:</strong> {f.policyTieIn}
            </div>

            <h2 className="mt-9 font-display text-xl font-semibold text-ink">FAQ</h2>
            <dl className="mt-3 space-y-4">
              {f.faqs.map((q) => (
                <div key={q.q}><dt className="font-semibold text-ink">{q.q}</dt><dd className="mt-1 text-sm leading-relaxed text-ink-soft">{q.a}</dd></div>
              ))}
            </dl>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-line bg-white p-5 text-sm">
              <p className="text-ink-faint">Last reviewed {f.reviewed}.</p>
              <a href={f.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-semibold text-brand-700 hover:underline">Official source ↗</a>
            </div>
            <div className="rounded-2xl bg-brand-800 p-5 text-white">
              <h3 className="font-semibold">Start your {f.name} groundwork</h3>
              <p className="mt-1 text-sm text-brand-100">Generate the free AI usage policy this framework expects.</p>
              <Link href="/ai-usage-policy-generator" className="mt-3 inline-block rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-800 hover:bg-brand-50">Generate a policy →</Link>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
