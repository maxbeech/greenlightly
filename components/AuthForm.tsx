"use client";

import { useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase/client";

// Passwordless (magic-link) auth. Same form serves login and signup — Supabase
// signInWithOtp creates the user if they don't exist (when sign-ups are open).
export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const supabase = getSupabaseBrowser();
    if (!supabase) { setState("error"); setError("Auth is not configured for this deployment."); return; }
    setState("sending");
    const redirectTo = `${window.location.origin}/auth/callback`;
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo } });
    if (error) { setState("error"); setError(error.message); } else { setState("sent"); }
  }

  if (state === "sent") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <h2 className="font-bold text-emerald-900">Check your email</h2>
        <p className="mt-1 text-sm text-emerald-800">We sent a sign-in link to <strong>{email}</strong>. Click it to continue.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-slate-800">Work email</label>
        <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none" />
      </div>
      <button type="submit" disabled={state === "sending"}
        className="w-full rounded-lg bg-brand-600 px-4 py-2.5 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60">
        {state === "sending" ? "Sending link…" : mode === "signup" ? "Create account" : "Send magic link"}
      </button>
      {state === "error" && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-center text-xs text-slate-500">We&apos;ll email you a secure link — no password needed.</p>
    </form>
  );
}
