import { Card } from "@/components/ui/Card";
import { Section } from "@/components/sections/Section";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  sectionTitle: string;
  faqs: FAQItem[];
};

import styles from "./FAQSection.module.css";

export function FAQSection({ sectionTitle, faqs }: FAQSectionProps) {
  return (
    <Section>
      <div className={styles.header}>
        <h2 className={styles.title}>{sectionTitle}</h2>
      </div>

      <div className={styles.list}>
        {faqs.map((faq) => (
          <Card as="div" className={styles.item} key={faq.question}>
            <details className={styles.details}>
              <summary className={styles.question}>{faq.question}</summary>
              <p className={styles.answer}>{faq.answer}</p>
            </details>
          </Card>
        ))}
      </div>
    </Section>
  );
}
