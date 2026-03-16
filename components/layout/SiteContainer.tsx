import type { ReactNode } from "react";

import styles from "./SiteContainer.module.css";

type SiteContainerProps = {
  children: ReactNode;
};

export function SiteContainer({ children }: SiteContainerProps) {
  return <div className={styles.container}>{children}</div>;
}
