import { site } from "@/content/site";
import { SmartLink } from "./SmartLink";

export function Header() {
  const { logoMark, name, nav, navCta } = site.header;

  return (
    <header className="page-container flex flex-wrap items-center justify-between gap-4 py-[26px]">
      <a href="#top" className="inline-flex items-center gap-3 hover:text-ink">
        <span
          aria-hidden="true"
          className="inline-flex size-[42px] items-center justify-center rounded-logo bg-ink font-mono text-base font-bold text-terminal-green"
        >
          {logoMark}
        </span>
        <span className="font-heading text-[22px] font-semibold">{name}</span>
      </a>

      <nav aria-label={site.a11y.mainNav}>
        <ul className="flex flex-wrap gap-1.5 text-[15px] font-medium">
          {nav.map((item) => (
            <li key={item.href}>
              <SmartLink
                href={item.href}
                className="inline-block rounded-pill px-4 py-2.5 transition-colors hover:text-accent"
              >
                {item.label}
              </SmartLink>
            </li>
          ))}
          <li>
            <SmartLink
              href={navCta.href}
              className="inline-block rounded-pill bg-ink px-[18px] py-2.5 text-background transition-colors hover:bg-accent"
            >
              {navCta.label}
            </SmartLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
