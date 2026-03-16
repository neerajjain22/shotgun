import type { Metadata } from "next";
import Link from "next/link";

import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { Hero } from "@/components/hero/Hero";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Section } from "@/components/sections/Section";
import { Card } from "@/components/ui/Card";
import { createPageMetadata } from "@/seo/metadata";

import styles from "./FreeMonthOfferPage.module.css";

const pagePath = "/free-shopify-development-first-month-offer";

function createPlaceholderImage(label: string, backgroundColor: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="640" viewBox="0 0 960 640" role="img" aria-label="${label}"><rect width="960" height="640" fill="${backgroundColor}"/><rect x="80" y="100" width="800" height="440" rx="28" fill="#ffffff" fill-opacity="0.92"/><text x="480" y="320" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="30" fill="#1F2937">${label}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const heroImage = createPlaceholderImage("Shopify task execution preview", "#EEF1FF");

const freeMonthTasks = [
  {
    title: "Fix mobile layout issues",
    description: "Broken sections, overlapping content, or styling issues."
  },
  {
    title: "Make homepage banners clickable",
    description: "Turn static banners into conversion-driving links."
  },
  {
    title: "Improve product page layout",
    description: "Rearrange sections, improve clarity, and add trust signals."
  },
  {
    title: "Add personalization fields",
    description: "Allow customers to enter names or custom text before checkout."
  },
  {
    title: "Launch Shopify promotions",
    description: "Configure discount codes, bundles, or promotional banners."
  },
  {
    title: "Improve Shopify store performance",
    description: "Remove slow scripts and optimize loading speed."
  }
] as const;

const freeMonthSteps = [
  {
    title: "Submit a request",
    description: "Describe the Shopify change you need."
  },
  {
    title: "Task evaluation",
    description: "Our team reviews the request and confirms scope."
  },
  {
    title: "Implementation",
    description: "Developers complete the change using AI plus human review."
  },
  {
    title: "Ready to deploy",
    description: "You review the change and push it live."
  }
] as const;

export const metadata: Metadata = createPageMetadata({
  title: "Free Shopify Development – First Month Free | Shotgun",
  description:
    "Try Shotgun with a free first month. Submit Shopify development tasks and get them completed quickly without hiring freelancers.",
  path: pagePath
});

export default function FreeShopifyDevelopmentFirstMonthOfferPage() {
  return (
    <main>
      <Hero
        headline="Get your Shopify development tasks done — first month free"
        subheadline="Try Shotgun with zero risk. Submit Shopify tasks and our developers complete them for you. No contracts. No hiring freelancers. Just finished work."
        primaryCta={{ label: "Start Free Month", href: "/contact" }}
        secondaryCta={{ label: "View Example Tasks", href: `${pagePath}#example-tasks` }}
        ctaMicrocopy="No credit card required. Cancel anytime."
        image={{
          src: heroImage,
          alt: "Shopify development execution visual"
        }}
        mediaSlot={
          <Card as="section" className={styles.heroFormCard}>
            <h2 className={styles.heroFormTitle}>Start your free month</h2>
            <p className={styles.heroFormDescription}>
              Share your first task details and we will handle implementation.
            </p>
            <LeadCaptureForm />
          </Card>
        }
      />

      <Section>
        <Card as="p" className={styles.offerHighlight}>
          First month free — up to 5 Shopify development tasks
        </Card>
      </Section>

      <Section id="example-tasks">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Use your free month to fix the Shopify tasks that keep getting delayed</h2>
        </div>
        <div className={styles.taskGrid}>
          {freeMonthTasks.map((task) => (
            <Card as="article" className={styles.taskCard} key={task.title}>
              <h3 className={styles.cardTitle}>{task.title}</h3>
              <p className={styles.cardDescription}>{task.description}</p>
            </Card>
          ))}
        </div>
        <p className={styles.sectionNote}>
          Most Shopify stores accumulate dozens of small fixes.
          <br />
          Shotgun helps you clear them quickly.
        </p>
        <p className={styles.inlineLinkNote}>
          Need more examples? Explore <Link href="/use-cases">Shopify use cases</Link>.
        </p>
      </Section>

      <Section>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Start submitting Shopify tasks immediately</h2>
        </div>
        <div className={styles.stepsGrid}>
          {freeMonthSteps.map((step, index) => (
            <Card as="article" className={styles.stepCard} key={step.title} hover>
              <p className={styles.stepNumber}>STEP {index + 1}</p>
              <h3 className={styles.cardTitle}>{step.title}</h3>
              <p className={styles.cardDescription}>{step.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <Card as="article" className={styles.whyCard}>
          <h2 className={styles.sectionTitle}>Why we offer a free month</h2>
          <p className={styles.bodyText}>Most Shopify teams experience the same frustration:</p>
          <ul className={styles.problemList}>
            <li>Small changes take days or weeks</li>
            <li>Freelancers disappear mid-project</li>
            <li>Agencies are expensive for simple tasks</li>
          </ul>
          <p className={styles.bodyText}>Shotgun exists to remove this friction.</p>
          <p className={styles.bodyText}>
            The best way to understand the value is to experience it directly, which is why we offer the first month
            free for Shopify teams.
          </p>
        </Card>
      </Section>

      <FeatureGrid
        sectionTitle="Perfect for Shopify teams that move fast"
        features={[
          {
            title: "Shopify founders",
            description: "Fix store issues without hiring developers."
          },
          {
            title: "Growth teams",
            description: "Launch campaigns and landing pages faster."
          },
          {
            title: "Product teams",
            description: "Continuously improve the store experience."
          }
        ]}
      />

      <FAQSection
        sectionTitle="Frequently asked questions"
        faqs={[
          {
            question: "How many tasks can I submit in the free month?",
            answer: "Up to 5 Shopify development tasks."
          },
          {
            question: "What counts as a task?",
            answer:
              "Layout changes, theme edits, banner updates, navigation changes, performance improvements, and similar Shopify development updates."
          },
          {
            question: "Do I need to sign a contract?",
            answer: "No. The free month has no commitment."
          },
          {
            question: "Do I need to add a credit card?",
            answer: "No credit card is required to start."
          },
          {
            question: "What happens after the free month?",
            answer: "You can choose to continue with a paid Shotgun plan."
          },
          {
            question: "How fast are tasks completed?",
            answer: "Most tasks are completed within 1–2 business days."
          }
        ]}
      />

      <CTASection
        headline="Start your free month of Shopify development"
        description="Submit your first task in minutes."
        primaryCTA={{ label: "Start Free Month", href: "/contact" }}
        secondaryCTA={{ label: "Book Demo", href: "/contact" }}
        microcopy="First month free for early users."
      />
    </main>
  );
}
