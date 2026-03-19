import type { Metadata } from "next";

import { TrackedCtaLink } from "@/components/lp/TrackedCtaLink";
import { createPageMetadata } from "@/seo/metadata";

import styles from "./LandingPage.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Shopify agency alternative | Krish.",
  description:
    "Replace your Shopify agency with Krish. for $1,000/month. Unlimited tasks, first 7 days free, no contract, no credit card.",
  path: "/lp/shopify-agency-alternative"
});

export default function ShopifyAgencyAlternativeLandingPage() {
  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <span className={styles.logo} aria-label="Krish logo">
          Krish.
        </span>
      </header>

      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Replace your Shopify agency for $1,000/month.</h1>
        <p className={styles.heroSubtitle}>Unlimited tasks. No scoping calls. No project managers.</p>
        <TrackedCtaLink className={styles.primaryCta} eventPage="lp-agency-alternative" href="https://app.heykrish.ai">
          Start Free — First 7 Days on Us
        </TrackedCtaLink>
        <p className={styles.trustText}>No contract. No credit card.</p>

        <ul className={styles.painList}>
          <li>Agency takes weeks for simple changes</li>
          <li>Freelancers ghost you</li>
          <li>Your backlog keeps growing</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>The old way vs. Krish.</h2>
        <div className={styles.comparisonWrap}>
          <table className={styles.comparisonTable}>
            <thead>
              <tr>
                <th scope="col">Criteria</th>
                <th scope="col">Agency</th>
                <th className={styles.krishHeader} scope="col">
                  Krish.
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Simple change</th>
                <td>3–5 days</td>
                <td className={styles.krishCell}>Hours</td>
              </tr>
              <tr>
                <th scope="row">Monthly cost</th>
                <td>$3,000–$8,000</td>
                <td className={styles.krishCell}>$1,000</td>
              </tr>
              <tr>
                <th scope="row">Onboarding</th>
                <td>1–2 weeks</td>
                <td className={styles.krishCell}>Same day</td>
              </tr>
              <tr>
                <th scope="row">Contract</th>
                <td>12 months</td>
                <td className={styles.krishCell}>None</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>How it works</h2>
        <ol className={styles.stepsList}>
          <li>Send your Shopify request via Slack, WhatsApp, or email</li>
          <li>AI + expert devs execute and QA the work</li>
          <li>Your change goes live — verified and ready</li>
        </ol>
      </section>

      <section className={styles.pricingSection}>
        <h2 className={styles.sectionTitle}>Pricing</h2>
        <p className={styles.priceLine}>$1,000/month — unlimited tasks</p>
        <p className={styles.pricingSubtext}>First 7 days free.</p>
        <TrackedCtaLink className={styles.primaryCta} eventPage="lp-agency-alternative" href="https://app.heykrish.ai">
          Start Free — First 7 Days on Us
        </TrackedCtaLink>
        <p className={styles.trustText}>No contract. No credit card.</p>
      </section>
    </div>
  );
}
