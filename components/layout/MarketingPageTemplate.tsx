import { CTASection } from "@/components/sections/CTASection";
import { ChecklistSection } from "@/components/sections/ChecklistSection";
import { ExampleTasksSection } from "@/components/sections/ExampleTasksSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { InsightSection } from "@/components/sections/InsightSection";
import { Section } from "@/components/sections/Section";
import { StepsSection } from "@/components/sections/StepsSection";
import { UseCaseCard } from "@/components/cards/UseCaseCard";
import { Button } from "@/components/ui/Button";
import type { MarketingPageContent } from "@/types/marketing-page";

import styles from "./MarketingPageTemplate.module.css";

type MarketingPageTemplateProps = {
  content: MarketingPageContent;
};

export function MarketingPageTemplate({ content }: MarketingPageTemplateProps) {
  return (
    <main>
      <Section>
        <div className={styles.introCard}>
          {content.intro.eyebrow ? <p className={styles.eyebrow}>{content.intro.eyebrow}</p> : null}
          <h1 className={styles.title}>{content.intro.title}</h1>
          <p className={styles.description}>{content.intro.description}</p>

          {content.intro.primaryCta || content.intro.secondaryCta ? (
            <div className={styles.actions}>
              {content.intro.primaryCta ? (
                <Button href={content.intro.primaryCta.href} variant="primary">
                  {content.intro.primaryCta.label}
                </Button>
              ) : null}
              {content.intro.secondaryCta ? (
                <Button href={content.intro.secondaryCta.href} variant="secondary">
                  {content.intro.secondaryCta.label}
                </Button>
              ) : null}
            </div>
          ) : null}
          {content.intro.microcopy ? <p className={styles.ctaMicrocopy}>{content.intro.microcopy}</p> : null}
        </div>
      </Section>

      {content.linkedCardsSection ? (
        <Section>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{content.linkedCardsSection.sectionTitle}</h2>
            {content.linkedCardsSection.sectionDescription ? (
              <p className={styles.sectionDescription}>{content.linkedCardsSection.sectionDescription}</p>
            ) : null}
          </div>

          <div className={styles.cardsGrid}>
            {content.linkedCardsSection.cards.map((card) => (
              <UseCaseCard
                key={card.href}
                description={card.description}
                href={card.href}
                icon={card.icon}
                title={card.title}
              />
            ))}
          </div>
        </Section>
      ) : null}

      {content.featureSection ? (
        <FeatureGrid
          features={content.featureSection.features}
          sectionDescription={content.featureSection.sectionDescription}
          sectionTitle={content.featureSection.sectionTitle}
        />
      ) : null}

      {content.stepsSection ? (
        <StepsSection sectionTitle={content.stepsSection.sectionTitle} steps={content.stepsSection.steps} />
      ) : null}

      {content.insightSections?.map((insightSection, index) => (
        <InsightSection
          key={`${insightSection.sectionTitle}-${index}`}
          bullets={insightSection.bullets}
          sectionDescription={insightSection.sectionDescription}
          sectionTitle={insightSection.sectionTitle}
        />
      ))}

      {content.checklistSection ? (
        <ChecklistSection
          items={content.checklistSection.items}
          sectionDescription={content.checklistSection.sectionDescription}
          sectionTitle={content.checklistSection.sectionTitle}
        />
      ) : null}

      {content.tasksSection ? (
        <ExampleTasksSection
          sectionTitle={content.tasksSection.sectionTitle}
          taskPrompt={content.tasksSection.taskPrompt}
          tasks={content.tasksSection.tasks}
        />
      ) : null}

      {content.faqSection ? <FAQSection faqs={content.faqSection.faqs} sectionTitle={content.faqSection.sectionTitle} /> : null}

      {content.finalCta ? (
        <CTASection
          description={content.finalCta.description}
          headline={content.finalCta.headline}
          microcopy={content.finalCta.microcopy}
          primaryCTA={content.finalCta.primaryCTA}
          secondaryCTA={content.finalCta.secondaryCTA}
        />
      ) : null}
    </main>
  );
}
