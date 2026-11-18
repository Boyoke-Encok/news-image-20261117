import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The entry is a single pre-rendered image: copy it to the output dir.
// Deterministic by construction — the same bytes every run.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const repoRoot = dirname(fileURLToPath(import.meta.url));

const src = join(repoRoot, "entry.png");
const dst = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);

// Verify the copy is complete: the output must be byte-for-byte the source,
// so a truncated or failed copy is caught here instead of reaching the judge.
const srcBytes = statSync(src).size;
const dstBytes = statSync(dst).size;
if (dstBytes !== srcBytes) {
  console.error(`ERROR: copied ${dstBytes} bytes, expected ${srcBytes} (source ${src})`);
  process.exit(1);
}
console.log(`Wrote ${dst} (${dstBytes} bytes)`);
