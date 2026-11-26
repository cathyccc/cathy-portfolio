import { site } from "@/content/site";
import { CtaButtons } from "./CtaButtons";
import { Eyebrow } from "./Eyebrow";

export function Contact() {
  const contact = site.contact;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="page-container flex flex-col items-start gap-[22px] py-[104px]"
    >
      <Eyebrow>{contact.eyebrow}</Eyebrow>
      <h2
        id="contact-title"
        className="text-[clamp(34px,10.5vw,40px)] leading-[1.08] sm:text-[clamp(40px,5.5vw,68px)] sm:leading-[1.05]"
      >
        {contact.title}{" "}
        <span className="highlight-mark">{contact.titleHighlight}</span>
      </h2>
      <p className="max-w-[560px] text-lg leading-[1.6] text-muted">
        {contact.intro}
      </p>
      {/* Stretch so the buttons span the full width on phones, like the hero. */}
      <div className="self-stretch">
        <CtaButtons primary={contact.primaryCta} secondary={contact.secondaryCtas} />
      </div>
    </section>
  );
}
