import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getUser } from "@/lib/supabase/server";
import { ensureOrg } from "@/lib/workspace";
import { SetupPending } from "@/components/SetupPending";
import { Section } from "@/components/ui";

export const metadata: Metadata = { title: "Dashboard", robots: { index: false } };

const TABS = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/tools", label: "Tool register" },
  { href: "/dashboard/policy", label: "Policy" },
  { href: "/dashboard/attestations", label: "Attestations" },
  { href: "/dashboard/billing", label: "Billing" },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured()) return <SetupPending what="The dashboard" />;
  const user = await getUser();
  if (!user) redirect("/login");
  const org = await ensureOrg();

  return (
    <Section className="py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{org?.name ?? "Workspace"}</h1>
          <p className="text-sm text-slate-500">{user.email} · {org?.plan ?? "free"} plan</p>
        </div>
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
