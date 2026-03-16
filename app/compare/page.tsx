import { MarketingPageTemplate } from "@/components/layout/MarketingPageTemplate";
import { comparePageContent } from "@/content/site-content";
import { createPageMetadata } from "@/seo/metadata";

export const metadata = createPageMetadata({
  title: comparePageContent.metadataTitle,
  description: comparePageContent.metadataDescription,
  path: comparePageContent.path
});

export default function ComparePage() {
  return <MarketingPageTemplate content={comparePageContent} />;
}
