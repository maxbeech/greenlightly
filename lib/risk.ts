// Transparent, deterministic risk scoring for the AI Tool Risk Directory.
//
// The score answers ONE question: "How much data exposure does an employee
// create by using this tool on its DEFAULT/consumer tier at work?" — which is
// the shadow-AI problem. The enterprise tier usually mitigates this; we surface
// that separately. Every point is explained (no black box) so the per-tool page
// and the JSON-LD can cite exactly why a tool scores the way it does.

import type { AiTool, Verdict } from "./ai-tools";

export type Band = "Low" | "Medium" | "High" | "Unrated";

export interface RiskFactor { label: string; points: number; detail: string }
export interface RiskResult { score: number; band: Band; factors: RiskFactor[] }

// `yes` means the protective control IS present (reduces risk).
function missing(verdict: Verdict): boolean {
  return verdict !== "yes";
}

export function scoreTool(t: AiTool): RiskResult {
  const factors: RiskFactor[] = [];
  const add = (label: string, points: number, detail: string) => {
    if (points !== 0) factors.push({ label, points, detail });
  };

  // Training on data is the dominant factor — it is irreversible exposure.
  if (t.trainsOnPersonalData === "yes")
    add("Trains on your data by default", 30, "On the free/consumer tier your inputs are used to train the vendor's models unless you change a setting.");
  else if (t.trainsOnPersonalData === "opt-out")
    add("Trains on your data unless you opt out", 14, "Training is on by default on the consumer tier; you must find and toggle the opt-out.");

  if (t.trainsOnBusinessData === "yes")
    add("Trains on business-tier data", 22, "Even paid/team data may be used for training — unusual and high-risk.");
  else if (t.trainsOnBusinessData === "opt-out")
    add("Business-tier training is opt-out", 8, "The paid tier still trains on your data until you opt out.");

  if (missing(t.soc2)) add("No SOC 2 Type II", 12, "No independent SOC 2 Type II attestation found.");
  if (missing(t.iso27001)) add("No ISO 27001", 6, "No ISO/IEC 27001 information-security certification found.");
  if (missing(t.gdprDpa)) add("No GDPR DPA", 12, "No standard Data Processing Addendum offered — a problem for any team with EU/UK users.");
  if (missing(t.dataRegionEu)) add("No EU data residency", 6, "Data cannot be guaranteed to stay in the EU.");
  if (missing(t.ssoSaml)) add("No SSO/SAML", 4, "No enterprise single sign-on, so account access is harder to govern.");
  if (missing(t.hipaaBaa)) add("No HIPAA BAA", 5, "No Business Associate Agreement — do not use with protected health information.");

  let score = factors.reduce((s, f) => s + f.points, 0);
  score = Math.max(0, Math.min(100, score));

  // If almost nothing is verified, do not pretend to a precise band.
  const verified = [t.trainsOnPersonalData, t.soc2, t.gdprDpa].filter((x) => x !== null).length;
  const band: Band = t.confidence === "verify" && verified === 0
    ? "Unrated"
    : score <= 24 ? "Low" : score <= 54 ? "Medium" : "High";

  return { score, band, factors };
}

export const BAND_COLORS: Record<Band, string> = {
  Low: "emerald",
  Medium: "amber",
  High: "red",
  Unrated: "slate",
};

// Short, citable one-liner used in lists, meta descriptions and JSON-LD.
export function bandSummary(t: AiTool): string {
  const { band, score } = scoreTool(t);
  if (band === "Unrated") return `${t.name}: risk not yet rated — facts pending verification.`;
  const train =
    t.trainsOnPersonalData === "no" ? "does not train on your data"
    : t.trainsOnPersonalData === "opt-out" ? "trains on your data unless you opt out"
    : t.trainsOnPersonalData === "yes" ? "trains on your data by default"
    : "has unclear training practices";
  return `${t.name} is ${band.toLowerCase()}-risk for default at-work use (${score}/100): it ${train}${
    t.soc2 === "yes" ? ", and holds SOC 2 Type II" : ""
  }.`;
}
