export type NavigationItem = {
  label: string;
  href: string;
};

export type NavigationSection = {
  label: string;
  href: string;
  pages: NavigationItem[];
};

export type FooterNavigation = {
  product: NavigationItem[];
  useCases: NavigationItem[];
  resources: NavigationItem[];
  company: NavigationItem[];
};

export type NavigationCTA = {
  label: string;
  href: string;
};

export const navigation = {
  main: [
    { label: "Product", href: "/product" },
    { label: "Use Cases", href: "/use-cases" },
    { label: "Guides", href: "/guides" },
    { label: "Compare", href: "/compare" },
    { label: "Resources", href: "/resources" }
  ] as NavigationItem[],
  sections: [
    {
      label: "Product",
      href: "/product",
      pages: [
        { label: "Overview", href: "/product" },
        { label: "How Shotgun Works", href: "/product/how-shotgun-works" },
        { label: "What Shotgun Can Do", href: "/product/what-shotgun-can-do" },
        { label: "Pricing", href: "/product/pricing" }
      ]
    },
    {
      label: "Use Cases",
      href: "/use-cases",
      pages: [
        { label: "Shopify Theme Changes", href: "/use-cases/shopify-theme-changes" },
        { label: "Shopify Homepage Updates", href: "/use-cases/shopify-homepage-updates" },
        {
          label: "Shopify Product Page Customization",
          href: "/use-cases/shopify-product-page-customization"
        },
        {
          label: "Shopify Promotions and Discounts",
          href: "/use-cases/shopify-promotions-and-discounts"
        },
        { label: "Shopify Bug Fixes", href: "/use-cases/shopify-bug-fixes" },
        { label: "Shopify Mobile Fixes", href: "/use-cases/shopify-mobile-fixes" },
        { label: "Shopify Speed Optimization", href: "/use-cases/shopify-speed-optimization" }
      ]
    },
    {
      label: "Guides",
      href: "/guides",
      pages: [
        { label: "Shopify Theme Customization Guide", href: "/guides/shopify-theme-customization" },
        { label: "Shopify Homepage Optimization Guide", href: "/guides/shopify-homepage-optimization" },
        { label: "Shopify Product Page Optimization", href: "/guides/shopify-product-page-optimization" },
        { label: "Shopify Store Speed Optimization", href: "/guides/shopify-store-speed-optimization" },
        { label: "Shopify Conversion Optimization", href: "/guides/shopify-conversion-optimization" }
      ]
    },
    {
      label: "Compare",
      href: "/compare",
      pages: [
        { label: "Freelancers vs Shotgun", href: "/compare/freelancers-vs-shotgun" },
        { label: "Shopify Agencies vs Shotgun", href: "/compare/shopify-agencies-vs-shotgun" },
        { label: "Task Services vs Shotgun", href: "/compare/task-services-vs-shotgun" },
        { label: "Storetasker vs Shotgun", href: "/compare/storetasker-vs-shotgun" },
        { label: "TaskHusky vs Shotgun", href: "/compare/taskhusky-vs-shotgun" }
      ]
    },
    {
      label: "Resources",
      href: "/resources",
      pages: [
        { label: "Blog", href: "/resources/blog" },
        { label: "Case Studies", href: "/resources/case-studies" },
        { label: "Documentation", href: "/resources/docs" }
      ]
    }
  ] as NavigationSection[],
  footer: {
    product: [
      { label: "How Shotgun Works", href: "/product/how-shotgun-works" },
      { label: "What Shotgun Can Do", href: "/product/what-shotgun-can-do" },
      { label: "Pricing", href: "/product/pricing" }
    ],
    useCases: [
      { label: "Theme Changes", href: "/use-cases/shopify-theme-changes" },
      {
        label: "Product Page Updates",
        href: "/use-cases/shopify-product-page-customization"
      },
      { label: "Bug Fixes", href: "/use-cases/shopify-bug-fixes" },
      { label: "Promotions", href: "/use-cases/shopify-promotions-and-discounts" }
    ],
    resources: [
      { label: "Guides", href: "/guides" },
      { label: "Blog", href: "/resources/blog" },
      { label: "Case Studies", href: "/resources/case-studies" }
    ],
    company: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms", href: "/terms" }
    ]
  } as FooterNavigation,
  ctas: {
    primary: {
      label: "Start Request",
      href: "/contact"
    } as NavigationCTA,
    secondary: {
      label: "Book Demo",
      href: "/contact"
    } as NavigationCTA
  }
} as const;

export const navigationConfig = {
  logoLabel: "Shotgun",
  items: navigation.main,
  sections: navigation.sections,
  footer: navigation.footer,
  ctas: navigation.ctas,
  mobileMenuAriaLabel: "Toggle navigation menu"
} as const;

export const primaryNavigation: NavigationItem[] = [...navigation.main];
