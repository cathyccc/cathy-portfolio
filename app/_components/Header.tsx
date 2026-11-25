import { site } from "@/content/site";
import { SmartLink } from "./SmartLink";

export function Header() {
  const { logoMark, name, nav, navCta } = site.header;

  return (
    <header className="page-container flex flex-nowrap items-center justify-between gap-3 py-5 sm:gap-4 sm:py-[26px]">
      <a
        href="#top"
        className="inline-flex min-w-0 items-center gap-2.5 rounded-logo hover:text-ink sm:gap-3"
      >
        <span
          aria-hidden="true"
          className="inline-flex size-[42px] shrink-0 items-center justify-center rounded-logo bg-ink font-mono text-base font-bold text-terminal-green"
        >
          {logoMark}
        </span>
        <span className="whitespace-nowrap font-heading text-xl font-semibold sm:text-[22px]">
          {name}
        </span>
      </a>

      <nav aria-label={site.a11y.mainNav} className="shrink-0">
        <ul className="flex flex-nowrap items-center gap-1.5 text-[15px] font-medium">
          {/* Work and About are hidden on small screens; Contact stays. */}
          {nav.map((item) => (
            <li key={item.href} className="hidden sm:block">
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
              className="inline-block whitespace-nowrap rounded-pill bg-ink px-3.5 py-2 text-sm text-background transition-colors hover:bg-accent sm:px-[18px] sm:py-2.5 sm:text-[15px]"
            >
              {navCta.label}
            </SmartLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
