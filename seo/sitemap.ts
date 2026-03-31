import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { contentDrivenPaths } from "@/content/site-content";

type ContentEntry = {
  slug: string;
  updatedAt?: string | Date;
};

type BuildSitemapInput = {
  blogEntries?: ContentEntry[];
  guideEntries?: ContentEntry[];
};

function resolveDate(value?: string | Date): Date {
  if (!value) {
    return new Date();
  }

  return value instanceof Date ? value : new Date(value);
}

function toSitemapEntry(path: string, options?: { lastModified?: string | Date }): MetadataRoute.Sitemap[number] {
  return {
    url: new URL(path, siteConfig.url).toString(),
    lastModified: resolveDate(options?.lastModified),
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : 0.7
  };
}

function mapContentEntries(basePath: "/blog" | "/guides", entries: ContentEntry[]): MetadataRoute.Sitemap {
  return entries.map((entry) =>
    toSitemapEntry(`${basePath}/${entry.slug.replace(/^\/+/, "")}`, {
      lastModified: entry.updatedAt
    })
  );
}

function getFutureBlogEntries(): ContentEntry[] {
  // Blog entries can be injected from app/sitemap.ts via BuildSitemapInput.
  // This fallback keeps the helper safe when no source is provided.
  return [];
}

function getFutureGuideEntries(): ContentEntry[] {
  // Replace with content source integration when guides content is added.
  return [];
}

export function buildSitemap(input: BuildSitemapInput = {}): MetadataRoute.Sitemap {
  const blogEntries = input.blogEntries ?? getFutureBlogEntries();
  const guideEntries = input.guideEntries ?? getFutureGuideEntries();
  const uniquePaths = [...new Set(contentDrivenPaths)];

  return [
    ...uniquePaths.map((path) => toSitemapEntry(path)),
    ...mapContentEntries("/blog", blogEntries),
    ...mapContentEntries("/guides", guideEntries)
  ];
}
