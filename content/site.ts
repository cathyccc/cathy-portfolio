/**
 * All site copy and links live here. Edit this file to change text on the
 * site; components only read from it.
 *
 * Link rules (handled automatically by components):
 * - "https://…" links open in a new tab with rel="noopener noreferrer".
 * - "#section", "mailto:" and "/route" links open in the same tab.
 * - Arrows (→) and check marks (✓) are added by components, so leave them
 *   out of the text here.
 */

export type SiteLink = {
  label: string;
  href: string;
};

export type WorkItem = {
  /** Text in the green PASS badge, after the check mark. */
  badge: string;
  title: string;
  description: string;
  /** The yellow box, e.g. "Bug caught". */
  callout: { label: string; text: string };
  /** Stack line; items are joined with " · ". A link renders as a link. */
  stack: (string | SiteLink)[];
  /** The card's main link (an arrow is added after the label). */
  link: SiteLink;
};

const links = {
  github: "https://github.com/cathyccc",
  linkedin: "https://linkedin.com/in/cathy-chan",
  email: "mailto:cathyky.chan@gmail.com",
};

export const site = {
  meta: {
    title: "Cathy Chan – Portfolio",
    description: "Personal portfolio of Cathy Chan",
  },

  /** Screen-reader-only text. */
  a11y: {
    newTab: "(opens in a new tab)",
    mainNav: "Main",
  },

  header: {
    logoMark: "cc",
    name: "Cathy Chan",
    nav: [
      { label: "Work", href: "#work" },
      { label: "About", href: "#about" },
    ] satisfies SiteLink[],
    /** Highlighted (dark pill) nav link. */
    navCta: { label: "Contact", href: "#contact" } satisfies SiteLink,
  },

  hero: {
    eyebrow: "Developer who tests · Toronto",
    /** The headline is split so the last part gets the highlight marker. */
    headline: "I build web apps. Then I make sure they",
    headlineHighlight: "actually work.",
    intro:
      "Hi, I'm Cathy. I started as a graphic designer, became a full-stack developer, and now write the tests that catch what others miss.",
    primaryCta: { label: "See the bugs I've caught", href: "#work" } satisfies SiteLink,
    secondaryCtas: [
      { label: "GitHub", href: links.github },
      { label: "LinkedIn", href: links.linkedin },
    ] satisfies SiteLink[],
    /** Temporary: label for the box where the test runner will go. */
    runnerPlaceholder: "Test runner — coming next",
  },

  work: {
    eyebrow: "Selected work",
    title: "Things I built, and the bugs I caught in them",
    items: [
      {
        badge: "PASS · Freelance client",
        title: "Dealership Sales System",
        description:
          "Leads, inventory and deals in one place for an independent used-car dealership, with a payment calculator verified to the cent.",
        callout: {
          label: "Bug caught",
          text: "A sold car could be reopened while its deal stayed active.",
        },
        stack: ["Next.js", "TypeScript", "Supabase", "Vitest"],
        link: { label: "Live demo", href: "https://dealer-crm-demo-jet.vercel.app/" },
      },
      {
        badge: "PASS · Personal project",
        title: "Travel Deal Finder",
        description:
          "A flight deal search built on the Duffel API, with validation, unit tests and end-to-end tests running in CI.",
        callout: {
          label: "Bug caught",
          text: "A search with more infants than adults returned nothing and showed no error.",
        },
        stack: ["React", "Node.js", "Zod", "Vitest", "Playwright"],
        link: { label: "Read the story", href: "/work/travel-deal-finder" },
      },
      {
        badge: "PASS · 79 tests",
        title: "SafeWallet API",
        description:
          "A banking-style transfer API with tests across the unit, API and database layers, organized by the OWASP Top 10.",
        callout: {
          label: "Edge case proven",
          text: "10 transfers of $100 fired at once from a $500 balance: exactly 5 go through.",
        },
        stack: ["Node.js", "Express", "PostgreSQL", "Vitest"],
        link: { label: "See the code", href: "https://github.com/cathyccc/safewallet-js" },
      },
      {
        badge: "PASS · Runs on every push",
        title: "Playwright Test Suites",
        description:
          "A 37-test end-to-end checkout suite on the Page Object Model, plus API tests for Stripe payments and refunds.",
        callout: {
          label: "What it covers",
          text: "Card declines, invalid input and boundary amounts, all checked automatically in GitHub Actions.",
        },
        stack: [
          "Playwright",
          "TypeScript",
          "GitHub Actions",
          { label: "Stripe tests", href: "https://github.com/cathyccc/stripe-api-playwright" },
        ],
        link: {
          label: "See the tests",
          href: "https://github.com/cathyccc/saucedemo-playwright",
        },
      },
    ] satisfies WorkItem[],
  },

  about: {
    title: "Designer first. Developer second. Tester always.",
    /** Shown until a real photo is added. */
    photoPlaceholder: "[your photo]",
    photoPlaceholderLabel: "Placeholder for your photo",
    paragraphs: [
      "I began designing packaging and ads in Toronto and Hong Kong, learned to code at Bitmaker, worked on an Agile team at Financeit, then became the sole developer at a PropTech startup. After a few years raising my two kids, I'm back building things and making sure they work.",
      "I use AI to build fast, then review every change. A bug I find by hand always becomes a test.",
    ],
  },

  contact: {
    eyebrow: "Open to developer and developer-in-test roles",
    title: "Found a bug in my portfolio?",
    titleHighlight: "Tell me.",
    intro:
      "Or just say hi. I'm looking for a team in Toronto or remote where I can build, test and keep learning.",
    primaryCta: { label: "Email me", href: links.email } satisfies SiteLink,
    secondaryCtas: [
      { label: "LinkedIn", href: links.linkedin },
      { label: "GitHub", href: links.github },
    ] satisfies SiteLink[],
  },

  footer: {
    credit: "© 2026 Cathy Chan · Designed, built and tested by me",
    /** A check mark is added before this. */
    status: "all tests passing",
  },

  caseStudyPlaceholder: {
    title: "Case study coming soon",
    backLink: { label: "Back to home", href: "/" } satisfies SiteLink,
  },
};
