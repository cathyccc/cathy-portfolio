import type { SiteLink } from "@/content/site";
import { SmartLink } from "./SmartLink";

/**
 * A primary button followed by secondary (outlined) buttons.
 * Small screens: primary is full width, secondaries share the row below
 * at equal widths. From 640px up: one wrapping row.
 */
export function CtaButtons({
  primary,
  secondary,
}: {
  primary: SiteLink;
  secondary: SiteLink[];
}) {
  const columns = Math.max(secondary.length, 1);

  return (
    <div
      style={{ "--cta-cols": columns } as React.CSSProperties}
      className="grid grid-cols-[repeat(var(--cta-cols),minmax(0,1fr))] gap-3 sm:flex sm:flex-wrap"
    >
      <SmartLink href={primary.href} className="btn btn-primary col-span-full">
        {primary.label}
      </SmartLink>
      {secondary.map((link) => (
        <SmartLink key={link.href} href={link.href} className="btn btn-secondary">
          {link.label}
        </SmartLink>
      ))}
    </div>
  );
}
