import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The entry is a single pre-rendered image: copy it to the output dir.
// Deterministic by construction — the same bytes every run.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const repoRoot = dirname(fileURLToPath(import.meta.url));

mkdirSync(outDir, { recursive: true });
copyFileSync(join(repoRoot, "entry.png"), join(outDir, "entry.png"));
