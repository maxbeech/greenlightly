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
        <h2 className="font-display text-lg font-semibold text-ink">Company AI usage policy</h2>
        <p className="mt-1 text-sm text-ink-soft">Generate your policy and save a version. Each save is kept as an immutable version for your records and attestation links.</p>
      </div>

      {policies.length > 0 && (
        <div className="rounded-2xl border border-line bg-white p-5">
          <h3 className="text-sm font-semibold text-ink">Saved versions</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {policies.map((p) => (
              <li key={p.id} className="flex items-center justify-between border-b border-line pb-2 last:border-0">
                <span className="font-medium text-ink">Version {p.version}</span>
                <span className="text-ink-faint">{p.created_at.slice(0, 10)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <PolicyGenerator today={today} toolNames={TOOLS.map((t) => t.name)} saveAction={actionSavePolicy} />
    </div>
  );
}
