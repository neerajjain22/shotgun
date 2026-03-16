import type {
  FinalCtaContent,
  PageAction,
  StandardSecondaryCtaLabel
} from "@/types/marketing-page";

type SecondaryCtaAction = PageAction & {
  label: StandardSecondaryCtaLabel;
};

export const standardPrimaryCta: PageAction = {
  label: "Start Request",
  href: "/contact"
};

export const standardSecondaryCtas: Record<
  "seeUseCases" | "compareOptions" | "readGuides" | "viewProduct",
  SecondaryCtaAction
> = {
  seeUseCases: {
    label: "See Use Cases",
    href: "/use-cases"
  },
  compareOptions: {
    label: "Compare Options",
    href: "/compare"
  },
  readGuides: {
    label: "Read Guides",
    href: "/guides"
  },
  viewProduct: {
    label: "View Product",
    href: "/product"
  }
};

export const standardCtaMicrocopy = "Share one Shopify task. We reply within 1 business day.";

export function createStandardFinalCta(
  headline: string,
  description: string,
  secondaryCTA: PageAction = standardSecondaryCtas.seeUseCases
): FinalCtaContent {
  return {
    headline,
    description,
    primaryCTA: standardPrimaryCta,
    secondaryCTA,
    microcopy: standardCtaMicrocopy
  };
}
