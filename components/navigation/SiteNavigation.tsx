import Link from "next/link";

import { primaryNavigation } from "@/config/navigation";

import styles from "./SiteNavigation.module.css";

export function SiteNavigation() {
  return (
    <nav aria-label="Primary" className={styles.nav}>
      <ul className={styles.list}>
        {primaryNavigation.map((item) => (
          <li key={item.href}>
            <Link className={styles.link} href={item.href}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
