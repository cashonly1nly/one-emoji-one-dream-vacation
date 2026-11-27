import { mkdirSync, writeFileSync, chmodSync, readFileSync } from "node:fs";
import { join } from "node:path";

// one-emoji-one-dream-vacation — one emoji, one dream vacation.
// Entry: 🗻 Mount Fuji.
// Why this emoji: a snow-capped peak is the whole trip in one glyph — a
// faraway place (the judge brief names a mountain outright), a postcard a
// stranger reads at a glance, and one particular dream (Japan, Fuji) rather
// than any generic holiday. It is a fresh pick beside the flood of beach
// and plane emojis, yet it reads instantly on any screen in any culture.
// Deterministic: the same single emoji every run, no randomness, no
// network, no reading anything outside this repository.
const ENTRY_EMOJI = "🗻";

// Guard: the entry must be exactly one emoji — one character, no
// whitespace, no newline — so the gate (1 to 8 characters, not only
// whitespace) sees exactly the emoji and the judge reads exactly the
// emoji, with no trailing bytes to dilute it or bloat its size.
if ([...ENTRY_EMOJI].length !== 1 || ENTRY_EMOJI !== ENTRY_EMOJI.trim()) {
  throw new Error("entry must be exactly one emoji");
}

const outDir = process.argv[2] ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY_EMOJI, "utf8");
chmodSync(outPath, 0o644);

// Read-back verification: the file on disk must hold exactly the one
// emoji, byte for byte, before we report success. A silent truncation
// or stray byte must fail loudly here.
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY_EMOJI) {
  throw new Error("entry.txt read-back mismatch: file content is not the entry emoji");
}

console.log(ENTRY_EMOJI);
