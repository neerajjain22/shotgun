import { Section } from "@/components/sections/Section";

type LogoItem = {
  name: string;
  logo: string;
};

type LogoGridProps = {
  sectionTitle: string;
  logos: LogoItem[];
};

import styles from "./LogoGrid.module.css";

export function LogoGrid({ sectionTitle, logos }: LogoGridProps) {
  return (
    <Section alignment="center">
      <div className={styles.header}>
        <h2 className={styles.title}>{sectionTitle}</h2>
      </div>

      <ul className={styles.grid}>
        {logos.map((item) => (
          <li className={styles.item} key={item.name}>
            <img alt={`${item.name} logo`} className={styles.logo} src={item.logo} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
