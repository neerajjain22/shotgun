import type { ReactNode } from "react";

import { FeatureCard } from "@/components/cards/FeatureCard";
import { Section } from "@/components/sections/Section";

type FeatureGridItem = {
  title: string;
  description: string;
  icon?: ReactNode;
};

type FeatureGridProps = {
  sectionTitle: string;
  sectionDescription?: string;
  features: FeatureGridItem[];
};

import styles from "./FeatureGrid.module.css";

export function FeatureGrid({ sectionTitle, sectionDescription, features }: FeatureGridProps) {
  return (
    <Section>
      <div className={styles.header}>
        <h2 className={styles.title}>{sectionTitle}</h2>
        {sectionDescription ? <p className={styles.description}>{sectionDescription}</p> : null}
      </div>

      <div className={styles.grid}>
        {features.map((feature) => (
          <FeatureCard
            key={`${feature.title}-${feature.description}`}
            description={feature.description}
            icon={feature.icon}
            title={feature.title}
          />
        ))}
      </div>
    </Section>
  );
}
