import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MarketingPageTemplate } from "@/components/layout/MarketingPageTemplate";
import { resourceSubpageContent, resourceSubpageSlugs } from "@/content/site-content";
import { createPageMetadata } from "@/seo/metadata";

type ResourceSubpageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return resourceSubpageSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: ResourceSubpageProps): Metadata {
  const pageContent = resourceSubpageContent[params.slug];

  if (!pageContent) {
    return createPageMetadata({
      title: "Not Found",
      path: `/resources/${params.slug}`,
      noIndex: true
    });
  }

  return createPageMetadata({
    title: pageContent.metadataTitle,
    description: pageContent.metadataDescription,
    path: pageContent.path
  });
}

export default function ResourceSubpage({ params }: ResourceSubpageProps) {
  const pageContent = resourceSubpageContent[params.slug];

  if (!pageContent) {
    notFound();
  }

  return <MarketingPageTemplate content={pageContent} />;
}
