import Link from "next/link";
import { site } from "@/content/site";

type Props = Omit<React.ComponentProps<"a">, "href"> & {
  href: string;
};

export function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

/**
 * One link component for the whole site:
 * - external (http/https): new tab, rel="noopener noreferrer", plus
 *   screen-reader text announcing the new tab
 * - internal routes ("/…"): next/link for client-side navigation
 * - in-page anchors and mailto: a plain <a>
 */
export function SmartLink({ href, children, ...rest }: Props) {
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
        <span className="sr-only"> {site.a11y.newTab}</span>
      </a>
    );
  }

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}
