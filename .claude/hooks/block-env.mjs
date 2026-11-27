// PreToolUse hook: blocks any tool call that targets a .env file, so secrets
// never enter Claude's context. Exit 2 blocks the call; stderr goes to Claude.
import { readFileSync } from "node:fs";
import path from "node:path";

const ENV_BASENAME = /^\.env(\..+)?$/; // .env, .env.local, .env.production…
// A ".env" token at a word or path boundary: catches "cat .env", "./.env.local",
// "**/.env*", but not "process.env" or "next-env.d.ts".
const ENV_TOKEN = /(^|[\s/"'=<>|;&(`:,{])\.env(?![\w-])/;

let input;
try {
  input = JSON.parse(readFileSync(0, "utf8"));
} catch {
  process.exit(0); // Not our business if the payload is unreadable.
}

const tool = input.tool_name ?? "";
const ti = input.tool_input ?? {};

const candidates = [ti.file_path, ti.path, ti.notebook_path, ti.glob, ti.command];
// Grep's `pattern` is a content regex, not a path; Glob's `pattern` is a path.
if (tool === "Glob") candidates.push(ti.pattern);

const hit = candidates
  .filter((v) => typeof v === "string" && v.length > 0)
  .some((v) => ENV_BASENAME.test(path.basename(v)) || ENV_TOKEN.test(v));

if (hit) {
  process.stderr.write(
    "Blocked: .env files are off-limits so secrets never enter Claude's context.\n",
  );
  process.exit(2);
}
process.exit(0);
