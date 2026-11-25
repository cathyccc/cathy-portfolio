import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { STEP_MS, runSteps } from "./test-run";

describe("runSteps", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("passes nothing before the first step", () => {
    const onStep = vi.fn();
    runSteps(6, onStep);

    vi.advanceTimersByTime(STEP_MS - 1);

    expect(onStep).not.toHaveBeenCalled();
  });

  it("passes one test per step", () => {
    const onStep = vi.fn();
    runSteps(6, onStep);

    vi.advanceTimersByTime(STEP_MS);
    expect(onStep).toHaveBeenLastCalledWith(1);

    vi.advanceTimersByTime(STEP_MS * 2);
    expect(onStep).toHaveBeenLastCalledWith(3);
  });

  it("reaches the total after total steps, then stops", () => {
    const onStep = vi.fn();
    runSteps(6, onStep);

    vi.advanceTimersByTime(STEP_MS * 6);
    expect(onStep.mock.calls.map(([n]) => n)).toEqual([1, 2, 3, 4, 5, 6]);

    vi.advanceTimersByTime(STEP_MS * 10);
    expect(onStep).toHaveBeenCalledTimes(6);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("stops when cancelled mid-run", () => {
    const onStep = vi.fn();
    const cancel = runSteps(6, onStep);

    vi.advanceTimersByTime(STEP_MS * 2);
    cancel();
    vi.advanceTimersByTime(STEP_MS * 10);

    expect(onStep).toHaveBeenCalledTimes(2);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("restarts from 1 when run again after a cancel", () => {
    const first = vi.fn();
    const cancel = runSteps(6, first);
    vi.advanceTimersByTime(STEP_MS * 3);
    cancel();

    const second = vi.fn();
    runSteps(6, second);
    vi.advanceTimersByTime(STEP_MS);

    expect(second).toHaveBeenLastCalledWith(1);
    expect(first).toHaveBeenCalledTimes(3);
  });

  it("does nothing for an empty run", () => {
    const onStep = vi.fn();
    runSteps(0, onStep);

    vi.advanceTimersByTime(STEP_MS * 10);

    expect(onStep).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("uses a custom step length when given", () => {
    const onStep = vi.fn();
    runSteps(2, onStep, 100);

    vi.advanceTimersByTime(200);

    expect(onStep).toHaveBeenCalledTimes(2);
  });

  it("can be cancelled safely after it finishes", () => {
    const onStep = vi.fn();
    const cancel = runSteps(1, onStep);
    vi.advanceTimersByTime(STEP_MS);

    expect(() => cancel()).not.toThrow();
    expect(onStep).toHaveBeenCalledTimes(1);
  });
});
