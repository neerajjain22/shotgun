import type { ReactNode } from "react";

import { Card } from "@/components/ui/Card";
import { Section } from "@/components/sections/Section";

type StepItem = {
  stepNumber: string;
  title: string;
  description: string;
  icon?: ReactNode;
};

type StepsSectionProps = {
  sectionTitle: string;
  steps: StepItem[];
};

import styles from "./StepsSection.module.css";

export function StepsSection({ sectionTitle, steps }: StepsSectionProps) {
  return (
    <Section>
      <div className={styles.header}>
        <h2 className={styles.title}>{sectionTitle}</h2>
      </div>

      <div className={styles.grid}>
        {steps.map((step) => (
          <Card className={styles.stepCard} hover key={`${step.stepNumber}-${step.title}`}>
            <p className={styles.stepNumber}>{step.stepNumber}</p>
            {step.icon ? (
              <span aria-hidden="true" className={styles.stepIcon}>
                {step.icon}
              </span>
            ) : null}
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDescription}>{step.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
