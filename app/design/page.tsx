import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design foundations · Cathy Chan",
  robots: { index: false },
};

// Note: apart from the hero headline, all text on this page is a specimen
// label describing the style shown — not portfolio copy.

const swatches = [
  { name: "background", hex: "#FBF7F2", className: "bg-background" },
  { name: "ink", hex: "#1F1D1A", className: "bg-ink" },
  { name: "muted", hex: "#4A4640", className: "bg-muted" },
  { name: "subtle", hex: "#6B655C", className: "bg-subtle" },
  { name: "border", hex: "#E8E1D7", className: "bg-border" },
  { name: "card", hex: "#FFFFFF", className: "bg-card" },
  { name: "accent", hex: "#1E7A4C", className: "bg-accent" },
  { name: "pass-bg", hex: "#E4F4EA", className: "bg-pass-bg" },
  { name: "pass-text", hex: "#17603B", className: "bg-pass-text" },
  { name: "highlight", hex: "#F6C445", className: "bg-highlight" },
  { name: "bug-bg", hex: "#FFF6DA", className: "bg-bug-bg" },
  { name: "bug-label", hex: "#6B5310", className: "bg-bug-label" },
  { name: "terminal-bg", hex: "#1F1D1A", className: "bg-terminal-bg" },
  { name: "terminal-text", hex: "#EDE7DF", className: "bg-terminal-text" },
  { name: "terminal-green", hex: "#5BD08F", className: "bg-terminal-green" },
  { name: "terminal-grey", hex: "#A8A29A", className: "bg-terminal-grey" },
];

const radii = [
  { name: "rounded-chip", value: "14px", className: "rounded-chip" },
  { name: "rounded-card", value: "22px", className: "rounded-card" },
  { name: "rounded-terminal", value: "28px", className: "rounded-terminal" },
  { name: "rounded-pill", value: "999px", className: "rounded-pill" },
];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs font-medium uppercase tracking-wider text-subtle">
      {children}
    </p>
  );
}

export default function DesignPage() {
  return (
    <main className="page-container flex flex-col gap-16 py-16">
      {/* Type */}
      <section className="flex flex-col gap-6">
        <Label>Hero · Literata 500 · opsz auto · tracking −0.02em</Label>
        <h1 className="text-4xl leading-tight sm:text-6xl">
          I build web apps. Then I make sure they{" "}
          <span className="highlight-mark">actually work.</span>
        </h1>

        <Label>Headings · Literata</Label>
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl">Section heading · h2 · 500</h2>
          <h3>Card title · h3 · 600 · 30px / 1.15</h3>
        </div>

        <Label>Body · DM Sans</Label>
        <div className="flex flex-col gap-1">
          <p className="text-lg text-muted">DM Sans 400 · muted · 18px</p>
          <p className="font-medium text-ink">DM Sans 500 · ink</p>
          <p className="font-bold text-ink">DM Sans 700 · ink</p>
          <p className="text-sm text-subtle">DM Sans 400 · subtle · 14px</p>
        </div>

        <Label>Code and labels · JetBrains Mono</Label>
        <p className="font-mono text-sm">
          JetBrains Mono 400 · <span className="font-medium">500</span> ·{" "}
          <span className="font-bold">700</span>
        </p>
      </section>

      {/* Links and buttons */}
      <section className="flex flex-col gap-6">
        <Label>Links and buttons · press Tab to check focus outlines</Label>
        <div className="flex flex-wrap items-center gap-4">
          <a href="#" className="btn btn-primary">
            Primary button
          </a>
          <button type="button" className="btn btn-secondary">
            Secondary button
          </button>
          <a
            href="#"
            className="font-medium text-accent underline underline-offset-4 hover:decoration-2"
          >
            Text link
          </a>
        </div>
      </section>

      {/* Badges, tags, chips */}
      <section className="flex flex-col gap-6">
        <Label>Badges, tags and chips</Label>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-pill bg-pass-bg px-3 py-1 font-mono text-xs font-medium text-pass-text">
            ✓ pass badge · pill
          </span>
          <span className="rounded-pill border border-border bg-card px-3 py-1 font-mono text-xs text-muted">
            tag · pill
          </span>
          <span className="rounded-chip border border-border bg-card px-3 py-1.5 font-mono text-xs text-muted">
            chip · 14px
          </span>
        </div>
      </section>

      {/* Card, bug box, terminal */}
      <section className="flex flex-col gap-6">
        <Label>Card and terminal</Label>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="flex flex-col gap-4 rounded-card border border-border bg-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3>Card · 22px</h3>
              <span className="rounded-pill bg-pass-bg px-3 py-1 font-mono text-xs font-medium text-pass-text">
                ✓ badge
              </span>
            </div>
            <p className="text-muted">Body text · muted</p>
            <div className="rounded-chip bg-bug-bg p-4">
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-bug-label">
                Bug caught
              </p>
              <p className="mt-1 text-ink">Box text · ink on bug-bg</p>
            </div>
          </article>

          <div
            data-surface="dark"
            className="flex flex-col rounded-terminal bg-terminal-bg p-6 font-mono text-sm text-terminal-text"
          >
            <p className="text-terminal-grey">terminal-grey · 28px panel</p>
            <p>
              <span className="text-terminal-green">$</span> terminal-text
            </p>
            <p className="text-terminal-green">terminal-green</p>
            <a
              href="#"
              className="mt-4 self-start text-terminal-green underline underline-offset-4"
            >
              Link on dark
            </a>
          </div>
        </div>
      </section>

      {/* Radius tokens */}
      <section className="flex flex-col gap-6">
        <Label>Radius tokens</Label>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {radii.map((r) => (
            <li key={r.name} className="flex flex-col gap-2">
              <div
                className={`h-16 border border-border bg-card ${r.className}`}
              />
              <div>
                <p className="font-mono text-sm font-medium">{r.name}</p>
                <p className="font-mono text-xs text-subtle">{r.value}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Palette */}
      <section className="flex flex-col gap-6">
        <Label>Colour tokens</Label>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {swatches.map((s) => (
            <li key={s.name} className="flex flex-col gap-2">
              <div
                className={`h-16 rounded-chip border border-border ${s.className}`}
              />
              <div>
                <p className="font-mono text-sm font-medium">{s.name}</p>
                <p className="font-mono text-xs text-subtle">{s.hex}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
