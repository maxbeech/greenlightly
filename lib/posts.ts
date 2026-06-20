// SEO guide posts targeting the AI-governance keyword cluster. Bodies are
// arrays of {h?, p} sections rendered by the blog page. Single source for the
// blog index + sitemap. Content is grounded and links to our tools/frameworks.

export interface PostSection { h?: string; p: string }
export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  keyword: string;
  body: PostSection[];
}

export const POSTS: Post[] = [
  {
    slug: "what-is-ai-governance",
    title: "What Is AI Governance? A Practical Guide for Small Teams",
    date: "2026-06-18",
    description: "AI governance explained without the jargon: what it is, why even small companies need it, and the three artefacts that cover most of it.",
    keyword: "ai governance",
    body: [
      { p: "AI governance is simply how an organisation sets and enforces rules for using AI safely and legally. It sounds like something only big, regulated companies do, but the moment anyone on your team pastes work into ChatGPT, you have AI risk, and governance is how you manage it." },
      { h: "The three things that cover most of it", p: "You don't need a department. For most small and mid-sized teams, AI governance comes down to three artefacts: (1) an AI usage policy that says what's allowed and what isn't; (2) a register of which AI tools are approved and for what data; and (3) a record that staff have read and acknowledged the policy." },
      { h: "Why it matters now", p: "Three forces converged across 2025 and 2026: AI tools became ubiquitous at work, regulators acted (the EU AI Act's AI-literacy duty applied from February 2025), and enterprise buyers started asking about AI in SOC 2 and security reviews. Not having a policy is now something customers and auditors notice." },
      { h: "Shadow AI is the real risk", p: "The biggest day-one risk isn't a rogue model. It's 'shadow AI': employees quietly using unapproved tools on personal accounts that may train on or retain your confidential data. A clear policy plus an approved-tools list is the cheapest way to pull that into the light." },
      { h: "Where to start", p: "Generate an AI usage policy (it's a short job), check your most-used AI tools in a risk directory so you know which to approve, and circulate the policy for everyone to acknowledge. That alone puts you ahead of most companies your size." },
    ],
  },
  {
    slug: "what-is-shadow-ai",
    title: "What Is Shadow AI, and How Do You Get It Under Control?",
    date: "2026-06-18",
    description: "Shadow AI is employees using unapproved AI tools at work. Here's why it happens, the risk it creates, and how to fix it without banning AI.",
    keyword: "shadow ai",
    body: [
      { p: "Shadow AI is the use of AI tools that your organisation hasn't approved or doesn't even know about: marketing running ChatGPT on personal accounts, support installing an AI browser extension, an engineer pasting code into a free assistant. It's the AI version of 'shadow IT'." },
      { h: "Why it happens", p: "Because AI tools are useful and free, and approval is slow or non-existent. People aren't being reckless; they're trying to do their jobs faster. Banning AI outright just drives it further underground." },
      { h: "The risk", p: "Consumer/free tiers of many AI tools train on your inputs by default and retain data. Confidential plans, customer data and source code entered into them can leak into model training or be exposed in a breach, and you have no record it happened." },
      { h: "How to control it (without a ban)", p: "Give people an approved path. Publish a short AI usage policy, maintain a list of approved tools (with the safe tiers named), and make it easy to request new ones. When the sanctioned route is as easy as the shadow one, shadow AI shrinks." },
      { h: "Know your tools", p: "Start by checking how your most-used AI tools actually handle data: whether they train on it, their retention, and whether they offer a business tier that doesn't. Our AI Tool Risk Directory rates the popular ones from their own policies." },
    ],
  },
  {
    slug: "how-to-write-an-ai-usage-policy",
    title: "How to Write an AI Usage Policy (with a Free Template)",
    date: "2026-06-18",
    description: "A step-by-step guide to writing an AI usage policy for your company: what to include, how strict to be, and a free generator that does it for you.",
    keyword: "ai usage policy template",
    body: [
      { p: "An AI usage policy tells your team how they may and may not use AI tools at work. A good one is short, specific and easy to follow, not a 20-page legal document nobody reads." },
      { h: "1. Define the scope", p: "Say who it applies to (employees, contractors, anyone acting for you) and what counts as an 'AI tool': standalone assistants, AI features baked into other software, and anything that sends your data to a third-party model." },
      { h: "2. Set your stance", p: "Decide how permissive to be. Most teams land on 'balanced': AI is allowed, with guardrails. Regulated or data-sensitive teams go stricter, allowing only explicitly approved tools and uses." },
      { h: "3. Nail the data rules", p: "This is the heart of the policy. Be explicit about customer data, personal data (PII), secrets and confidential plans. The simplest safe default: never put confidential or personal data into a consumer AI tool, and only use approved tools that don't train on your data for anything sensitive." },
      { h: "4. Add transparency and regulatory clauses", p: "If you have EU users, the EU AI Act expects you to disclose AI interactions and ensure basic AI literacy. If you handle health data, HIPAA needs a BAA. If you sell B2B, SOC 2 auditors expect this policy to exist." },
      { h: "5. Name an owner and generate it", p: "Say who owns the policy and handles questions and breaches. Then don't start from a blank page: our free AI usage policy generator builds all of the above, tailored to your answers, in a couple of minutes." },
    ],
  },
  {
    slug: "eu-ai-act-for-small-business",
    title: "The EU AI Act for Small Businesses: What You Actually Have to Do",
    date: "2026-06-18",
    description: "Does the EU AI Act apply to your small business? The realistic obligations for a small team that just uses AI tools, and what you can ignore.",
    keyword: "eu ai act compliance",
    body: [
      { p: "The EU AI Act is the world's first comprehensive AI law, and the headlines make it sound terrifying. For a small business that simply uses AI tools (rather than building high-risk AI systems), the real obligations are more manageable than they look." },
      { h: "Does it apply to you?", p: "If your business or its output reaches the EU (EU customers, or EU-based staff using AI on your behalf) then yes, it can apply, even if you're based outside the EU." },
      { h: "You're probably a 'deployer', not a 'provider'", p: "The heaviest duties fall on providers of high-risk AI systems. Most small teams are deployers of general tools like ChatGPT, so the practical duties are: don't use banned practices, ensure basic AI literacy among staff, and be transparent (tell people when they're dealing with AI or AI-generated content)." },
      { h: "The AI-literacy duty", p: "Since February 2025, you must ensure staff who use AI have a sufficient level of AI literacy. A written AI usage policy plus a short briefing is the simplest way to evidence this: you have a document and a record people read it." },
      { h: "What to do this quarter", p: "Write an AI usage policy, keep a register of the AI tools you use, and make sure anyone using AI understands the basics. That covers the realistic first steps. See our EU AI Act guide for the detail." },
    ],
  },
  {
    slug: "is-chatgpt-safe-for-work",
    title: "Is ChatGPT Safe to Use at Work? What Your Team Should Know",
    date: "2026-06-18",
    description: "Whether ChatGPT is safe for work depends on which version your team uses. The difference between free, Plus, Team and Enterprise, and the data rules that matter.",
    keyword: "is chatgpt safe for work",
    body: [
      { p: "ChatGPT can be safe for work, but the answer depends entirely on which tier your team uses and what they put into it. The gap between a personal free account and ChatGPT Enterprise is the whole ballgame." },
      { h: "Free and Plus: train on your data by default", p: "On consumer ChatGPT (Free and Plus), OpenAI may use your conversations to improve its models unless you turn that off in data controls. So work data pasted into a personal account can flow into model training, the classic shadow-AI exposure." },
      { h: "Team, Enterprise and the API: don't", p: "OpenAI does not train on data from ChatGPT Team, ChatGPT Enterprise or the API by default, and these tiers add SSO, admin controls and retention settings. For business use with any sensitive data, that's the tier you want." },
      { h: "The practical rule", p: "Approve a business tier, tell staff to use it (not personal accounts) for work, and never enter secrets, customer data or confidential plans into any consumer AI tool. Capture that in your AI usage policy so it's a rule, not a hope." },
      { h: "See the full profile", p: "Our AI Tool Risk Directory has ChatGPT's full data-handling profile (training, retention, SOC 2, GDPR DPA and HIPAA status) sourced from OpenAI's own policies, alongside 20+ other tools." },
    ],
  },
];

