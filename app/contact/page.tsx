import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { Section } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description: "Get in touch with the Greenlightly team — support, sales, security and press.",
  path: "/contact",
});

const CHANNELS = [
  { h: "General & support", e: "hello@greenlightly.com", d: "Questions about the product, your account or a tool in the directory." },
  { h: "Sales", e: "sales@greenlightly.com", d: "Team and Business plans, volume pricing, procurement and security reviews." },
  { h: "Security", e: "security@greenlightly.com", d: "Report a vulnerability or ask about our security practices." },
  { h: "Privacy", e: "privacy@greenlightly.com", d: "Data access, export or deletion requests." },
];

export default function Page() {
  return (
    <Section className="max-w-2xl py-14">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Contact us</h1>
      <p className="mt-3 text-slate-600">We&apos;re a small team and we read everything. Email the right inbox and we&apos;ll get back to you quickly.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {CHANNELS.map((c) => (
          <div key={c.e} className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-bold text-slate-900">{c.h}</h2>
            <p className="mt-1 text-sm text-slate-600">{c.d}</p>
            <a href={`mailto:${c.e}`} className="mt-3 inline-block text-sm font-semibold text-brand-700 hover:underline">{c.e}</a>
          </div>
        ))}
      </div>
      <p className="mt-8 text-sm text-slate-500">Prefer the free tools? <a href={`${SITE.url}/ai-usage-policy-generator`} className="font-semibold text-brand-700">Generate an AI usage policy</a> — no account needed.</p>
    </Section>
  );
}
