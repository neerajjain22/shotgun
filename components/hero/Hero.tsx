import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";

import { Section } from "@/components/sections/Section";

import { HeroWorkflow } from "./HeroWorkflow";
import styles from "./Hero.module.css";

type HeroAction = {
  label: string;
  href: string;
};

type HeroImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type HeroProps = {
  headline: ReactNode;
  subheadline: string;
  primaryCta: HeroAction;
  secondaryCta?: HeroAction;
  ctaMicrocopy?: string;
  image?: HeroImage;
  mediaSlot?: ReactNode;
};

export function Hero({ headline, subheadline, primaryCta, secondaryCta, ctaMicrocopy, image, mediaSlot }: HeroProps) {
  void ctaMicrocopy;

  return (
    <Section>
      <div className={styles.grid}>
        <div className={styles.content}>
          <h1 className={styles.headline}>{headline}</h1>
          <p className={styles.subheadline}>{subheadline}</p>
          <div className={styles.actions}>
            <Button href={primaryCta.href} variant="primary">
              {primaryCta.label}
            </Button>
            {secondaryCta ? (
              <Button href={secondaryCta.href} variant="secondary">
                {secondaryCta.label}
              </Button>
            ) : null}
          </div>
        </div>

        <div className={styles.media}>
          {mediaSlot ?? <HeroWorkflow fallbackImage={image} />}
        </div>
      </div>
    </Section>
  );
}
