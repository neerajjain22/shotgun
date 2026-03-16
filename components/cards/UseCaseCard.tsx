import Link from "next/link";
import type { ReactNode } from "react";

import { Card } from "@/components/ui/Card";

import styles from "./UseCaseCard.module.css";

type UseCaseCardProps = {
  title: string;
  description: string;
  href: string;
  icon?: ReactNode;
};

export function UseCaseCard({ title, description, href, icon }: UseCaseCardProps) {
  return (
    <Card className={styles.card} hover>
      <div className={styles.head}>
        {icon ? <span className={styles.icon}>{icon}</span> : null}
        <h3 className={styles.title}>{title}</h3>
      </div>
      <p className={styles.description}>{description}</p>
      <Link className={styles.link} href={href}>
        Learn more
      </Link>
    </Card>
  );
}
