import type { Metadata } from "next";

import { Section } from "@/components/sections/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { createPageMetadata } from "@/seo/metadata";

import styles from "./SuccessPage.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Request Received",
  description:
    "Your Shopify task request was submitted successfully. Shotgun will review your request and follow up with next steps.",
  path: "/contact/success",
  noIndex: true
});

export default function ContactSuccessPage() {
  return (
    <Section>
      <Card className={styles.card}>
        <p className={styles.eyebrow}>Request submitted</p>
        <h1 className={styles.title}>Your Shopify request is in review</h1>
        <p className={styles.description}>
          We received your task details. Our team will review the request and respond with the next
          implementation steps.
        </p>

        <ul className={styles.nextSteps}>
          <li>Initial response within 1 business day.</li>
          <li>We may ask quick clarifying questions before implementation starts.</li>
          <li>You will receive a clear delivery update once the task is completed.</li>
        </ul>

        <div className={styles.actions}>
          <Button href="/contact" variant="primary">
            Submit another task
          </Button>
          <Button href="/use-cases" variant="secondary">
            See Use Cases
          </Button>
        </div>
      </Card>
    </Section>
  );
}
