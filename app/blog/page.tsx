import type { Metadata } from "next";
import Link from "next/link";
import { POSTS } from "@/lib/posts";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/ui";
import { pageMeta, breadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "AI governance blog — guides for teams",
  description: "Practical guides on AI governance, AI usage policies, shadow AI and AI compliance for small and mid-sized teams.",
  path: "/blog",
  keywords: ["ai governance blog", "ai usage policy", "shadow ai", "ai compliance"],
});

export default function Page() {
  const posts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }])} />
      <div className="border-b border-slate-200 bg-dotgrid">
        <Section className="py-12">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Guides to governing AI at work</h1>
          <p className="mt-3 max-w-2xl text-slate-600">Plain-English guides on AI policies, shadow AI and AI compliance — written for teams without a compliance department.</p>
        </Section>
      </div>
      <Section className="grid gap-5 py-12 md:grid-cols-2">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-brand-300 hover:shadow-sm">
            <time className="text-xs text-slate-400">{p.date}</time>
            <h2 className="mt-1 text-lg font-bold text-slate-900 group-hover:text-brand-700">{p.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{p.description}</p>
            <span className="mt-3 inline-block text-sm font-semibold text-brand-700">Read →</span>
          </Link>
        ))}
      </Section>
    </>
  );
}
