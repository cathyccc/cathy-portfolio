import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="page-container flex flex-wrap justify-between gap-3 py-[26px] text-sm text-subtle">
        <p>
          <span className="block sm:inline">{site.footer.copyright}</span>
          <span aria-hidden="true" className="hidden sm:inline">
            {" · "}
          </span>
          <span className="block sm:inline">{site.footer.tagline}</span>
        </p>
        <p className="font-mono text-pass-text">
          <span aria-hidden="true">✓ </span>
          {site.footer.status}
        </p>
      </div>
    </footer>
  );
}
