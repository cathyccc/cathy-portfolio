import Image from "next/image";
import { site } from "@/content/site";

export function About() {
  const about = site.about;

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      data-surface="dark"
      className="bg-ink text-terminal-text"
    >
      {/* Stacked on phones; from md up the photo is a narrow fixed column
          beside the text, widening at lg. */}
      <div className="page-container flex flex-col gap-8 py-20 md:grid md:grid-cols-[200px_minmax(0,1fr)] md:items-center md:gap-10 md:py-16 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14 lg:py-24">
        {/* Square photo in a square box, so cover shows the full frame;
            the position keeps the face in view if the photo is ever swapped. */}
        <Image
          src={about.photo.src}
          alt={about.photo.alt}
          width={240}
          height={240}
          className="size-44 flex-none rounded-photo object-cover object-[52%_38%] md:size-[200px] lg:size-60"
        />

        <div className="flex min-w-0 max-w-[65ch] flex-col gap-[18px] md:max-w-none">
          <h2 id="about-title" className="text-[clamp(32px,9.5vw,44px)] leading-[1.1] text-background sm:text-[44px]">
            {about.title}
          </h2>
          {about.paragraphs.map((text) => (
            <p key={text} className="text-lg leading-[1.7] text-dark-body">
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
