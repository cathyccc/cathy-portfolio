import { expect, test } from "@playwright/test";
import { site } from "../content/site";

const runner = site.hero.runner;
const TOTAL = runner.tests.length;

test.describe("home page", () => {
  test("loads and shows all four work cards", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(site.meta.title);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    const cards = page.locator("#work article");
    await expect(cards).toHaveCount(site.work.items.length);
    for (const item of site.work.items) {
      await expect(
        cards.getByRole("heading", { level: 3, name: item.title }),
      ).toBeVisible();
    }
  });

  test("test runner counts up and finishes with 6 passed", async ({ page }) => {
    await page.goto("/");
    const panel = page.locator("[data-surface=dark]").filter({ hasText: runner.fileName });

    // Replay so we watch a full run from zero, not the finished first paint.
    await panel.getByRole("button", { name: runner.runLabel }).click();
    await expect(panel.getByText(/^Tests:/)).toHaveText(`Tests: 0 passed, ${TOTAL} total`);
    await expect(panel.getByText(runner.runningStatus, { exact: true })).toBeVisible();

    await expect(panel.getByText(/^Tests:/)).toHaveText(
      `Tests: ${TOTAL} passed, ${TOTAL} total`,
    );
    await expect(panel.getByText(runner.doneStatus, { exact: true })).toBeVisible();
    await expect(panel.getByText(runner.runningStatus, { exact: true })).toBeHidden();
    await expect(panel.locator("[aria-live]")).toHaveText(
      `${TOTAL} of ${TOTAL} tests passed. ${runner.doneStatus}`,
    );
  });

  test("each work card links to the right place", async ({ page }) => {
    await page.goto("/");

    for (const item of site.work.items) {
      const card = page
        .locator("#work article")
        .filter({ has: page.getByRole("heading", { name: item.title }) });
      const link = card.getByRole("link", { name: new RegExp(item.link.label) });

      await expect(link).toHaveAttribute("href", item.link.href);
      // External links open in a new tab, safely.
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  test("header links jump to their sections", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: site.a11y.mainNav });

    for (const link of [...site.header.nav, site.header.navCta]) {
      await nav.getByRole("link", { name: link.label }).click();
      await expect(page).toHaveURL(new RegExp(`${link.href}$`));
      await expect(page.locator(link.href)).toBeInViewport();
    }
  });

  test("has no horizontal scroll at phone width (390px)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const overflow = () =>
      page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(await overflow()).toBe(0);

    // Check mid-run and after a full run of the test runner too.
    await page.getByRole("button", { name: runner.runLabel }).click();
    expect(await overflow()).toBe(0);
    await expect(page.getByText(/^Tests:/)).toHaveText(`Tests: ${TOTAL} passed, ${TOTAL} total`);
    await expect(page.getByText(runner.doneStatus, { exact: true })).toBeVisible();
    expect(await overflow()).toBe(0);
  });
});
