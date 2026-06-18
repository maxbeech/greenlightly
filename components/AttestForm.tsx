"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase/client";

interface AttestData { org_name: string; version: number | null; content_md: string | null; acknowledged: boolean }

export function AttestForm({ token }: { token: string }) {
  const [data, setData] = useState<AttestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [signed, setSigned] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    if (!supabase) { setError("This attestation link can't be loaded right now."); setLoading(false); return; }
    supabase.rpc("attest_get", { t: token }).then(({ data, error }) => {
      if (error || !data?.length) setError("This attestation link is invalid or has expired.");
      else { setData(data[0] as AttestData); if ((data[0] as AttestData).acknowledged) setSigned(true); }
      setLoading(false);
    });
  }, [token]);

  async function sign(e: React.FormEvent) {
    e.preventDefault();
    const supabase = getSupabaseBrowser();
    if (!supabase) return;
    const { error } = await supabase.rpc("attest_sign", { t: token, signer_name: name, signer_email: email });
    if (error) setError(error.message); else setSigned(true);
  }

  if (loading) return <p className="text-slate-500">Loading…</p>;
  if (error) return <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">{data?.org_name} — AI Usage Policy</h1>
      <p className="mt-1 text-sm text-slate-500">Please read and acknowledge this policy{data?.version ? ` (version ${data.version})` : ""}.</p>
      {data?.content_md && (
        <div className="mt-4 max-h-[50vh] overflow-y-auto whitespace-pre-wrap rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-700">{data.content_md}</div>
      )}
      {signed ? (
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-center">
          <p className="font-bold text-emerald-900">✓ Thank you — your acknowledgement is recorded.</p>
        </div>
      ) : (
        <form onSubmit={sign} className="mt-6 space-y-3">
          <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none" />
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your work email" className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none" />
          <label className="flex items-start gap-2 text-sm text-slate-600">
            <input required type="checkbox" className="mt-0.5" /> I have read and agree to follow this AI usage policy.
          </label>
          <button type="submit" className="w-full rounded-lg bg-brand-600 px-4 py-2.5 font-semibold text-white hover:bg-brand-700">Acknowledge policy</button>
        </form>
      )}
    </div>
  );
}
