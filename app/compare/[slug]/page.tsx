import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MarketingPageTemplate } from "@/components/layout/MarketingPageTemplate";
import { compareSubpageContent, compareSubpageSlugs } from "@/content/site-content";
import { createPageMetadata } from "@/seo/metadata";

type CompareSubpageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return compareSubpageSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: CompareSubpageProps): Metadata {
  const pageContent = compareSubpageContent[params.slug];

  if (!pageContent) {
    return createPageMetadata({
      title: "Not Found",
      path: `/compare/${params.slug}`,
      noIndex: true
    });
  }

  return createPageMetadata({
    title: pageContent.metadataTitle,
    description: pageContent.metadataDescription,
    path: pageContent.path
  });
}

export default function CompareSubpage({ params }: CompareSubpageProps) {
  const pageContent = compareSubpageContent[params.slug];

  if (!pageContent) {
    notFound();
  }

  return <MarketingPageTemplate content={pageContent} />;
}
