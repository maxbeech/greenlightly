import { generatePolicy, policyToMarkdown, type PolicyInput } from "../lib/policy.ts";
import { eq, ok, done } from "./_assert.mts";

function base(over: Partial<PolicyInput> = {}): PolicyInput {
  return {
    companyName: "Acme Inc", industry: "Software / SaaS", stance: "balanced",
    allowCustomerData: false, allowPersonalData: false, allowCodeGen: false,
    requireDisclosure: false, approvedTools: [], prohibitedTools: [],
    regulations: [], ownerRole: "Head of Operations", effectiveDate: "2026-06-18",
    ...over,
  };
}

const p = generatePolicy(base());
ok(p.title.includes("Acme Inc"), "title includes company name");
ok(p.sections.length >= 5, "has the core sections");

// Sections are numbered sequentially 1..N.
p.sections.forEach((s, i) => ok(s.heading.startsWith(`${i + 1}. `), `section ${i + 1} numbered correctly (${s.heading})`));

// Strict / no-customer-data forbids customer data.
const dataSec = p.sections.find((s) => s.heading.includes("put into AI tools"))!;
const dataText = JSON.stringify(dataSec.body);
ok(dataText.includes("Never enter customer data"), "default forbids customer data");

// allowCustomerData flips the wording.
const allowed = generatePolicy(base({ allowCustomerData: true }));
const allowedText = JSON.stringify(allowed.sections.find((s) => s.heading.includes("put into AI tools"))!.body);
ok(allowedText.includes("approved for that purpose"), "allowing customer data changes wording");

// Coding section only when allowCodeGen.
ok(!p.sections.some((s) => s.heading.includes("coding")), "no coding section by default");
ok(generatePolicy(base({ allowCodeGen: true })).sections.some((s) => s.heading.includes("coding")), "coding section when enabled");

// EU AI Act adds transparency + regulatory clauses.
const eu = generatePolicy(base({ regulations: ["EU AI Act"] }));
ok(eu.sections.some((s) => s.heading.includes("Transparency")), "EU AI Act forces transparency section");
ok(eu.sections.some((s) => s.heading.includes("Regulatory")), "EU AI Act adds regulatory section");
ok(JSON.stringify(eu.sections).includes("AI-literacy"), "EU AI Act clause mentions AI literacy");

// HIPAA clause.
const hipaa = generatePolicy(base({ regulations: ["HIPAA"] }));
ok(JSON.stringify(hipaa.sections).includes("Business Associate Agreement"), "HIPAA clause present");

// Approved tools listed.
const withTools = generatePolicy(base({ approvedTools: ["ChatGPT Enterprise", "Claude for Work"] }));
ok(JSON.stringify(withTools.sections).includes("ChatGPT Enterprise: approved"), "approved tools listed");

// Markdown serialization.
const md = policyToMarkdown(p);
ok(md.startsWith("# Acme Inc AI Usage Policy"), "markdown has H1 title");
ok(md.includes("## 1. Purpose & scope"), "markdown has numbered H2");
ok(md.includes("modelcharter.com"), "markdown has footer attribution");

// Empty company name falls back gracefully.
ok(generatePolicy(base({ companyName: "" })).title.includes("Our company"), "blank company name falls back");

done("policy");
