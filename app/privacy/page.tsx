import type { Metadata } from "next";
import { getLegalDoc } from "@/lib/legal";
import { LegalDoc } from "@/components/LegalDoc";
import { pageMeta } from "@/lib/seo";

const doc = getLegalDoc("privacy")!;
export const metadata: Metadata = pageMeta({ title: doc.title, description: doc.intro, path: "/privacy" });
export default function Page() { return <LegalDoc doc={doc} />; }
