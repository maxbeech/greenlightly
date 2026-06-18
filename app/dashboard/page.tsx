import Link from "next/link";
import { ensureOrg, getRegister, getPolicies, getAttestations } from "@/lib/workspace";

export default async function DashboardHome() {
  const org = await ensureOrg();
  if (!org) return null;
  const [register, policies, attestations] = await Promise.all([getRegister(org.id), getPolicies(org.id), getAttestations(org.id)]);
  const approved = register.filter((r) => r.status === "approved").length;
  const review = register.filter((r) => r.status === "review").length;
  const signed = attestations.filter((a) => a.acknowledged_at).length;

  const stats = [
    { label: "Tools approved", value: approved, sub: `${review} awaiting review`, href: "/dashboard/tools" },
    { label: "Policy version", value: policies[0]?.version ?? "—", sub: policies.length ? `updated ${policies[0].created_at.slice(0, 10)}` : "not created yet", href: "/dashboard/policy" },
    { label: "Attestations signed", value: signed, sub: `${attestations.length} sent`, href: "/dashboard/attestations" },
  ];

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-brand-300 hover:shadow-sm">
            <p className="text-sm text-slate-500">{s.label}</p>
            <p className="mt-1 text-3xl font-extrabold text-slate-900">{s.value}</p>
            <p className="mt-1 text-xs text-slate-400">{s.sub}</p>
          </Link>
        ))}
      </div>
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="font-bold text-slate-900">Get set up in three steps</h2>
        <ol className="mt-3 space-y-2 text-sm text-slate-600">
          <li>1. <Link href="/dashboard/tools" className="font-semibold text-brand-700">Triage your tool register</Link> — mark which AI tools are approved, restricted or prohibited.</li>
          <li>2. <Link href="/dashboard/policy" className="font-semibold text-brand-700">Publish your AI usage policy</Link> — generate it and save a version.</li>
          <li>3. <Link href="/dashboard/attestations" className="font-semibold text-brand-700">Collect attestations</Link> — share a link so staff acknowledge the policy.</li>
        </ol>
      </div>
    </div>
  );
}
