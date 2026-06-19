import type { LegalDoc as Doc } from "@/lib/legal";
import { Section } from "@/components/ui";

export function LegalDoc({ doc }: { doc: Doc }) {
  return (
    <>
      <div className="border-b border-line bg-paper-glow">
        <Section className="max-w-2xl py-14 sm:py-16">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{doc.title}</h1>
          <p className="mt-2 text-sm text-ink-faint">Last updated {doc.updated}</p>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">{doc.intro}</p>
        </Section>
      </div>
      <Section className="max-w-2xl py-12">
        <div className="space-y-8">
          {doc.sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-display text-xl font-semibold text-ink">{s.h}</h2>
              {s.p.map((para, i) => <p key={i} className="mt-2 text-sm leading-relaxed text-ink-soft">{para}</p>)}
            </section>
          ))}
        </div>
      </Section>
    </>
  );
}
