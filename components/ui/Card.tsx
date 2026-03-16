import type { ElementType, ReactNode } from "react";

import styles from "./Card.module.css";

type CardProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  hover?: boolean;
};

export function Card({ children, className, as: Component = "article", hover = false }: CardProps) {
  const classes = [styles.card, hover ? styles.hover : "", className ?? ""].filter(Boolean).join(" ");

  return <Component className={classes}>{children}</Component>;
}
