import { expect, test } from "@playwright/test";

/**
 * Visits every page on the site (starting from the home page and following
 * internal links) and checks every link it finds:
 * - "/page" links must return 200
 * - "#section" links must point at an element that exists on that page
 * - "mailto:" links must contain an email address
 * - external "https://" links must be well-formed https URLs. They are not
 *   requested, because sites like LinkedIn block automated checks and would
 *   make this test fail for reasons unrelated to this site.
 */
test("no link on the site is broken", async ({ page, request, baseURL }) => {
  const origin = new URL(baseURL!).origin;
  const toVisit = ["/"];
  const visited = new Set<string>();
  const problems: string[] = [];

  while (toVisit.length > 0) {
    const path = toVisit.shift()!;
    if (visited.has(path)) continue;
    visited.add(path);

    const response = await page.goto(path);
    if (!response?.ok()) {
      problems.push(`${path} returned ${response?.status()}`);
      continue;
    }

    const links = await page.locator("a").evaluateAll((anchors) =>
      anchors.map((a) => ({
        raw: a.getAttribute("href"),
        text: (a.textContent ?? "").trim(),
      })),
    );

    for (const { raw, text } of links) {
      const where = `"${text}" on ${path}`;

      if (!raw || raw === "#") {
        problems.push(`${where} has no real href`);
      } else if (raw.startsWith("#")) {
        const id = decodeURIComponent(raw.slice(1));
        const found = await page.locator(`[id="${id}"]`).count();
        if (!found) problems.push(`${where} points to missing #${id}`);
      } else if (raw.startsWith("mailto:")) {
        if (!/^mailto:[^@\s]+@[^@\s]+\.[^@\s]+$/.test(raw)) {
          problems.push(`${where} has a malformed email: ${raw}`);
        }
      } else {
        const url = new URL(raw, origin + path);
        if (url.origin === origin) {
          const res = await request.get(url.pathname);
          if (!res.ok()) {
            problems.push(`${where} → ${url.pathname} returned ${res.status()}`);
          } else {
            toVisit.push(url.pathname);
          }
        } else if (url.protocol !== "https:") {
          problems.push(`${where} is not https: ${raw}`);
        }
      }
    }
  }

  expect(problems, problems.join("\n")).toEqual([]);
});
