import type { ElementType, ReactNode } from "react";

import { PageContainer } from "@/components/layout/PageContainer";

import styles from "./Section.module.css";

type SectionAlignment = "left" | "center";

type SectionProps = {
  children: ReactNode;
  id?: string;
  as?: ElementType;
  className?: string;
  alignment?: SectionAlignment;
  contained?: boolean;
};

export function Section({
  children,
  id,
  as: Component = "section",
  className,
  alignment = "left",
  contained = true
}: SectionProps) {
  const sectionClasses = [
    styles.section,
    alignment === "center" ? styles.center : "",
    className ?? ""
  ]
    .filter(Boolean)
    .join(" ");

  const content = contained ? <PageContainer>{children}</PageContainer> : children;

  return (
    <Component id={id} className={sectionClasses}>
      {content}
    </Component>
  );
}
