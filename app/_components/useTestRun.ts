"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { runSteps } from "@/lib/test-run";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Drives the hero test runner. `passed` starts at `total` so the server
 * render (and visitors without JavaScript) show every test passed; on mount
 * it resets to 0 and counts up, unless the visitor prefers reduced motion.
 *
 * `runCount` goes up each time an animated run starts, so the component can
 * tell a finished run apart from the initial all-passed state.
 */
export function useTestRun(total: number) {
  const [passed, setPassed] = useState(total);
  const [runCount, setRunCount] = useState(0);
  const cancelRef = useRef<(() => void) | null>(null);

  const run = useCallback(() => {
    cancelRef.current?.();
    cancelRef.current = null;

    if (prefersReducedMotion()) {
      setPassed(total);
      return;
    }

    setPassed(0);
    setRunCount((n) => n + 1);
    cancelRef.current = runSteps(total, setPassed);
  }, [total]);

  useEffect(() => {
    // Start on the next frame rather than synchronously in the effect, so
    // the reset to 0 isn't a cascading render during hydration.
    const frame = requestAnimationFrame(run);
    return () => {
      cancelAnimationFrame(frame);
      cancelRef.current?.();
      cancelRef.current = null;
    };
  }, [run]);

  return { passed, total, done: passed >= total, runCount, run };
}
