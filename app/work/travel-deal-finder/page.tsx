import type { Metadata } from "next";
import { SmartLink } from "@/app/_components/SmartLink";
import { site } from "@/content/site";

const page = site.caseStudyPlaceholder;

export const metadata: Metadata = {
  title: `${page.title} · ${site.header.name}`,
};

export default function TravelDealFinderPage() {
  return (
    <main className="page-container flex flex-1 flex-col items-start justify-center gap-6 py-24">
      <h1 className="text-[clamp(36px,5vw,56px)] leading-[1.1]">{page.title}</h1>
      <SmartLink href={page.backLink.href} className="btn btn-secondary">
        <span aria-hidden="true">← </span>
        {page.backLink.label}
      </SmartLink>
    </main>
  );
}
