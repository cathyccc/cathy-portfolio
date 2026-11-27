# Project instructions

@AGENTS.md

## What this is

Cathy Chan's single-page portfolio. Next.js 16 (App Router), React 19, TypeScript,
Tailwind CSS 4 (tokens in `app/globals.css`). Statically rendered, no backend.
Tests: Vitest + React Testing Library (jsdom) for logic and components, Playwright
for user flows against the production build. CI: `.github/workflows/tests.yml`.

## Copy

- All site text and links live in `content/site.ts`. Components only read from it.
- Never write, rewrite or "tidy" copy without my approval. Propose wording and wait.
  This includes headings, alt text, aria labels and button text.

## Tests

- Every behaviour change needs tests: Vitest for logic and components, Playwright
  for user flows.
- Write timings in terms of constants (e.g. `STEP_MS`), not hard-coded numbers.
- After a fix, show that the test fails without it.

## Before committing

Run `/check` (or `npm run lint`, `npm test`, `npm run test:e2e`, `npm run build`).
All four must pass. Don't commit if any of them fails.

## Accessibility

- Use real `<button>` for actions and `<a>`/`SmartLink` for navigation. No clickable divs.
- Everything is keyboard reachable with a visible focus style. Don't remove outlines.
- Respect `prefers-reduced-motion`: no animation or timers when it's set.
- Use `aria-live` only for final results (e.g. a finished run), never per tick.
- Don't rely on icon or colour alone to carry meaning.

## Git

- Commit directly to `main`. No feature branches (solo project).
- Only commit when I ask. Never push.

## Guardrails (enforced by `.claude/settings.json`)

- `.env` files are blocked from reads and edits. Don't try to work around it.
- ESLint runs on each file you edit. Fix what it reports before moving on.
