import { TOOLS, getTool, type AiTool } from "../lib/ai-tools.ts";
import { scoreTool, bandSummary } from "../lib/risk.ts";
import { eq, ok, done } from "./_assert.mts";

// Midjourney trains on all tiers with no certs → must be High.
const mj = getTool("midjourney");
ok(!!mj, "midjourney exists");
if (mj) eq(scoreTool(mj).band, "High", "midjourney is High risk");

// ChatGPT (no business training, certs) should be Low/Medium, not High.
const gpt = getTool("chatgpt");
if (gpt) ok(["Low", "Medium"].includes(scoreTool(gpt).band), "chatgpt is not High risk");

// Score is the sum of factor points, capped 0..100.
for (const t of TOOLS) {
  const r = scoreTool(t);
  const sum = r.factors.reduce((s, f) => s + f.points, 0);
  eq(r.score, Math.max(0, Math.min(100, sum)), `${t.name}: score equals capped factor sum`);
  ok(r.score >= 0 && r.score <= 100, `${t.name}: score in range`);
  ok(["Low", "Medium", "High", "Unrated"].includes(r.band), `${t.name}: valid band`);
}

// Band thresholds.
function fakeTool(over: Partial<AiTool>): AiTool {
  return { slug: "x", name: "X", vendor: "V", category: "assistant", homepageUrl: "https://x",
    trainsOnPersonalData: "no", trainsOnBusinessData: "no", trainingOptout: "yes",
    soc2: "yes", iso27001: "yes", iso42001: "yes", gdprDpa: "yes", hipaaBaa: "yes",
    dataRegionEu: "yes", ssoSaml: "yes", sources: [], confidence: "high", ...over };
}
eq(scoreTool(fakeTool({})).band, "Low", "all-good tool scores Low (0)");
eq(scoreTool(fakeTool({})).score, 0, "all-good tool scores 0");
ok(scoreTool(fakeTool({ trainsOnPersonalData: "yes", trainsOnBusinessData: "yes", soc2: "no", gdprDpa: "no" })).band === "High", "training (both tiers) + missing certs is High");

// bandSummary mentions the tool name and is non-empty.
for (const t of TOOLS.slice(0, 5)) ok(bandSummary(t).includes(t.name), `${t.name}: bandSummary names tool`);

done("risk");
