import { MarketingPageTemplate } from "@/components/layout/MarketingPageTemplate";
import { resourcesPageContent } from "@/content/site-content";
import { createPageMetadata } from "@/seo/metadata";

export const metadata = createPageMetadata({
  title: resourcesPageContent.metadataTitle,
  description: resourcesPageContent.metadataDescription,
  path: resourcesPageContent.path
});

export default function ResourcesPage() {
  return <MarketingPageTemplate content={resourcesPageContent} />;
}
