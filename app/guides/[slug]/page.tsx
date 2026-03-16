import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MarketingPageTemplate } from "@/components/layout/MarketingPageTemplate";
import { guideSubpageContent, guideSubpageSlugs } from "@/content/site-content";
import { createPageMetadata } from "@/seo/metadata";

type GuideSubpageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return guideSubpageSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: GuideSubpageProps): Metadata {
  const pageContent = guideSubpageContent[params.slug];

  if (!pageContent) {
    return createPageMetadata({
      title: "Not Found",
      path: `/guides/${params.slug}`,
      noIndex: true
    });
  }

  return createPageMetadata({
    title: pageContent.metadataTitle,
    description: pageContent.metadataDescription,
    path: pageContent.path
  });
}

export default function GuideSubpage({ params }: GuideSubpageProps) {
  const pageContent = guideSubpageContent[params.slug];

  if (!pageContent) {
    notFound();
  }

  return <MarketingPageTemplate content={pageContent} />;
}
