import { ensureOrg, getPolicies } from "@/lib/workspace";
import { TOOLS } from "@/lib/ai-tools";
import { PolicyGenerator } from "@/components/PolicyGenerator";
import { actionSavePolicy } from "../actions";

export default async function PolicyPage() {
  const org = await ensureOrg();
  if (!org) return null;
  const policies = await getPolicies(org.id);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-bold text-slate-900">Company AI usage policy</h2>
        <p className="text-sm text-slate-500">Generate your policy and save a version. Each save is kept as an immutable version for your records and attestation links.</p>
      </div>

      {policies.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-bold text-slate-900">Saved versions</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {policies.map((p) => (
              <li key={p.id} className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0">
                <span className="font-medium text-slate-800">Version {p.version}</span>
                <span className="text-slate-400">{p.created_at.slice(0, 10)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <PolicyGenerator today={today} toolNames={TOOLS.map((t) => t.name)} saveAction={actionSavePolicy} />
    </div>
  );
}
