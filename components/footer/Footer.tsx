import Link from "next/link";

import { PageContainer } from "@/components/layout/PageContainer";
import { navigationConfig } from "@/config/navigation";
import { siteConfig } from "@/config/site";

import styles from "./Footer.module.css";

const footerGroupMap = [
  { key: "product", title: "Product" },
  { key: "useCases", title: "Use Cases" },
  { key: "resources", title: "Resources" },
  { key: "company", title: "Company" }
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <PageContainer>
        <div className={styles.brandRow}>
          <Link aria-label="Go to homepage" className={styles.logo} href="/">
            {siteConfig.name}
          </Link>
        </div>

        <div className={styles.grid}>
          {footerGroupMap.map((group) => (
            <nav aria-label={group.title} className={styles.group} key={group.key}>
              <h2 className={styles.title}>{group.title}</h2>
              <ul className={styles.list}>
                {navigationConfig.footer[group.key].map((link) => (
                  <li key={link.href}>
                    <Link className={styles.link} href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className={styles.bottom}>
          <small>
            {year} {siteConfig.copyrightLabel}. All rights reserved.
          </small>
        </div>
      </PageContainer>
    </footer>
  );
}
