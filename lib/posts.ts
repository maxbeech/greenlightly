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
      { p: "AI governance is simply how an organisation sets and enforces rules for using AI safely and legally. It sounds like something only big, regulated companies do — but the moment anyone on your team pastes work into ChatGPT, you have AI risk, and governance is how you manage it." },
      { h: "The three things that cover most of it", p: "You don't need a department. For most small and mid-sized teams, AI governance comes down to three artefacts: (1) an AI usage policy that says what's allowed and what isn't; (2) a register of which AI tools are approved and for what data; and (3) a record that staff have read and acknowledged the policy." },
      { h: "Why it matters now", p: "Three forces converged in 2025–2026: AI tools became ubiquitous at work, regulators acted (the EU AI Act's AI-literacy duty applied from February 2025), and enterprise buyers started asking about AI in SOC 2 and security reviews. Not having a policy is now something customers and auditors notice." },
      { h: "Shadow AI is the real risk", p: "The biggest day-one risk isn't a rogue model — it's 'shadow AI': employees quietly using unapproved tools on personal accounts that may train on or retain your confidential data. A clear policy plus an approved-tools list is the cheapest way to pull that into the light." },
      { h: "Where to start", p: "Generate an AI usage policy (it takes minutes), check your most-used AI tools in a risk directory so you know which to approve, and circulate the policy for everyone to acknowledge. That alone puts you ahead of most companies your size." },
    ],
  },
  {
    slug: "what-is-shadow-ai",
    title: "What Is Shadow AI — and How Do You Get It Under Control?",
    date: "2026-06-18",
    description: "Shadow AI is employees using unapproved AI tools at work. Here's why it happens, the risk it creates, and how to fix it without banning AI.",
    keyword: "shadow ai",
    body: [
      { p: "Shadow AI is the use of AI tools that your organisation hasn't approved or doesn't even know about — marketing running ChatGPT on personal accounts, support installing an AI browser extension, an engineer pasting code into a free assistant. It's the AI version of 'shadow IT'." },
      { h: "Why it happens", p: "Because AI tools are useful and free, and approval is slow or non-existent. People aren't being reckless — they're trying to do their jobs faster. Banning AI outright just drives it further underground." },
      { h: "The risk", p: "Consumer/free tiers of many AI tools train on your inputs by default and retain data. Confidential plans, customer data and source code entered into them can leak into model training or be exposed in a breach — and you have no record it happened." },
      { h: "How to control it (without a ban)", p: "Give people an approved path. Publish a short AI usage policy, maintain a list of approved tools (with the safe tiers named), and make it easy to request new ones. When the sanctioned route is as easy as the shadow one, shadow AI shrinks." },
      { h: "Know your tools", p: "Start by checking how your most-used AI tools actually handle data — whether they train on it, their retention, and whether they offer a business tier that doesn't. Our AI Tool Risk Directory rates the popular ones from their own policies." },
    ],
  },
  {
    slug: "how-to-write-an-ai-usage-policy",
    title: "How to Write an AI Usage Policy (with a Free Template)",
    date: "2026-06-18",
    description: "A step-by-step guide to writing an AI usage policy for your company — what to include, how strict to be, and a free generator that does it for you.",
    keyword: "ai usage policy template",
    body: [
      { p: "An AI usage policy tells your team how they may and may not use AI tools at work. A good one is short, specific and easy to follow — not a 20-page legal document nobody reads." },
      { h: "1. Define the scope", p: "Say who it applies to (employees, contractors, anyone acting for you) and what counts as an 'AI tool' — standalone assistants, AI features baked into other software, and anything that sends your data to a third-party model." },
      { h: "2. Set your stance", p: "Decide how permissive to be. Most teams land on 'balanced': AI is allowed, with guardrails. Regulated or data-sensitive teams go stricter — only explicitly approved tools and uses." },
      { h: "3. Nail the data rules", p: "This is the heart of the policy. Be explicit about customer data, personal data (PII), secrets and confidential plans. The simplest safe default: never put confidential or personal data into a consumer AI tool, and only use approved tools that don't train on your data for anything sensitive." },
      { h: "4. Add transparency and regulatory clauses", p: "If you have EU users, the EU AI Act expects you to disclose AI interactions and ensure basic AI literacy. If you handle health data, HIPAA needs a BAA. If you sell B2B, SOC 2 auditors expect this policy to exist." },
      { h: "5. Name an owner and generate it", p: "Say who owns the policy and handles questions and breaches. Then don't start from a blank page — our free AI usage policy generator builds all of the above, tailored to your answers, in a couple of minutes." },
    ],
  },
  {
    slug: "eu-ai-act-for-small-business",
    title: "The EU AI Act for Small Businesses: What You Actually Have to Do",
    date: "2026-06-18",
    description: "Does the EU AI Act apply to your small business? The realistic obligations for a small team that just uses AI tools — and what you can ignore.",
    keyword: "eu ai act compliance",
    body: [
      { p: "The EU AI Act is the world's first comprehensive AI law, and the headlines make it sound terrifying. For a small business that simply uses AI tools (rather than building high-risk AI systems), the real obligations are more manageable than they look." },
      { h: "Does it apply to you?", p: "If your business or its output reaches the EU — EU customers, or EU-based staff using AI on your behalf — then yes, it can apply, even if you're based outside the EU." },
      { h: "You're probably a 'deployer', not a 'provider'", p: "The heaviest duties fall on providers of high-risk AI systems. Most small teams are deployers of general tools like ChatGPT, so the practical duties are: don't use banned practices, ensure basic AI literacy among staff, and be transparent (tell people when they're dealing with AI or AI-generated content)." },
      { h: "The AI-literacy duty", p: "Since February 2025, you must ensure staff who use AI have a sufficient level of AI literacy. A written AI usage policy plus a short briefing is the simplest way to evidence this — you have a document and a record people read it." },
      { h: "What to do this quarter", p: "Write an AI usage policy, keep a register of the AI tools you use, and make sure anyone using AI understands the basics. That covers the realistic first steps. See our EU AI Act guide for the detail." },
    ],
  },
  {
    slug: "is-chatgpt-safe-for-work",
    title: "Is ChatGPT Safe to Use at Work? What Your Team Should Know",
    date: "2026-06-18",
    description: "Whether ChatGPT is safe for work depends on which version your team uses. The difference between free, Plus, Team and Enterprise — and the data rules that matter.",
    keyword: "is chatgpt safe for work",
    body: [
      { p: "ChatGPT can be safe for work — but the answer depends entirely on which tier your team uses and what they put into it. The gap between a personal free account and ChatGPT Enterprise is the whole ballgame." },
      { h: "Free and Plus: train on your data by default", p: "On consumer ChatGPT (Free and Plus), OpenAI may use your conversations to improve its models unless you turn that off in data controls. So work data pasted into a personal account can flow into model training — the classic shadow-AI exposure." },
      { h: "Team, Enterprise and the API: don't", p: "OpenAI does not train on data from ChatGPT Team, ChatGPT Enterprise or the API by default, and these tiers add SSO, admin controls and retention settings. For business use with any sensitive data, that's the tier you want." },
      { h: "The practical rule", p: "Approve a business tier, tell staff to use it (not personal accounts) for work, and never enter secrets, customer data or confidential plans into any consumer AI tool. Capture that in your AI usage policy so it's a rule, not a hope." },
      { h: "See the full profile", p: "Our AI Tool Risk Directory has ChatGPT's full data-handling profile — training, retention, SOC 2, GDPR DPA and HIPAA status — sourced from OpenAI's own policies, alongside 20+ other tools." },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
