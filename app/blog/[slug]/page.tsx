import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS, getPost } from "@/lib/posts";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/ui";
import { pageMeta, articleLd, breadcrumbLd } from "@/lib/seo";

// Blog content is static; revalidate weekly per the SEO/ISR strategy.
export const revalidate = 604800;
export const dynamicParams = false;
export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return pageMeta({ title: p.title, description: p.description, path: `/blog/${p.slug}`, keywords: [p.keyword] });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  return (
    <>
      <JsonLd data={articleLd({ title: p.title, description: p.description, path: `/blog/${p.slug}`, date: p.date })} />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: p.title, path: `/blog/${p.slug}` }])} />
      <Section className="py-10">
        <nav className="text-sm text-slate-500"><Link href="/blog" className="hover:text-brand-700">← Blog</Link></nav>
        <article className="mt-4 max-w-2xl">
          <time className="text-sm text-slate-400">{p.date}</time>
          <h1 className="mt-1 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">{p.title}</h1>
          <div className="mt-6 space-y-5">
            {p.body.map((s, i) => (
              <div key={i}>
                {s.h && <h2 className="mb-1 text-lg font-bold text-slate-900">{s.h}</h2>}
                <p className="leading-relaxed text-slate-700">{s.p}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-2xl bg-brand-600 p-6 text-center">
            <h3 className="text-lg font-bold text-white">Put this into practice</h3>
            <p className="mx-auto mt-1 max-w-md text-sm text-brand-50">Generate a free AI usage policy for your team in minutes.</p>
            <Link href="/ai-usage-policy-generator" className="mt-4 inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50">Open the generator →</Link>
          </div>
        </article>
      </Section>
    </>
  );
}
