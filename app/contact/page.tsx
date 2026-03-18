import type { Metadata } from "next";

import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { Section } from "@/components/sections/Section";
import { Card } from "@/components/ui/Card";
import { createPageMetadata } from "@/seo/metadata";

import styles from "./ContactPage.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Start Request",
  description:
    "Submit your Shopify development request to Krish. Share your store URL and task details to get implementation support quickly.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <Section>
      <div className={styles.grid}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Start Request</p>
          <h1 className={styles.title}>Share your Shopify task</h1>
          <p className={styles.description}>
            Tell us what change you need and we will handle implementation. Most teams send requests
            through Slack, WhatsApp, or email.
          </p>
          <ul className={styles.checklist}>
            <li>Include the store URL and the page you want to update.</li>
            <li>Describe what should happen after the change is live.</li>
            <li>Include business context so we can prioritize implementation correctly.</li>
          </ul>
          <p className={styles.note}>Response expectation: we reply within 1 business day.</p>

          <section className={styles.contactInfo} aria-label="Contact information">
            <div className={styles.infoBlock}>
              <h2 className={styles.infoTitle}>Email Us</h2>
              <p className={styles.infoText}>For sales questions, partnerships, or product support.</p>
              <p className={styles.infoText}>
                <a className={styles.emailLink} href="mailto:contact@heykrish.ai">
                  contact@heykrish.ai
                </a>
              </p>
              <p className={styles.infoText}>We typically respond within one business day.</p>
            </div>

            <div className={styles.infoBlock}>
              <h2 className={styles.infoTitle}>Our Offices</h2>

              <div className={styles.officeGroup}>
                <h3 className={styles.officeTitle}>USA</h3>
                <p className={styles.infoText}>380 Brannan St</p>
                <p className={styles.infoText}>San Francisco, CA 94107</p>
              </div>

              <div className={styles.officeGroup}>
                <h3 className={styles.officeTitle}>India</h3>
                <p className={styles.infoText}>1781, 19th Main Road, HSR Layout</p>
                <p className={styles.infoText}>Bengaluru - 560087</p>
                <p className={styles.infoText}>Karnataka</p>
              </div>
            </div>
          </section>
        </div>

        <Card as="section" className={styles.formCard}>
          <h2 className={styles.formTitle}>Request details</h2>
          <p className={styles.formDescription}>
            Fill in the form below. We will review your request and follow up with next steps.
          </p>
          <LeadCaptureForm />
        </Card>
      </div>
    </Section>
  );
}
