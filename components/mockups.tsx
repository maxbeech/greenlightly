import Link from "next/link";
import type { Band } from "@/lib/risk";
import { AppFrame, RiskGauge } from "@/components/marketing";
import { RiskPill } from "@/components/ui";

// Illustrative-but-faithful product surfaces for the marketing site. Each takes
// real data (tool names, risk bands, real policy section headings) so the
// mockups never drift from what the app actually shows.

function SkeletonLines({ widths }: { widths: string[] }) {
  return (
    <div className="mt-2 space-y-1.5">
      {widths.map((w, i) => (
        <span key={i} className="block h-2 rounded-full bg-paper" style={{ width: w }} />
      ))}
    </div>
  );
}

export function PolicyDocMock({ title, version, sections, acknowledged, total }: { title: string; version: number; sections: string[]; acknowledged: number; total: number }) {
  return (
    <AppFrame title="ModelCharter · AI usage policy">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold leading-snug text-ink">{title}</h3>
          <span className="flex-none rounded-full bg-brand-50 px-2.5 py-0.5 text-[11px] font-semibold text-brand-700 ring-1 ring-inset ring-brand-100">v{version}</span>
        </div>
        <div className="mt-4 space-y-3.5">
          {sections.map((s, i) => (
            <div key={s}>
              <p className="text-sm font-semibold text-ink">{i + 1}. {s}</p>
              <SkeletonLines widths={["100%", "92%", i % 2 ? "70%" : "84%"]} />
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-line pt-3 text-xs">
          <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Acknowledged by {acknowledged} of {total}
          </span>
          <span className="font-medium text-ink-faint">Export PDF</span>
        </div>
      </div>
    </AppFrame>
  );
}

export function DirectoryMock({ score, band, rows }: { score: number; band: Band; rows: { name: string; band: Band; score: number }[] }) {
  return (
    <AppFrame title="ModelCharter · AI Tool Risk Directory">
      <div className="grid grid-cols-[auto_1fr] items-center gap-5 p-5">
        <RiskGauge score={score} band={band} size={116} />
        <div className="space-y-2">
          {rows.map((r) => (
            <div key={r.name} className="flex items-center justify-between gap-3 rounded-lg border border-line px-3 py-2">
              <span className="truncate text-sm font-medium text-ink">{r.name}</span>
              <RiskPill band={r.band} score={r.score} />
            </div>
          ))}
        </div>
      </div>
    </AppFrame>
  );
}

export function AttestMock({ rows, signed, total }: { rows: { initials: string; team: string; signed: boolean }[]; signed: number; total: number }) {
  const pct = Math.round((signed / Math.max(1, total)) * 100);
  return (
    <AppFrame title="ModelCharter · Attestations">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-ink">Who has read the policy</p>
          <span className="text-xs font-semibold text-brand-700">{pct}%</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-paper">
          <span className="block h-full rounded-full bg-brand-600" style={{ width: `${pct}%` }} />
        </div>
        <ul className="mt-4 space-y-2">
          {rows.map((p, i) => (
            <li key={i} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2.5">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-paper text-[11px] font-semibold text-ink-soft ring-1 ring-inset ring-line">{p.initials}</span>
                <span className="text-sm text-ink-soft">{p.team}</span>
              </span>
              {p.signed ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Signed
                </span>
              ) : (
                <span className="text-xs font-medium text-ink-faint">Pending</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </AppFrame>
  );
}

// Small reusable "feature row" for alternating text/mockup sections.
export function FeatureRow({ flip = false, eyebrow, title, body, cta, children }: { flip?: boolean; eyebrow: React.ReactNode; title: string; body: string; cta?: { href: string; label: string }; children: React.ReactNode }) {
  return (
    <div className={`grid items-center gap-10 lg:grid-cols-2 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
      <div>
        {eyebrow}
        <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{title}</h3>
        <p className="mt-3 max-w-md leading-relaxed text-ink-soft">{body}</p>
        {cta && <Link href={cta.href} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900">{cta.label} <span aria-hidden>→</span></Link>}
      </div>
      <div>{children}</div>
    </div>
  );
}
