import type {
  FinalCtaContent,
  MarketingPageContent,
  PageAction,
  TasksSectionContent
} from "@/types/marketing-page";

const contactCtaPrimary: PageAction = { label: "Start a request", href: "/contact" };
const contactCtaSecondary: PageAction = { label: "Book a demo", href: "/contact" };

function withDefaultCta(headline: string, description: string): FinalCtaContent {
  return {
    headline,
    description,
    primaryCTA: contactCtaPrimary,
    secondaryCTA: contactCtaSecondary
  };
}

const commonTasksSection: TasksSectionContent = {
  sectionTitle: "Common Shopify development tasks",
  tasks: [
    {
      title: "Make a homepage banner clickable",
      problemDescription: "Customers can only click the button instead of the entire banner image.",
      difficultyLabel: "Requires theme code",
      theme: "peach"
    },
    {
      title: "Fix mobile layout issues",
      problemDescription: "The store looks fine on desktop but breaks or overlaps on mobile devices.",
      difficultyLabel: "Requires CSS fixes",
      theme: "blue"
    },
    {
      title: "Change the layout of a Shopify product page",
      problemDescription: "The theme editor does not allow moving elements where they need them.",
      difficultyLabel: "Requires Liquid customization",
      theme: "violet"
    },
    {
      title: "Add personalization fields to products",
      problemDescription: "Customers should be able to enter a name or message before checkout.",
      difficultyLabel: "Requires Liquid customization",
      theme: "mint"
    },
    {
      title: "Launch a Shopify promotion with discount codes",
      problemDescription: "Setting up promotions requires coordinating discounts, banners, and messaging.",
      difficultyLabel: "Requires promotion setup",
      theme: "amber"
    },
    {
      title: "Improve Shopify store performance",
      problemDescription: "Too many apps and heavy assets slow down the store.",
      difficultyLabel: "Requires performance optimization",
      theme: "rose"
    },
    {
      title: "Update homepage sections",
      problemDescription: "Rearranging or adding sections often requires theme customization.",
      difficultyLabel: "Requires theme customization",
      theme: "green"
    },
    {
      title: "Add collections to the navigation menu",
      problemDescription: "Menus become confusing when collections change or expand.",
      difficultyLabel: "Requires navigation configuration",
      theme: "slate"
    }
  ],
  taskPrompt: {
    title: "Not seeing your task?",
    description: "Describe the Shopify change you need and we'll handle it.",
    inputPlaceholder: "Example: Add a countdown timer for Black Friday"
  }
};

export const productPageContent: MarketingPageContent = {
  metadataTitle: "Product",
  metadataDescription:
    "See how Shotgun helps Shopify teams execute development tasks quickly and reliably without managing freelancers.",
  path: "/product",
  intro: {
    eyebrow: "Product",
    title: "Shopify development execution for daily store work",
    description:
      "Shotgun handles recurring Shopify development tasks for founders, operators, and marketing teams. Share the task in Slack, WhatsApp, or email and get the completed change back quickly.",
    primaryCta: contactCtaPrimary,
    secondaryCta: { label: "View use cases", href: "/use-cases" }
  },
  linkedCardsSection: {
    sectionTitle: "Explore the product",
    sectionDescription:
      "Start with how Shotgun works, what types of tasks are supported, and which operating model fits your team.",
    cards: [
      {
        title: "How Shotgun Works",
        description: "Understand the request-to-delivery workflow and quality checks.",
        href: "/product/how-shotgun-works",
        icon: "⚙️"
      },
      {
        title: "What Shotgun Can Do",
        description: "See practical examples of Shopify tasks Shotgun executes daily.",
        href: "/product/what-shotgun-can-do",
        icon: "🧩"
      },
      {
        title: "Pricing",
        description: "Choose a model that matches your request volume and response needs.",
        href: "/product/pricing",
        icon: "💳"
      }
    ]
  },
  featureSection: {
    sectionTitle: "Why Shopify teams switch to Shotgun",
    features: [
      {
        title: "No developer coordination overhead",
        description: "Avoid chasing freelancers across Slack threads, calls, and changing timelines."
      },
      {
        title: "AI + human execution model",
        description:
          "AI systems speed up implementation while experienced developers review and verify output."
      },
      {
        title: "Built for operational teams",
        description:
          "Marketing, ecommerce, and product teams can move quickly without waiting for engineering bandwidth."
      }
    ]
  },
  finalCta: withDefaultCta(
    "Need Shopify development execution support?",
    "Share your next task and Shotgun will handle implementation end-to-end."
  )
};

export const useCasesPageContent: MarketingPageContent = {
  metadataTitle: "Use Cases",
  metadataDescription:
    "Browse high-intent Shopify use cases Shotgun can execute, including theme changes, bug fixes, promotions, mobile fixes, and performance work.",
  path: "/use-cases",
  intro: {
    eyebrow: "Use Cases",
    title: "Shopify tasks teams request every week",
    description:
      "Most merchants face the same recurring problems: theme tweaks, product page edits, promo launches, and bug fixes. Shotgun executes these tasks fast without extra coordination.",
    primaryCta: contactCtaPrimary,
    secondaryCta: { label: "Read guides", href: "/guides" }
  },
  linkedCardsSection: {
    sectionTitle: "Use case pages",
    cards: [
      {
        title: "Shopify Theme Changes",
        description: "Layout, typography, section, and Liquid changes across storefront templates.",
        href: "/use-cases/shopify-theme-changes",
        icon: "🎨"
      },
      {
        title: "Shopify Homepage Updates",
        description: "Banner swaps, section rearrangement, campaign updates, and homepage experiments.",
        href: "/use-cases/shopify-homepage-updates",
        icon: "🏠"
      },
      {
        title: "Shopify Product Page Customization",
        description: "Personalization fields, PDP layout updates, and conversion-focused product changes.",
        href: "/use-cases/shopify-product-page-customization",
        icon: "🛍"
      },
      {
        title: "Shopify Promotions and Discounts",
        description: "Discount setup, promo launch coordination, and campaign implementation.",
        href: "/use-cases/shopify-promotions-and-discounts",
        icon: "🏷️"
      },
      {
        title: "Shopify Bug Fixes",
        description: "Storefront bugs, alignment issues, broken behaviors, and checkout edge cases.",
        href: "/use-cases/shopify-bug-fixes",
        icon: "🛠"
      },
      {
        title: "Shopify Mobile Fixes",
        description: "Responsive issues, mobile spacing, tap targets, and overlap fixes.",
        href: "/use-cases/shopify-mobile-fixes",
        icon: "📱"
      },
      {
        title: "Shopify Speed Optimization",
        description: "Theme and app-level improvements to reduce load time and improve conversion.",
        href: "/use-cases/shopify-speed-optimization",
        icon: "⚡"
      }
    ]
  },
  tasksSection: commonTasksSection,
  finalCta: withDefaultCta(
    "Have a Shopify task similar to these use cases?",
    "Send the request and Shotgun will complete it with AI-assisted, human-verified execution."
  )
};

