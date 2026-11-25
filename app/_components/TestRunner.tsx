"use client";

import { site } from "@/content/site";
import { useTestRun } from "./useTestRun";

/** The dark code-editor panel in the hero that "runs" tests about Cathy. */
export function TestRunner() {
  const runner = site.hero.runner;
  const { passed, total, done, runCount, run } = useTestRun(runner.tests.length);

  // Announce only the final result of an animated run, never each tick.
  // With reduced motion (runCount stays 0) nothing is announced on load.
  const announcement =
    done && runCount > 0
      ? `${passed} of ${total} tests passed. ${runner.doneStatus}`
      : "";

  return (
    <div
      data-surface="dark"
      className="min-w-0 flex-[1_1_440px] overflow-hidden rounded-terminal bg-terminal-bg font-mono text-terminal-text shadow-[0_24px_48px_rgba(31,29,26,0.18)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-dark-border px-[18px] py-3.5">
        <div className="flex min-w-0 items-center gap-2">
          <span aria-hidden="true" className="size-[11px] shrink-0 rounded-full bg-terminal-red" />
          <span aria-hidden="true" className="size-[11px] shrink-0 rounded-full bg-highlight" />
          <span aria-hidden="true" className="size-[11px] shrink-0 rounded-full bg-terminal-green" />
          <span className="ml-2.5 text-[13px] text-terminal-grey">
            {runner.fileName}
          </span>
        </div>
        <button
          type="button"
          onClick={run}
          className="min-h-9 shrink-0 cursor-pointer rounded-lg border border-terminal-green px-3.5 font-mono text-[13px] font-medium text-terminal-green transition-colors hover:bg-terminal-green/10"
        >
          <span aria-hidden="true">▶ </span>
          {runner.runLabel}
        </button>
      </div>

      <div className="flex flex-col gap-3 px-[22px] pt-[22px] pb-6 text-sm leading-normal">
        <p className="text-terminal-grey">
          describe(<span className="text-highlight">&apos;{runner.describe}&apos;</span>)
        </p>

        <ul className="flex flex-col gap-3">
          {runner.tests.map((test, i) => {
            const isPassed = i < passed;
            return (
              <li key={test.label} className="flex items-start gap-3 pl-3.5">
                <span
                  aria-hidden="true"
                  className={`w-4 shrink-0 text-center ${
                    isPassed ? "font-bold text-terminal-green" : "text-terminal-pending"
                  }`}
                >
                  {isPassed ? "✓" : "○"}
                </span>
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className={isPassed ? "text-terminal-text" : "text-terminal-pending"}>
                    <span className="sr-only">
                      {isPassed ? runner.passedLabel : runner.pendingLabel}:{" "}
                    </span>
                    {test.label}
                  </span>
                  <span className="text-[12.5px] text-terminal-detail">{test.detail}</span>
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-2 flex flex-col gap-1.5 border-t border-dark-border pt-3.5 text-[13.5px]">
          <span>
            Tests: <span className="font-bold text-terminal-green">{passed} passed</span>,{" "}
            {total} total
          </span>
          {/* Both statuses share one grid cell, so the line is always as
              tall as the longer one and the panel never changes height. */}
          <span className="grid text-terminal-grey">
            <span className={`col-start-1 row-start-1 ${done ? "invisible" : ""}`}>
              {runner.runningStatus}
            </span>
            <span className={`col-start-1 row-start-1 ${done ? "" : "invisible"}`}>
              {runner.doneStatus}
            </span>
          </span>
        </div>

        <p aria-live="polite" className="sr-only">
          {announcement}
        </p>
      </div>
    </div>
  );
}
