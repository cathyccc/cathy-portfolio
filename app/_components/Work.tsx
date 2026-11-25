import { site } from "@/content/site";
import { Eyebrow } from "./Eyebrow";
import { WorkCard } from "./WorkCard";

export function Work() {
  const work = site.work;

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="page-container flex flex-col gap-10 pt-8 pb-[104px]"
    >
      <div className="flex flex-col gap-2.5">
        <Eyebrow>{work.eyebrow}</Eyebrow>
        <h2 id="work-title" className="text-[clamp(32px,9.5vw,46px)] leading-[1.1] sm:text-[46px]">
          {work.title}
        </h2>
      </div>

      <div className="flex flex-wrap gap-[26px]">
        {work.items.map((item) => (
          <WorkCard key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}
