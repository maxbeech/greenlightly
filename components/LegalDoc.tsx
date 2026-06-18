import type { LegalDoc as Doc } from "@/lib/legal";
import { Section } from "@/components/ui";

export function LegalDoc({ doc }: { doc: Doc }) {
  return (
    <Section className="max-w-2xl py-14">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{doc.title}</h1>
      <p className="mt-1 text-sm text-slate-400">Last updated {doc.updated}</p>
      <p className="mt-5 text-slate-600">{doc.intro}</p>
      <div className="mt-8 space-y-7">
        {doc.sections.map((s) => (
          <section key={s.h}>
            <h2 className="text-lg font-bold text-slate-900">{s.h}</h2>
            {s.p.map((para, i) => <p key={i} className="mt-2 text-sm leading-relaxed text-slate-600">{para}</p>)}
          </section>
        ))}
      </div>
    </Section>
  );
}
