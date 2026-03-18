import { MarketingPageTemplate } from "@/components/layout/MarketingPageTemplate";
import { faqsPageContent } from "@/content/site-content";
import { createPageMetadata } from "@/seo/metadata";

export const metadata = createPageMetadata({
  title: faqsPageContent.metadataTitle,
  description: faqsPageContent.metadataDescription,
  path: faqsPageContent.path
});

export default function FAQsPage() {
  return <MarketingPageTemplate content={faqsPageContent} />;
}
