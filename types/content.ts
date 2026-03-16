export type Slug = string;

export type ContentMeta = {
  title: string;
  description: string;
  slug: Slug;
  publishedAt?: string;
  updatedAt?: string;
};
