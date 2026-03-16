import type { ReactNode } from "react";

import { Card } from "@/components/ui/Card";

import styles from "./FeatureCard.module.css";

type FeatureCardProps = {
  title: string;
  description: string;
  icon?: ReactNode;
};

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <Card className={styles.card} hover>
      {icon ? <div className={styles.icon}>{icon}</div> : null}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </Card>
  );
}
