import Link from "next/link";
import { Section } from "@/components/ui";

export default function NotFound() {
  return (
    <Section className="py-24 text-center">
      <p className="text-sm font-semibold text-brand-600">404</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">Page not found</h1>
      <p className="mt-2 text-slate-600">That page doesn&apos;t exist. Try one of these:</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm font-semibold">
        <Link href="/" className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:border-slate-400">Home</Link>
        <Link href="/ai-usage-policy-generator" className="rounded-lg bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">Policy generator</Link>
        <Link href="/tools" className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:border-slate-400">Tool directory</Link>
      </div>
    </Section>
  );
}
