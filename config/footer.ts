import { navigation } from "@/config/navigation";

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterLinkGroup = {
  title: string;
  links: FooterLink[];
};

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "Product",
    links: [...navigation.footer.product]
  },
  {
    title: "Use Cases",
    links: [...navigation.footer.useCases]
  },
  {
    title: "Resources",
    links: [...navigation.footer.resources]
  },
  {
    title: "Company",
    links: [...navigation.footer.company]
  }
];