const WEEK2_POSTS: Post[] = [
  {
    slug: "ai-governance-software-guide",
    title: "Best AI Governance Software for Small Teams",
    date: "2026-06-20",
    description: "Compare the top AI governance tools for teams that need policy management, tool tracking, and staff attestation in one place. Updated for 2026.",
    keyword: "ai governance software",
    body: [
      { p: "AI governance software helps organisations track which AI tools are approved, keep a live policy in one place, and record that staff have acknowledged the rules. For small teams, the right choice is a platform lightweight enough to deploy in a day rather than a six-month enterprise rollout." },
      { h: "What good AI governance software does", p: "At minimum, you need: a policy builder (so you're not starting from scratch), a tool registry (approve Notion AI, flag Otter.io, block consumer ChatGPT), and an attestation trail (proof that Alice in Finance read the policy on 12 June). Everything else is nice to have." },
      { h: "The problem with generic policy tools", p: "Most document-management and HR platforms can store a policy PDF, but they can't auto-generate one based on your company type and data sensitivity, and they have no concept of an 'AI tool risk profile'. You end up with a document that's approved but not actively managed." },
      { h: "What Greenlightly does differently", p: "Greenlightly is built specifically for AI governance: the policy generator tailors output to your regulatory context (EU AI Act, HIPAA, SOC 2), the tool directory flags each app's training and data-retention behaviour, and team attestation is a click rather than a manual email chain. See the tool registry to check your current stack." },
      { h: "Making the choice", p: "If you have fewer than 50 staff, a purpose-built tool like Greenlightly costs far less in setup time than a generic platform. If you're past 200 people, check whether your existing GRC platform has an AI module before buying separately. In either case, the goal is to go from zero policy to active governance in days, not quarters." },
    ],
  },
  {
    slug: "ai-compliance-software-guide",
    title: "AI Compliance Software: What to Look For in 2026",
    date: "2026-06-20",
    description: "AI compliance software should handle policy creation, tool vetting, and audit trails. Here's what actually matters when evaluating your options for 2026.",
    keyword: "ai compliance software",
    body: [
      { p: "The market for AI compliance software grew fast across 2025, and most offerings fall into one of two camps: heavy GRC platforms that added an 'AI module', and purpose-built tools that start with AI governance from the ground up. The right fit depends on your current compliance maturity." },
      { h: "The three pillars of real AI compliance", p: "Any credible AI compliance solution must cover: (1) policy management — generating, storing and versioning your AI usage policy; (2) tool risk assessment — evaluating each AI product for training on data, retention, and regulatory fit; and (3) audit trail — an immutable record of who approved what and when. Tools weak on any pillar leave you with gaps a regulator or customer audit will find." },
      { h: "Watch out for document-management wrappers", p: "Some vendors sell a SharePoint folder and a template as 'AI compliance'. Ask vendors directly: can the tool evaluate whether a specific AI tool is GDPR-compliant? Can it enforce an approval workflow when a new AI app is requested? Can it prove attestation without a manual email?" },
      { h: "EU AI Act and HIPAA considerations", p: "If you have EU operations, the AI literacy duty under the EU AI Act (Article 4, applied February 2025) requires documented training. HIPAA-regulated organisations need a business-associate agreement (BAA) with any AI tool that processes protected health information. Your compliance software should surface these obligations automatically based on your profile." },
      { h: "Greenlightly is built for this", p: "Our policy generator, tool directory and team attestation module cover all three pillars for companies from 5 to 500 people. Start with an AI usage policy in minutes, then work through your tool stack." },
    ],
  },
  {
    slug: "ai-data-privacy-guide",
    title: "AI and Data Privacy: What Every Business Must Know",
    date: "2026-06-20",
    description: "AI tools and data privacy are in direct tension. Here's how the major AI tools handle your data, and what your business needs to do to stay safe and compliant.",
    keyword: "ai data privacy",
    body: [
      { p: "Every AI tool you or your team uses either handles your data safely or it doesn't. The gap between a free consumer plan and a business tier is often the whole privacy story. Getting this wrong means confidential data in a training corpus, GDPR exposure, or a customer audit finding you'd rather not face." },
      { h: "How AI tools use your data", p: "Consumer tiers of tools like ChatGPT, Gemini and Claude may use your conversations to improve their models by default. Business tiers (ChatGPT Team, Claude for Work, Gemini for Google Workspace) typically don't train on your data and offer DPA agreements. The difference is a plan upgrade and a policy that points staff to the right tier." },
      { h: "GDPR and AI", p: "If your organisation handles personal data of EU residents and you pass that data to an AI tool, GDPR applies. You need a Data Processing Agreement (DPA) with the AI vendor, a lawful basis for the processing, and records of that processing activity. Many teams do this without realising it every time customer names or emails touch an AI assistant." },
      { h: "HIPAA and AI", p: "US healthcare teams face a harder line: any AI tool that processes protected health information (PHI) must sign a Business Associate Agreement (BAA). OpenAI, Anthropic and Google all offer BAAs on their enterprise plans, but not their consumer ones. Using a non-BAA tier with any PHI is a HIPAA violation." },
      { h: "Practical first steps", p: "Check which AI tools your team actually uses (not just the ones IT approved). Verify which tier each is on. Require business-tier accounts for anything that touches client data, PII or confidential plans. Document that in your AI usage policy. Greenlightly's tool directory shows the data-handling profile of the most popular tools so you don't have to read every privacy policy yourself." },
    ],
  },
  {
    slug: "ai-risk-assessment-guide",
    title: "How to Run an AI Risk Assessment for Your Business",
    date: "2026-06-20",
    description: "An AI risk assessment identifies which AI tools and uses carry the most risk for your business. A practical framework for teams of any size to complete in under a day.",
    keyword: "ai risk assessment",
    body: [
      { p: "An AI risk assessment doesn't need to be a big project. For most small and mid-sized teams it boils down to four questions: what AI tools do we use, what data do they touch, what are the contractual data protections, and what could go wrong if those protections fail?" },
      { h: "Step 1: Inventory your AI tools", p: "You can't assess what you don't know exists. Start by asking every team what AI tools they use: the ones IT bought, the ones individuals pay for themselves, and the ones built into other software (AI features in your CRM, AI writing in Notion, AI summaries in your video-conferencing tool). Shadow AI is often most of the list." },
      { h: "Step 2: Classify by data sensitivity", p: "For each tool, note what data actually flows into it: public information (low risk), internal plans and IP (medium risk), personal data / PII (high risk under GDPR), protected health information (critical under HIPAA), financial or legal data (often regulated). Higher-sensitivity data demands more scrutiny of the tool's terms." },
      { h: "Step 3: Evaluate the tool's safeguards", p: "For each tool handling sensitive data, check: does it train on your inputs? What are its data-retention periods? Does it offer a DPA or BAA? Is SOC 2 or ISO 27001 in scope? Business tiers usually pass these checks; consumer tiers often don't." },
      { h: "Step 4: Document and act", p: "Record what you found in a tool register (approved / conditionally approved / not approved) and update your AI usage policy to reflect the decisions. Then check staff have read the updated policy. Greenlightly's tool directory and policy generator handle steps 3 and 4 without a spreadsheet." },
    ],
  },
  {
    slug: "ai-acceptable-use-policy",
    title: "AI Acceptable Use Policy: What to Include",
    date: "2026-06-20",
    description: "An AI acceptable use policy (AUP) sets out what employees can and cannot do with AI tools at work. Here's the structure that covers the essentials for most teams.",
    keyword: "ai acceptable use policy",
    body: [
      { p: "An AI acceptable use policy (AUP) is a specific form of AI usage policy focused on what employees may and may not do, rather than the vendor or technical details. It's the document your staff actually reads and signs — so clarity matters more than comprehensiveness." },
      { h: "What to always include", p: "A clear data rule ('never enter confidential, personal or client data into a consumer AI tool'), an approved-tools list (or a link to it), a transparency rule (staff must disclose AI-generated content where material), and a reporting mechanism (where to ask about a new tool, where to flag a concern)." },
      { h: "What varies by sector", p: "Legal, medical and financial services teams often need a stricter data rule that prohibits even aggregate or anonymised client data. Education teams need rules around AI-generated student-facing content. If you're EU-based, an AI literacy acknowledgement clause covers the Article 4 duty under the EU AI Act." },
      { h: "Length and tone", p: "The most-used AI policies are one to two pages. Write it in plain English, not legalese. The goal is a document employees read and remember, not a liability shield. Employees who understand the policy by default follow it; employees who skip it because it's dense don't." },
      { h: "Generate one in minutes", p: "Greenlightly's free AI usage policy generator asks you the key questions (company type, data sensitivity, regulatory context) and outputs a ready-to-share policy. It's faster than any template and already structured for AI literacy attestation." },
    ],
  },
  {
    slug: "chatgpt-for-business-policy",
    title: "ChatGPT for Business: Creating a Clear AI Policy",
    date: "2026-06-20",
    description: "Before rolling out ChatGPT for business use, you need a clear policy: which tier to use, what data is off-limits, and how to hold staff to the rules at work.",
    keyword: "chatgpt for business policy",
    body: [
      { p: "ChatGPT is already used by someone on most teams. Whether that's an asset or a liability depends almost entirely on which tier they're using and whether there's a policy explaining the rules. Getting this right takes a few hours, not a compliance project." },
      { h: "The tier question is the most important one", p: "ChatGPT Free and Plus are consumer products. By default, OpenAI may use inputs to improve its models, and you have no data-processing agreement. ChatGPT Team and ChatGPT Enterprise don't train on your data and come with admin controls and a DPA. For any work involving client data, confidential plans or personal data, the business tier is non-negotiable." },
      { h: "What your policy should say about ChatGPT", p: "Specify which tier is approved (e.g., 'ChatGPT Team accounts only, not personal Free or Plus accounts'), what's off limits (client PII, source code, unreleased product plans, legal or financial data), and whether staff need manager approval before using ChatGPT to produce client-facing content." },
      { h: "Disclosure and attribution", p: "Where ChatGPT produces material that goes to customers, regulators or the public, consider requiring a disclosure or editor review step. Some B2B contracts and regulated sectors prohibit sending AI-drafted content without human review. Make the rule explicit rather than leaving it to judgment." },
      { h: "Enforce it with attestation", p: "A policy nobody signed might as well not exist. Greenlightly's attestation module sends the policy to every team member and tracks who has read and accepted it, so you have a record rather than a hope. Set up a policy in minutes and send it for acknowledgement today." },
    ],
  },
  {
    slug: "generative-ai-policy-guide",
    title: "Generative AI Policy: A Starter Guide for Teams",
    date: "2026-06-20",
    description: "A generative AI policy covers ChatGPT, Claude, Gemini and similar tools. Here's what to include, how strict to be, and a free generator that writes it for you.",
    keyword: "generative ai policy",
    body: [
      { p: "A generative AI policy is a specific form of AI usage policy that addresses how employees may use tools that create or transform content: writing assistants, image generators, code completers and audio/video tools. It's distinct from traditional software policies because the risk profile is different: your inputs train models, your outputs may be wrong, and attribution is unclear." },
      { h: "Scope: which tools need to be covered", p: "Obvious candidates: ChatGPT, Claude, Gemini, Copilot, Midjourney, DALL-E, GitHub Copilot, Grammarly Go. Less obvious: AI features inside Canva, Notion, Slack, Zoom and your CRM. Your policy should either name approved tools or set a principle (e.g., 'tools that use your data for model training are not approved for work use without explicit sign-off')." },
      { h: "The three rules most policies need", p: "1. Data: do not enter confidential, personal or client data into a non-approved generative AI tool. 2. Accuracy: treat AI output as a draft; a human with domain knowledge must review before it's finalised or sent. 3. Transparency: disclose AI involvement where required by law, contract or context (e.g., legal filings, regulatory submissions, client reports)." },
      { h: "How strict should you be?", p: "That depends on your sector and data sensitivity. A marketing agency can be permissive with public-facing creative. A law firm handling client documents needs a stricter rule. Most teams land on 'conditional approval': generative AI is encouraged for productivity, but specific guardrails apply to specific data types and output uses." },
      { h: "Get a policy in minutes", p: "Greenlightly's free policy generator asks about your sector, data types and regulatory context, and outputs a generative AI policy you can edit and send for team attestation. Start here." },
    ],
  },
  {
    slug: "ai-tool-security-checklist",
    title: "AI Tool Security: What to Check Before Approval",
    date: "2026-06-20",
    description: "Every AI tool that touches your company's data is a potential security risk. Here's the checklist your IT or ops team should use before approving any new AI tool.",
    keyword: "ai tool security",
    body: [
      { p: "Approving a new AI tool takes five minutes if you're just clicking 'OK'. Doing it properly takes closer to 30, but it avoids the kind of discovery that shows up in an audit or a breach. Here's what to check before you say yes." },
      { h: "1. Training and data use", p: "Does the tool train on your inputs? Check the terms of service or privacy policy for the specific tier you're evaluating, not the default consumer terms. Most enterprise and business tiers exclude your data from training; most consumer tiers don't (or do so only if you opt out, which most users never do)." },
      { h: "2. Data retention", p: "How long does the vendor keep your conversations or uploaded data? Standard retention periods range from 0 to 90 days on business tiers. Longer retention means more exposure if the vendor is breached." },
      { h: "3. Compliance certifications", p: "SOC 2 Type II is the baseline for B2B SaaS. ISO 27001 is stronger. For EU data, look for a Data Processing Agreement (DPA) and check whether the vendor is on the EU's Standard Contractual Clauses (SCCs) pathway. For health data, a BAA is required before any PHI touches the tool." },
      { h: "4. Access controls", p: "Does the business tier support SSO, role-based permissions and admin controls? If individuals can create accounts outside the business workspace, shadow AI is still a risk even after you 'approved' the tool at the org level." },
      { h: "5. Incident response", p: "What is the vendor's breach notification obligation and timeline? Under GDPR you have 72 hours. A vendor that can't tell you their own notification SLA is a red flag. Greenlightly's tool directory has pre-checked these points for the most common AI tools so you don't have to research each one from scratch." },
    ],
  },
  {
    slug: "ai-policy-for-startups",
    title: "AI Policy for Startups: A No-Jargon Starter Guide",
    date: "2026-06-20",
    description: "Startups move fast, but skipping an AI policy creates hidden risk. A lightweight framework that covers the essentials without slowing down a lean team at any stage.",
    keyword: "ai policy for startups",
    body: [
      { p: "Most startups adopt AI tools fast, write the policy never, and discover the risk when a customer asks a security questionnaire question or a regulator comes knocking. The good news: for a seed or Series A company, a credible AI policy takes less time to write than it takes to argue about whether you need one." },
      { h: "What 'enough' looks like for an early-stage company", p: "A one-page policy that says: which AI tools are approved and at what tier, what data employees must not put into those tools, that any AI-generated content going to customers needs a human review, and who owns AI governance questions. That's it. Save the comprehensive AI risk register for when you're past 50 people." },
      { h: "The real risk at the startup stage", p: "It's shadow AI. Your engineers will use GitHub Copilot (probably fine on the paid tier), your marketing person will run campaigns through Claude (probably fine on the Pro tier), and someone in finance will paste a spreadsheet into the free version of Gemini (potentially not fine). One line in your policy about approved tiers prevents most of that." },
      { h: "When customers ask", p: "B2B customers increasingly include AI governance questions in security reviews and vendor questionnaires. A written policy is your answer. Without one, the honest reply is 'we don't have one', which loses deals with security-conscious buyers." },
      { h: "Generate one now", p: "Greenlightly's free policy generator builds a startup-appropriate AI policy from your answers in about two minutes. After you generate it, send it to your team for acknowledgement so you have a record." },
    ],
  },
  {
    slug: "hipaa-ai-compliance-guide",
    title: "HIPAA AI Compliance: What Healthcare Teams Must Do",
    date: "2026-06-20",
    description: "Using AI tools in a healthcare setting triggers HIPAA requirements. Here's what that means for your AI usage policy, vendor vetting, and compliance documentation.",
    keyword: "hipaa ai compliance",
    body: [
      { p: "HIPAA doesn't mention AI by name, but its rules apply fully to any software that creates, receives, maintains or transmits protected health information (PHI). If an AI tool touches PHI — even indirectly — HIPAA's safeguard and BAA requirements apply." },
      { h: "The BAA requirement", p: "Any AI vendor that processes PHI on behalf of your organisation is a Business Associate. Under HIPAA, you must have a signed Business Associate Agreement (BAA) with them before any PHI flows into their system. Without a BAA, using the tool with PHI is a HIPAA violation regardless of whether a breach occurs." },
      { h: "Which AI tools offer a BAA?", p: "OpenAI (ChatGPT Enterprise), Anthropic (Claude for Enterprise, on request), Google (Vertex AI Gemini, Workspace Enterprise) and Microsoft (Azure OpenAI, Microsoft 365 Copilot E5) all offer BAAs on their enterprise tiers. Consumer and standard business tiers do not cover PHI. Verify the specific product and tier before use." },
      { h: "Your AI usage policy must address PHI explicitly", p: "A generic AI usage policy is not enough for healthcare settings. Your policy should explicitly state: PHI must not enter any AI tool without a signed BAA; approved AI tools for clinical use must be listed by name and tier; any AI-assisted clinical documentation must be reviewed by a licensed clinician before entering the record." },
      { h: "Documenting compliance", p: "HIPAA enforcement looks at whether you made a good-faith effort to comply. That means written policies, staff training records, BAAs on file and a process for evaluating new AI tools before deployment. Greenlightly's AI usage policy generator has a HIPAA-aware mode that adds the right clauses automatically." },
    ],
  },
  {
    slug: "gdpr-ai-tools-guide",
    title: "GDPR and AI Tools: What EU Teams Must Know",
    date: "2026-06-20",
    description: "AI tools that process personal data of EU residents must comply with GDPR. A practical checklist for teams already managing GDPR who are now adding AI to the mix.",
    keyword: "gdpr ai tools",
    body: [
      { p: "GDPR and AI tools interact in at least three ways: your prompts may include personal data, the AI vendor processes that data on your behalf, and AI-generated output about individuals carries its own obligations. Teams already managing GDPR need to extend their compliance to cover these new flows." },
      { h: "Data Processing Agreements (DPAs)", p: "If you pass personal data to an AI tool (even in a prompt), the AI vendor is processing data on your behalf and must sign a DPA. Major AI vendors offer DPAs on business tiers: OpenAI, Anthropic, Google and Microsoft all have them. Consumer tiers typically don't include a DPA, which is why they're unsuitable for work involving EU personal data." },
      { h: "Lawful basis for AI processing", p: "Processing personal data through AI tools needs a lawful basis under GDPR Article 6. Legitimate interests is the most common basis for internal uses (productivity, analysis). Consent is impractical at scale. Whatever basis you use, document it in your Records of Processing Activities (RoPA)." },
      { h: "Data subject rights", p: "If personal data enters an AI tool that retains conversations, a data subject access request (DSAR) or erasure request could require you to retrieve or delete that data from the AI vendor's systems. Check your vendor's data retention policy and whether their enterprise tier supports deletion on request." },
      { h: "The EU AI Act layer", p: "The EU AI Act adds AI-literacy obligations on top of GDPR. Since February 2025, organisations must ensure staff using AI tools have a sufficient level of AI literacy and must be transparent when AI generates content shown to users. Your AI usage policy should address both. Greenlightly's policy generator covers GDPR and EU AI Act requirements together." },
    ],
  },
  {
    slug: "employee-ai-training-requirements",
    title: "Employee AI Training: Meeting the EU AI Act's Duty",
    date: "2026-06-20",
    description: "The EU AI Act requires AI literacy for all staff using AI tools. Here's what that obligation means in practice and how to document it without a full training program.",
    keyword: "employee ai training requirements",
    body: [
      { p: "The EU AI Act's AI-literacy obligation (Article 4) came into force in February 2025. It requires organisations to ensure that staff who use AI tools have a 'sufficient level of AI literacy' — enough to understand what AI does, what its limits are, and when to apply human judgment." },
      { h: "What 'sufficient' means in practice", p: "There's no prescribed curriculum. The standard the regulators are aiming at is: employees should understand that AI output can be wrong and must be reviewed, that certain data should not be shared with AI tools, and that there are rules for disclosing AI-generated content. A short written briefing plus a policy acknowledgement covers the intent of the law for most employees." },
      { h: "How to document it", p: "You need a record of who received the literacy training and when. The simplest form: send your AI usage policy (which includes the key literacy points) to every relevant employee and track acknowledgement. That gives you a timestamped, signed record for each person. Greenlightly's attestation module does this automatically." },
      { h: "Who is 'relevant staff'?", p: "Article 4 covers all natural persons deploying AI systems within your organisation. In practice: anyone who uses an AI tool as part of their role. That is now almost everyone. Err on the side of including rather than excluding." },
      { h: "Annual refresh is best practice", p: "AI tools and regulations change. An annual re-attestation cycle ensures your records stay current and that staff who joined after the initial rollout are covered. Set a calendar reminder or use Greenlightly's attestation re-send feature to close the gap." },
    ],
  },
  {
    slug: "ai-governance-framework-guide",
    title: "AI Governance Framework: Build One That Lasts",
    date: "2026-06-20",
    description: "An AI governance framework gives your organisation a repeatable way to approve AI tools, manage policy, and stay compliant as the landscape shifts. Here's how to build one.",
    keyword: "ai governance framework",
    body: [
      { p: "An AI governance framework is the structured approach your organisation uses to make decisions about AI: which tools to approve, what rules apply to their use, who is accountable, and how compliance is demonstrated. It's the difference between ad hoc AI adoption and AI adoption you can defend to a customer, regulator or board." },
      { h: "The four components of a working framework", p: "1. Policy: your AI usage policy, version-controlled and distributed. 2. Registry: a live list of approved AI tools with their risk rating and approved use cases. 3. Process: how new AI tools are requested, evaluated and approved or rejected. 4. Attestation: proof that staff have acknowledged the policy, refreshed at least annually." },
      { h: "Governance without bureaucracy", p: "For companies under 100 people, the entire framework can live in a single document and a simple tool. Over-engineering it (multiple committees, quarterly policy reviews, 40-page risk matrices) guarantees the framework is ignored in favour of just getting work done. Keep it lightweight and sustainable." },
      { h: "Who owns it?", p: "Name a single owner: typically the COO, Head of IT, or a designated Privacy/Compliance Lead. Without a named owner, the framework becomes everyone's problem and no one's responsibility. The owner approves new tools, updates the policy and handles employee questions." },
      { h: "Greenlightly as your framework backbone", p: "Rather than building the four components from scratch, Greenlightly gives you a policy generator (component 1), an AI tool directory (component 2), an approval workflow for new tools (component 3), and attestation tracking (component 4). Operational in a day, not a quarter." },
    ],
  },
];

POSTS.push(...WEEK2_POSTS);

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
