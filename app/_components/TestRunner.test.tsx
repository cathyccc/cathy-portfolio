// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { site } from "@/content/site";
import { STEP_MS } from "@/lib/test-run";
import { TestRunner } from "./TestRunner";

const runner = site.hero.runner;
const TOTAL = runner.tests.length;

/** Pretend the visitor has (or hasn't) turned on "reduce motion". */
function setReducedMotion(reduce: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => ({
      matches: reduce && query.includes("prefers-reduced-motion: reduce"),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
}

/** Move the fake clock forward and let React re-render. */
function advance(ms: number) {
  act(() => {
    vi.advanceTimersByTime(ms);
  });
}

/** Render the runner and let the mount effect (one animation frame) run. */
function renderRunner() {
  const result = render(<TestRunner />);
  advance(16);
  return result;
}

/** "passed" or "pending" for each test row, in order, read from the
 *  screen-reader word before each label ("passed: …" / "pending: …"). */
function rowStates() {
  return screen
    .getAllByRole("listitem")
    .map((li) =>
      li.textContent!.includes(`${runner.passedLabel}:`) ? "passed" : "pending",
    );
}

/** The summary count line, e.g. "Tests: 3 passed, 6 total". */
function countText() {
  return screen.getByText(/^Tests:/).textContent;
}

/** The status line the visitor can see. Both statuses are always in the
 *  page (so the panel never changes height); the other one is hidden. */
function visibleStatus() {
  const statuses = [runner.runningStatus, runner.doneStatus];
  return statuses.find((s) => !screen.getByText(s).classList.contains("invisible"));
}

function announcement() {
  return document.querySelector("[aria-live]")!.textContent;
}

function clickRun() {
  fireEvent.click(screen.getByRole("button", { name: runner.runLabel }));
}

beforeEach(() => {
  vi.useFakeTimers();
  setReducedMotion(false);
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("TestRunner", () => {
  it("starts with every test pending, then passes them one at a time, in order", () => {
    renderRunner();
    expect(rowStates()).toEqual(Array(TOTAL).fill("pending"));

    for (let passed = 1; passed <= TOTAL; passed++) {
      advance(STEP_MS);
      const expected = [
        ...Array(passed).fill("passed"),
        ...Array(TOTAL - passed).fill("pending"),
      ];
      expect(rowStates()).toEqual(expected);
    }
  });

  it("updates the passed count and status text as it runs", () => {
    renderRunner();
    expect(countText()).toBe(`Tests: 0 passed, ${TOTAL} total`);
    expect(visibleStatus()).toBe(runner.runningStatus);

    advance(STEP_MS * 3);
    expect(countText()).toBe(`Tests: 3 passed, ${TOTAL} total`);
    expect(visibleStatus()).toBe(runner.runningStatus);

    advance(STEP_MS * (TOTAL - 3));
    expect(countText()).toBe(`Tests: ${TOTAL} passed, ${TOTAL} total`);
    expect(visibleStatus()).toBe(runner.doneStatus);
  });

  it("announces the result to screen readers once, only when the run ends", () => {
    renderRunner();

    for (let step = 1; step < TOTAL; step++) {
      advance(STEP_MS);
      expect(announcement()).toBe("");
    }

    advance(STEP_MS);
    expect(announcement()).toBe(
      `${TOTAL} of ${TOTAL} tests passed. ${runner.doneStatus}`,
    );
  });

  it("restarts from zero when Run tests is clicked again", () => {
    renderRunner();
    advance(STEP_MS * TOTAL);
    expect(countText()).toBe(`Tests: ${TOTAL} passed, ${TOTAL} total`);

    clickRun();
    expect(countText()).toBe(`Tests: 0 passed, ${TOTAL} total`);
    expect(rowStates()).toEqual(Array(TOTAL).fill("pending"));
    expect(announcement()).toBe("");

    advance(STEP_MS);
    expect(countText()).toBe(`Tests: 1 passed, ${TOTAL} total`);
  });

  it("doesn't speed up or double the count when Run tests is clicked many times quickly", () => {
    renderRunner();
    advance(STEP_MS * 2);

    // Five clicks, a little apart, all before the next step is due.
    for (let i = 0; i < 5; i++) {
      clickRun();
      advance(STEP_MS / 5);
    }
    // Only the last click's run is still going: one timer, nothing passed
    // yet beyond what the last run has had time for.
    expect(vi.getTimerCount()).toBe(1);
    expect(countText()).toBe(`Tests: 0 passed, ${TOTAL} total`);

    // From here it should count up by exactly one per step, as normal.
    advance(STEP_MS - STEP_MS / 5);
    expect(countText()).toBe(`Tests: 1 passed, ${TOTAL} total`);
    advance(STEP_MS * (TOTAL - 1));
    expect(countText()).toBe(`Tests: ${TOTAL} passed, ${TOTAL} total`);

    // And it stops there: no leftover timers from the earlier clicks.
    advance(STEP_MS * 10);
    expect(countText()).toBe(`Tests: ${TOTAL} passed, ${TOTAL} total`);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("shows every test passed immediately when reduce motion is on", () => {
    setReducedMotion(true);
    renderRunner();

    expect(rowStates()).toEqual(Array(TOTAL).fill("passed"));
    expect(countText()).toBe(`Tests: ${TOTAL} passed, ${TOTAL} total`);
    expect(visibleStatus()).toBe(runner.doneStatus);
    expect(vi.getTimerCount()).toBe(0);

    // Clicking Run tests doesn't animate either.
    clickRun();
    expect(countText()).toBe(`Tests: ${TOTAL} passed, ${TOTAL} total`);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("stops its timers when it is removed from the page", () => {
    const { unmount } = renderRunner();
    advance(STEP_MS * 2);
    expect(vi.getTimerCount()).toBe(1);

    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
