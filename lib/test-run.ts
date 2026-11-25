/** Time between one test passing and the next, in milliseconds. */
export const STEP_MS = 420;

/**
 * Counts up from 1 to `total`, calling `onStep` once per step, `stepMs`
 * apart. The first call happens after one step, not immediately.
 *
 * Returns a cancel function that stops any steps still to come. Calling it
 * after the run has finished is harmless.
 */
export function runSteps(
  total: number,
  onStep: (passed: number) => void,
  stepMs: number = STEP_MS,
): () => void {
  let passed = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const tick = () => {
    passed += 1;
    onStep(passed);
    timer = passed < total ? setTimeout(tick, stepMs) : undefined;
  };

  if (total > 0) timer = setTimeout(tick, stepMs);

  return () => {
    if (timer !== undefined) clearTimeout(timer);
    timer = undefined;
  };
}
