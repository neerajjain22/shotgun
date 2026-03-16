import { MarketingPageTemplate } from "@/components/layout/MarketingPageTemplate";
import { productPageContent } from "@/content/site-content";
import { createPageMetadata } from "@/seo/metadata";

export const metadata = createPageMetadata({
  title: productPageContent.metadataTitle,
  description: productPageContent.metadataDescription,
  path: productPageContent.path
});

export default function ProductPage() {
  return <MarketingPageTemplate content={productPageContent} />;
}
