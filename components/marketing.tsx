import type { Band } from "@/lib/risk";

// ── App window chrome ───────────────────────────────────────────────────────
// Wraps a mockup so it reads as a real product surface. The three dots are the
// brand's signal motif (stop / caution / go) rather than generic macOS lights.
export function BrowserDots() {
  return (
    <span className="flex gap-1.5" aria-hidden>
      <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
      <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
    </span>
  );
}

export function AppFrame({ title, children, className = "", tilt = false }: { title?: string; children: React.ReactNode; className?: string; tilt?: boolean }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-line bg-white shadow-[0_30px_70px_-35px_rgba(21,32,26,0.45)] ${tilt ? "[transform:perspective(1600px)_rotateY(-7deg)_rotateX(2deg)]" : ""} ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-line bg-paper/70 px-4 py-2.5">
        <BrowserDots />
        {title && <span className="truncate text-xs font-medium text-ink-faint">{title}</span>}
      </div>
      {children}
    </div>
  );
}

// ── Radial risk gauge ───────────────────────────────────────────────────────
// A donut showing a 0-100 risk score, coloured by band. Pure SVG, no client JS.
const GAUGE_COLOR: Record<Band, string> = {
  Low: "#2bb673",
  Medium: "#f59e0b",
  High: "#ef4444",
  Unrated: "#94a3b8",
};

export function RiskGauge({ score, band, size = 132, label }: { score: number; band: Band; size?: number; label?: string }) {
  const stroke = Math.max(8, Math.round(size * 0.085));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = band === "Unrated" ? 0 : Math.min(100, Math.max(0, score));
  const dash = (pct / 100) * c;
  const color = GAUGE_COLOR[band];
  return (
    <div className="relative inline-grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line)" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={`${dash} ${c}`}
        />
      </svg>
      <div className="absolute text-center">
        <div className="font-display text-3xl font-semibold leading-none text-ink">{band === "Unrated" ? "N/A" : score}</div>
        <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide" style={{ color }}>{label ?? (band === "Unrated" ? "Unrated" : `${band} risk`)}</div>
      </div>
    </div>
  );
}
