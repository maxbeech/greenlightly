import type { Metadata } from "next";
import { getLegalDoc } from "@/lib/legal";
import { LegalDoc } from "@/components/LegalDoc";
import { pageMeta } from "@/lib/seo";

const doc = getLegalDoc("security")!;
export const metadata: Metadata = pageMeta({ title: doc.title, description: doc.intro, path: "/security" });
export default function Page() { return <LegalDoc doc={doc} />; }
