import Link from "next/link";
import { Section, btn } from "@/components/ui";

export default function NotFound() {
  return (
    <Section className="py-28 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">404</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink">Page not found</h1>
      <p className="mt-3 text-ink-soft">That page does not exist. Try one of these instead.</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link href="/" className={btn("secondary")}>Home</Link>
        <Link href="/ai-usage-policy-generator" className={btn("primary")}>Policy generator</Link>
        <Link href="/tools" className={btn("secondary")}>Tool directory</Link>
      </div>
    </Section>
  );
}
