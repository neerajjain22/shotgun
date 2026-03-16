import { Card } from "@/components/ui/Card";
import { Section } from "@/components/sections/Section";
import type { ChecklistSectionContent } from "@/types/marketing-page";

import styles from "./ChecklistSection.module.css";

type ChecklistSectionProps = ChecklistSectionContent;

export function ChecklistSection({ sectionTitle, sectionDescription, items }: ChecklistSectionProps) {
  return (
    <Section>
      <Card as="article" className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>{sectionTitle}</h2>
          {sectionDescription ? <p className={styles.description}>{sectionDescription}</p> : null}
        </div>

        <ul className={styles.list}>
          {items.map((item) => (
            <li className={styles.item} key={item}>
              <span aria-hidden className={styles.marker}>
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Card>
    </Section>
  );
}
