import { MarketingPageTemplate } from "@/components/layout/MarketingPageTemplate";
import { useCasesPageContent } from "@/content/site-content";
import { createPageMetadata } from "@/seo/metadata";

export const metadata = createPageMetadata({
  title: useCasesPageContent.metadataTitle,
  description: useCasesPageContent.metadataDescription,
  path: useCasesPageContent.path
});

export default function UseCasesPage() {
  return <MarketingPageTemplate content={useCasesPageContent} />;
}
