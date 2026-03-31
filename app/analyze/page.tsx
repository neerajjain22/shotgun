import type { Metadata } from "next";

import { WebsiteAnalyzerTool } from "@/components/analyzer/WebsiteAnalyzerTool";
import { createPageMetadata } from "@/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Analyze My Website",
  description:
    "Share your Shopify store URL and get an instant, prioritized 10-minute action plan to improve conversion.",
  path: "/analyze",
});

export default function AnalyzePage() {
  return <WebsiteAnalyzerTool />;
}
