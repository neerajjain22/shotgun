import { MarketingPageTemplate } from "@/components/layout/MarketingPageTemplate";
import { aboutPageContent } from "@/content/site-content";
import { createPageMetadata } from "@/seo/metadata";

export const metadata = createPageMetadata({
  title: aboutPageContent.metadataTitle,
  description: aboutPageContent.metadataDescription,
  path: aboutPageContent.path
});

export default function AboutPage() {
  return <MarketingPageTemplate content={aboutPageContent} />;
}
