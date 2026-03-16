import Image from "next/image";

import { Section } from "@/components/sections/Section";

type TwoColumnImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type TwoColumnSectionProps = {
  headline: string;
  description: string;
  image: TwoColumnImage;
};

import styles from "./TwoColumnSection.module.css";

export function TwoColumnSection({ headline, description, image }: TwoColumnSectionProps) {
  return (
    <Section>
      <div className={styles.grid}>
        <div className={styles.content}>
          <h2 className={styles.headline}>{headline}</h2>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.media}>
          <Image
            alt={image.alt}
            className={styles.image}
            height={image.height ?? 420}
            src={image.src}
            width={image.width ?? 640}
          />
        </div>
      </div>
    </Section>
  );
}