export const guidesPageContent: MarketingPageContent = {
  metadataTitle: "Guides",
  metadataDescription:
    "Actionable Shopify guides for theme customization, homepage updates, product page optimization, speed improvement, and conversion growth.",
  path: "/guides",
  intro: {
    eyebrow: "Guides",
    title: "Practical Shopify guides for operators",
    description:
      "These guides explain how Shopify teams solve common execution bottlenecks, what to prioritize first, and when to use implementation support.",
    primaryCta: { label: "Browse use cases", href: "/use-cases" },
    secondaryCta: contactCtaPrimary
  },
  linkedCardsSection: {
    sectionTitle: "Guide library",
    cards: [
      {
        title: "Shopify Theme Customization Guide",
        description: "How to handle safe theme updates, code edits, and customization workflows.",
        href: "/guides/shopify-theme-customization",
        icon: "🧵"
      },
      {
        title: "Shopify Homepage Optimization Guide",
        description: "What to change on homepage for faster campaign launches and better conversion.",
        href: "/guides/shopify-homepage-optimization",
        icon: "📈"
      },
      {
        title: "Shopify Product Page Optimization",
        description: "PDP improvements that reduce friction and improve product purchase confidence.",
        href: "/guides/shopify-product-page-optimization",
        icon: "🧪"
      },
      {
        title: "Shopify Store Speed Optimization",
        description: "How to identify slow components and improve storefront performance.",
        href: "/guides/shopify-store-speed-optimization",
        icon: "🚀"
      },
      {
        title: "Shopify Conversion Optimization",
        description: "Execution-focused guide for lifting conversion with practical storefront changes.",
        href: "/guides/shopify-conversion-optimization",
        icon: "📊"
      }
    ]
  },
  finalCta: withDefaultCta(
    "Need help implementing what you read?",
    "Shotgun can execute the exact changes from your guide checklist."
  )
};

export const comparePageContent: MarketingPageContent = {
  metadataTitle: "Compare",
  metadataDescription:
    "Compare Shotgun with freelancers, agencies, and Shopify task services to choose the right execution model for your team.",
  path: "/compare",
  intro: {
    eyebrow: "Compare",
    title: "Choose the right Shopify execution model",
    description:
      "Most teams evaluate freelancers, agencies, and task services before deciding. This comparison section helps you see tradeoffs in speed, reliability, and operational overhead.",
    primaryCta: contactCtaPrimary,
    secondaryCta: { label: "View product", href: "/product" }
  },
  linkedCardsSection: {
    sectionTitle: "Comparison pages",
    cards: [
      {
        title: "Freelancers vs Shotgun",
        description: "Compare flexibility, reliability, communication overhead, and turnaround consistency.",
        href: "/compare/freelancers-vs-shotgun",
        icon: "🧑‍💻"
      },
      {
        title: "Shopify Agencies vs Shotgun",
        description: "Evaluate agency retainers vs on-demand task execution for ongoing store changes.",
        href: "/compare/shopify-agencies-vs-shotgun",
        icon: "🏢"
      },
      {
        title: "Task Services vs Shotgun",
        description: "Understand differences between queue-based task services and integrated execution.",
        href: "/compare/task-services-vs-shotgun",
        icon: "📋"
      },
      {
        title: "Storetasker vs Shotgun",
        description: "Compare expert-matching workflows with continuous execution support models.",
        href: "/compare/storetasker-vs-shotgun",
        icon: "🆚"
      },
      {
        title: "TaskHusky vs Shotgun",
        description: "Compare speed, communication flow, and Shopify-specific implementation outcomes.",
        href: "/compare/taskhusky-vs-shotgun",
        icon: "⚖️"
      }
    ]
  },
  featureSection: {
    sectionTitle: "What to compare before choosing",
    features: [
      {
        title: "Execution speed",
        description: "How fast a request is understood, scoped, implemented, and verified."
      },
      {
        title: "Output reliability",
        description: "How often changes work correctly on first delivery without rework loops."
      },
      {
        title: "Coordination burden",
        description: "How much follow-up, tool switching, and management your team still has to do."
      }
    ]
  },
  finalCta: withDefaultCta(
    "Want to evaluate Shotgun on your own task backlog?",
    "Start with one request and measure delivery speed and quality for your team."
  )
};

export const resourcesPageContent: MarketingPageContent = {
  metadataTitle: "Resources",
  metadataDescription:
    "Explore Shopify resources from Shotgun, including blog content, case studies, and implementation documentation.",
  path: "/resources",
  intro: {
    eyebrow: "Resources",
    title: "Content and references for Shopify operators",
    description:
      "Use resources to understand implementation patterns, learn from real examples, and make better Shopify execution decisions.",
    primaryCta: { label: "Read guides", href: "/guides" },
    secondaryCta: contactCtaPrimary
  },
  linkedCardsSection: {
    sectionTitle: "Resource categories",
    cards: [
      {
        title: "Blog",
        description: "Short practical posts on Shopify development operations and execution workflows.",
        href: "/resources/blog",
        icon: "✍️"
      },
      {
        title: "Case Studies",
        description: "Examples of Shopify task execution outcomes and workflow improvements.",
        href: "/resources/case-studies",
        icon: "📚"
      },
      {
        title: "Documentation",
        description: "Reference content for process, standards, and implementation expectations.",
        href: "/resources/docs",
        icon: "📘"
      }
    ]
  },
  finalCta: withDefaultCta(
    "Need execution help beyond documentation?",
    "Send your Shopify request and Shotgun can implement the change directly."
  )
};

