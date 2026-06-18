// Compliance frameworks that drive AI governance obligations. Content is
// factual and dated; each page links to the authoritative source so readers
// (and AI assistants citing us) can verify. These are stable, well-established
// facts — but framework timelines change, so each page shows "last reviewed".

export interface Framework {
  slug: string;
  name: string;
  fullName: string;
  authority: string;
  sourceUrl: string;
  appliesTo: string;
  summary: string;
  keyPoints: { h: string; p: string }[];
  forSmb: string; // what a small team without a compliance function should do
  policyTieIn: string; // how an AI usage policy helps
  faqs: { q: string; a: string }[];
  reviewed: string;
}

export const FRAMEWORKS: Framework[] = [
  {
    slug: "eu-ai-act",
    name: "EU AI Act",
    fullName: "Regulation (EU) 2024/1689 — the EU Artificial Intelligence Act",
    authority: "European Union",
    sourceUrl: "https://artificialintelligenceact.eu/",
    appliesTo:
      "Any organisation that puts an AI system on the EU market or whose AI output is used in the EU — including non-EU companies with EU users or staff.",
    summary:
      "The EU AI Act is the world's first comprehensive AI law. It takes a risk-based approach: it bans a small set of 'unacceptable-risk' uses, places strict obligations on 'high-risk' systems, sets transparency rules for limited-risk systems (like chatbots and deepfakes), and largely leaves minimal-risk uses free. It also adds duties for providers of general-purpose AI models.",
    keyPoints: [
      { h: "Phased timeline", p: "Prohibited-AI bans and AI-literacy duties applied from 2 February 2025. General-purpose AI model obligations applied from 2 August 2025. Most high-risk obligations apply from 2 August 2026, with some extended to 2027." },
      { h: "AI literacy (Article 4)", p: "Providers and deployers must ensure staff who use AI on their behalf have a sufficient level of AI literacy — a documented internal policy and training is the simplest way to evidence this." },
      { h: "Risk tiers", p: "Unacceptable (banned, e.g. social scoring), high-risk (e.g. hiring, credit, biometric — strict controls), limited-risk (transparency, e.g. disclose AI chatbots and label deepfakes), and minimal-risk (no extra duties)." },
      { h: "Penalties", p: "Up to €35m or 7% of global annual turnover for prohibited-AI breaches; lower tiers for other infringements." },
    ],
    forSmb:
      "Most SMBs are deployers, not providers, of high-risk AI — so the immediate duties are AI literacy (Article 4), transparency (tell people when they're talking to AI or seeing AI-generated content), and not using any banned practices. A written AI usage policy plus a record of which tools you use covers the practical first steps.",
    policyTieIn:
      "An AI usage policy is the cleanest evidence of Article-4 AI literacy: it tells staff what's allowed, names approved tools, and is something you can show you trained people on.",
    faqs: [
      { q: "Does the EU AI Act apply to US companies?", a: "Yes, if your AI system or its output is used in the EU — for example you have EU customers, or EU-based staff use it. Location of the provider doesn't exempt you." },
      { q: "When does the EU AI Act take effect?", a: "It entered into force on 1 August 2024 and applies in phases: bans from Feb 2025, general-purpose AI rules from Aug 2025, and most high-risk obligations from 2 August 2026." },
      { q: "What is the simplest first step for a small team?", a: "Write and circulate an AI usage policy, keep a short register of the AI tools you use, and make sure anyone using AI understands the basics — that satisfies the AI-literacy duty and starts your transparency obligations." },
    ],
    reviewed: "2026-06-18",
  },
  {
    slug: "nist-ai-rmf",
    name: "NIST AI RMF",
    fullName: "NIST AI Risk Management Framework 1.0",
    authority: "U.S. National Institute of Standards and Technology",
    sourceUrl: "https://www.nist.gov/itl/ai-risk-management-framework",
    appliesTo:
      "Voluntary; widely adopted by US organisations and increasingly referenced in contracts and by enterprise buyers as the expected baseline for responsible AI.",
    summary:
      "The NIST AI RMF is a voluntary, practical framework for managing AI risks across the lifecycle. It is organised around four functions — Govern, Map, Measure and Manage — and is paired with a Generative AI Profile (NIST AI 600-1, July 2024) that tailors it to generative tools like ChatGPT.",
    keyPoints: [
      { h: "Govern", p: "Put policies, accountability and culture in place — an AI usage policy and a named owner are the core of the Govern function." },
      { h: "Map", p: "Understand the context and catalogue where AI is used and what could go wrong — i.e. keep an AI tool register." },
      { h: "Measure", p: "Assess and track the risks you mapped, using metrics and testing appropriate to the use." },
      { h: "Manage", p: "Prioritise and act on risks, and review regularly." },
      { h: "Generative AI Profile", p: "NIST AI 600-1 lists generative-AI-specific risks (data leakage, confabulation, IP, etc.) and suggested actions." },
    ],
    forSmb:
      "You don't need a formal programme to benefit. Doing the Govern (policy + owner) and Map (tool register) functions well already puts a small team ahead of most, and it maps neatly onto what enterprise customers ask about in security reviews.",
    policyTieIn:
      "An AI usage policy is the primary artefact of the Govern function; the tool register is the Map function. Greenlightly produces both.",
    faqs: [
      { q: "Is the NIST AI RMF mandatory?", a: "No — it is voluntary. But it has become the de-facto baseline that US enterprise buyers and partners expect, so adopting it helps you pass vendor security reviews." },
      { q: "What are the four NIST AI RMF functions?", a: "Govern, Map, Measure and Manage. Govern sets policy and accountability; Map catalogues AI use and context; Measure assesses risk; Manage acts on it." },
    ],
    reviewed: "2026-06-18",
  },
  {
    slug: "iso-42001",
    name: "ISO 42001",
    fullName: "ISO/IEC 42001:2023 — AI management system",
    authority: "International Organization for Standardization",
    sourceUrl: "https://www.iso.org/standard/81230.html",
    appliesTo:
      "Any organisation that develops, provides or uses AI systems and wants a certifiable management system — increasingly requested by enterprise procurement.",
    summary:
      "ISO/IEC 42001 is the first certifiable international standard for an AI management system (AIMS). Like ISO 27001 did for information security, it sets out how to establish, run and continually improve governance over AI — including policy, risk assessment, controls and an AI impact assessment.",
    keyPoints: [
      { h: "Certifiable", p: "You can be audited and certified against it by an accredited body — useful proof for customers and regulators." },
      { h: "Built on policy", p: "Clause requirements start with an AI policy, roles and objectives, then risk and impact assessments and operational controls (Annex A)." },
      { h: "Complements ISO 27001", p: "It sits alongside ISO 27001 (security) and SOC 2; many vendors pursue 42001 to signal responsible-AI maturity." },
    ],
    forSmb:
      "Full certification is a project, but the structure is a useful target: a policy, an owner, a risk/impact assessment of your AI uses, and a register of tools and controls. Building those now makes a future certification far cheaper.",
    policyTieIn:
      "ISO 42001 literally requires a documented AI policy and a record of AI systems in use — exactly what Greenlightly's generator and register create.",
    faqs: [
      { q: "What is ISO 42001?", a: "ISO/IEC 42001:2023 is the international standard for an AI management system — a certifiable framework for governing how an organisation develops and uses AI." },
      { q: "Do we need ISO 42001 to use AI?", a: "No. It is voluntary, but enterprise customers increasingly ask about it. Even without certifying, adopting its core artefacts (policy, register, risk assessment) is good practice." },
    ],
    reviewed: "2026-06-18",
  },
  {
    slug: "soc-2",
    name: "SOC 2",
    fullName: "SOC 2 (AICPA System and Organization Controls 2)",
    authority: "American Institute of Certified Public Accountants (AICPA)",
    sourceUrl: "https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2",
    appliesTo:
      "Any SaaS or service company that handles customer data and wants to prove its controls to enterprise buyers. Auditors now routinely look at how you govern AI.",
    summary:
      "SOC 2 is an attestation report on a service organisation's controls against five Trust Services Criteria — Security, Availability, Processing Integrity, Confidentiality and Privacy. It is the most-requested trust report in US B2B SaaS. As AI use has grown, SOC 2 auditors increasingly expect a documented AI usage policy and vendor governance for AI subprocessors.",
    keyPoints: [
      { h: "Type I vs Type II", p: "Type I tests control design at a point in time; Type II tests operating effectiveness over a period (usually 3–12 months) and is what enterprise buyers want." },
      { h: "AI shows up in Security & Confidentiality", p: "Auditors check that staff can't leak confidential data into ungoverned AI tools and that AI vendors are assessed like any other subprocessor." },
      { h: "Policy + evidence", p: "An AI usage policy plus proof staff acknowledged it is the kind of evidence that satisfies the relevant criteria." },
    ],
    forSmb:
      "If you sell to other businesses, SOC 2 is usually the gate. Adding an AI usage policy, a vendor/tool register and attestation records closes the most common AI-related gaps auditors now raise.",
    policyTieIn:
      "Greenlightly gives you the AI usage policy, the AI-vendor register and the staff attestation records that SOC 2 auditors ask for — the evidence, not just the document.",
    faqs: [
      { q: "Does SOC 2 cover AI?", a: "SOC 2 has no separate AI criterion, but auditors evaluate AI under Security and Confidentiality — they expect an AI usage policy and that AI vendors are governed like other subprocessors." },
      { q: "What's the difference between SOC 2 Type I and Type II?", a: "Type I assesses whether controls are designed correctly at a point in time; Type II assesses whether they actually operated effectively over a period, and is the report enterprise buyers prefer." },
    ],
    reviewed: "2026-06-18",
  },
];

export function getFramework(slug: string): Framework | undefined {
  return FRAMEWORKS.find((f) => f.slug === slug);
}
