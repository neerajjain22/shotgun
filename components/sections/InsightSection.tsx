import { Card } from "@/components/ui/Card";
import { Section } from "@/components/sections/Section";
import type { InsightSectionContent } from "@/types/marketing-page";

import styles from "./InsightSection.module.css";

type InsightSectionProps = InsightSectionContent;

export function InsightSection({ sectionTitle, sectionDescription, bullets }: InsightSectionProps) {
  return (
    <Section>
      <div className={styles.header}>
        <h2 className={styles.title}>{sectionTitle}</h2>
        <p className={styles.description}>{sectionDescription}</p>
      </div>

      <ul className={styles.list}>
        {bullets.map((bullet) => (
          <li className={styles.item} key={bullet}>
            <Card as="article" className={styles.card}>
              <p>{bullet}</p>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
