import type { Metadata } from "next";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { AttestForm } from "@/components/AttestForm";
import { SetupPending } from "@/components/SetupPending";
import { Section } from "@/components/ui";

export const metadata: Metadata = { title: "Acknowledge AI policy", robots: { index: false } };

export default async function Page({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!isSupabaseConfigured()) return <SetupPending what="Attestations" />;
  return (
    <Section className="max-w-2xl py-14">
      <AttestForm token={token} />
    </Section>
  );
}
