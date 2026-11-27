---
name: check
description: Run lint, unit tests, e2e tests and the build, then report a short pass/fail summary.
disable-model-invocation: true
allowed-tools: Bash(npm run lint) Bash(npm test) Bash(npm run test:e2e) Bash(npm run build)
---

Run these four commands from the project root, in this order, one at a time:

1. `npm run lint`
2. `npm test`
3. `npm run test:e2e`
4. `npm run build`

Rules:

- Run every step, even if an earlier one fails.
- Don't fix anything or edit any file. This command only reports.
- Use a timeout of at least 5 minutes for the e2e and build steps.

Then reply with only this summary:

| Step | Result | Notes |
|---|---|---|
| Lint | ✅ / ❌ | one line |
| Unit tests | ✅ / ❌ | e.g. "38 passed" |
| E2E tests | ✅ / ❌ | e.g. "9 passed" |
| Build | ✅ / ❌ | one line |

**Overall: PASS** or **Overall: FAIL**

For each failure, add the first few relevant error lines below the table (file, line, message), not the full log.
