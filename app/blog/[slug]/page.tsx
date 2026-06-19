import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS, getPost } from "@/lib/posts";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/ui";
import { CtaBanner } from "@/components/page";
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
      <Section className="py-10 sm:py-14">
        <nav className="text-sm text-ink-faint"><Link href="/blog" className="hover:text-brand-700">← Blog</Link></nav>
        <article className="mt-5 max-w-2xl">
          <time className="text-sm font-medium uppercase tracking-wide text-ink-faint">{p.date}</time>
          <h1 className="mt-2 font-display text-[2.2rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2.7rem]">{p.title}</h1>
          <div className="mt-7 space-y-6">
            {p.body.map((s, i) => (
              <div key={i}>
                {s.h && <h2 className="mb-1.5 font-display text-xl font-semibold text-ink">{s.h}</h2>}
                <p className="leading-[1.75] text-ink-soft">{s.p}</p>
              </div>
            ))}
          </div>
        </article>
      </Section>
      <CtaBanner title="Put this into practice" body="Generate a free AI usage policy for your team, then see which of your tools are safe to use." href="/ai-usage-policy-generator" label="Open the generator" />
    </>
  );
}
