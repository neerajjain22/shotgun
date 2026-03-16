import { MarketingPageTemplate } from "@/components/layout/MarketingPageTemplate";
import { termsPageContent } from "@/content/site-content";
import { createPageMetadata } from "@/seo/metadata";

export const metadata = createPageMetadata({
  title: termsPageContent.metadataTitle,
  description: termsPageContent.metadataDescription,
  path: termsPageContent.path
});

export default function TermsPage() {
  return <MarketingPageTemplate content={termsPageContent} />;
}
