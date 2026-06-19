import { readdirSync, readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";
import { ok, done } from "./_assert.mts";

// Guard against AI-writing tells creeping back into user-facing copy. The em
// dash (—) and en dash (–) are the dominant signature we removed; this test
// fails the build if either reappears anywhere except code comments.

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIRS = ["app", "components", "lib"];
const EXTRA = ["data/ai-tools.json"];

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".next") continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (/\.(ts|tsx|json)$/.test(name) && !/\.test\./.test(name)) out.push(full);
  }
  return out;
}

const files = [...DIRS.flatMap((d) => walk(join(root, d))), ...EXTRA.map((f) => join(root, f))];

// A line is a code comment if it begins with //, * or /* (after trimming).
const isComment = (line: string) => /^\s*(\/\/|\*|\/\*)/.test(line);

let scanned = 0;
for (const file of files) {
  scanned++;
  const rel = relative(root, file);
  readFileSync(file, "utf8").split("\n").forEach((line, i) => {
    if (isComment(line)) return;
    ok(!line.includes("—"), `${rel}:${i + 1} contains an em dash (—): ${line.trim().slice(0, 80)}`);
    ok(!line.includes("–"), `${rel}:${i + 1} contains an en dash (–): ${line.trim().slice(0, 80)}`);
  });
}

ok(scanned > 20, `scanned a meaningful number of source files (got ${scanned})`);
done("no-em-dash");
