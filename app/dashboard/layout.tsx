import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isDbConfigured, getSession } from "@/lib/auth";
import { ensureOrg } from "@/lib/workspace";
import { SetupPending } from "@/components/SetupPending";
import { Section } from "@/components/ui";
import { Pill } from "@/components/ui";
import { logoutAction } from "../auth-actions";

export const metadata: Metadata = { title: "Dashboard", robots: { index: false } };

const TABS = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/tools", label: "Tool register" },
  { href: "/dashboard/policy", label: "Policy" },
  { href: "/dashboard/attestations", label: "Attestations" },
  { href: "/dashboard/billing", label: "Billing" },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  if (!isDbConfigured()) return <SetupPending what="The dashboard" />;
  const user = await getSession();
  if (!user) redirect("/login");
  const org = await ensureOrg();

  return (
    <Section className="py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">{org?.name ?? "Workspace"}</h1>
            <Pill tone={org?.plan && org.plan !== "free" ? "brand" : "slate"}>{org?.plan ?? "free"} plan</Pill>
          </div>
          <p className="text-sm text-slate-500">{user.email}</p>
        </div>
        <form action={logoutAction}>
          <button type="submit" className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-600 hover:border-slate-400">Log out</button>
        </form>
      </div>
      <nav className="mt-5 flex flex-wrap gap-1 border-b border-slate-200">
        {TABS.map((t) => (
          <Link key={t.href} href={t.href} className="rounded-t-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900">{t.label}</Link>
        ))}
      </nav>
      <div className="py-6">{children}</div>
    </Section>
  );
}
