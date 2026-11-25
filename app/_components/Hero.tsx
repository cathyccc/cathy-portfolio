import { site } from "@/content/site";
import { CtaButtons } from "./CtaButtons";
import { Eyebrow } from "./Eyebrow";

export function Hero() {
  const hero = site.hero;

  return (
    <section
      id="top"
      className="page-container flex flex-wrap items-center gap-12 pt-14 pb-24"
    >
      <div className="flex min-w-0 flex-[999_1_520px] flex-col gap-6">
        <Eyebrow dot>{hero.eyebrow}</Eyebrow>
        <h1 className="text-[clamp(44px,6vw,80px)] leading-[1.04]">
          {hero.headline}{" "}
          <span className="highlight-mark">{hero.headlineHighlight}</span>
        </h1>
        <p className="max-w-[580px] text-[19px] leading-[1.65] text-muted">
          {hero.intro}
        </p>
        <div className="pt-1">
          <CtaButtons primary={hero.primaryCta} secondary={hero.secondaryCtas} />
        </div>
      </div>

      {/* Placeholder for the animated test runner (next step). */}
      <div
        aria-hidden="true"
        className="flex min-h-[440px] min-w-0 flex-[1_1_440px] items-center justify-center rounded-terminal border-2 border-dashed border-dark-dashed bg-terminal-bg p-6 text-center font-mono text-sm text-terminal-grey shadow-[0_24px_48px_rgba(31,29,26,0.18)]"
      >
        {hero.runnerPlaceholder}
      </div>
    </section>
  );
}
