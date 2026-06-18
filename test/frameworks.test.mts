import { FRAMEWORKS, getFramework } from "../lib/frameworks.ts";
import { eq, ok, done } from "./_assert.mts";

ok(FRAMEWORKS.length >= 4, `has 4+ frameworks (has ${FRAMEWORKS.length})`);

const slugs = new Set(FRAMEWORKS.map((f) => f.slug));
eq(slugs.size, FRAMEWORKS.length, "framework slugs unique");

for (const f of FRAMEWORKS) {
  ok(!!f.name && !!f.fullName && !!f.authority, `${f.slug}: has identity fields`);
  ok(f.sourceUrl.startsWith("https://"), `${f.slug}: official source is https`);
  ok(f.keyPoints.length >= 2, `${f.slug}: has key points`);
  ok(f.faqs.length >= 2, `${f.slug}: has FAQs`);
  ok(!!f.forSmb && !!f.policyTieIn, `${f.slug}: has SMB guidance + policy tie-in`);
  ok(/^\d{4}-\d{2}-\d{2}$/.test(f.reviewed), `${f.slug}: reviewed date is ISO`);
}

// Expected slugs present.
for (const s of ["eu-ai-act", "nist-ai-rmf", "iso-42001", "soc-2"]) ok(!!getFramework(s), `framework ${s} present`);
eq(getFramework("nope"), undefined, "getFramework unknown → undefined");

done("frameworks");
