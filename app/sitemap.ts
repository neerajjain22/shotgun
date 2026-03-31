import type { MetadataRoute } from "next";

import { getBlogSitemapEntries } from "@/lib/blog-content";
import { buildSitemap } from "@/seo/sitemap";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemap({
    blogEntries: getBlogSitemapEntries()
  });
}
