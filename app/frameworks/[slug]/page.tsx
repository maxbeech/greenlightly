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
    title: `${f.name} for small teams — what it requires`,
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
      <JsonLd data={articleLd({ title: `${f.name} — what it requires`, description: f.summary, path: `/frameworks/${f.slug}`, date: f.reviewed })} />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Frameworks", path: "/frameworks" }, { name: f.name, path: `/frameworks/${f.slug}` }])} />

      <Section className="py-10">
        <nav className="text-sm text-slate-500"><Link href="/frameworks" className="hover:text-brand-700">← Frameworks</Link></nav>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{f.name}</h1>
        <p className="mt-1 text-sm font-medium text-slate-500">{f.fullName} · {f.authority}</p>
        <p className="mt-5 max-w-2xl text-lg text-slate-700">{f.summary}</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_minmax(0,300px)]">
          <div className="max-w-2xl">
            <h2 className="text-lg font-bold text-slate-900">Who it applies to</h2>
            <p className="mt-2 text-slate-700">{f.appliesTo}</p>

            <h2 className="mt-8 text-lg font-bold text-slate-900">Key points</h2>
            <div className="mt-3 space-y-3">
              {f.keyPoints.map((k) => (
                <div key={k.h} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <h3 className="font-semibold text-slate-900">{k.h}</h3>
                  <p className="mt-1 text-sm text-slate-600">{k.p}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-8 text-lg font-bold text-slate-900">What a small team should do</h2>
            <p className="mt-2 text-slate-700">{f.forSmb}</p>
            <div className="mt-4 rounded-xl bg-brand-50 p-4 text-sm text-brand-900 ring-1 ring-brand-100">
              <strong>How a policy helps:</strong> {f.policyTieIn}
            </div>

            <h2 className="mt-8 text-lg font-bold text-slate-900">FAQ</h2>
            <dl className="mt-3 space-y-4">
              {f.faqs.map((q) => (
                <div key={q.q}><dt className="font-semibold text-slate-900">{q.q}</dt><dd className="mt-1 text-sm text-slate-600">{q.a}</dd></div>
              ))}
            </dl>
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
              <p className="text-slate-500">Last reviewed {f.reviewed}.</p>
              <a href={f.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-semibold text-brand-700 hover:underline">Official source ↗</a>
            </div>
            <div className="rounded-xl bg-slate-900 p-5 text-white">
              <h3 className="font-bold">Start your {f.name} groundwork</h3>
              <p className="mt-1 text-sm text-slate-300">Generate the AI usage policy this framework expects — free.</p>
              <Link href="/ai-usage-policy-generator" className="mt-3 inline-block rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100">Generate a policy →</Link>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
