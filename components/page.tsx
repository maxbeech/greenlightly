import Link from "next/link";
import { Section, Eyebrow } from "@/components/ui";

// Shared marketing-page scaffolding so every page shares one hero / FAQ / CTA
// treatment instead of each reinventing it.

export function PageHero({ eyebrow, title, intro, center = false, children }: { eyebrow?: React.ReactNode; title: React.ReactNode; intro?: React.ReactNode; center?: boolean; children?: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden border-b border-line bg-paper-glow">
      <div className="bg-dotgrid">
        <Section className={`py-14 sm:py-20 ${center ? "text-center" : ""}`}>
          {eyebrow && <div className={center ? "flex justify-center" : ""}><Eyebrow>{eyebrow}</Eyebrow></div>}
          <h1 className={`mt-4 font-display text-[2.4rem] font-semibold leading-[1.06] tracking-tight text-ink sm:text-5xl ${center ? "mx-auto max-w-3xl" : "max-w-3xl"}`}>{title}</h1>
          {intro && <p className={`mt-5 text-lg leading-relaxed text-ink-soft ${center ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>{intro}</p>}
          {children}
        </Section>
      </div>
    </div>
  );
}

export interface Faq { q: string; a: string }

export function FaqSection({ title = "Frequently asked questions", faqs, columns = 3 }: { title?: string; faqs: Faq[]; columns?: 2 | 3 }) {
  return (
    <div className="border-t border-line bg-white">
      <Section className="py-16 sm:py-20">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{title}</h2>
        <dl className={`mt-7 grid gap-x-10 gap-y-7 ${columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
          {faqs.map((f) => (
            <div key={f.q}>
              <dt className="font-semibold text-ink">{f.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-soft">{f.a}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </div>
  );
}

export function CtaBanner({ title, body, href, label }: { title: string; body?: string; href: string; label: string }) {
  return (
    <Section className="py-16 sm:py-20">
      <div className="overflow-hidden rounded-[1.5rem] bg-brand-800 px-8 py-12 text-center sm:px-12">
        <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
        {body && <p className="mx-auto mt-3 max-w-lg text-brand-100">{body}</p>}
        <Link href={href} className="mt-7 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-brand-800 transition-colors hover:bg-brand-50">{label}</Link>
      </div>
    </Section>
  );
}
