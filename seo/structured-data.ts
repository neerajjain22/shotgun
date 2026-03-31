import { siteConfig } from "@/config/site";

export type JsonLd = Record<string, unknown>;

export type OrganizationStructuredData = {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
};

export type WebSiteStructuredData = {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  description?: string;
};

export type BreadcrumbListItem = {
  name: string;
  url: string;
};

export type BreadcrumbListStructuredData = {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
};

export type ArticleStructuredData = {
  "@context": "https://schema.org";
  "@type": "Article";
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  keywords?: string[];
  author: {
    "@type": "Organization";
    name: string;
  };
  publisher: {
    "@type": "Organization";
    name: string;
    url: string;
  };
};

// Reserved for future schema expansion without changing public helpers.
export type FutureStructuredDataType = "Article" | "FAQPage" | "Product";

export function createOrganizationStructuredData(input?: {
  logo?: string;
  sameAs?: string[];
}): OrganizationStructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteConfig.url,
    logo: input?.logo,
    sameAs: input?.sameAs
  };
}

export function createWebSiteStructuredData(input?: {
  description?: string;
}): WebSiteStructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: input?.description ?? siteConfig.description
  };
}

export function createBreadcrumbListStructuredData(items: BreadcrumbListItem[]): BreadcrumbListStructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.url, siteConfig.url).toString()
    }))
  };
}

export function createArticleStructuredData(input: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  keywords?: string[];
}): ArticleStructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    url: input.url,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    keywords: input.keywords,
    author: {
      "@type": "Organization",
      name: siteConfig.legalName
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url
    }
  };
}

export function serializeJsonLd(data: JsonLd): string {
  return JSON.stringify(data);
}
