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
      <div className="page-container flex flex-wrap items-center gap-14 py-24">
        {/* Square photo in a square box, so cover shows the full frame;
            the position keeps the face in view if the photo is ever swapped. */}
        <Image
          src={about.photo.src}
          alt={about.photo.alt}
          width={240}
          height={240}
          className="size-60 flex-none rounded-photo object-cover object-[52%_38%]"
        />

        <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-[18px]">
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
