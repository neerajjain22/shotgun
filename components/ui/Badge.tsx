import type { ReactNode } from "react";

import styles from "./Badge.module.css";

type BadgeVariant = "neutral" | "accent" | "highlight";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

export function Badge({ children, variant = "neutral", className }: BadgeProps) {
  const classes = [
    styles.badge,
    variant === "accent" ? styles.accent : "",
    variant === "highlight" ? styles.highlight : "",
    className ?? ""
  ]
    .filter(Boolean)
    .join(" ");

  return <span className={classes}>{children}</span>;
}
