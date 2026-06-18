"use client";

import { useEffect, useMemo, useState } from "react";
import { generatePolicy, policyToMarkdown, type PolicyInput, type Stance } from "@/lib/policy";

const INDUSTRIES = ["General business", "Software / SaaS", "Healthcare", "Finance", "Legal", "Education", "Marketing / agency", "E-commerce / retail", "Government / public sector", "Non-profit"];
const REGS = ["EU AI Act", "GDPR", "HIPAA", "SOC 2", "ISO 42001"];
const STANCES: { id: Stance; label: string; hint: string }[] = [
  { id: "permissive", label: "Permissive", hint: "Encourage AI, few rules" },
  { id: "balanced", label: "Balanced", hint: "Allowed with guardrails" },
  { id: "strict", label: "Strict", hint: "Only what's approved" },
];

function Toggle({ label, hint, value, onChange }: { label: string; hint?: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!value)} className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-left hover:border-slate-300">
      <span><span className="block text-sm font-medium text-slate-900">{label}</span>{hint && <span className="block text-xs text-slate-500">{hint}</span>}</span>
      <span className={`relative h-6 w-11 flex-none rounded-full transition ${value ? "bg-brand-600" : "bg-slate-300"}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${value ? "left-[22px]" : "left-0.5"}`} />
      </span>
    </button>
  );
}

export function PolicyGenerator({ today: todayProp, toolNames, saveAction }: { today: string; toolNames: string[]; saveAction?: (fd: FormData) => void | Promise<void> }) {
  // Seed from the server value (no hydration mismatch), then correct to the
  // real current date after mount so a long-cached page still dates correctly.
  const [today, setToday] = useState(todayProp);
  useEffect(() => { setToday(new Date().toISOString().slice(0, 10)); }, []);
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState(INDUSTRIES[0]);
  const [stance, setStance] = useState<Stance>("balanced");
  const [ownerRole, setOwnerRole] = useState("Head of Operations");
  const [allowCustomerData, setAllowCustomerData] = useState(false);
  const [allowPersonalData, setAllowPersonalData] = useState(false);
  const [allowCodeGen, setAllowCodeGen] = useState(false);
  const [requireDisclosure, setRequireDisclosure] = useState(true);
  const [regulations, setRegulations] = useState<string[]>(["SOC 2"]);
  const [approvedTools, setApprovedTools] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const input: PolicyInput = {
    companyName, industry, stance, ownerRole,
    allowCustomerData, allowPersonalData, allowCodeGen, requireDisclosure,
    regulations, approvedTools, prohibitedTools: [], effectiveDate: today,
  };
  const policy = useMemo(() => generatePolicy(input), [JSON.stringify(input)]);
  const markdown = useMemo(() => policyToMarkdown(policy), [policy]);

  const toggleIn = (arr: string[], set: (v: string[]) => void, v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  function download() {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${(companyName || "ai-usage").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-ai-usage-policy.md`;
    a.click(); URL.revokeObjectURL(url);
  }
  async function copy() { await navigator.clipboard.writeText(markdown); setCopied(true); setTimeout(() => setCopied(false), 1500); }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,380px)_1fr]">
      {/* Form */}
      <form className="space-y-5 print:hidden" onSubmit={(e) => e.preventDefault()}>
        <Field label="Company name">
          <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Acme Inc." className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" />
        </Field>
        <Field label="Industry">
          <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none">
            {INDUSTRIES.map((i) => <option key={i}>{i}</option>)}
          </select>
        </Field>
        <Field label="How permissive should the policy be?">
          <div className="grid grid-cols-3 gap-2">
            {STANCES.map((s) => (
              <button key={s.id} type="button" onClick={() => setStance(s.id)} className={`rounded-lg border px-2 py-2 text-center text-xs ${stance === s.id ? "border-brand-500 bg-brand-50 text-brand-800" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>
                <span className="block font-semibold">{s.label}</span><span className="block">{s.hint}</span>
              </button>
            ))}
          </div>
        </Field>
        <Field label="Data rules">
          <div className="space-y-2">
            <Toggle label="Allow customer / confidential data in approved tools" value={allowCustomerData} onChange={setAllowCustomerData} />
            <Toggle label="Allow personal data (PII) in approved tools" value={allowPersonalData} onChange={setAllowPersonalData} />
            <Toggle label="AI-assisted coding is in scope" value={allowCodeGen} onChange={setAllowCodeGen} />
            <Toggle label="Require disclosure of AI-generated content" value={requireDisclosure} onChange={setRequireDisclosure} />
          </div>
        </Field>
        <Field label="Which rules apply to you?">
          <div className="flex flex-wrap gap-2">
            {REGS.map((r) => (
              <button key={r} type="button" onClick={() => toggleIn(regulations, setRegulations, r)} className={`rounded-full border px-3 py-1 text-xs ${regulations.includes(r) ? "border-brand-500 bg-brand-50 text-brand-800" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>{r}</button>
            ))}
          </div>
        </Field>
        <Field label="Who owns the policy?">
          <input value={ownerRole} onChange={(e) => setOwnerRole(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" />
        </Field>
        <Field label={`Approved tools (optional, ${approvedTools.length} selected)`}>
          <div className="flex max-h-40 flex-wrap gap-1.5 overflow-y-auto rounded-lg border border-slate-200 p-2">
            {toolNames.map((t) => (
              <button key={t} type="button" onClick={() => toggleIn(approvedTools, setApprovedTools, t)} className={`rounded-full border px-2.5 py-0.5 text-xs ${approvedTools.includes(t) ? "border-brand-500 bg-brand-50 text-brand-800" : "border-slate-200 text-slate-500 hover:border-slate-300"}`}>{t}</button>
            ))}
          </div>
        </Field>
      </form>

      {/* Live policy */}
      <div>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 print:hidden">
          <span className="text-sm text-slate-500">Live preview — updates as you type</span>
          <div className="flex gap-2">
            <button onClick={copy} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:border-slate-400">{copied ? "Copied!" : "Copy Markdown"}</button>
            <button onClick={download} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:border-slate-400">Download .md</button>
            <button onClick={() => window.print()} className="rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-700">Save as PDF</button>
            {saveAction && (
              <form action={saveAction}>
                <input type="hidden" name="content_md" value={markdown} />
                <input type="hidden" name="input_json" value={JSON.stringify(input)} />
                <button type="submit" className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white hover:bg-slate-700">Save version to workspace</button>
              </form>
            )}
          </div>
        </div>
        <article className="policy-doc rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">{policy.title}</h2>
          {policy.intro.map((p, i) => <p key={i} className="mt-1 text-sm italic text-slate-500">{p}</p>)}
          {policy.sections.map((s) => (
            <section key={s.heading} className="mt-5">
              <h3 className="text-base font-semibold text-slate-900">{s.heading}</h3>
              {s.body.map((b, i) => Array.isArray(b)
                ? <ul key={i} className="mt-1.5 list-disc space-y-1 pl-5 text-sm text-slate-700">{b.map((li, j) => <li key={j}>{li}</li>)}</ul>
                : <p key={i} className="mt-1.5 text-sm leading-relaxed text-slate-700">{b}</p>)}
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="mb-1.5 block text-sm font-semibold text-slate-800">{label}</label>{children}</div>;
}
