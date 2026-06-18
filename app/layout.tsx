import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { SITE, NAV } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { organizationLd } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s · ${SITE.name}` },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: { title: SITE.name, description: SITE.description, url: SITE.url, siteName: SITE.name, type: "website" },
  twitter: { card: "summary_large_image", title: SITE.name, description: SITE.description, creator: SITE.twitter },
};

function Logo() {
  return (
    <span className="flex items-center gap-2 font-extrabold tracking-tight text-slate-900">
      <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-600 text-white shadow-sm">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden><circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2.4" /><path d="M8 12.5l2.5 2.5L16 9" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
      Greenlightly
    </span>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur print:hidden">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" aria-label="Greenlightly home"><Logo /></Link>
        <nav className="flex items-center gap-1 text-sm text-slate-600 sm:gap-2">
          {NAV.map((l) => (
            <Link key={l.href} href={l.href} className="hidden rounded-md px-2.5 py-1.5 hover:bg-slate-100 hover:text-slate-900 md:inline">
              {l.label}
            </Link>
          ))}
          <Link href="/login" className="hidden rounded-md px-2.5 py-1.5 hover:text-slate-900 sm:inline">Log in</Link>
          <Link href="/ai-usage-policy-generator" className="rounded-lg bg-brand-600 px-3.5 py-2 font-semibold text-white shadow-sm transition hover:bg-brand-700">
            Free policy
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 print:hidden">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2 md:col-span-1">
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-slate-500">{SITE.tagline}. {SITE.shortDescription}</p>
        </div>
        <FooterCol title="Product" links={[["AI usage policy generator", "/ai-usage-policy-generator"], ["AI Tool Risk Directory", "/tools"], ["Pricing", "/pricing"], ["Log in", "/login"]]} />
        <FooterCol title="Frameworks" links={[["EU AI Act", "/frameworks/eu-ai-act"], ["NIST AI RMF", "/frameworks/nist-ai-rmf"], ["ISO 42001", "/frameworks/iso-42001"], ["SOC 2", "/frameworks/soc-2"]]} />
        <FooterCol title="Learn" links={[["Blog", "/blog"], ["What is AI governance?", "/blog/what-is-ai-governance"], ["Shadow AI", "/blog/what-is-shadow-ai"], ["About", "/about"]]} />
      </div>
      <div className="mx-auto max-w-6xl px-5 pb-8 text-xs text-slate-400">
        © {new Date().getFullYear()} {SITE.name}. Guidance only — not legal advice. Verify vendor facts against their official policies before relying on them.
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map(([label, href]) => (
          <li key={href}><Link href={href} className="text-slate-500 hover:text-brand-700">{label}</Link></li>
        ))}
      </ul>
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <JsonLd data={organizationLd()} />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