export const aboutPageContent: MarketingPageContent = {
  metadataTitle: "About",
  metadataDescription:
    "Learn about Shotgun's mission to help Shopify teams execute development tasks quickly and reliably using an AI + human workflow.",
  path: "/about",
  intro: {
    eyebrow: "About",
    title: "Shotgun helps Shopify teams execute faster",
    description:
      "Shotgun was built for founders, ecommerce operators, and marketing teams that need reliable Shopify implementation without managing fragmented developer workflows.",
    primaryCta: contactCtaPrimary,
    secondaryCta: { label: "How it works", href: "/product/how-shotgun-works" }
  },
  featureSection: {
    sectionTitle: "How Shotgun is designed",
    features: [
      {
        title: "Clarity first",
        description: "Requests are translated into clear implementation scopes before work begins."
      },
      {
        title: "Execution ownership",
        description: "Shotgun owns delivery quality so teams are not left managing fragmented contributors."
      },
      {
        title: "AI speed + human judgment",
        description:
          "Automation accelerates tasks while experienced developers handle edge cases and quality control."
      }
    ]
  },
  stepsSection: {
    sectionTitle: "How we typically partner with teams",
    steps: [
      {
        stepNumber: "STEP 1",
        icon: "🧾",
        title: "Collect your recurring task patterns",
        description: "We map common requests like banners, PDP updates, promo launches, and bug fixes."
      },
      {
        stepNumber: "STEP 2",
        icon: "🔁",
        title: "Set up a repeatable request workflow",
        description: "Teams submit tasks from Slack, WhatsApp, or email using a consistent request format."
      },
      {
        stepNumber: "STEP 3",
        icon: "✅",
        title: "Deliver with ongoing quality checks",
        description: "Changes are implemented, tested, and delivered with clear completion context."
      }
    ]
  },
  finalCta: withDefaultCta(
    "Want to see if Shotgun fits your team?",
    "Book a short workflow walkthrough and share your current Shopify execution process."
  )
};

export const contactPageContent: MarketingPageContent = {
  metadataTitle: "Contact",
  metadataDescription:
    "Contact Shotgun to submit Shopify development requests via Slack, WhatsApp, or email and get fast execution support.",
  path: "/contact",
  intro: {
    eyebrow: "Contact",
    title: "Share your Shopify task and we'll handle execution",
    description:
      "You can send requests through Slack, WhatsApp, or email. Include your store URL, the change needed, and any launch timeline.",
    primaryCta: { label: "Email us", href: "mailto:hello@shotgun.so" },
    secondaryCta: { label: "View use cases", href: "/use-cases" }
  },
  featureSection: {
    sectionTitle: "What to include in your request",
    sectionDescription:
      "The clearer the request, the faster we can execute. This is usually enough for most Shopify tasks.",
    features: [
      {
        title: "Store and page context",
        description: "Share the exact page URL and where the change should appear."
      },
      {
        title: "Expected outcome",
        description: "Describe what should happen after the change is live."
      },
      {
        title: "Timeline or campaign date",
        description: "Mention if this is tied to a launch, sale window, or ad campaign deadline."
      }
    ]
  },
  faqSection: {
    sectionTitle: "Contact and request FAQs",
    faqs: [
      {
        question: "What channels can we use to submit tasks?",
        answer: "Most teams use Slack, WhatsApp, or email. We can work with your existing communication flow."
      },
      {
        question: "Can we submit multiple Shopify tasks at once?",
        answer:
          "Yes. You can send a prioritized list of tasks, and Shotgun will help sequence implementation based on urgency."
      },
      {
        question: "Do you handle urgent launch-day fixes?",
        answer:
          "Yes, we support urgent fixes when possible. Include the deadline and launch impact in your request."
      }
    ]
  },
  finalCta: withDefaultCta(
    "Ready to submit your first task?",
    "Share one Shopify change and evaluate delivery speed and quality with your own workflow."
  )
};

export const blogPageContent: MarketingPageContent = {
  metadataTitle: "Blog",
  metadataDescription:
    "Read Shotgun blog content on Shopify development operations, task execution workflows, and practical store optimization insights.",
  path: "/blog",
  intro: {
    eyebrow: "Blog",
    title: "Shopify execution insights for operators",
    description:
      "The Shotgun blog focuses on practical Shopify task execution: what teams request most, where implementation bottlenecks happen, and how to ship updates faster.",
    primaryCta: { label: "Browse guides", href: "/guides" },
    secondaryCta: { label: "View resources", href: "/resources" }
  },
  linkedCardsSection: {
    sectionTitle: "Popular reading tracks",
    cards: [
      {
        title: "Shopify theme execution",
        description: "How teams handle recurring theme edits without breaking existing layouts.",
        href: "/guides/shopify-theme-customization",
        icon: "🧱"
      },
      {
        title: "Promotion launch workflows",
        description: "How to coordinate banners, discounts, and messaging changes in one execution cycle.",
        href: "/use-cases/shopify-promotions-and-discounts",
        icon: "🎯"
      },
      {
        title: "Mobile and speed priorities",
        description: "Why mobile fixes and performance work usually drive the fastest conversion lift.",
        href: "/guides/shopify-store-speed-optimization",
        icon: "📱"
      }
    ]
  },
  finalCta: withDefaultCta(
    "Want help implementing blog recommendations?",
    "Shotgun can execute the exact Shopify changes from your optimization checklist."
  )
};

export const privacyPageContent: MarketingPageContent = {
  metadataTitle: "Privacy Policy",
  metadataDescription:
    "Read Shotgun's privacy policy and data handling principles for website visitors and request submissions.",
  path: "/privacy",
  intro: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    description:
      "Shotgun respects your privacy. We only use submitted information to evaluate and execute Shopify requests, improve service quality, and provide support communication."
  },
  featureSection: {
    sectionTitle: "Privacy principles",
    features: [
      {
        title: "Purpose-limited use",
        description: "Information shared with Shotgun is used to deliver requested services and support."
      },
      {
        title: "Minimum required access",
        description: "We request only the access needed to implement and verify Shopify changes."
      },
      {
        title: "Operational security",
        description:
          "Access credentials and project context should be handled using secure channels and rotated as needed."
      }
    ]
  },
  finalCta: withDefaultCta(
    "Need details about data handling for your workflow?",
    "Contact us and we'll share implementation-specific privacy and access expectations."
  )
};

