"use client";

import { useEffect, useRef, useState } from "react";

// An abstract, interactive stand-in for the real "tool register" in the app.
// Each tool carries a signal (stop / caution / go); the panel cycles on its own
// to feel alive, pauses when you interact, and lets you tap a tool to set it.
export type ConsoleStatus = "restricted" | "review" | "approved";
export interface ConsoleItem { name: string; status: ConsoleStatus }

const ORDER: ConsoleStatus[] = ["restricted", "review", "approved"];
const META: Record<ConsoleStatus, { label: string; dot: string; text: string }> = {
  restricted: { label: "Restricted", dot: "bg-red-500", text: "text-red-600" },
  review: { label: "In review", dot: "bg-amber-500", text: "text-amber-600" },
  approved: { label: "Approved", dot: "bg-emerald-500", text: "text-emerald-600" },
};

function MiniSignal({ status }: { status: ConsoleStatus }) {
  return (
    <span className="flex items-center gap-1" aria-hidden>
      {ORDER.map((s) => (
        <span key={s} className={`h-2 w-2 rounded-full transition-colors ${s === status ? META[s].dot : "bg-slate-200"}`} />
      ))}
    </span>
  );
}

export function SignalConsole({ items: initial }: { items: ConsoleItem[] }) {
  const [items, setItems] = useState(initial);
  const paused = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let i = 0;
    const id = setInterval(() => {
      if (paused.current) return;
      setItems((prev) => {
        const next = [...prev];
        const cur = next[i % next.length];
        next[i % next.length] = { ...cur, status: ORDER[(ORDER.indexOf(cur.status) + 1) % ORDER.length] };
        return next;
      });
      i++;
    }, 2600);
    return () => clearInterval(id);
  }, []);

  function cycle(idx: number) {
    setItems((prev) => prev.map((it, j) => (j === idx ? { ...it, status: ORDER[(ORDER.indexOf(it.status) + 1) % ORDER.length] } : it)));
  }

  const count = (s: ConsoleStatus) => items.filter((it) => it.status === s).length;
  const total = items.length || 1;
  const pct = (s: ConsoleStatus) => `${(count(s) / total) * 100}%`;

  return (
    <div onMouseEnter={() => (paused.current = true)} onMouseLeave={() => (paused.current = false)}>
      <div className="flex items-center justify-between px-4 pt-4">
        <div>
          <p className="text-sm font-semibold text-ink">AI tool register</p>
          <p className="text-xs text-ink-faint">{count("approved")} approved · {count("review")} in review · {count("restricted")} restricted</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 signal-pulse" /> Live
        </span>
      </div>

      <ul className="mt-3 divide-y divide-line">
        {items.map((it, idx) => (
          <li key={it.name}>
            <button
              type="button"
              onClick={() => cycle(idx)}
              onFocus={() => (paused.current = true)}
              onBlur={() => (paused.current = false)}
              className="focus-brand flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors hover:bg-paper"
              aria-label={`${it.name}: ${META[it.status].label}. Tap to change.`}
            >
              <span className="flex min-w-0 items-center gap-3">
                <MiniSignal status={it.status} />
                <span className="truncate text-sm font-medium text-ink">{it.name}</span>
              </span>
              <span className={`flex-none text-xs font-semibold ${META[it.status].text}`}>{META[it.status].label}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="px-4 pb-4 pt-3">
        <div className="flex h-1.5 overflow-hidden rounded-full bg-slate-100">
          <span className="bg-emerald-500 transition-all duration-500" style={{ width: pct("approved") }} />
          <span className="bg-amber-400 transition-all duration-500" style={{ width: pct("review") }} />
          <span className="bg-red-400 transition-all duration-500" style={{ width: pct("restricted") }} />
        </div>
        <p className="mt-2 text-center text-[11px] text-ink-faint">Tap a tool to set its status</p>
      </div>
    </div>
  );
}
