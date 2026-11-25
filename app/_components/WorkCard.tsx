import { Fragment } from "react";
import type { WorkItem } from "@/content/site";
import { SmartLink } from "./SmartLink";

export function WorkCard({ item }: { item: WorkItem }) {
  return (
    <article className="flex min-w-0 flex-[1_1_500px] flex-col gap-4 rounded-card border border-border bg-card p-6 sm:p-[30px]">
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <span className="inline-flex items-center gap-2 rounded-pill bg-pass-bg px-3 py-1.5 font-mono text-xs font-bold text-pass-text">
          <span aria-hidden="true">✓</span>
          {item.badge}
        </span>
        <SmartLink
          href={item.link.href}
          className="text-[15px] font-bold text-accent underline underline-offset-[3px] transition-colors hover:text-pass-text"
        >
          {item.link.label}
          <span className="sr-only">: {item.title}</span>
          <span aria-hidden="true"> →</span>
        </SmartLink>
      </div>

      <h3>{item.title}</h3>

      <p className="leading-[1.65] text-muted">{item.description}</p>

      <div className="flex flex-col gap-1 rounded-chip bg-bug-bg px-[18px] py-4">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.06em] text-bug-label">
          {item.callout.label}
        </p>
        <p className="text-[15.5px] leading-[1.55]">{item.callout.text}</p>
      </div>

      <p className="font-mono text-[12.5px] text-subtle">
        {item.stack.map((part, i) => (
          <Fragment key={typeof part === "string" ? part : part.href}>
            {i > 0 && " · "}
            {typeof part === "string" ? (
              part
            ) : (
              <SmartLink
                href={part.href}
                className="text-ink underline underline-offset-2 transition-colors hover:text-accent"
              >
                {part.label}
              </SmartLink>
            )}
          </Fragment>
        ))}
      </p>
    </article>
  );
}
