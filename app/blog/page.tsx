import { MarketingPageTemplate } from "@/components/layout/MarketingPageTemplate";
import { blogPageContent } from "@/content/site-content";
import { createPageMetadata } from "@/seo/metadata";

export const metadata = createPageMetadata({
  title: blogPageContent.metadataTitle,
  description: blogPageContent.metadataDescription,
  path: blogPageContent.path
});

export default function BlogPage() {
  return <MarketingPageTemplate content={blogPageContent} />;
}