export const termsPageContent: MarketingPageContent = {
  metadataTitle: "Terms",
  metadataDescription:
    "Review Shotgun service terms, responsibilities, and execution expectations for Shopify development requests.",
  path: "/terms",
  intro: {
    eyebrow: "Legal",
    title: "Terms of Service",
    description:
      "Shotgun provides Shopify development execution support based on request scope, platform constraints, and implementation feasibility."
  },
  featureSection: {
    sectionTitle: "Service terms summary",
    features: [
      {
        title: "Scope confirmation",
        description: "Each task is executed based on agreed scope and clarified requirements."
      },
      {
        title: "Platform constraints",
        description: "Some requests depend on Shopify plan limits, app capabilities, or third-party restrictions."
      },
      {
        title: "Client responsibilities",
        description: "Clients should provide timely access, approvals, and accurate store context for execution."
      }
    ]
  },
  finalCta: withDefaultCta(
    "Need enterprise terms or workflow-specific agreements?",
    "Contact us and we'll align legal and operational requirements with your team."
  )
};

export const productSubpageContent: Record<string, MarketingPageContent> = {
  "how-shotgun-works": {
    metadataTitle: "How Shotgun Works",
    metadataDescription:
      "Understand how Shotgun processes Shopify requests, executes implementation with AI + human workflows, and delivers tested outcomes.",
    path: "/product/how-shotgun-works",
    intro: {
      eyebrow: "Product Workflow",
      title: "How Shotgun completes Shopify requests",
      description:
        "From your perspective, Shotgun behaves like a reliable execution partner. You send the task, Shotgun clarifies requirements if needed, and you receive a tested implementation.",
      primaryCta: contactCtaPrimary,
      secondaryCta: { label: "View all use cases", href: "/use-cases" }
    },
    stepsSection: {
      sectionTitle: "Request to delivery workflow",
      steps: [
        {
          stepNumber: "STEP 1",
          icon: "💬",
          title: "Request intake",
          description: "You share the Shopify task via Slack, WhatsApp, or email with store context."
        },
        {
          stepNumber: "STEP 2",
          icon: "🧠",
          title: "Task interpretation",
          description: "Shotgun analyzes scope and asks clarifying questions when requirements are ambiguous."
        },
        {
          stepNumber: "STEP 3",
          icon: "⚙️",
          title: "Implementation",
          description: "AI-assisted workflows and experienced developers execute the required storefront changes."
        },
        {
          stepNumber: "STEP 4",
          icon: "✅",
          title: "Quality verification",
          description: "Output is reviewed for expected behavior before final delivery to your team."
        }
      ]
    },
    faqSection: {
      sectionTitle: "How it works FAQs",
      faqs: [
        {
          question: "Do we need to learn a new project management tool?",
          answer:
            "No. Shotgun is designed to work with the channels your team already uses for operational requests."
        },
        {
          question: "What happens if requirements are incomplete?",
          answer:
            "Shotgun asks focused clarification questions so implementation can proceed without assumptions."
        },
        {
          question: "Do we see internal AI and developer workflows?",
          answer:
            "You receive the final implemented outcome and completion context, not internal execution complexity."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Want to test the workflow with a real task?",
      "Share one Shopify request and evaluate the end-to-end execution experience."
    )
  },
  "what-shotgun-can-do": {
    metadataTitle: "What Shotgun Can Do",
    metadataDescription:
      "See what Shopify development tasks Shotgun can execute, including theme updates, PDP customization, discounts, bug fixes, and performance improvements.",
    path: "/product/what-shotgun-can-do",
    intro: {
      eyebrow: "Task Coverage",
      title: "Shopify tasks Shotgun can execute for your team",
      description:
        "Shotgun covers recurring implementation work across storefront design, product pages, promotions, fixes, and operational updates.",
      primaryCta: contactCtaPrimary,
      secondaryCta: { label: "View pricing", href: "/product/pricing" }
    },
    tasksSection: commonTasksSection,
    featureSection: {
      sectionTitle: "Additional high-frequency requests",
      features: [
        {
          title: "Announcement bar and header updates",
          description: "Update text, style, and behavior for campaign or operational messaging."
        },
        {
          title: "Collection and menu restructuring",
          description: "Reorganize navigation and collection visibility as catalogs expand."
        },
        {
          title: "Tracking and conversion setup",
          description: "Implement analytics and pixel updates needed for campaign reporting."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Not sure if your task is covered?",
      "Send the requirement and Shotgun will confirm scope quickly."
    )
  },
  pricing: {
    metadataTitle: "Pricing",
    metadataDescription:
      "Explore Shotgun pricing models for Shopify development execution, from ad-hoc tasks to continuous workflow support.",
    path: "/product/pricing",
    intro: {
      eyebrow: "Pricing",
      title: "Pricing options based on your Shopify execution volume",
      description:
        "Choose a model that fits your workflow. Teams usually start with ad-hoc requests and move to continuous execution support as task volume grows.",
      primaryCta: contactCtaPrimary,
      secondaryCta: { label: "Compare options", href: "/compare" }
    },
    featureSection: {
      sectionTitle: "Typical pricing models",
      features: [
        {
          title: "Per-task execution",
          description: "Best for low-volume teams that need reliable delivery on specific Shopify changes."
        },
        {
          title: "Monthly execution support",
          description: "Best for teams with recurring weekly requests across marketing and ecommerce operations."
        },
        {
          title: "Priority workflow plans",
          description: "Best for teams with campaign-heavy calendars and stricter response timelines."
        }
      ]
    },
    faqSection: {
      sectionTitle: "Pricing FAQs",
      faqs: [
        {
          question: "Can we start with one request before committing?",
          answer: "Yes. Many teams begin with a single task to validate quality and turnaround."
        },
        {
          question: "Do pricing options include quality testing?",
          answer:
            "Execution includes implementation checks to confirm requested behavior before final handoff."
        },
        {
          question: "Can we upgrade as our task volume increases?",
          answer: "Yes. Pricing can be aligned with evolving request volume and workflow complexity."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Need a pricing recommendation for your team?",
      "Share your monthly request volume and we can suggest the right model."
    )
  }
};

export const useCaseSubpageContent: Record<string, MarketingPageContent> = {
  "shopify-theme-changes": {
    metadataTitle: "Shopify Theme Changes",
    metadataDescription:
      "Get Shopify theme changes executed quickly, including section updates, layout edits, Liquid changes, and brand styling updates.",
    path: "/use-cases/shopify-theme-changes",
    intro: {
      eyebrow: "Use Case",
      title: "Shopify theme changes without the code bottleneck",
      description:
        "Theme editors cover basic updates, but most real requests hit Liquid and CSS limits. Shotgun handles those implementation tasks so your team can move faster.",
      primaryCta: contactCtaPrimary,
      secondaryCta: { label: "Theme customization guide", href: "/guides/shopify-theme-customization" }
    },
    featureSection: {
      sectionTitle: "Common theme change requests",
      features: [
        {
          title: "Section layout modifications",
          description: "Move elements, adjust spacing, and customize blocks beyond default editor controls."
        },
        {
          title: "Typography and style updates",
          description: "Implement brand font and styling changes safely across templates."
        },
        {
          title: "Theme update-safe edits",
          description: "Apply code changes in a way that is easier to maintain across future theme updates."
        }
      ]
    },
    faqSection: {
      sectionTitle: "Theme change FAQs",
      faqs: [
        {
          question: "Can Shotgun handle custom Liquid edits?",
          answer: "Yes. Theme file edits are supported when required by the request."
        },
        {
          question: "What if our theme has existing custom code?",
          answer:
            "Shotgun reviews current implementation context before shipping changes to reduce regression risk."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Need a Shopify theme change this week?",
      "Share the exact section or template update and Shotgun will implement it."
    )
  },
  "shopify-homepage-updates": {
    metadataTitle: "Shopify Homepage Updates",
    metadataDescription:
      "Execute Shopify homepage updates such as banner changes, section rearrangements, campaign blocks, and seasonal content swaps.",
    path: "/use-cases/shopify-homepage-updates",
    intro: {
      eyebrow: "Use Case",
      title: "Homepage updates for launches and campaigns",
      description:
        "Merchants frequently update homepage banners, featured sections, and campaign content. Shotgun helps teams ship those changes without waiting on developer availability.",
      primaryCta: contactCtaPrimary,
      secondaryCta: { label: "Homepage optimization guide", href: "/guides/shopify-homepage-optimization" }
    },
    featureSection: {
      sectionTitle: "Homepage requests we handle",
      features: [
        {
          title: "Clickable hero and banner changes",
          description: "Make full banners clickable and aligned across desktop and mobile."
        },
        {
          title: "Section additions and rearrangement",
          description: "Add carousels, trust blocks, promo sections, and reorder homepage flow."
        },
        {
          title: "Seasonal campaign refreshes",
          description: "Launch sale creatives and homepage messaging updates quickly."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Need a homepage update for an upcoming campaign?",
      "Send the creative and expected behavior, and Shotgun will implement it."
    )
  },
  "shopify-product-page-customization": {
    metadataTitle: "Shopify Product Page Customization",
    metadataDescription:
      "Customize Shopify product pages with layout changes, personalization fields, variant behavior updates, and conversion-focused implementation.",
    path: "/use-cases/shopify-product-page-customization",
    intro: {
      eyebrow: "Use Case",
      title: "Product page customization that improves conversion",
      description:
        "From personalization inputs to layout changes, product pages often need custom implementation beyond the default theme editor.",
      primaryCta: contactCtaPrimary,
      secondaryCta: { label: "Product page guide", href: "/guides/shopify-product-page-optimization" }
    },
    featureSection: {
      sectionTitle: "PDP customization tasks",
      features: [
        {
          title: "Personalization fields",
          description: "Add text inputs, instructions, and field-level rules before add-to-cart."
        },
        {
          title: "Layout and hierarchy updates",
          description: "Reorder modules, update content blocks, and optimize information flow."
        },
        {
          title: "Variant and add-to-cart behavior",
          description: "Improve usability for size/color selection and purchase actions."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Need a custom product page behavior?",
      "Share your current PDP URL and expected experience, and Shotgun can implement it."
    )
  },
  "shopify-promotions-and-discounts": {
    metadataTitle: "Shopify Promotions and Discounts",
    metadataDescription:
      "Launch Shopify promotions and discount code campaigns with coordinated storefront, messaging, and implementation support.",
    path: "/use-cases/shopify-promotions-and-discounts",
    intro: {
      eyebrow: "Use Case",
      title: "Promotion and discount launches without last-minute chaos",
      description:
        "Promotions often require coordinated discount setup, homepage updates, timers, and messaging changes. Shotgun handles implementation across these moving parts.",
      primaryCta: contactCtaPrimary,
      secondaryCta: { label: "Conversion guide", href: "/guides/shopify-conversion-optimization" }
    },
    featureSection: {
      sectionTitle: "Promotion tasks we execute",
      features: [
        {
          title: "Discount and code setup support",
          description: "Implement and validate promo logic for campaign requirements."
        },
        {
          title: "Campaign visual rollout",
          description: "Update banners, announcement bars, and landing content in sync."
        },
        {
          title: "Launch-day fixes",
          description: "Handle urgent presentation and behavior issues during active promotions."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Planning a sale or promotion launch?",
      "Send your promotion checklist and Shotgun will coordinate implementation."
    )
  },
  "shopify-bug-fixes": {
    metadataTitle: "Shopify Bug Fixes",
    metadataDescription:
      "Fix Shopify storefront bugs quickly, including layout issues, broken interactions, app conflicts, and request-specific troubleshooting.",
    path: "/use-cases/shopify-bug-fixes",
    intro: {
      eyebrow: "Use Case",
      title: "Shopify bug fixes with reliable resolution",
      description:
        "Store bugs slow campaigns and hurt conversion. Shotgun helps teams diagnose and resolve recurring Shopify issues without long back-and-forth.",
      primaryCta: contactCtaPrimary,
      secondaryCta: { label: "Compare options", href: "/compare/freelancers-vs-shotgun" }
    },
    featureSection: {
      sectionTitle: "Common bug categories",
      features: [
        {
          title: "Visual regressions",
          description: "Spacing, alignment, and rendering issues after updates or app installs."
        },
        {
          title: "Broken interactions",
          description: "Buttons, menus, variant selectors, and form interactions not behaving correctly."
        },
        {
          title: "Cross-device inconsistencies",
          description: "Behavior differences across browsers and device sizes."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Need a Shopify bug fixed quickly?",
      "Share the page URL and issue details, and Shotgun will work on a fix."
    )
  },
  "shopify-mobile-fixes": {
    metadataTitle: "Shopify Mobile Fixes",
    metadataDescription:
      "Resolve Shopify mobile layout issues including overlap bugs, spacing errors, and broken tap interactions across key storefront pages.",
    path: "/use-cases/shopify-mobile-fixes",
    intro: {
      eyebrow: "Use Case",
      title: "Mobile fixes for real storefront traffic",
      description:
        "Most Shopify traffic is mobile. Shotgun helps teams fix responsive issues that hurt usability and conversion on smaller screens.",
      primaryCta: contactCtaPrimary,
      secondaryCta: { label: "Mobile optimization guide", href: "/guides/shopify-homepage-optimization" }
    },
    featureSection: {
      sectionTitle: "Mobile issues we solve",
      features: [
        {
          title: "Layout and overlap fixes",
          description: "Resolve text/image overlaps and broken block stacking across breakpoints."
        },
        {
          title: "Tap-target and interaction corrections",
          description: "Improve button size, spacing, and touch behavior for smoother navigation."
        },
        {
          title: "Mobile-first section tuning",
          description: "Optimize banners, collections, and PDP modules for mobile readability."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Seeing mobile-specific issues on your store?",
      "Share screenshots and URLs, and Shotgun will implement responsive fixes."
    )
  },
  "shopify-speed-optimization": {
    metadataTitle: "Shopify Speed Optimization",
    metadataDescription:
      "Improve Shopify store speed with practical optimization across apps, assets, themes, and rendering behavior.",
    path: "/use-cases/shopify-speed-optimization",
    intro: {
      eyebrow: "Use Case",
      title: "Shopify speed optimization for conversion-sensitive stores",
      description:
        "As apps and assets grow, storefront performance degrades. Shotgun helps teams prioritize and implement practical speed improvements.",
      primaryCta: contactCtaPrimary,
      secondaryCta: { label: "Speed optimization guide", href: "/guides/shopify-store-speed-optimization" }
    },
    featureSection: {
      sectionTitle: "Performance optimization tasks",
      features: [
        {
          title: "Theme and asset optimization",
          description: "Reduce render bottlenecks from heavy assets and inefficient template logic."
        },
        {
          title: "App impact cleanup",
          description: "Identify and reduce performance cost from overlapping app scripts."
        },
        {
          title: "Page-level speed improvements",
          description: "Improve loading behavior on homepage, collections, and product pages."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Want to improve speed before your next campaign?",
      "Share your key landing pages and Shotgun can prioritize high-impact fixes."
    )
  }
};

export const guideSubpageContent: Record<string, MarketingPageContent> = {
  "shopify-theme-customization": {
    metadataTitle: "Shopify Theme Customization Guide",
    metadataDescription:
      "Learn practical Shopify theme customization workflows, including safe edits, layout changes, and maintenance best practices.",
    path: "/guides/shopify-theme-customization",
    intro: {
      eyebrow: "Guide",
      title: "Shopify theme customization guide",
      description:
        "A practical framework for planning, implementing, and validating Shopify theme changes without creating avoidable regressions.",
      primaryCta: { label: "View theme use case", href: "/use-cases/shopify-theme-changes" },
      secondaryCta: contactCtaPrimary
    },
    stepsSection: {
      sectionTitle: "Recommended execution flow",
      steps: [
        {
          stepNumber: "STEP 1",
          icon: "🔎",
          title: "Define exact scope",
          description: "List templates, sections, and expected visual/behavior outcomes."
        },
        {
          stepNumber: "STEP 2",
          icon: "🧪",
          title: "Implement in controlled order",
          description: "Apply updates incrementally to reduce cross-section breakage."
        },
        {
          stepNumber: "STEP 3",
          icon: "✅",
          title: "Validate across devices",
          description: "Confirm styling and behavior on desktop and mobile before publish."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Need help executing this guide?",
      "Shotgun can implement your theme change checklist directly."
    )
  },
  "shopify-homepage-optimization": {
    metadataTitle: "Shopify Homepage Optimization Guide",
    metadataDescription:
      "Optimize your Shopify homepage for campaign launches, clearer messaging, and stronger conversion outcomes.",
    path: "/guides/shopify-homepage-optimization",
    intro: {
      eyebrow: "Guide",
      title: "Shopify homepage optimization guide",
      description:
        "Focus homepage changes on clarity, campaign readiness, and conversion paths instead of ad-hoc design tweaks.",
      primaryCta: { label: "Homepage use case", href: "/use-cases/shopify-homepage-updates" },
      secondaryCta: contactCtaPrimary
    },
    featureSection: {
      sectionTitle: "Homepage priorities",
      features: [
        {
          title: "Clear above-the-fold message",
          description: "Make value proposition and primary action obvious in the first viewport."
        },
        {
          title: "Campaign-ready blocks",
          description: "Prepare reusable sections for banner swaps and event promotions."
        },
        {
          title: "Mobile-first readability",
          description: "Ensure hero, section spacing, and CTA placement work on small screens."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Need homepage improvements implemented quickly?",
      "Share your homepage goals and Shotgun will execute the required changes."
    )
  },
  "shopify-product-page-optimization": {
    metadataTitle: "Shopify Product Page Optimization",
    metadataDescription:
      "Improve Shopify product page conversion with better layout, trust content, personalization logic, and implementation quality.",
    path: "/guides/shopify-product-page-optimization",
    intro: {
      eyebrow: "Guide",
      title: "Shopify product page optimization guide",
      description:
        "Use this guide to prioritize high-impact PDP improvements like layout clarity, personalization options, and add-to-cart usability.",
      primaryCta: { label: "PDP use case", href: "/use-cases/shopify-product-page-customization" },
      secondaryCta: contactCtaPrimary
    },
    featureSection: {
      sectionTitle: "PDP optimization checklist",
      features: [
        {
          title: "Simplify decision making",
          description: "Structure key product info so customers can evaluate quickly."
        },
        {
          title: "Reduce purchase friction",
          description: "Improve variant selection and add-to-cart clarity for mobile and desktop."
        },
        {
          title: "Add relevant trust context",
          description: "Place reviews, guarantees, and shipping signals where they support action."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Want these PDP updates shipped?",
      "Shotgun can execute your product page checklist end-to-end."
    )
  },
  "shopify-store-speed-optimization": {
    metadataTitle: "Shopify Store Speed Optimization",
    metadataDescription:
      "Follow a practical Shopify speed optimization process to improve load times and reduce conversion drop from slow storefront pages.",
    path: "/guides/shopify-store-speed-optimization",
    intro: {
      eyebrow: "Guide",
      title: "Shopify store speed optimization guide",
      description:
        "Speed work should focus on pages that drive revenue first. This guide helps teams prioritize fixes with practical impact.",
      primaryCta: { label: "Speed use case", href: "/use-cases/shopify-speed-optimization" },
      secondaryCta: contactCtaPrimary
    },
    stepsSection: {
      sectionTitle: "Speed optimization workflow",
      steps: [
        {
          stepNumber: "STEP 1",
          icon: "📍",
          title: "Identify highest-impact pages",
          description: "Prioritize homepage, top collections, and high-traffic product pages."
        },
        {
          stepNumber: "STEP 2",
          icon: "🧹",
          title: "Remove avoidable overhead",
          description: "Reduce script, app, and asset weight that slows render performance."
        },
        {
          stepNumber: "STEP 3",
          icon: "📈",
          title: "Re-test and ship iterations",
          description: "Implement improvements in cycles and validate performance changes."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Need help executing speed fixes?",
      "Share priority pages and Shotgun can implement performance improvements."
    )
  },
  "shopify-conversion-optimization": {
    metadataTitle: "Shopify Conversion Optimization",
    metadataDescription:
      "Improve Shopify conversion by prioritizing execution-focused improvements across homepage, PDP, promotions, and mobile UX.",
    path: "/guides/shopify-conversion-optimization",
    intro: {
      eyebrow: "Guide",
      title: "Shopify conversion optimization guide",
      description:
        "Conversion gains usually come from consistent execution of small improvements, not one big redesign. This guide focuses on practical implementation priorities.",
      primaryCta: { label: "Promotion use case", href: "/use-cases/shopify-promotions-and-discounts" },
      secondaryCta: contactCtaPrimary
    },
    featureSection: {
      sectionTitle: "Conversion-focused execution areas",
      features: [
        {
          title: "Homepage clarity",
          description: "Tighten messaging and primary action flow for first-time visitors."
        },
        {
          title: "PDP confidence signals",
          description: "Improve content hierarchy so buyers can decide with less uncertainty."
        },
        {
          title: "Promotion coordination",
          description: "Align discounts, visuals, and checkout messaging during sale windows."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Ready to implement a conversion checklist?",
      "Shotgun can execute conversion-oriented store updates in your existing workflow."
    )
  }
};

export const compareSubpageContent: Record<string, MarketingPageContent> = {
  "freelancers-vs-shotgun": {
    metadataTitle: "Freelancers vs Shotgun",
    metadataDescription:
      "Compare freelancers vs Shotgun for Shopify development execution speed, reliability, communication overhead, and quality consistency.",
    path: "/compare/freelancers-vs-shotgun",
    intro: {
      eyebrow: "Comparison",
      title: "Freelancers vs Shotgun for Shopify execution",
      description:
        "Freelancers can work well, but delivery consistency and coordination overhead vary by individual. Shotgun is designed for predictable, workflow-integrated execution.",
      primaryCta: contactCtaPrimary,
      secondaryCta: { label: "See all comparisons", href: "/compare" }
    },
    featureSection: {
      sectionTitle: "Typical differences",
      features: [
        {
          title: "Turnaround consistency",
          description: "Freelancer output depends on individual availability and context switching."
        },
        {
          title: "Management overhead",
          description: "Teams often spend time briefing, following up, and QA-ing every request."
        },
        {
          title: "Workflow integration",
          description: "Shotgun is built around request channels like Slack, WhatsApp, and email."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Want to compare with a real task?",
      "Submit one request and evaluate execution quality and speed directly."
    )
  },
  "shopify-agencies-vs-shotgun": {
    metadataTitle: "Shopify Agencies vs Shotgun",
    metadataDescription:
      "Compare Shopify agencies vs Shotgun for ongoing implementation support, turnaround speed, and operational fit.",
    path: "/compare/shopify-agencies-vs-shotgun",
    intro: {
      eyebrow: "Comparison",
      title: "Shopify agencies vs Shotgun",
      description:
        "Agencies are useful for larger projects, while recurring operational tasks often need faster turnaround and lower coordination overhead.",
      primaryCta: contactCtaPrimary,
      secondaryCta: { label: "Product overview", href: "/product" }
    },
    featureSection: {
      sectionTitle: "Execution model differences",
      features: [
        {
          title: "Project scope vs recurring tasks",
          description: "Agencies are optimized for broader project engagements and longer planning cycles."
        },
        {
          title: "Response speed",
          description: "Operational teams often need rapid implementation for campaigns and fixes."
        },
        {
          title: "Cost alignment",
          description: "Recurring small requests may not fit large fixed retainers efficiently."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Need agency-level reliability for recurring tasks?",
      "Shotgun can support ongoing Shopify execution without heavyweight process."
    )
  },
  "task-services-vs-shotgun": {
    metadataTitle: "Task Services vs Shotgun",
    metadataDescription:
      "Compare Shopify task services vs Shotgun for request quality, implementation context, and integrated execution workflow.",
    path: "/compare/task-services-vs-shotgun",
    intro: {
      eyebrow: "Comparison",
      title: "Task services vs Shotgun",
      description:
        "Task services help with predefined request queues. Shotgun is built for broader Shopify execution context and AI + human delivery quality control.",
      primaryCta: contactCtaPrimary,
      secondaryCta: { label: "Read use cases", href: "/use-cases" }
    },
    featureSection: {
      sectionTitle: "What teams usually evaluate",
      features: [
        {
          title: "Task flexibility",
          description: "How well the service handles requests beyond templated task lists."
        },
        {
          title: "Implementation context",
          description: "How deeply the service understands your store setup and dependencies."
        },
        {
          title: "Quality assurance",
          description: "How reliably completed changes match expected outcomes."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Need a more integrated execution workflow?",
      "Try Shotgun on a mixed task list and compare operational overhead."
    )
  },
  "storetasker-vs-shotgun": {
    metadataTitle: "Storetasker vs Shotgun",
    metadataDescription:
      "Compare Storetasker vs Shotgun for Shopify task execution, turnaround reliability, and ongoing support workflow.",
    path: "/compare/storetasker-vs-shotgun",
    intro: {
      eyebrow: "Comparison",
      title: "Storetasker vs Shotgun",
      description:
        "Both models support Shopify work. Teams typically compare matching workflows, turnaround behavior, and day-to-day execution ownership.",
      primaryCta: contactCtaPrimary,
      secondaryCta: { label: "All compare pages", href: "/compare" }
    },
    featureSection: {
      sectionTitle: "Evaluation criteria",
      features: [
        {
          title: "Request intake and scoping",
          description: "How quickly a task is translated into executable implementation."
        },
        {
          title: "Delivery consistency",
          description: "How predictable turnaround and quality are for recurring task flows."
        },
        {
          title: "Operational simplicity",
          description: "How much coordination your internal team still needs to manage."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Want to benchmark with your own backlog?",
      "Send a few real Shopify tasks and compare execution experience."
    )
  },
  "taskhusky-vs-shotgun": {
    metadataTitle: "TaskHusky vs Shotgun",
    metadataDescription:
      "Compare TaskHusky vs Shotgun for Shopify task delivery speed, implementation reliability, and communication workflow fit.",
    path: "/compare/taskhusky-vs-shotgun",
    intro: {
      eyebrow: "Comparison",
      title: "TaskHusky vs Shotgun",
      description:
        "When comparing task-oriented Shopify services, teams usually evaluate request clarity, turnaround consistency, and quality of final implementation.",
      primaryCta: contactCtaPrimary,
      secondaryCta: { label: "View use cases", href: "/use-cases" }
    },
    featureSection: {
      sectionTitle: "Comparison focus areas",
      features: [
        {
          title: "Communication flow",
          description: "How smoothly requests and clarifications move through your existing channels."
        },
        {
          title: "Task complexity coverage",
          description: "How well each service handles both simple and code-dependent requests."
        },
        {
          title: "Outcome confidence",
          description: "How reliably delivered work matches expected behavior and quality."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Need a direct comparison on real tasks?",
      "Send a request and compare speed, quality, and coordination effort."
    )
  }
};

export const resourceSubpageContent: Record<string, MarketingPageContent> = {
  blog: {
    metadataTitle: "Resources Blog",
    metadataDescription:
      "Explore Shotgun resource blog content focused on Shopify execution workflows and practical implementation guidance.",
    path: "/resources/blog",
    intro: {
      eyebrow: "Resource",
      title: "Blog resources for Shopify execution teams",
      description:
        "This section highlights practical writing on recurring Shopify development tasks, request quality, and launch execution.",
      primaryCta: { label: "Main blog", href: "/blog" },
      secondaryCta: { label: "Guides", href: "/guides" }
    },
    featureSection: {
      sectionTitle: "Key blog themes",
      features: [
        {
          title: "Theme and storefront execution",
          description: "How to ship recurring design and behavior updates safely."
        },
        {
          title: "Promotion operations",
          description: "How teams coordinate discount campaigns and storefront implementation."
        },
        {
          title: "Mobile and speed improvements",
          description: "Where teams usually find quick wins for conversion performance."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Need help implementing insights from these resources?",
      "Shotgun can execute the related Shopify tasks for your store."
    )
  },
  "case-studies": {
    metadataTitle: "Case Studies",
    metadataDescription:
      "Review case-study style examples of Shopify teams improving execution speed and reliability with structured task workflows.",
    path: "/resources/case-studies",
    intro: {
      eyebrow: "Resource",
      title: "Case studies from recurring Shopify workflows",
      description:
        "Case studies in this section focus on practical outcomes: faster launches, reduced execution delays, and fewer unresolved storefront issues.",
      primaryCta: contactCtaPrimary,
      secondaryCta: { label: "Contact Shotgun", href: "/contact" }
    },
    featureSection: {
      sectionTitle: "Case-study outcome themes",
      features: [
        {
          title: "Faster campaign rollout",
          description: "Teams reduce delay between planning and launch implementation."
        },
        {
          title: "Lower coordination load",
          description: "Operators spend less time chasing updates and managing fragmented contributors."
        },
        {
          title: "Improved change reliability",
          description: "Store updates are delivered with clearer quality validation."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Want similar outcomes for your store operations?",
      "Start with one request and evaluate execution impact."
    )
  },
  docs: {
    metadataTitle: "Documentation",
    metadataDescription:
      "Read Shotgun documentation on architecture, coding standards, SEO rules, and workflow expectations.",
    path: "/resources/docs",
    intro: {
      eyebrow: "Resource",
      title: "Documentation and operational references",
      description:
        "This section points to documentation used to keep implementation consistent across product, content, and SEO workstreams.",
      primaryCta: { label: "Project docs", href: "/docs/project-overview" },
      secondaryCta: { label: "Architecture", href: "/docs/site-architecture" }
    },
    linkedCardsSection: {
      sectionTitle: "Core documentation references",
      cards: [
        {
          title: "Product Overview",
          description: "Understand the service model and core execution workflow.",
          href: "/product",
          icon: "🧭"
        },
        {
          title: "Use Cases Library",
          description: "Review recurring Shopify request categories and examples.",
          href: "/use-cases",
          icon: "🗺"
        },
        {
          title: "Guides and Playbooks",
          description: "Access practical implementation guidance for operators.",
          href: "/guides",
          icon: "🔎"
        }
      ]
    },
    finalCta: withDefaultCta(
      "Need execution support with documented standards?",
      "Shotgun can execute Shopify tasks while aligning with your process and quality expectations."
    )
  }
};

export const staticSitePaths = [
  "/",
  "/product",
  "/use-cases",
  "/guides",
  "/compare",
  "/resources",
  "/about",
  "/contact",
  "/blog",
  "/privacy",
  "/terms"
] as const;

export const productSubpageSlugs = Object.keys(productSubpageContent);
export const useCaseSubpageSlugs = Object.keys(useCaseSubpageContent);
export const guideSubpageSlugs = Object.keys(guideSubpageContent);
export const compareSubpageSlugs = Object.keys(compareSubpageContent);
export const resourceSubpageSlugs = Object.keys(resourceSubpageContent);

export const contentDrivenPaths = [
  ...staticSitePaths,
  ...Object.values(productSubpageContent).map((page) => page.path),
  ...Object.values(useCaseSubpageContent).map((page) => page.path),
  ...Object.values(guideSubpageContent).map((page) => page.path),
  ...Object.values(compareSubpageContent).map((page) => page.path),
  ...Object.values(resourceSubpageContent).map((page) => page.path)
];
