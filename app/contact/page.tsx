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
            <li>Add a deadline if this task is tied to a launch date.</li>
          </ul>
          <p className={styles.note}>Response expectation: we reply within 1 business day.</p>
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
