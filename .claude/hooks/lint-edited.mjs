// PostToolUse hook: runs ESLint on the file Claude just edited. On failure it
// exits 2 so the errors are shown to Claude (the edit itself has already run).
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";

const LINTABLE = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);

let input;
try {
  input = JSON.parse(readFileSync(0, "utf8"));
} catch {
  process.exit(0);
}

const file = input.tool_input?.file_path;
const root = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd();

if (typeof file !== "string" || !LINTABLE.has(path.extname(file))) process.exit(0);
const rel = path.relative(root, file);
if (rel.startsWith("..") || path.isAbsolute(rel)) process.exit(0);

const eslint = path.join(root, "node_modules", ".bin", "eslint");
const result = spawnSync(eslint, ["--no-warn-ignored", rel], {
  cwd: root,
  encoding: "utf8",
});

if (result.error) {
  process.stderr.write(`lint hook: could not run ESLint (${result.error.message})\n`);
  process.exit(0); // Don't punish Claude for a missing install.
}
if (result.status !== 0) {
  process.stderr.write(`ESLint found problems in ${rel}:\n${result.stdout}${result.stderr}`);
  process.exit(2);
}
process.exit(0);
