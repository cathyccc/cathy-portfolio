# Cathy Chan – Portfolio

My personal portfolio: a single page showing projects I've built and the bugs I caught in them. I'm a developer who tests, so the site is tested the same way I'd test client work.

The hero has a small animated "test runner": a code-editor panel that runs `describe('Cathy Chan')` and ticks off six tests one by one.

## Tech stack

- **Next.js 16** (App Router) with **React 19** and **TypeScript**
- **Tailwind CSS 4**, with colours, fonts and radii defined as design tokens in `app/globals.css`
- **Vitest**, **React Testing Library** and **jsdom** for unit and component tests
- **Playwright** for end-to-end tests in a real browser
- **GitHub Actions** for CI

The page is statically rendered. There is no backend, database or environment variables.

## Project structure

```
app/
  page.tsx              Home page (assembles the sections)
  _components/          Header, Hero, Work, About, Contact, Footer, TestRunner…
  globals.css           Design tokens and shared utilities
content/
  site.ts               All text and links on the site
lib/
  test-run.ts           Timing logic for the test runner
e2e/                    Playwright tests
.github/workflows/      CI
```

All copy lives in `content/site.ts`, so text changes don't touch components. Links are handled in one place (`SmartLink`): external links open in a new tab with `rel="noopener noreferrer"`, and in-page anchors don't.

## How the test runner works

It's split into three layers, so the logic can be tested without a browser.

**1. A plain timing function: `lib/test-run.ts`**

`runSteps(total, onStep)` calls `onStep(1)`, `onStep(2)` … `onStep(total)`, one every `STEP_MS` (420ms). It returns a `cancel` function. It's plain TypeScript with no React, so it can be tested with a fake clock.

**2. A hook: `app/_components/useTestRun.ts`**

`useTestRun(total)` holds the "passed" count and exposes a `run()` function:

- `run()` cancels any run in progress before starting a new one. That's why clicking **Run tests** repeatedly never makes it count double-speed.
- If the visitor has *reduce motion* turned on, all tests show as passed immediately and no timer starts.
- Timers are cleared when the component unmounts.
- The server-rendered HTML shows all six tests passed. Visitors without JavaScript therefore see a finished run rather than tests stuck on "pending". The animation starts once the page is interactive.

**3. The component: `app/_components/TestRunner.tsx`**

The component only renders what the hook gives it: the editor chrome, the six tests (✓ passed / ○ pending), the summary line and the **Run tests** button.

Accessibility details:

- Each row has a hidden "passed" or "pending" word, so the meaning isn't carried by the icon alone.
- Screen readers hear one announcement when a run finishes (an `aria-live` region), not one per tick.
- Both status texts ("Running…" and "Ready to join your team.") always take up space, so the panel's height never changes during a run.

## How it's tested

### Unit and component tests (Vitest)

- `lib/test-run.test.ts` covers the timing function with a fake clock:
  - it counts one per step and stops at the total
  - `cancel()` stops it
  - it restarts cleanly
  - timings are written in terms of `STEP_MS`, so changing the speed doesn't break the tests
- `app/_components/TestRunner.test.tsx` renders the real component in jsdom and checks:
  - tests pass one at a time, in order
  - the count and status text are correct at every step
  - the screen-reader announcement happens once, at the end
  - **Run tests** restarts from zero
  - rapid clicks don't double the count
  - reduce motion shows everything passed with no timers
  - timers are cleaned up on unmount

**Checking the tests can fail.** I broke the code on purpose to confirm the right test fails each time:

| Deliberate bug | Test that caught it |
|---|---|
| Removed the line that cancels the previous run | Rapid-click test |
| Made the hook ignore reduce motion | Reduced-motion test |
| Changed a nav link to a missing anchor (`#abuot`) | Link checker |

These were manual checks, not an automated mutation-testing tool.

### End-to-end tests (Playwright)

These run against the production build (`next build` + `next start`):

- `e2e/home.spec.ts` checks that:
  - the page loads with all four work cards
  - the test runner counts from 0 to "6 passed"
  - each work card links to the right URL and opens safely in a new tab
  - the header links jump to their sections
  - there's no horizontal scroll at 390px, before, during and after a run
- `e2e/links.spec.ts` is a link checker. It starts on the home page and follows every internal link. For each link:
  - internal pages must return 200
  - `#anchor` links must point to an element that exists
  - `mailto:` links must be valid

  External links are checked to be well-formed `https` URLs but aren't requested. Sites like LinkedIn block automated requests, which would make CI fail for reasons unrelated to this code.

### CI

`.github/workflows/tests.yml` runs on every push and pull request, as two parallel jobs:

1. Lint and Vitest
2. Playwright (the HTML report is uploaded if it fails)

## How I built this

I built this site with Claude Code. I designed the site, gave Claude Code a brief for each step, then reviewed every plan and change before approving it. I tested the results myself in the browser and DevTools. Things I caught along the way include a layout shift when the test run finished, tests with hard-coded timings, and duplicate links.

## How I direct Claude Code

I keep the rules I give Claude Code in the repo, so they apply to every session:

- [`CLAUDE.md`](CLAUDE.md) holds the project instructions: the stack, the rule that copy in `content/site.ts` never changes without my approval, tests for every behaviour change, the accessibility rules I follow, and how I commit.
- [`/check`](.claude/skills/check/SKILL.md) runs lint, unit tests, end-to-end tests and the build, then gives me a short pass/fail summary. CLAUDE.md requires it to pass before any commit.
- [Hooks](.claude/settings.json) enforce two things automatically: Claude can't read or edit `.env` files ([`block-env.mjs`](.claude/hooks/block-env.mjs)), and every file it edits is linted straight away ([`lint-edited.mjs`](.claude/hooks/lint-edited.mjs)). The `.env` hook is a guardrail, not a security boundary, so a permission deny rule in the same file backs it up.

## Running it locally

Requires Node.js 20.9 or later (CI uses Node 24).

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run lint       # ESLint
npm test           # Vitest unit and component tests
npm run test:e2e   # Playwright (builds and starts the site on port 3100)
npm run build      # Production build
```

Locally, the Playwright tests run in your installed **Google Chrome**, so no extra browser download is needed. That's because Playwright's bundled Chromium doesn't support older macOS versions such as macOS 13. CI installs and uses the bundled Chromium on Linux.
