export type PageAction = {
  label: string;
  href: string;
};

export type StandardSecondaryCtaLabel =
  | "See Use Cases"
  | "Compare Options"
  | "Read Guides"
  | "View Product";

export type IntroContent = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryCta?: PageAction;
  secondaryCta?: PageAction;
  microcopy?: string;
};

export type FeatureItemContent = {
  title: string;
  description: string;
  icon?: string;
};

export type FeatureSectionContent = {
  sectionTitle: string;
  sectionDescription?: string;
  features: FeatureItemContent[];
};

export type InsightSectionContent = {
  sectionTitle: string;
  sectionDescription: string;
  bullets: [string, string, string, ...string[]];
};

export type ChecklistSectionContent = {
  sectionTitle: string;
  sectionDescription?: string;
  items: [string, string, string, string, string, ...string[]];
};

export type StepItemContent = {
  stepNumber: string;
  title: string;
  description: string;
  icon?: string;
};

export type StepsSectionContent = {
  sectionTitle: string;
  steps: StepItemContent[];
};

export type LinkedCardContent = {
  title: string;
  description: string;
  href: string;
  icon?: string;
};

export type LinkedCardsSectionContent = {
  sectionTitle: string;
  sectionDescription?: string;
  cards: LinkedCardContent[];
};

export type FaqItemContent = {
  question: string;
  answer: string;
};

export type FaqSectionContent = {
  sectionTitle: string;
  faqs: FaqItemContent[];
};

export type ExampleTaskTheme =
  | "peach"
  | "blue"
  | "violet"
  | "mint"
  | "amber"
  | "rose"
  | "green"
  | "slate";

export type TaskItemContent = {
  title: string;
  problemDescription: string;
  difficultyLabel: string;
  theme: ExampleTaskTheme;
};

export type TasksSectionContent = {
  sectionTitle: string;
  tasks: TaskItemContent[];
  taskPrompt?: {
    title: string;
    description: string;
    inputPlaceholder: string;
    inputAriaLabel?: string;
  };
};

export type FinalCtaContent = {
  headline: string;
  description: string;
  primaryCTA: PageAction;
  secondaryCTA?: PageAction;
  microcopy?: string;
};

export type MarketingPageContent = {
  metadataTitle: string;
  metadataDescription: string;
  path: string;
  intro: IntroContent;
  linkedCardsSection?: LinkedCardsSectionContent;
  featureSection?: FeatureSectionContent;
  stepsSection?: StepsSectionContent;
  insightSections?: InsightSectionContent[];
  checklistSection?: ChecklistSectionContent;
  tasksSection?: TasksSectionContent;
  faqSection?: FaqSectionContent;
  finalCta?: FinalCtaContent;
};
