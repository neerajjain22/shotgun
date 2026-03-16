import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MarketingPageTemplate } from "@/components/layout/MarketingPageTemplate";
import { productSubpageContent, productSubpageSlugs } from "@/content/site-content";
import { createPageMetadata } from "@/seo/metadata";

type ProductSubpageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return productSubpageSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: ProductSubpageProps): Metadata {
  const pageContent = productSubpageContent[params.slug];

  if (!pageContent) {
    return createPageMetadata({
      title: "Not Found",
      path: `/product/${params.slug}`,
      noIndex: true
    });
  }

  return createPageMetadata({
    title: pageContent.metadataTitle,
    description: pageContent.metadataDescription,
    path: pageContent.path
  });
}

export default function ProductSubpage({ params }: ProductSubpageProps) {
  const pageContent = productSubpageContent[params.slug];

  if (!pageContent) {
    notFound();
  }

  return <MarketingPageTemplate content={pageContent} />;
}
