import { MarketingPageTemplate } from "@/components/layout/MarketingPageTemplate";
import { guidesPageContent } from "@/content/site-content";
import { createPageMetadata } from "@/seo/metadata";

export const metadata = createPageMetadata({
  title: guidesPageContent.metadataTitle,
  description: guidesPageContent.metadataDescription,
  path: guidesPageContent.path
});

export default function GuidesPage() {
  return <MarketingPageTemplate content={guidesPageContent} />;
}
