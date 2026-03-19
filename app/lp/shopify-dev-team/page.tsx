import type { Metadata } from "next";

import { createPageMetadata } from "@/seo/metadata";

import { CtaTrackedLink } from "./CtaTrackedLink";
import styles from "./LandingPage.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Your Shopify tasks, done in hours",
  description:
    "AI + expert developers for Shopify execution. No agency. No freelancers. Start free with your first 7 days on us.",
  path: "/lp/shopify-dev-team"
});

export default function ShopifyDevTeamLandingPage() {
  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <span className={styles.logo} aria-label="Krish logo">
          Krish.
        </span>
      </header>

      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Your Shopify tasks, done in hours.</h1>
        <p className={styles.heroSubtitle}>AI + expert developers. No agency. No freelancers.</p>
        <CtaTrackedLink className={styles.primaryCta} href="/contact">
          Start Free — First 7 Days on Us
        </CtaTrackedLink>
        <p className={styles.trustText}>No contract. No credit card.</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Why teams switch</h2>
        <ul className={styles.painList}>
          <li>Agency takes weeks for simple changes</li>
          <li>Freelancers ghost you</li>
          <li>Your backlog keeps growing</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>How it works</h2>
        <ol className={styles.stepsList}>
          <li>Send a Shopify task in plain language</li>
          <li>We execute and QA it</li>
          <li>It&apos;s live on your store</li>
        </ol>
      </section>

      <section className={styles.pricingSection}>
        <h2 className={styles.sectionTitle}>Pricing</h2>
        <p className={styles.priceLine}>$1,000/month — unlimited tasks</p>
        <p className={styles.pricingSubtext}>First 7 days free.</p>
        <CtaTrackedLink className={styles.primaryCta} href="/contact">
          Start Free — First 7 Days on Us
        </CtaTrackedLink>
        <p className={styles.trustText}>No contract. No credit card.</p>
      </section>
    </div>
  );
}
