import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { TOOLS } from "@/lib/ai-tools";
import { FRAMEWORKS } from "@/lib/frameworks";
import { POSTS } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => `${SITE.url}${p}`;
  const last = new Date(SITE.updated);
  const statics = ["/", "/ai-usage-policy-generator", "/tools", "/frameworks", "/pricing", "/blog", "/about"];
  return [
    ...statics.map((p) => ({ url: u(p), lastModified: last, changeFrequency: "weekly" as const, priority: p === "/" ? 1 : 0.8 })),
    ...TOOLS.map((t) => ({ url: u(`/tools/${t.slug}`), lastModified: last, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...FRAMEWORKS.map((f) => ({ url: u(`/frameworks/${f.slug}`), lastModified: new Date(f.reviewed), changeFrequency: "monthly" as const, priority: 0.6 })),
    ...POSTS.map((p) => ({ url: u(`/blog/${p.slug}`), lastModified: new Date(p.date), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
