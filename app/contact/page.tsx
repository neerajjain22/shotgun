import { MarketingPageTemplate } from "@/components/layout/MarketingPageTemplate";
import { contactPageContent } from "@/content/site-content";
import { createPageMetadata } from "@/seo/metadata";

export const metadata = createPageMetadata({
  title: contactPageContent.metadataTitle,
  description: contactPageContent.metadataDescription,
  path: contactPageContent.path
});

export default function ContactPage() {
  return <MarketingPageTemplate content={contactPageContent} />;
}
