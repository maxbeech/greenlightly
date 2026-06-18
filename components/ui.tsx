import type { Band } from "@/lib/risk";
import type { Verdict } from "@/lib/ai-tools";

// Fixed class strings (Tailwind cannot see dynamically-built class names).
const BAND_CLASS: Record<Band, string> = {
  Low: "bg-emerald-100 text-emerald-800 ring-emerald-200",
  Medium: "bg-amber-100 text-amber-800 ring-amber-200",
  High: "bg-red-100 text-red-800 ring-red-200",
  Unrated: "bg-slate-100 text-slate-600 ring-slate-200",
};

export function RiskPill({ band, score }: { band: Band; score?: number }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${BAND_CLASS[band]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {band === "Unrated" ? "Unrated" : `${band} risk`}{score != null && band !== "Unrated" ? ` · ${score}` : ""}
    </span>
  );
}

// Renders a single data-handling fact. `good` declares which answer is the
// reassuring one so colour matches meaning (e.g. "no training" is good/green).
export function VerdictTag({ value, goodWhen }: { value: Verdict; goodWhen: "yes" | "no" }) {
  if (value == null) return <span className="text-slate-400">Unverified</span>;
  const isGood = value === goodWhen || (goodWhen === "no" && value === "n/a");
  const cls = value === "opt-out"
    ? "text-amber-700"
    : isGood ? "text-emerald-700" : "text-red-700";
  const label = value === "opt-out" ? "Opt-out" : value === "n/a" ? "N/A" : value === "yes" ? "Yes" : "No";
  return <span className={`font-semibold ${cls}`}>{label}</span>;
}

export function Pill({ children, tone = "slate" }: { children: React.ReactNode; tone?: "slate" | "brand" }) {
  const cls = tone === "brand" ? "bg-brand-50 text-brand-700 ring-brand-100" : "bg-slate-100 text-slate-600 ring-slate-200";
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${cls}`}>{children}</span>;
}

export function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`mx-auto max-w-6xl px-5 ${className}`}>{children}</section>;
}
