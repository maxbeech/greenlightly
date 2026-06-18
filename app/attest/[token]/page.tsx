import type { Metadata } from "next";
import { isDbConfigured } from "@/lib/db";
import { getAttestation } from "@/lib/attest";
import { SetupPending } from "@/components/SetupPending";
import { Section } from "@/components/ui";
import { actionSign } from "./actions";

export const metadata: Metadata = { title: "Acknowledge AI policy", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!isDbConfigured()) return <SetupPending what="Attestations" />;
  const att = await getAttestation(token);

  if (!att) {
    return (
      <Section className="max-w-xl py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Link not found</h1>
        <p className="mt-2 text-slate-600">This attestation link is invalid or has expired. Ask whoever sent it for a fresh one.</p>
      </Section>
    );
  }

  return (
    <Section className="max-w-2xl py-14">
      <h1 className="text-2xl font-bold text-slate-900">{att.orgName} — AI Usage Policy</h1>
      <p className="mt-1 text-sm text-slate-500">Please read and acknowledge this policy{att.version ? ` (version ${att.version})` : ""}.</p>
      {att.contentMd
        ? <div className="mt-4 max-h-[50vh] overflow-y-auto whitespace-pre-wrap rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-700">{att.contentMd}</div>
        : <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900">No policy is attached to this link yet.</p>}

      {att.acknowledged ? (
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-center">
          <p className="font-bold text-emerald-900">✓ Thank you — your acknowledgement is recorded.</p>
        </div>
      ) : (
        <form action={actionSign} className="mt-6 space-y-3">
          <input type="hidden" name="token" value={token} />
          <input required name="name" placeholder="Your full name" className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none" />
          <input required name="email" type="email" placeholder="Your work email" className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none" />
          <label className="flex items-start gap-2 text-sm text-slate-600">
            <input required type="checkbox" className="mt-0.5" /> I have read and agree to follow this AI usage policy.
          </label>
          <button type="submit" className="w-full rounded-lg bg-brand-600 px-4 py-2.5 font-semibold text-white hover:bg-brand-700">Acknowledge policy</button>
        </form>
      )}
    </Section>
  );
}
