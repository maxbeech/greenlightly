import Link from "next/link";

// The brand device: a traffic-signal glyph with the bottom light lit green.
// It carries the whole "greenlight your AI" idea, so it's the single source of
// truth for the mark and reused by the header, footer and hero.
export function SignalMark({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      className={`inline-grid flex-none place-items-center rounded-[9px] bg-brand-700 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 16 22" fill="none">
        <rect x="0.75" y="0.75" width="14.5" height="20.5" rx="6.25" stroke="white" strokeOpacity="0.45" strokeWidth="1.5" />
        <circle cx="8" cy="5.4" r="2" fill="white" fillOpacity="0.28" />
        <circle cx="8" cy="11" r="2" fill="white" fillOpacity="0.28" />
        <circle cx="8" cy="16.6" r="2.4" fill="#34e08b" />
      </svg>
    </span>
  );
}

export function Wordmark({ size = 28 }: { size?: number }) {
  return (
    <span className="flex items-center gap-2.5">
      <SignalMark size={size} />
      <span className="text-[1.15rem] font-semibold tracking-tight text-ink">Greenlightly</span>
    </span>
  );
}

export function LogoLink({ size = 28 }: { size?: number }) {
  return (
    <Link href="/" aria-label="Greenlightly home" className="focus-brand rounded-md">
      <Wordmark size={size} />
    </Link>
  );
}
