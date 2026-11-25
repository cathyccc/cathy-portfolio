import type { SiteLink } from "@/content/site";
import { SmartLink } from "./SmartLink";

/** A primary button followed by secondary (outlined) buttons. */
export function CtaButtons({
  primary,
  secondary,
}: {
  primary: SiteLink;
  secondary: SiteLink[];
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <SmartLink href={primary.href} className="btn btn-primary">
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
