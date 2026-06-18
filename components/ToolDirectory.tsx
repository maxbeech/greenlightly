"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Band } from "@/lib/risk";
import { RiskPill } from "@/components/ui";

export interface DirItem { slug: string; name: string; vendor: string; category: string; categoryLabel: string; notableRisk: string; band: Band; score: number }

const RISK_FILTERS: { id: string; label: string }[] = [
  { id: "all", label: "All risk" }, { id: "Low", label: "Low" }, { id: "Medium", label: "Medium" }, { id: "High", label: "High" },
];

export function ToolDirectory({ items }: { items: DirItem[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [risk, setRisk] = useState("all");

  const categories = useMemo(() => {
    const m = new Map<string, string>();
    for (const t of items) m.set(t.category, t.categoryLabel);
    return [["all", "All categories"] as [string, string], ...[...m.entries()].sort((a, b) => a[1].localeCompare(b[1]))];
  }, [items]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return items.filter((t) =>
      (cat === "all" || t.category === cat) &&
      (risk === "all" || t.band === risk) &&
      (!needle || t.name.toLowerCase().includes(needle) || t.vendor.toLowerCase().includes(needle))
    );
  }, [items, q, cat, risk]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a tool or vendor…"
          className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none sm:max-w-xs"
          aria-label="Search tools"
        />
        <select value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Filter by category" className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none">
          {categories.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
        </select>
        <div className="flex gap-1">
          {RISK_FILTERS.map((r) => (
            <button key={r.id} onClick={() => setRisk(r.id)} className={`rounded-lg border px-3 py-2 text-xs font-medium ${risk === r.id ? "border-brand-500 bg-brand-50 text-brand-800" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>{r.label}</button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-500">{filtered.length} of {items.length} tools</p>

      {filtered.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">No tools match. Try clearing the filters.</p>
      ) : (
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <Link key={t.slug} href={`/tools/${t.slug}`} className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand-300 hover:shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <span className="font-semibold text-slate-900 group-hover:text-brand-700">{t.name}</span>
                <RiskPill band={t.band} score={t.score} />
              </div>
              <p className="mt-1 text-xs text-slate-500">{t.vendor} · {t.categoryLabel}</p>
              <p className="mt-2 line-clamp-2 text-sm text-slate-600">{t.notableRisk}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
