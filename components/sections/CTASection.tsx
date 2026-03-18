import { Section } from "@/components/sections/Section";
import { Button } from "@/components/ui/Button";
import type { PageAction } from "@/types/marketing-page";

type CTASectionProps = {
  headline: string;
  description: string;
  primaryCTA: PageAction;
  secondaryCTA?: PageAction;
  microcopy?: string;
};

import styles from "./CTASection.module.css";

export function CTASection({ headline, description, primaryCTA, secondaryCTA, microcopy }: CTASectionProps) {
  void microcopy;

  return (
    <Section>
      <div className={styles.wrapper}>
        <h2 className={styles.headline}>{headline}</h2>
        <p className={styles.description}>{description}</p>
        <div className={styles.actions}>
          <Button href={primaryCTA.href} variant="primary">
            {primaryCTA.label}
          </Button>
          {secondaryCTA ? (
            <Button href={secondaryCTA.href} variant="secondary">
              {secondaryCTA.label}
            </Button>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
