import type { Metadata } from "next";

import { Hero } from "@/components/hero/Hero";
import { CTASection } from "@/components/sections/CTASection";
import { ExampleTasksSection } from "@/components/sections/ExampleTasksSection";
import { ExecutionPipeline } from "@/components/sections/ExecutionPipeline";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { LogoGrid } from "@/components/sections/LogoGrid";
import { Section } from "@/components/sections/Section";
import { Card } from "@/components/ui/Card";
import { siteConfig } from "@/config/site";

function createPlaceholderImage(label: string, backgroundColor: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="640" viewBox="0 0 960 640" role="img" aria-label="${label}"><rect width="960" height="640" fill="${backgroundColor}"/><rect x="80" y="100" width="800" height="440" rx="28" fill="#ffffff" fill-opacity="0.92"/><text x="480" y="320" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="32" fill="#1F2937">${label}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const heroImage = createPlaceholderImage("Shopify task request dashboard", "#EEF1FF");

export const metadata: Metadata = {
  title: "Shopify development help for small tasks | Shotgun",
  description:
    "Get help with Shopify theme changes, product page updates, bug fixes, and other Shopify development tasks without hiring or managing developers.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    url: siteConfig.url,
    title: "Shopify development help for small tasks | Shotgun",
    description:
      "Get help with Shopify theme changes, product page updates, bug fixes, and other Shopify development tasks without hiring or managing developers."
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopify development help for small tasks | Shotgun",
    description:
      "Get help with Shopify theme changes, product page updates, bug fixes, and other Shopify development tasks without hiring or managing developers."
  }
};

export default function HomePage() {
  return (
    <main>
      <Hero
        headline={
          <>
            Shopify development execution
            <br />
            for growing stores
          </>
        }
        image={{
          src: heroImage,
          alt: "Placeholder showing Shopify development request workflow"
        }}
        primaryCta={{ label: "Start Request", href: "/contact" }}
        secondaryCta={{
          label: "View Product",
          href: "/product"
        }}
        ctaMicrocopy="Start with one task. We reply within 1 business day."
        subheadline="Shotgun helps Shopify teams get store updates completed without managing freelancers or agency workflows. Visit Product for detailed fit, workflow, and buying guidance."
      />

      <FeatureGrid
        features={[
          {
            title: "Small Shopify changes still require developers",
            description:
              "Updating a banner, changing a layout, or modifying a product page often requires developer help."
          },
          {
            title: "Freelancers can be unreliable",
            description: "Quality and turnaround time vary widely."
          },
          {
            title: "Communication happens across many tools",
            description: "Requests are often spread across Slack, email, and documents."
          }
        ]}
        sectionDescription="Many Shopify teams depend on developers for even small store updates. Managing those developers often slows down execution."
        sectionTitle="Why Shopify development tasks take too long"
      />

      <ExecutionPipeline />

      <ExampleTasksSection
        sectionTitle="Common Shopify development tasks"
        tasks={[
          {
            title: "Make a homepage banner clickable",
            problemDescription:
              "Customers can only click the button instead of the entire banner image.",
            difficultyLabel: "Requires theme code",
            theme: "peach"
          },
          {
            title: "Fix mobile layout issues",
            problemDescription:
              "The store looks fine on desktop but breaks or overlaps on mobile devices.",
            difficultyLabel: "Requires CSS fixes",
            theme: "blue"
          },
          {
            title: "Change the layout of a Shopify product page",
            problemDescription:
              "The theme editor does not allow moving elements where they need them.",
            difficultyLabel: "Requires Liquid customization",
            theme: "violet"
          },
          {
            title: "Add personalization fields to products",
            problemDescription:
              "Customers should be able to enter a name or message before checkout.",
            difficultyLabel: "Requires Liquid customization",
            theme: "mint"
          },
          {
            title: "Launch a Shopify promotion with discount codes",
            problemDescription:
              "Setting up promotions requires coordinating discounts, banners, and messaging.",
            difficultyLabel: "Requires promotion setup",
            theme: "amber"
          },
          {
            title: "Improve Shopify store performance",
            problemDescription: "Too many apps and heavy assets slow down the store.",
            difficultyLabel: "Requires performance optimization",
            theme: "rose"
          },
          {
            title: "Update homepage sections",
            problemDescription:
              "Rearranging or adding sections often requires theme customization.",
            difficultyLabel: "Requires theme customization",
            theme: "green"
          },
          {
            title: "Add collections to the navigation menu",
            problemDescription: "Menus become confusing when collections change or expand.",
            difficultyLabel: "Requires navigation configuration",
            theme: "slate"
          }
        ]}
        taskPrompt={{
          title: "Not seeing your task?",
          description: "Describe the Shopify change you need and we'll handle it.",
          inputPlaceholder: "Example: Add a countdown timer for Black Friday"
        }}
      />

      <FeatureGrid
        features={[
          {
            title: "Shopify founders",
            description: "Get help with development tasks without hiring developers."
          },
          {
            title: "Growth and marketing teams",
            description: "Launch campaigns and landing pages faster."
          },
          {
            title: "Product teams",
            description: "Improve the store experience continuously."
          }
        ]}
        sectionTitle="Who uses Shotgun"
      />

      <LogoGrid
        logos={[
          { name: "Shopify Team Alpha", logo: createPlaceholderImage("Alpha", "#F1F3FF") },
          { name: "Shopify Team Beta", logo: createPlaceholderImage("Beta", "#EAF9F5") },
          { name: "Shopify Team Gamma", logo: createPlaceholderImage("Gamma", "#FFF3F5") },
          { name: "Shopify Team Delta", logo: createPlaceholderImage("Delta", "#EEF2FF") },
          { name: "Shopify Team Epsilon", logo: createPlaceholderImage("Epsilon", "#F3F7FF") }
        ]}
        sectionTitle="Used by Shopify teams"
      />

      <Section>
        <Card as="blockquote">
          <p>
            Testimonial placeholder: &quot;Shotgun helped us ship Shopify updates faster without needing to
            manage separate developers for every request.&quot;
          </p>
          <p>
            <strong>Shopify team testimonial placeholder</strong>
          </p>
        </Card>
      </Section>

      <CTASection
        description="Submit a request and Shotgun will complete the implementation."
        headline="Need help with a Shopify development task?"
        primaryCTA={{ label: "Start Request", href: "/contact" }}
        secondaryCTA={{ label: "View Product", href: "/product" }}
        microcopy="Share one Shopify task. We reply within 1 business day."
      />
    </main>
  );
}
