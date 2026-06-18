import Link from "next/link";
import { ensureOrg, getAttestations, getPolicies } from "@/lib/workspace";
import { SITE, isPaidPlan } from "@/lib/site";
import { CopyLink } from "@/components/CopyLink";
import { actionCreateAttestation } from "../actions";

export default async function AttestationsPage() {
  const org = await ensureOrg();
  if (!org) return null;
  const [rows, policies] = await Promise.all([getAttestations(org.id), getPolicies(org.id)]);
  const hasPolicy = policies.length > 0;
  const paid = isPaidPlan(org.plan);

  if (!paid) {
    return (
      <div className="rounded-2xl border border-brand-200 bg-brand-50 p-8 text-center">
        <h2 className="text-lg font-bold text-slate-900">Collect attestations on the Team plan</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">Send each colleague a link to read and acknowledge your AI policy, and get a dated record of who signed — the evidence auditors ask for.</p>
        <Link href="/dashboard/billing" className="mt-5 inline-block rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">Upgrade to Team</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Attestations</h2>
          <p className="text-sm text-slate-500">Create a link for each person who must acknowledge the policy. You&apos;ll see when they sign — the evidence auditors ask for.</p>
        </div>
        <form action={actionCreateAttestation}>
          <button type="submit" disabled={!hasPolicy} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50">
            + New attestation link
          </button>
        </form>
      </div>
      {!hasPolicy && <p className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900 ring-1 ring-amber-100">Save a policy version first, then create attestation links against it.</p>}

      {rows.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">No attestation links yet.</p>
      ) : (
        <div className="mt-4 divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white">
          {rows.map((a) => {
            const url = `${SITE.url}/attest/${a.token}`;
            return (
              <div key={a.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm">
                <div>
                  <span className="font-mono text-xs text-slate-400">/attest/{a.token.slice(0, 8)}…</span>
                  <div className="mt-0.5">
                    {a.acknowledged_at
                      ? <span className="font-medium text-emerald-700">✓ Signed by {a.name || a.email} · {a.acknowledged_at.slice(0, 10)}</span>
                      : <span className="text-slate-500">Awaiting signature</span>}
                  </div>
                </div>
                <CopyLink url={url} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
