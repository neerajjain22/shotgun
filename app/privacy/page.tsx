import { MarketingPageTemplate } from "@/components/layout/MarketingPageTemplate";
import { privacyPageContent } from "@/content/site-content";
import { createPageMetadata } from "@/seo/metadata";

export const metadata = createPageMetadata({
  title: privacyPageContent.metadataTitle,
  description: privacyPageContent.metadataDescription,
  path: privacyPageContent.path
});

export default function PrivacyPage() {
  return <MarketingPageTemplate content={privacyPageContent} />;
}
