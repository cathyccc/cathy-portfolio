import { site } from "@/content/site";
import { CtaButtons } from "./CtaButtons";
import { Eyebrow } from "./Eyebrow";
import { TestRunner } from "./TestRunner";

export function Hero() {
  const hero = site.hero;

  return (
    <section
      id="top"
      className="page-container flex flex-wrap items-center gap-10 pt-8 pb-20 sm:gap-12 sm:pt-14 sm:pb-24"
    >
      <div className="flex min-w-0 flex-[999_1_520px] flex-col gap-5 sm:gap-6">
        <Eyebrow dot>{hero.eyebrow}</Eyebrow>
        <h1 className="text-[clamp(36px,11.5vw,44px)] leading-[1.08] sm:text-[clamp(44px,6vw,80px)] sm:leading-[1.04]">
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

      <TestRunner />
    </section>
  );
}
