"use client";

import type { Band } from "@/lib/risk";
import { RiskPill } from "@/components/ui";

export interface RegisterItem { slug: string; name: string; status: string; band: Band; score: number }

const STATUS = ["approved", "restricted", "review", "prohibited"];
const STATUS_CLASS: Record<string, string> = {
  approved: "border-emerald-300 bg-emerald-50 text-emerald-800",
  restricted: "border-amber-300 bg-amber-50 text-amber-800",
  review: "border-slate-300 bg-white text-slate-700",
  prohibited: "border-red-300 bg-red-50 text-red-800",
};

export function RegisterTable({ items, action }: { items: RegisterItem[]; action: (fd: FormData) => void }) {
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-white">
      {items.map((it) => (
        <div key={it.slug} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="font-medium text-ink">{it.name}</span>
            <RiskPill band={it.band} score={it.score} />
          </div>
          <form action={action} className="flex items-center gap-2">
            <input type="hidden" name="slug" value={it.slug} />
            <input type="hidden" name="name" value={it.name} />
            <select
              name="status"
              defaultValue={it.status}
              onChange={(e) => e.currentTarget.form?.requestSubmit()}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium capitalize focus:outline-none ${STATUS_CLASS[it.status] ?? STATUS_CLASS.review}`}
            >
              {STATUS.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
            </select>
          </form>
        </div>
      ))}
    </div>
  );
}
