import type { Metadata } from "next";

import { metadataConfig } from "@/config/metadata";
import { siteConfig } from "@/config/site";
import { toAbsoluteUrl } from "@/lib/url";

type OpenGraphImageInput = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

type CreatePageMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
  openGraphImage?: OpenGraphImageInput;
};

function isHomePath(path: string): boolean {
  return path === "/";
}

function formatPageTitle(path: string, title?: string): string {
  if (isHomePath(path)) {
    return metadataConfig.homeTitle;
  }

  if (!title) {
    return metadataConfig.homeTitle;
  }

  return metadataConfig.titleTemplate.replace("%s", title);
}

export function createPageMetadata(input: CreatePageMetadataInput = {}): Metadata {
  const path = input.path ?? "/";
  const canonical = toAbsoluteUrl(path, siteConfig.url);
  const title = formatPageTitle(path, input.title);
  const description = input.description ?? metadataConfig.defaultDescription;

  return {
    title,
    description,
    alternates: {
      canonical
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      url: canonical,
      title,
      description,
      images: input.openGraphImage ? [input.openGraphImage] : undefined
    },
    twitter: {
      card: "summary_large_image",
      creator: metadataConfig.twitterHandle,
      title,
      description,
      images: input.openGraphImage ? [input.openGraphImage.url] : undefined
    },
    robots: input.noIndex
      ? {
          index: false,
          follow: false
        }
      : undefined
  };
}
