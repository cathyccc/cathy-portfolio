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
        {/* Swap for next/image with alt text once the photo is ready. */}
        <div
          role="img"
          aria-label={about.photoPlaceholderLabel}
          className="flex size-60 flex-none items-center justify-center rounded-photo border-2 border-dashed border-dark-dashed bg-dark-border font-mono text-[13px] text-terminal-grey"
        >
          {about.photoPlaceholder}
        </div>

        <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-[18px]">
          <h2 id="about-title" className="text-[44px] leading-[1.1] text-background">
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
