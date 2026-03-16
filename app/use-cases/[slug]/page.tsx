import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MarketingPageTemplate } from "@/components/layout/MarketingPageTemplate";
import { useCaseSubpageContent, useCaseSubpageSlugs } from "@/content/site-content";
import { createPageMetadata } from "@/seo/metadata";

type UseCaseSubpageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return useCaseSubpageSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: UseCaseSubpageProps): Metadata {
  const pageContent = useCaseSubpageContent[params.slug];

  if (!pageContent) {
    return createPageMetadata({
      title: "Not Found",
      path: `/use-cases/${params.slug}`,
      noIndex: true
    });
  }

  return createPageMetadata({
    title: pageContent.metadataTitle,
    description: pageContent.metadataDescription,
    path: pageContent.path
  });
}

export default function UseCaseSubpage({ params }: UseCaseSubpageProps) {
  const pageContent = useCaseSubpageContent[params.slug];

  if (!pageContent) {
    notFound();
  }

  return <MarketingPageTemplate content={pageContent} />;
}
