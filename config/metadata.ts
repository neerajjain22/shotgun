import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

export const metadataConfig = {
  homeTitle: "Krish. — Shopify development execution",
  titleTemplate: "%s | Krish.",
  defaultDescription:
    "Reliable Shopify development execution for founders, operators, and ecommerce teams.",
  twitterHandle: "@HeyKrish"
} as const;

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: metadataConfig.homeTitle,
    template: metadataConfig.titleTemplate
  },
  description: metadataConfig.defaultDescription,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: metadataConfig.homeTitle,
    description: metadataConfig.defaultDescription
  },
  twitter: {
    card: "summary_large_image",
    creator: metadataConfig.twitterHandle,
    title: metadataConfig.homeTitle,
    description: metadataConfig.defaultDescription
  }
};
