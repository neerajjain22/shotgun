import type {
  FinalCtaContent,
  MarketingPageContent,
  PageAction,
  TasksSectionContent
} from "@/types/marketing-page";
import {
  createStandardFinalCta,
  standardCtaMicrocopy,
  standardPrimaryCta,
  standardSecondaryCtas
} from "@/config/cta";

const contactCtaPrimary: PageAction = standardPrimaryCta;
const contactCtaSecondary: PageAction = standardSecondaryCtas.seeUseCases;

function withDefaultCta(headline: string, description: string): FinalCtaContent {
  return createStandardFinalCta(headline, description, contactCtaSecondary);
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
    "See how Krish. helps Shopify teams execute development tasks quickly and reliably without managing freelancers.",
  path: "/product",
  intro: {
    eyebrow: "Product",
    title: "Get Shopify development work done without managing developers",
    description:
      "Krish. helps Shopify teams execute recurring store changes such as homepage updates, product page edits, promotion rollouts, and bug fixes. You send requests through Slack, WhatsApp, or email. Krish. scopes the task, implements the change, verifies quality, and delivers it ready to launch. Use this page to evaluate fit, understand how engagement works, and decide if this model matches how your team operates.",
    primaryCta: contactCtaPrimary,
    secondaryCta: standardSecondaryCtas.compareOptions,
    microcopy: standardCtaMicrocopy
  },
  linkedCardsSection: {
    sectionTitle: "Explore the product",
    sectionDescription:
      "Start with how Krish. works, what types of tasks are supported, and which operating model fits your team.",
    cards: [
      {
        title: "How Krish. Works",
        description: "Understand the request-to-delivery workflow and quality checks.",
        href: "/product/how-krish-works",
        icon: "⚙️"
      },
      {
        title: "What Krish. Can Do",
        description: "See practical examples of Shopify tasks Krish. executes daily.",
        href: "/product/what-krish-can-do",
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
    sectionTitle: "What to evaluate before choosing Krish.",
    features: [
      {
        title: "Ongoing Shopify execution needs",
        description:
          "Krish. is a strong fit when your backlog includes regular requests each week, not just one-off redesign work."
      },
      {
        title: "How much coordination your team can handle",
        description:
          "If your team is spending too much time briefing freelancers and chasing status updates, this model removes a lot of that overhead."
      },
      {
        title: "Launch confidence after delivery",
        description:
          "Delivered changes are reviewed and tested before handoff so teams can publish faster with fewer last-minute surprises."
      }
    ]
  },
  stepsSection: {
    sectionTitle: "How engagement works",
    steps: [
      {
        stepNumber: "STEP 1",
        icon: "📝",
        title: "Submit your first request",
        description:
          "Share the exact Shopify change you need, including page URL, desired outcome, and any timing constraints."
      },
      {
        stepNumber: "STEP 2",
        icon: "🔍",
        title: "Scope and clarification",
        description:
          "Krish. reviews requirements, flags dependencies, and asks focused clarifying questions only when needed."
      },
      {
        stepNumber: "STEP 3",
        icon: "⚙️",
        title: "Implementation and verification",
        description:
          "The task is implemented using AI-assisted workflows and experienced developer review for reliable output."
      },
      {
        stepNumber: "STEP 4",
        icon: "✅",
        title: "Delivery and next request",
        description:
          "You receive completed implementation with clear notes, then continue the same request flow for the next task."
      }
    ]
  },
  insightSections: [
    {
      sectionTitle: "Who Krish. is built for",
      sectionDescription:
        "Teams that run stores actively and need steady implementation throughput usually get the most value.",
      bullets: [
        "Shopify founders who want store updates shipped without hiring or managing multiple developers.",
        "Ecommerce managers responsible for frequent merchandising, layout, and operational fixes.",
        "Growth and marketing teams launching campaigns that depend on fast storefront implementation.",
        "Product and operations teams that need predictable quality across recurring Shopify tasks."
      ]
    },
    {
      sectionTitle: "Why teams choose this model",
      sectionDescription:
        "The model is built for repeatable delivery across everyday Shopify work.",
      bullets: [
        "You can submit requests in familiar channels instead of adopting another complex project tool.",
        "Scope is clarified early, which reduces revision loops and misunderstandings later in execution.",
        "AI systems speed up implementation planning while humans verify quality before handoff.",
        "A repeatable workflow helps teams clear recurring task backlogs without constant process rebuilding."
      ]
    }
  ],
  checklistSection: {
    sectionTitle: "What happens after your first request",
    sectionDescription:
      "After the first task is delivered, most teams follow this simple rhythm to keep shipping reliably.",
    items: [
      "Start with one high-priority task that is currently blocking a launch, campaign, or store update.",
      "Review the delivered output and validate behavior against your expected result.",
      "Use the same request format for the next task so execution speeds up over time.",
      "Batch related small changes when useful, while keeping each request outcome-specific.",
      "Run a weekly request rhythm so improvements ship consistently instead of piling up."
    ]
  },
  faqSection: {
    sectionTitle: "Common buying questions",
    faqs: [
      {
        question: "Can we start with one request before committing to a broader workflow?",
        answer:
          "Yes. Most teams begin with one high-priority task to evaluate response quality, speed, and delivery reliability."
      },
      {
        question: "Will this work if our requests are small but frequent?",
        answer:
          "Yes. That is one of the most common use cases: recurring Shopify updates that are too small for agency projects but still require reliable execution."
      },
      {
        question: "How quickly can we expect progress after submitting a task?",
        answer:
          "Initial response and scoping begin quickly, and you receive clear communication on next steps and expected delivery flow."
      },
      {
        question: "What if our request is unclear or changes during execution?",
        answer:
          "Krish. handles clarification early and updates scope as needed so implementation stays aligned with the business outcome."
      },
      {
        question: "How do we know delivered work is ready to launch?",
        answer:
          "Changes are verified before handoff and delivered with completion context so your team can review and publish with confidence."
      }
    ]
  },
  finalCta: withDefaultCta(
    "Ready to test Krish. with a real Shopify task?",
    "Share one request and evaluate the workflow on your own store."
  )
};

export const useCasesPageContent: MarketingPageContent = {
  metadataTitle: "Use Cases",
  metadataDescription:
    "Browse high-intent Shopify use cases Krish. can execute, including theme changes, bug fixes, promotions, mobile fixes, and performance work.",
  path: "/use-cases",
  intro: {
    eyebrow: "Use Cases",
    title: "Common Shopify tasks teams need done every week",
    description:
      "Most Shopify teams run into the same execution bottlenecks repeatedly: campaign updates that need code, product page changes that break layout logic, mobile issues that hurt conversion, and urgent fixes before launch windows. This use-case library shows practical request categories, what typically causes delay, and how Krish. helps teams move from request to reliable implementation without fragmented freelancer coordination.",
    primaryCta: contactCtaPrimary,
    secondaryCta: standardSecondaryCtas.readGuides,
    microcopy: standardCtaMicrocopy
  },
  linkedCardsSection: {
    sectionTitle: "Common Shopify development tasks",
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
  faqSection: {
    sectionTitle: "FAQs",
    faqs: [
      {
        question: "How quickly can Krish. start and complete typical Shopify tasks?",
        answer:
          "Most requests are acknowledged quickly and common tasks are typically completed within 30 minutes to 24 hours, depending on complexity and active queue priority."
      },
      {
        question: "Can we submit multiple Shopify tasks in one request?",
        answer:
          "Yes. Founders often send a list. Krish. helps prioritize by business impact, urgency, and dependencies so critical updates ship first."
      },
      {
        question: "What if a task is urgent because of an upcoming campaign?",
        answer:
          "Share your deadline in the request. Urgent launch-critical tasks can be prioritized to reduce campaign risk."
      },
      {
        question: "How do we know if a task is included in the monthly plan?",
        answer:
          "Most recurring Shopify implementation tasks are included. If a task needs special scoping, Krish. flags it early and confirms custom pricing before work starts."
      },
      {
        question: "What quality checks happen before delivery?",
        answer:
          "Krish. combines AI-assisted execution with human verification, then delivers with clear completion context so you can publish confidently."
      }
    ]
  },
  tasksSection: {
    ...commonTasksSection,
    tasks: []
  },
  finalCta: withDefaultCta(
    "Have a Shopify task similar to these use cases?",
    "Send the request and Krish. will complete it with AI-assisted, human-verified execution."
  )
};

export const faqsPageContent: MarketingPageContent = {
  metadataTitle: "FAQs",
  metadataDescription:
    "Answers to the most common questions Shopify founders ask when evaluating Krish. for ongoing development execution.",
  path: "/faqs",
  intro: {
    eyebrow: "FAQ",
    title: "FAQs for Shopify teams evaluating Krish.",
    description:
      "Get answers to the practical questions Shopify teams ask before they start: what is included, how fast requests are completed, what access is required, and how pricing works for recurring and special-scope Shopify tasks. If your team wants reliable execution, this FAQs help you make decisions quickly.",
    primaryCta: contactCtaPrimary,
    secondaryCta: standardSecondaryCtas.seeUseCases
  },
  faqSection: {
    sectionTitle: "Frequently asked questions",
    faqs: [
      {
        question: "How quickly can Krish. complete Shopify tasks?",
        answer:
          "Most standard tasks are completed within 30 minutes to 24 hours once scope is clear. You also receive quick acknowledgment so your team knows work has started."
      },
      {
        question: "What types of tasks are included?",
        answer:
          "Recurring Shopify implementation tasks are included, such as theme updates, homepage changes, product page edits, promotion setup support, bug fixes, and mobile/layout fixes."
      },
      {
        question: "Can we submit multiple tasks at once?",
        answer:
          "Yes. You can submit a list of tasks and Krish. will prioritize by urgency, launch impact, and dependencies."
      },
      {
        question: "Do we need to use a new project management tool?",
        answer:
          "No. You can submit and manage requests through channels your team already uses, including Slack, WhatsApp, or email."
      },
      {
        question: "How is quality handled before delivery?",
        answer:
          "Krish. combines AI-assisted execution with human verification before handoff, then shares completion context so your team can review and publish confidently."
      },
      {
        question: "Are all tasks covered under monthly pricing?",
        answer:
          "Most recurring tasks are covered. Special-scope tasks are also supported and priced separately on a per-task basis after scope review and approval."
      },
      {
        question: "What access do you need to our Shopify store?",
        answer:
          "Only the minimum collaborator access required for the requested work. You keep full ownership and can adjust permissions any time."
      },
      {
        question: "How do we start?",
        answer:
          "Send one high-priority Shopify task with page URL, expected outcome, and timeline. Krish. will confirm scope and begin execution."
      }
    ]
  },
  finalCta: withDefaultCta(
    "Still deciding if Krish. is the right fit?",
    "Start with one real Shopify task and evaluate speed, quality, and communication."
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
      "This guide library is built for Shopify operators who need practical execution help, not generic advice. Each guide breaks down the most common implementation problems teams face, what to prioritize first based on business impact, and which changes are usually blocked by theme limitations. Use these guides to make clearer decisions, reduce avoidable rework, and move from request to completed implementation with less coordination overhead.",
    primaryCta: contactCtaPrimary,
    secondaryCta: standardSecondaryCtas.seeUseCases,
    microcopy: standardCtaMicrocopy
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
  featureSection: {
    sectionTitle: "How to use these guides effectively",
    features: [
      {
        title: "Start with one priority problem",
        description:
          "Choose the guide that maps to the change currently blocking a campaign, launch, or merchandising update."
      },
      {
        title: "Follow execution steps in order",
        description:
          "Use the step-by-step flow to reduce missed dependencies and avoid publishing incomplete theme updates."
      },
      {
        title: "Convert guidance into one clear request",
        description:
          "When implementation is the bottleneck, submit the exact scope and expected outcome so work can ship faster."
      }
    ]
  },
  insightSections: [
    {
      sectionTitle: "What these guides help you avoid",
      sectionDescription:
        "Most delays come from vague requirements or unstructured implementation cycles.",
      bullets: [
        "Theme edits that break mobile layout after desktop-only validation.",
        "Promotion launches delayed by missing coordination across banners, discounts, and navigation.",
        "Product page changes shipped without clear acceptance criteria for add-to-cart behavior.",
        "Performance fixes focused on low-impact pages while high-traffic templates stay slow."
      ]
    },
    {
      sectionTitle: "How guides connect to execution",
      sectionDescription:
        "Use guide content as a request blueprint when your team needs implementation support.",
      bullets: [
        "Copy checklist items directly into your task request to keep scope specific.",
        "Reference affected templates and sections so implementation starts with correct context.",
        "Include campaign or launch deadlines so work can be prioritized correctly.",
        "Use FAQ guidance to resolve common objection points before review cycles."
      ]
    }
  ],
  checklistSection: {
    sectionTitle: "Guide-to-execution checklist",
    sectionDescription:
      "Use this sequence to move from reading guidance to shipping a completed Shopify update.",
    items: [
      "Choose the guide matching your highest-impact Shopify bottleneck this week.",
      "List the exact pages, sections, and behavior changes you need.",
      "Add screenshots or links showing current state and desired outcome.",
      "Define what 'done' means so implementation can be validated quickly.",
      "Prioritize mobile behavior for any customer-facing layout changes.",
      "Capture deadline context for promotions, launches, or seasonal campaigns.",
      "Submit one focused request instead of mixing unrelated tasks in one thread.",
      "Review delivered work against the checklist before publishing."
    ]
  },
  faqSection: {
    sectionTitle: "Guide library FAQs",
    faqs: [
      {
        question: "Are these guides for technical developers only?",
        answer:
          "No. They are written for founders, ecommerce operators, and growth teams that need clear implementation direction."
      },
      {
        question: "Can we use the guides even if we already have a developer?",
        answer:
          "Yes. The guides help your team define cleaner scope and reduce revision loops regardless of who implements."
      },
      {
        question: "What if we need help executing the checklist?",
        answer:
          "You can submit the checklist as a request and Krish. can complete implementation with AI-assisted, human-verified execution."
      },
      {
        question: "Should we start with guides or use-case pages first?",
        answer:
          "Start with the page that best matches your immediate blocker. Use guides for detailed execution planning and use-case pages for quick recognition."
      },
      {
        question: "Do these guides cover campaign launch tasks?",
        answer:
          "Yes. Multiple guides include practical flows for banner updates, promotions, PDP changes, and speed readiness before launch."
      }
    ]
  },
  finalCta: withDefaultCta(
    "Need help implementing what you read?",
    "Krish. can execute the exact changes from your guide checklist."
  )
};

export const comparePageContent: MarketingPageContent = {
  metadataTitle: "Compare",
  metadataDescription:
    "Compare Krish. with freelancers, agencies, and Shopify task services to choose the right execution model for your team.",
  path: "/compare",
  intro: {
    eyebrow: "Compare",
    title: "Choose the right Shopify execution model",
    description:
      "When teams compare Shopify execution options, the same questions repeat: how fast can changes ship, how much coordination is still required, and how reliable is delivery quality once a task is marked complete. This comparison hub breaks down practical tradeoffs across common provider models so you can choose an option that fits recurring operational needs, campaign timelines, and internal bandwidth constraints.",
    primaryCta: contactCtaPrimary,
    secondaryCta: standardSecondaryCtas.viewProduct,
    microcopy: standardCtaMicrocopy
  },
  linkedCardsSection: {
    sectionTitle: "Comparison pages",
    cards: [
      {
        title: "Freelancers vs Krish.",
        description: "Compare flexibility, reliability, communication overhead, and turnaround consistency.",
        href: "/compare/freelancers-vs-krish",
        icon: "🧑‍💻"
      },
      {
        title: "Shopify Agencies vs Krish.",
        description: "Evaluate agency retainers vs on-demand task execution for ongoing store changes.",
        href: "/compare/shopify-agencies-vs-krish",
        icon: "🏢"
      },
      {
        title: "Task Services vs Krish.",
        description: "Understand differences between queue-based task services and integrated execution.",
        href: "/compare/task-services-vs-krish",
        icon: "📋"
      },
      {
        title: "Storetasker vs Krish.",
        description: "Compare expert-matching workflows with continuous execution support models.",
        href: "/compare/storetasker-vs-krish",
        icon: "🆚"
      },
      {
        title: "TaskHusky vs Krish.",
        description: "Compare speed, communication flow, and Shopify-specific implementation outcomes.",
        href: "/compare/taskhusky-vs-krish",
        icon: "⚖️"
      }
    ]
  },
  featureSection: {
    sectionTitle: "What to compare before choosing",
    features: [
      {
        title: "Turnaround consistency",
        description:
          "Measure whether requests are consistently completed on usable timelines, not just isolated fast deliveries."
      },
      {
        title: "Coordination overhead",
        description:
          "Evaluate how much briefing, follow-up, and quality-check work still sits with your internal team."
      },
      {
        title: "Implementation reliability",
        description:
          "Compare how often delivered work matches expected behavior with minimal rework or regression issues."
      }
    ]
  },
  insightSections: [
    {
      sectionTitle: "How buyers should evaluate options",
      sectionDescription:
        "Comparison quality improves when you evaluate with real request patterns instead of generic feature lists.",
      bullets: [
        "Use recent Shopify tasks from your own backlog to test whether the model handles real execution complexity.",
        "Track how many clarification loops are needed before implementation actually begins.",
        "Assess delivery quality based on whether the first output is launch-ready across relevant devices and templates.",
        "Factor in ongoing management time, because coordination cost can erase apparent price savings."
      ]
    },
    {
      sectionTitle: "What often gets missed in evaluations",
      sectionDescription:
        "Teams frequently underestimate operational friction that appears after the initial vendor selection.",
      bullets: [
        "Variable turnaround creates planning risk for promotions and launch calendars that depend on predictable execution.",
        "Communication spread across multiple tools slows down requirement alignment and approval flow.",
        "Inconsistent implementation quality shifts testing and rework burden back onto internal operators.",
        "Lack of repeatable process makes scaling weekly request volume harder as store complexity grows."
      ]
    }
  ],
  faqSection: {
    sectionTitle: "Comparison hub FAQs",
    faqs: [
      {
        question: "Which criteria should we prioritize first?",
        answer:
          "Most teams should start with turnaround consistency, coordination overhead, and implementation reliability because these directly affect execution speed and risk."
      },
      {
        question: "Can we compare providers using one real request?",
        answer:
          "Yes. A real task from your backlog is usually the fastest way to evaluate communication clarity and delivery quality."
      },
      {
        question: "Why is coordination overhead such an important factor?",
        answer:
          "If your team still spends significant time briefing and QA-ing each task, overall execution throughput remains slow even with external support."
      },
      {
        question: "Do comparison pages include both strategic and operational fit?",
        answer:
          "Yes. Pages cover practical day-to-day fit as well as model-level tradeoffs for recurring Shopify execution."
      },
      {
        question: "What should we do after reviewing comparisons?",
        answer:
          "Submit a representative Shopify request and evaluate the full workflow from intake through delivery."
      }
    ]
  },
  checklistSection: {
    sectionTitle: "What happens next after comparison review",
    sectionDescription:
      "Use this process to make a practical decision based on outcomes, not assumptions.",
    items: [
      "Select one or two high-priority Shopify tasks from your current backlog as evaluation samples.",
      "Compare provider responses for requirement clarity, expected timeline, and implementation approach.",
      "Measure coordination load required from your internal team during request handling.",
      "Review delivered output quality against expected behavior and launch readiness.",
      "Choose the model that provides the best balance of speed, reliability, and operational simplicity."
    ]
  },
  finalCta: withDefaultCta(
    "Want to evaluate Krish. on your own task backlog?",
    "Start with one request and measure delivery speed and quality for your team."
  )
};

export const resourcesPageContent: MarketingPageContent = {
  metadataTitle: "Resources",
  metadataDescription:
    "Explore Shopify resources from Krish., including blog content, use cases, and implementation documentation.",
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
        title: "Use Cases",
        description: "Browse practical Shopify execution scenarios and recurring request patterns.",
        href: "/use-cases",
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
    "Send your Shopify request and Krish. can implement the change directly."
  )
};

export const aboutPageContent: MarketingPageContent = {
  metadataTitle: "About",
  metadataDescription:
    "Learn about Krish's mission to help Shopify teams execute development tasks quickly and reliably using an AI + human workflow.",
  path: "/about",
  intro: {
    eyebrow: "About",
    title: "Krish. helps Shopify teams execute faster",
    description:
      "Krish. was built for founders, ecommerce operators, and marketing teams that need reliable Shopify implementation without managing fragmented developer workflows.",
    primaryCta: contactCtaPrimary,
    secondaryCta: { label: "How it works", href: "/product/how-krish-works" }
  },
  featureSection: {
    sectionTitle: "How Krish. is designed",
    features: [
      {
        title: "Clarity first",
        description: "Requests are translated into clear implementation scopes before work begins."
      },
      {
        title: "Execution ownership",
        description: "Krish. owns delivery quality so teams are not left managing fragmented contributors."
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
    "Want to see if Krish. fits your team?",
    "Book a short workflow walkthrough and share your current Shopify execution process."
  )
};

export const contactPageContent: MarketingPageContent = {
  metadataTitle: "Contact",
  metadataDescription:
    "Contact Krish. to submit Shopify development requests via Slack, WhatsApp, or email and get fast execution support.",
  path: "/contact",
  intro: {
    eyebrow: "Contact",
    title: "Share your Shopify task and we'll handle execution",
    description:
      "You can send requests through Slack, WhatsApp, or email. Include your store URL, the change needed, and any launch timeline.",
    primaryCta: { label: "Email us", href: "mailto:hello@heykrish.ai" },
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
          "Yes. You can send a prioritized list of tasks, and Krish. will help sequence implementation based on urgency."
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
    "Read Krish. blog content on Shopify development operations, task execution workflows, and practical store optimization insights.",
  path: "/blog",
  intro: {
    eyebrow: "Blog",
    title: "Shopify execution insights for operators",
    description:
      "The Krish. blog focuses on practical Shopify task execution: what teams request most, where implementation bottlenecks happen, and how to ship updates faster.",
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
    "Krish. can execute the exact Shopify changes from your optimization checklist."
  )
};

export const privacyPageContent: MarketingPageContent = {
  metadataTitle: "Privacy Policy",
  metadataDescription:
    "Read Krish's privacy policy and data handling principles for website visitors and request submissions.",
  path: "/privacy",
  intro: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    description:
      "Krish. respects your privacy. We only use submitted information to evaluate and execute Shopify requests, improve service quality, and provide support communication."
  },
  featureSection: {
    sectionTitle: "Privacy principles",
    features: [
      {
        title: "Purpose-limited use",
        description: "Information shared with Krish. is used to deliver requested services and support."
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
    "Review Krish. service terms, responsibilities, and execution expectations for Shopify development requests.",
  path: "/terms",
  intro: {
    eyebrow: "Legal",
    title: "Terms of Service",
    description:
      "Krish. provides Shopify development execution support based on request scope, platform constraints, and implementation feasibility."
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
  "how-krish-works": {
    metadataTitle: "How Krish. Works",
    metadataDescription:
      "Understand how Krish. processes Shopify requests, executes implementation with AI + human workflows, and delivers tested outcomes.",
    path: "/product/how-krish-works",
    intro: {
      eyebrow: "Product Workflow",
      title: "How Krish. completes Shopify requests",
      description:
        "From your team’s perspective, Krish. works like an execution partner focused on speed and reliability. You send your Shopify task(s), Krish. validates the requirement, executes the implementation using AI-assisted workflows and experienced developers, and returns a human-tested result that is ready to use.",
      primaryCta: contactCtaPrimary,
      secondaryCta: standardSecondaryCtas.seeUseCases,
      microcopy: standardCtaMicrocopy
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
          description: "Krish. analyzes scope and asks clarifying questions when requirements are ambiguous."
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
        },
        {
          stepNumber: "STEP 5",
          icon: "📦",
          title: "Delivery and confirmation",
          description:
            "The completed change is delivered with implementation notes and any final checks your team should run."
        }
      ]
    },
    insightSections: [
      {
        sectionTitle: "What teams receive at delivery",
        sectionDescription:
          "Delivery is structured so operators and marketers can ship quickly without decoding technical details.",
        bullets: [
          "A clear summary of what changed and where it was implemented in the store experience.",
          "Confirmation of tested behavior for the requested update before handoff.",
          "Notes on dependencies or follow-up recommendations if additional updates are useful.",
          "A predictable communication loop for the next request so execution stays continuous."
        ]
      }
    ],
    checklistSection: {
      sectionTitle: "What happens next after you submit",
      sectionDescription:
        "Use this flow as your expectation for each request from first message to final delivery.",
      items: [
        "Send the requested Shopify change with URL, desired behavior, and deadline if applicable.",
        "Receive an acknowledgment and clarification questions if any requirement needs detail.",
        "Krish. executes implementation with AI-assisted planning and developer execution.",
        "Quality checks are completed before the final handoff to your team.",
        "You receive the completed update and can immediately submit the next task in the same workflow."
      ]
    },
    faqSection: {
      sectionTitle: "How it works FAQs",
      faqs: [
        {
          question: "How fast are Shopify tasks completed?",
          answer:
            "Most small and medium Shopify tasks are completed within 1-2 business days after scope is clear. You also get a fast acknowledgement so you know work has started."
        },
        {
          question: "Who is actually doing the work: AI or developers?",
          answer:
            "Krish. uses AI to speed up task interpretation and implementation planning, then experienced developers execute and verify the final output before delivery."
        },
        {
          question: "What store access do you need?",
          answer:
            "You can grant collaborator access with only the permissions needed for your request. You keep full store ownership and can adjust or remove access at any time."
        },
        {
          question: "What if the delivered change is not exactly what we asked for?",
          answer:
            "If something needs adjustment, you send feedback in the same thread and Krish. iterates until the requested outcome is met."
        },
        {
          question: "Can Krish. handle urgent launch-day fixes?",
          answer:
            "Yes. Urgent requests can be prioritized when launch timing is shared clearly, especially for homepage, promotion, checkout, or mobile-impacting issues."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Want to test the workflow with a real task?",
      "Share one Shopify request and evaluate the end-to-end execution experience."
    )
  },
  "what-krish-can-do": {
    metadataTitle: "What Krish. Can Do",
    metadataDescription:
      "See what Shopify development tasks Krish. can execute, including theme updates, PDP customization, discounts, bug fixes, and performance improvements.",
    path: "/product/what-krish-can-do",
    intro: {
      eyebrow: "Task Coverage",
      title: "Shopify tasks Krish. can execute for your team",
      description:
        "Krish. handles recurring Shopify implementation work that usually slows operators down: theme changes, campaign updates, product page customization, bug fixes, and performance-focused improvements. The goal is to give your team one execution path for practical store changes that require reliable completion, clear handoff, and less coordination overhead during active growth periods.",
      primaryCta: contactCtaPrimary,
      secondaryCta: standardSecondaryCtas.compareOptions,
      microcopy: standardCtaMicrocopy
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
    insightSections: [
      {
        sectionTitle: "Task categories we execute frequently",
        sectionDescription:
          "Most requests fit into repeatable Shopify workstreams that need technical implementation.",
        bullets: [
          "Storefront and theme updates such as homepage banners, section adjustments, and layout fixes.",
          "Product page improvements including personalization fields, module reordering, and usability tweaks.",
          "Promotion execution including discount setup support, campaign visuals, and launch-day adjustments.",
          "Operational fixes such as mobile responsiveness issues, rendering bugs, and performance bottlenecks."
        ]
      },
      {
        sectionTitle: "What is not a fit for this model",
        sectionDescription:
          "Krish. is designed for Shopify execution workflows, not every possible digital project type.",
        bullets: [
          "Full custom app platform builds that require long discovery and multi-quarter product roadmaps.",
          "Non-Shopify engineering projects such as backend systems unrelated to store implementation.",
          "Brand strategy, positioning, or copywriting-only engagements without implementation scope.",
          "Requests that require direct third-party legal/compliance decisions outside technical execution."
        ]
      }
    ],
    checklistSection: {
      sectionTitle: "What happens next after coverage confirmation",
      sectionDescription:
        "Once your task is confirmed as a fit, Krish. moves quickly into implementation.",
      items: [
        "You share the request with context, expected outcome, and any campaign timing constraints.",
        "Krish. confirms scope and flags dependencies or assumptions before work begins.",
        "Implementation is completed with attention to behavior, layout, and store consistency.",
        "Delivery includes completion notes so your team can verify and publish confidently.",
        "You can continue with the next request using the same intake workflow."
      ]
    },
    faqSection: {
      sectionTitle: "Task coverage FAQs",
      faqs: [
        {
          question: "Can Krish. handle both simple and code-dependent Shopify changes?",
          answer:
            "Yes. Krish. supports routine updates and more technical implementation tasks that go beyond the theme editor."
        },
        {
          question: "Do you support campaign-related requests with tight deadlines?",
          answer:
            "Yes. Promotion and launch tasks are common, and timeline context helps prioritize execution order."
        },
        {
          question: "What if our request spans multiple related updates?",
          answer:
            "You can share a prioritized list and Krish. will sequence implementation based on urgency and dependencies."
        },
        {
          question: "How do we know if a task is out of scope?",
          answer:
            "Krish. reviews requests quickly and communicates fit, constraints, and recommended next steps before execution."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Not sure if your task is covered?",
      "Send the requirement and Krish. will confirm scope quickly."
    )
  },
  pricing: {
    metadataTitle: "Pricing",
    metadataDescription:
      "Simple Krish. pricing: first 7 days free, then $1,000/month for unlimited Shopify tasks.",
    path: "/product/pricing",
    intro: {
      eyebrow: "Pricing",
      title: "Simple pricing for Shopify execution",
      description:
        "Start with a free 7-day trial to validate speed and quality on real tasks. If it fits, continue on one simple plan: $1,000/month for unlimited Shopify tasks.",
      primaryCta: contactCtaPrimary,
      secondaryCta: standardSecondaryCtas.seeUseCases,
      microcopy: standardCtaMicrocopy
    },
    featureSection: {
      sectionTitle: "Pricing",
      features: [
        {
          title: "First 7 days free",
          description:
            "Submit Shopify tasks during the first week at no cost. Use this period to evaluate turnaround, communication, and execution quality."
        },
        {
          title: "$1,000/month — unlimited tasks",
          description:
            "After trial, continue on a flat monthly plan. You can assign unlimited Shopify tasks based on active execution capacity and priority."
        }
      ]
    },
    insightSections: [
      {
        sectionTitle: "What counts as a task",
        sectionDescription:
          "A task is one clear Shopify change request with a defined outcome.",
        bullets: [
          "Make homepage banner clickable.",
          "Fix mobile spacing or layout issue on a specific template.",
          "Update product page section order or content behavior.",
          "Configure a promotion update, discount display, or navigation change."
        ]
      },
      {
        sectionTitle: "Special-scope tasks*",
        sectionDescription:
          "These tasks are supported, but priced separately on a per-task basis after scope review.",
        bullets: [
          "Full store redesigns and complete replatforming projects.",
          "Large custom app builds or deep backend system integrations.",
          "Complex enterprise workflows requiring multi-month discovery and architecture.",
          "Non-Shopify engineering projects unrelated to your store implementation."
        ]
      }
    ],
    checklistSection: {
      sectionTitle: "How unlimited works in practice",
      sectionDescription:
        "Unlimited means you can keep sending tasks. Work is prioritized and delivered in a continuous queue.",
      items: [
        "Submit as many tasks as needed through Slack, WhatsApp, or email.",
        "We prioritize based on urgency, launch dates, and business impact.",
        "Tasks are completed and delivered continuously, not batched at month-end.",
        "If a request falls under special-scope tasks*, we confirm custom per-task pricing before execution.",
        "*Special-scope tasks are supported and priced separately based on request complexity."
      ]
    },
    faqSection: {
      sectionTitle: "Pricing FAQs",
      faqs: [
        {
          question: "Is the first 7-day trial really free?",
          answer: "Yes. You can submit tasks for 7 days at no cost and no long-term commitment."
        },
        {
          question: "What happens after the trial?",
          answer:
            "You can continue on the $1,000/month plan for unlimited Shopify task execution."
        },
        {
          question: "What does unlimited tasks mean?",
          answer:
            "You can submit unlimited requests. Tasks are prioritized and completed in an active execution queue."
        },
        {
          question: "Are all Shopify requests included?",
          answer:
            "Most recurring Shopify implementation tasks are included in the monthly plan. Special-scope tasks* are also supported and priced separately per task after review."
        },
        {
          question: "How quickly are tasks completed?",
          answer:
            "Most standard tasks are completed within 30 minutes to 24 hours depending on scope and current queue."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Start with the free 7-day trial",
      "Send one Shopify task and evaluate speed, quality, and communication."
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
        "Theme editors are useful for simple swaps, but most meaningful storefront updates eventually hit a code wall that slows non-technical teams down. Merchants often need layout behavior that themes do not support out of the box, and even small styling changes can affect multiple templates. Krish. helps teams execute these updates safely, with faster turnaround and clearer implementation ownership.",
      primaryCta: contactCtaPrimary,
      secondaryCta: standardSecondaryCtas.readGuides,
      microcopy: standardCtaMicrocopy
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
    insightSections: [
      {
        sectionTitle: "Where theme change projects usually stall",
        sectionDescription:
          "Most delays happen before implementation starts, not during coding itself.",
        bullets: [
          "Requests are written as visual ideas without precise behavior details, which creates interpretation gaps.",
          "Teams are unsure which templates and sections are affected, causing avoidable rework.",
          "Small CSS or Liquid edits can create side effects on mobile layouts and other storefront pages.",
          "Without a clear workflow, merchants spend time coordinating instead of shipping updates."
        ]
      },
      {
        sectionTitle: "How Krish. reduces theme-change risk",
        sectionDescription:
          "Execution is structured to preserve speed while controlling regressions.",
        bullets: [
          "Requests are clarified into concrete change outcomes before implementation begins.",
          "Theme updates are executed with awareness of existing custom code and template dependencies.",
          "Output is reviewed for behavior consistency across relevant page types and breakpoints.",
          "Delivery includes clear confirmation of what changed so teams can publish confidently."
        ]
      }
    ],
    faqSection: {
      sectionTitle: "Theme change FAQs",
      faqs: [
        {
          question: "Can Krish. handle custom Liquid edits?",
          answer: "Yes. Theme file edits are supported when required by the request."
        },
        {
          question: "What if our theme has existing custom code?",
          answer:
            "Krish. reviews current implementation context before shipping changes to reduce regression risk."
        },
        {
          question: "Will we still be able to maintain our theme after these changes?",
          answer:
            "Yes. Changes are implemented with maintainability in mind so future updates stay manageable."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Need a Shopify theme change this week?",
      "Share the exact section or template update and Krish. will implement it."
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
        "Homepage updates are often the highest-pressure Shopify tasks because they sit directly on campaign and revenue paths. Teams need to swap banners, adjust section order, update messaging, and launch seasonal blocks quickly, but execution can stall when requests depend on developer availability or unclear implementation scope. Krish. helps teams ship homepage changes predictably, even under launch deadlines.",
      primaryCta: contactCtaPrimary,
      secondaryCta: standardSecondaryCtas.readGuides,
      microcopy: standardCtaMicrocopy
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
    insightSections: [
      {
        sectionTitle: "Common homepage execution bottlenecks",
        sectionDescription:
          "Homepage work looks simple but usually involves multiple dependencies.",
        bullets: [
          "Campaign assets, links, and messaging are often finalized late, leaving minimal implementation time.",
          "Theme constraints limit how sections can be arranged without custom changes.",
          "Desktop and mobile behavior often diverge, requiring careful responsive implementation.",
          "Launch-day fixes can interrupt planned work when execution workflow is not structured."
        ]
      },
      {
        sectionTitle: "What reliable homepage execution looks like",
        sectionDescription:
          "A stable process helps teams launch updates without last-minute chaos.",
        bullets: [
          "Each request includes exact target section, expected behavior, and live deadline.",
          "Implementation is prioritized around campaign-critical homepage elements first.",
          "Visual and interaction checks are run before final handoff.",
          "Teams receive clear completion notes and can roll into the next update quickly."
        ]
      }
    ],
    faqSection: {
      sectionTitle: "Homepage update FAQs",
      faqs: [
        {
          question: "Can Krish. handle urgent homepage changes before a campaign launch?",
          answer:
            "Yes. Teams regularly submit time-sensitive homepage requests and Krish. prioritizes by launch impact."
        },
        {
          question: "Do you support both visual updates and behavior changes?",
          answer:
            "Yes. Requests can include design updates, section logic changes, and interaction behavior requirements."
        },
        {
          question: "How do we reduce homepage rework loops?",
          answer:
            "Provide exact page context, desired user action, and deadline so implementation and validation stay aligned."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Need a homepage update for an upcoming campaign?",
      "Send the creative and expected behavior, and Krish. will implement it."
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
        "Product pages carry most conversion pressure, so even minor implementation issues can reduce revenue quickly. Teams often need custom layout adjustments, personalization logic, variant behavior improvements, and trust-content placement that standard theme controls cannot handle cleanly. Krish. helps operators execute these product page customizations with consistent implementation quality and clearer handoff expectations.",
      primaryCta: contactCtaPrimary,
      secondaryCta: standardSecondaryCtas.readGuides,
      microcopy: standardCtaMicrocopy
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
    insightSections: [
      {
        sectionTitle: "Why PDP customization gets complex fast",
        sectionDescription:
          "Product page work touches content hierarchy, purchase flow, and technical dependencies simultaneously.",
        bullets: [
          "Variant logic, dynamic content blocks, and personalization fields can conflict if not scoped clearly.",
          "Layout changes that improve desktop readability may reduce mobile clarity without responsive tuning.",
          "Theme-level constraints often require custom implementation for seemingly simple requests.",
          "Inconsistent QA on PDP behavior can create checkout friction and lost conversions."
        ]
      },
      {
        sectionTitle: "How teams keep PDP changes conversion-safe",
        sectionDescription:
          "Reliable execution combines scope clarity with focused quality verification.",
        bullets: [
          "Requests define expected user flow from product details through add-to-cart interaction.",
          "Implementation prioritizes purchase-critical modules before non-essential visual tweaks.",
          "Changes are checked for behavior consistency across key device and variant states.",
          "Delivery notes confirm what was updated and what to validate before rolling changes broadly."
        ]
      }
    ],
    faqSection: {
      sectionTitle: "Product page customization FAQs",
      faqs: [
        {
          question: "Can Krish. add personalization fields and custom product inputs?",
          answer:
            "Yes. Personalization and custom input requirements are common PDP implementation requests."
        },
        {
          question: "Do you support layout restructuring on product pages?",
          answer:
            "Yes. Krish. can reorder modules and adjust content hierarchy based on your conversion goals."
        },
        {
          question: "How do we avoid breaking variant and add-to-cart behavior?",
          answer:
            "Requests are implemented with behavior checks so critical purchase flow interactions remain stable."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Need a custom product page behavior?",
      "Share your current PDP URL and expected experience, and Krish. can implement it."
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
        "Promotion launches require multiple coordinated updates in a short window: discount logic, homepage messaging, collection visibility, and supporting campaign components. Merchants frequently lose time switching between tools and resolving implementation mismatches just before launch. Krish. helps teams execute promotion work as one operational flow so campaign updates go live accurately and on schedule.",
      primaryCta: contactCtaPrimary,
      secondaryCta: standardSecondaryCtas.readGuides,
      microcopy: standardCtaMicrocopy
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
    insightSections: [
      {
        sectionTitle: "Why promotion execution becomes fragile",
        sectionDescription:
          "Campaign outcomes depend on multiple implementation layers staying aligned.",
        bullets: [
          "Discount rules can pass configuration checks but fail in real cart or collection scenarios.",
          "Homepage and announcement updates may not match the exact timing of discount activation.",
          "Last-minute creative edits increase the chance of broken links or inconsistent messaging.",
          "Without one execution owner, launch issues are discovered too late in the rollout window."
        ]
      },
      {
        sectionTitle: "What reliable promo rollout requires",
        sectionDescription:
          "Consistent launch quality depends on sequencing and verification, not just setup speed.",
        bullets: [
          "Requirements include offer logic, applicable products/collections, and exact go-live timing.",
          "Visual updates and discount behavior are implemented in a coordinated release flow.",
          "Key buyer paths are checked before launch, including mobile behavior and checkout logic.",
          "Teams receive confirmation that campaign elements are aligned before traffic ramps."
        ]
      }
    ],
    faqSection: {
      sectionTitle: "Promotion execution FAQs",
      faqs: [
        {
          question: "Can Krish. support complex promotion launches with multiple moving parts?",
          answer:
            "Yes. Promotion work often combines discount setup, storefront updates, and launch-day validation."
        },
        {
          question: "Do you help with urgent fixes during active campaigns?",
          answer:
            "Yes. Launch-day fixes are supported when campaign behavior or presentation needs quick correction."
        },
        {
          question: "How do we avoid mismatch between discount logic and page messaging?",
          answer:
            "Provide the full offer brief, target pages, and activation timing so implementation stays synchronized."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Planning a sale or promotion launch?",
      "Send your promotion checklist and Krish. will coordinate implementation."
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
        "Shopify bugs usually arrive at the worst possible time: right before campaign traffic, during merchandising pushes, or after theme and app updates. Teams often spend more time reproducing and explaining issues than actually fixing them, especially when behavior differs across pages and devices. Krish. helps teams move from bug report to verified fix with less diagnostic overhead and clearer implementation ownership.",
      primaryCta: contactCtaPrimary,
      secondaryCta: standardSecondaryCtas.compareOptions,
      microcopy: standardCtaMicrocopy
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
    insightSections: [
      {
        sectionTitle: "Why Shopify bugs linger in backlogs",
        sectionDescription:
          "Bug resolution slows down when issue context is incomplete or ownership is fragmented.",
        bullets: [
          "Bug reports often miss reproducible steps, affected templates, and browser/device context.",
          "Multiple contributors may patch symptoms without addressing root implementation causes.",
          "App and theme interactions create side effects that are hard to diagnose quickly.",
          "Without structured verification, bugs can reappear after adjacent store updates."
        ]
      },
      {
        sectionTitle: "What reliable bug resolution looks like",
        sectionDescription:
          "Consistent fixes require clear reproduction, focused implementation, and verification.",
        bullets: [
          "Requests include exact URL, expected behavior, current behavior, and priority impact.",
          "Implementation targets root issue sources instead of visual workarounds where possible.",
          "Fixes are validated against affected pages and device contexts before handoff.",
          "Delivery confirms resolved behavior so teams can close issues with confidence."
        ]
      }
    ],
    faqSection: {
      sectionTitle: "Bug-fix FAQs",
      faqs: [
        {
          question: "Can Krish. handle bugs that only happen on certain devices?",
          answer:
            "Yes. Device-specific issues are common, and requests can include screenshots and reproduction context."
        },
        {
          question: "What information helps resolve bugs faster?",
          answer:
            "Include exact page URL, reproduction steps, expected outcome, and where the issue has the highest business impact."
        },
        {
          question: "Do you verify fixes before delivery?",
          answer:
            "Yes. Bug fixes are checked for expected behavior before final handoff to reduce repeat loops."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Need a Shopify bug fixed quickly?",
      "Share the page URL and issue details, and Krish. will work on a fix."
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
        "Most Shopify traffic is mobile, but many stores still break under real device conditions: overlapping sections, misaligned controls, cropped media, and difficult touch interactions. These issues create friction across key conversion paths and often go unnoticed until campaign traffic rises. Krish. helps teams resolve mobile-specific problems with implementation that prioritizes usability, readability, and conversion stability.",
      primaryCta: contactCtaPrimary,
      secondaryCta: standardSecondaryCtas.readGuides,
      microcopy: standardCtaMicrocopy
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
    insightSections: [
      {
        sectionTitle: "Where mobile issues typically appear",
        sectionDescription:
          "Responsive problems often cluster on high-traffic pages where layout complexity is highest.",
        bullets: [
          "Homepage heroes and campaign sections frequently stack incorrectly on smaller breakpoints.",
          "Product page modules can push key purchase actions below fold or into confusing positions.",
          "Navigation and filter controls may become hard to tap or partially hidden.",
          "Text and media scaling inconsistencies reduce clarity and trust in mobile browsing sessions."
        ]
      },
      {
        sectionTitle: "How teams stabilize mobile conversion paths",
        sectionDescription:
          "Mobile fixes are most effective when implementation follows priority user journeys.",
        bullets: [
          "Start with pages that drive revenue: homepage, top collections, and key product templates.",
          "Align spacing, tap targets, and content hierarchy to support fast scanning and action.",
          "Validate interactive behavior across realistic viewport ranges before publishing.",
          "Deliver updates with clear notes so teams can monitor post-launch behavior confidently."
        ]
      }
    ],
    faqSection: {
      sectionTitle: "Mobile-fix FAQs",
      faqs: [
        {
          question: "Can Krish. fix mobile-only layout issues without redesigning the full page?",
          answer:
            "Yes. Mobile-specific fixes can be implemented while preserving the broader design system and page structure."
        },
        {
          question: "Do you address both visual and interaction issues on mobile?",
          answer:
            "Yes. Requests can include layout, spacing, tap-target behavior, and navigation interaction problems."
        },
        {
          question: "How quickly can we prioritize critical mobile blockers?",
          answer:
            "Include revenue impact and affected URLs so critical issues can be scoped and addressed first."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Seeing mobile-specific issues on your store?",
      "Share screenshots and URLs, and Krish. will implement responsive fixes."
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
        "As Shopify stores scale, speed problems accumulate from heavy assets, script overlap, and theme-level inefficiencies that are difficult to unwind quickly. Slow pages reduce conversion and increase campaign waste, especially on mobile traffic. Krish. helps teams identify practical performance opportunities, prioritize the highest-impact pages, and implement improvements in a structured sequence that supports ongoing store operations.",
      primaryCta: contactCtaPrimary,
      secondaryCta: standardSecondaryCtas.readGuides,
      microcopy: standardCtaMicrocopy
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
    insightSections: [
      {
        sectionTitle: "Why speed work fails without prioritization",
        sectionDescription:
          "Performance projects can expand endlessly unless they are tied to concrete conversion paths.",
        bullets: [
          "Teams often optimize low-impact pages first while revenue-critical templates remain slow.",
          "App and script layers can conflict, making improvements unstable without careful sequencing.",
          "One-off fixes may not hold if broader theme patterns continue to add page weight.",
          "Without iterative validation, teams struggle to prove that changes improved business outcomes."
        ]
      },
      {
        sectionTitle: "How to run speed improvements pragmatically",
        sectionDescription:
          "Practical optimization focuses on repeatable wins instead of one-time technical cleanups.",
        bullets: [
          "Prioritize homepage, high-traffic collections, and conversion-heavy product pages first.",
          "Reduce avoidable rendering overhead from scripts, assets, and duplicated app behavior.",
          "Implement and verify in cycles so each change can be measured and safely rolled out.",
          "Keep optimization tied to operational cadence so performance gains are maintained over time."
        ]
      }
    ],
    faqSection: {
      sectionTitle: "Speed optimization FAQs",
      faqs: [
        {
          question: "Can Krish. help prioritize which pages to optimize first?",
          answer:
            "Yes. Speed work is typically prioritized by traffic, conversion impact, and campaign importance."
        },
        {
          question: "Do you handle both asset and app-related performance issues?",
          answer:
            "Yes. Requests can include theme asset optimization, script cleanup, and app-overhead reduction."
        },
        {
          question: "How do we know speed improvements are meaningful?",
          answer:
            "Improvements should be validated on priority pages and tied to better user flow and conversion readiness."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Want to improve speed before your next campaign?",
      "Share your key landing pages and Krish. can prioritize high-impact fixes."
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
        "Shopify theme customization usually starts simple and becomes risky once changes go beyond built-in theme settings. This guide helps you plan scope, sequence implementation safely, and validate outcomes across templates before publishing. Use it to reduce regressions during layout edits, section updates, style changes, and Liquid-level customizations that affect conversion pages.",
      primaryCta: contactCtaPrimary,
      secondaryCta: standardSecondaryCtas.seeUseCases,
      microcopy: standardCtaMicrocopy
    },
    stepsSection: {
      sectionTitle: "Recommended execution flow",
      steps: [
        {
          stepNumber: "STEP 1",
          icon: "🔎",
          title: "Define exact scope",
          description:
            "List affected templates, sections, and behavior expectations before touching code."
        },
        {
          stepNumber: "STEP 2",
          icon: "🧭",
          title: "Map dependencies first",
          description:
            "Identify snippets, section settings, and CSS selectors shared across templates."
        },
        {
          stepNumber: "STEP 3",
          icon: "🧪",
          title: "Implement in controlled order",
          description:
            "Ship one block at a time so issues are isolated and easy to roll back if needed."
        },
        {
          stepNumber: "STEP 4",
          icon: "✅",
          title: "Validate across devices",
          description:
            "Confirm desktop and mobile behavior, then publish only after checklist validation."
        }
      ]
    },
    checklistSection: {
      sectionTitle: "Theme customization checklist",
      sectionDescription:
        "Use this practical checklist before publishing any theme-level update.",
      items: [
        "Confirm the exact page templates and sections included in scope.",
        "Back up current theme state or duplicate theme before edits.",
        "Document expected behavior for desktop and mobile separately.",
        "Verify new code does not break existing section settings.",
        "Check typography, spacing, and button states against design system tokens.",
        "Test navigation, banner links, and core conversion paths after edits.",
        "Validate app blocks and third-party widgets still render correctly.",
        "Run final QA on high-traffic pages before publishing changes."
      ]
    },
    faqSection: {
      sectionTitle: "Theme customization FAQs",
      faqs: [
        {
          question: "When do theme changes require code instead of theme editor settings?",
          answer:
            "If layout behavior, section logic, or component structure must change, code edits are usually required."
        },
        {
          question: "How do we reduce risk before publishing theme updates?",
          answer:
            "Use a staged workflow: duplicate theme, implement in small batches, and validate across devices before publish."
        },
        {
          question: "Can Krish. execute theme customization requests directly from this checklist?",
          answer:
            "Yes. Share the checklist scope, page URLs, and expected outcome, and Krish. can implement and verify the update."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Need help executing this guide?",
      "Krish. can implement your theme change checklist directly."
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
        "Homepage performance is often limited by unclear messaging, weak action hierarchy, and campaign updates that require too much manual coordination. This guide helps Shopify teams prioritize the homepage changes that improve clarity, speed up launch execution, and reduce friction between marketing goals and storefront implementation. Use it as a repeatable framework for weekly homepage iteration.",
      primaryCta: contactCtaPrimary,
      secondaryCta: standardSecondaryCtas.seeUseCases,
      microcopy: standardCtaMicrocopy
    },
    stepsSection: {
      sectionTitle: "Homepage optimization flow",
      steps: [
        {
          stepNumber: "STEP 1",
          icon: "🧭",
          title: "Clarify primary homepage goal",
          description:
            "Define whether the page should drive collection clicks, product discovery, or campaign conversion."
        },
        {
          stepNumber: "STEP 2",
          icon: "✍️",
          title: "Improve above-the-fold messaging",
          description:
            "Tighten headline, supporting copy, and primary CTA so first-time visitors understand next action quickly."
        },
        {
          stepNumber: "STEP 3",
          icon: "🧱",
          title: "Reorder sections by buying intent",
          description:
            "Place high-value content blocks first and remove low-impact visual noise."
        },
        {
          stepNumber: "STEP 4",
          icon: "📱",
          title: "Validate mobile conversion flow",
          description:
            "Check readability, tap targets, and section stacking on smaller screens before publishing."
        }
      ]
    },
    checklistSection: {
      sectionTitle: "Homepage execution checklist",
      sectionDescription:
        "Use this checklist when preparing homepage updates for campaigns or ongoing optimization.",
      items: [
        "Set one primary homepage action to avoid conflicting CTA paths.",
        "Ensure hero copy describes a concrete Shopify outcome in simple language.",
        "Make the homepage banner fully clickable where relevant.",
        "Confirm promotion messaging matches active discounts and landing destinations.",
        "Review section order so trust and product discovery appear before long-form content.",
        "Check navigation links used in hero and homepage modules for broken routes.",
        "Validate visual hierarchy and spacing on mobile viewports.",
        "Test final homepage flow from hero click to destination page."
      ]
    },
    faqSection: {
      sectionTitle: "Homepage optimization FAQs",
      faqs: [
        {
          question: "How often should Shopify teams update homepage sections?",
          answer:
            "High-velocity stores often update weekly around campaigns, product drops, and merchandising priorities."
        },
        {
          question: "What is the most common homepage conversion mistake?",
          answer:
            "Most teams try to communicate too many messages at once, which weakens CTA clarity above the fold."
        },
        {
          question: "Can Krish. implement homepage changes from this checklist quickly?",
          answer:
            "Yes. You can submit a focused homepage request and Krish. can execute the required updates end-to-end."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Need homepage improvements implemented quickly?",
      "Share your homepage goals and Krish. will execute the required changes."
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
        "Shopify product pages frequently lose conversion when critical buying details are hard to scan, variant logic is unclear, or trust content appears too late in the flow. This guide helps teams prioritize product page improvements with practical execution steps covering layout hierarchy, personalization inputs, and add-to-cart readiness. Use it to ship focused PDP upgrades without redesigning everything at once.",
      primaryCta: contactCtaPrimary,
      secondaryCta: standardSecondaryCtas.seeUseCases,
      microcopy: standardCtaMicrocopy
    },
    stepsSection: {
      sectionTitle: "PDP optimization flow",
      steps: [
        {
          stepNumber: "STEP 1",
          icon: "🎯",
          title: "Define the core conversion action",
          description:
            "Align team on the exact user action this page should drive and what currently blocks it."
        },
        {
          stepNumber: "STEP 2",
          icon: "🧩",
          title: "Restructure content hierarchy",
          description:
            "Prioritize product value, pricing, variants, and trust signals in a scan-friendly order."
        },
        {
          stepNumber: "STEP 3",
          icon: "🛠",
          title: "Implement interaction improvements",
          description:
            "Add personalization fields, simplify selectors, and reduce friction near add-to-cart."
        },
        {
          stepNumber: "STEP 4",
          icon: "✅",
          title: "Verify end-to-end purchase flow",
          description:
            "Test desktop and mobile behavior from product interaction through cart transition."
        }
      ]
    },
    checklistSection: {
      sectionTitle: "Product page execution checklist",
      sectionDescription:
        "Use this checklist to implement practical PDP improvements with minimal rework.",
      items: [
        "Ensure product title, price, and primary value proposition are visible without extra scrolling.",
        "Place variant selectors and add-to-cart controls in a clear, predictable hierarchy.",
        "Add personalization fields only where required and validate field behavior.",
        "Display shipping, returns, and delivery expectations near purchase decision points.",
        "Confirm media gallery supports mobile swipe and clear zoom behavior.",
        "Add trust signals such as reviews or guarantees close to CTA blocks.",
        "Test out-of-stock and unavailable variant states for clear user feedback.",
        "Run final QA on top-selling products before rolling out to all PDP templates."
      ]
    },
    faqSection: {
      sectionTitle: "Product page optimization FAQs",
      faqs: [
        {
          question: "Should teams redesign the whole PDP at once?",
          answer:
            "Usually no. Most teams get faster wins by shipping focused improvements in prioritized iterations."
        },
        {
          question: "Which PDP issue most commonly hurts conversion?",
          answer:
            "Unclear variant and add-to-cart flows are one of the most frequent friction points on mobile and desktop."
        },
        {
          question: "Can Krish. implement product page changes from this checklist?",
          answer:
            "Yes. Share the affected products and required outcomes, and Krish. can execute and validate the implementation."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Want these PDP updates shipped?",
      "Krish. can execute your product page checklist end-to-end."
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
        "Speed issues in Shopify stores usually come from accumulated apps, heavy assets, and scripts running where they are not needed. This guide focuses on practical optimization work that operators can prioritize by revenue impact, so teams avoid random cleanup and ship meaningful improvements. Use it to plan, execute, and validate speed fixes across high-traffic conversion paths.",
      primaryCta: contactCtaPrimary,
      secondaryCta: standardSecondaryCtas.seeUseCases,
      microcopy: standardCtaMicrocopy
    },
    stepsSection: {
      sectionTitle: "Speed optimization workflow",
      steps: [
        {
          stepNumber: "STEP 1",
          icon: "📍",
          title: "Identify highest-impact pages",
          description:
            "Prioritize homepage, top collections, and high-traffic product pages tied to revenue."
        },
        {
          stepNumber: "STEP 2",
          icon: "🧹",
          title: "Remove avoidable overhead",
          description:
            "Reduce script, app, and asset weight that slows rendering and interaction readiness."
        },
        {
          stepNumber: "STEP 3",
          icon: "⚙️",
          title: "Implement technical fixes",
          description:
            "Ship image, script, and section-level optimizations in controlled batches."
        },
        {
          stepNumber: "STEP 4",
          icon: "📈",
          title: "Re-test and ship iterations",
          description:
            "Measure improvements, validate UX impact, and continue iterative optimization."
        }
      ]
    },
    checklistSection: {
      sectionTitle: "Speed execution checklist",
      sectionDescription:
        "Use this checklist to run performance work with clear priorities and validation.",
      items: [
        "Audit scripts and apps loaded on homepage, collection, and PDP templates.",
        "Compress and resize large media assets before upload.",
        "Remove unused app blocks and scripts from theme templates.",
        "Delay non-critical scripts so key content renders faster.",
        "Review third-party widgets for performance impact on mobile devices.",
        "Prioritize fixes on pages with highest traffic and conversion intent.",
        "Re-test speed after every release instead of waiting for monthly audits.",
        "Track before-and-after performance for each implemented optimization."
      ]
    },
    faqSection: {
      sectionTitle: "Speed optimization FAQs",
      faqs: [
        {
          question: "What causes most Shopify speed degradation over time?",
          answer:
            "App accumulation and heavy assets are the most common causes of long-term storefront slowdown."
        },
        {
          question: "Should we optimize every page equally?",
          answer:
            "Start with pages tied to revenue and high traffic, then expand optimization work by impact."
        },
        {
          question: "Can Krish. execute speed fixes without a full redesign?",
          answer:
            "Yes. Krish. can implement practical speed improvements within your current theme and stack."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Need help executing speed fixes?",
      "Share priority pages and Krish. can implement performance improvements."
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
        "Shopify conversion improvement usually comes from shipping frequent, practical changes across homepage messaging, product pages, promotions, and mobile behavior. This guide gives operators a clear execution path so optimization does not get stuck in strategy documents or design debates. Use it to identify high-impact friction points and turn them into implementation-ready tasks your team can ship consistently.",
      primaryCta: contactCtaPrimary,
      secondaryCta: standardSecondaryCtas.seeUseCases,
      microcopy: standardCtaMicrocopy
    },
    stepsSection: {
      sectionTitle: "Conversion optimization flow",
      steps: [
        {
          stepNumber: "STEP 1",
          icon: "🔍",
          title: "Identify where users drop off",
          description:
            "Map homepage, collection, and PDP friction points that block next-step action."
        },
        {
          stepNumber: "STEP 2",
          icon: "🧠",
          title: "Prioritize high-impact changes",
          description:
            "Choose improvements tied to business outcomes, not cosmetic tweaks."
        },
        {
          stepNumber: "STEP 3",
          icon: "⚙️",
          title: "Implement one focused batch",
          description:
            "Ship a tight group of related changes that can be validated quickly."
        },
        {
          stepNumber: "STEP 4",
          icon: "📊",
          title: "Review outcomes and iterate",
          description:
            "Evaluate behavior after release and plan the next optimization cycle."
        }
      ]
    },
    checklistSection: {
      sectionTitle: "Conversion execution checklist",
      sectionDescription:
        "Use this checklist to keep conversion work practical and implementation-focused.",
      items: [
        "Set one conversion goal per optimization cycle to keep scope clear.",
        "Tighten hero and above-the-fold messaging around a concrete shopper outcome.",
        "Improve CTA visibility and readability on desktop and mobile.",
        "Reduce PDP friction by clarifying variants, pricing, and trust signals.",
        "Align discounts, banners, and messaging during active promotions.",
        "Fix known mobile layout issues before driving paid traffic.",
        "Validate internal links in navigation and campaign pathways.",
        "Document implemented changes and observed outcomes for next iteration."
      ]
    },
    faqSection: {
      sectionTitle: "Conversion optimization FAQs",
      faqs: [
        {
          question: "What is the fastest way to improve conversion without redesigning the store?",
          answer:
            "Prioritize high-friction points in existing templates and ship focused improvements in weekly cycles."
        },
        {
          question: "Should teams optimize homepage or product pages first?",
          answer:
            "Start where your biggest traffic and drop-off overlap, then sequence follow-up improvements by impact."
        },
        {
          question: "Can Krish. execute conversion-focused changes continuously?",
          answer:
            "Yes. Krish. can handle recurring optimization tasks so your team can keep improving conversion over time."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Ready to implement a conversion checklist?",
      "Krish. can execute conversion-oriented store updates in your existing workflow."
    )
  }
};

export const compareSubpageContent: Record<string, MarketingPageContent> = {
  "freelancers-vs-krish": {
    metadataTitle: "Freelancers vs Krish.",
    metadataDescription:
      "Compare freelancers vs Krish. for Shopify development execution speed, reliability, communication overhead, and quality consistency.",
    path: "/compare/freelancers-vs-krish",
    intro: {
      eyebrow: "Comparison",
      title: "Freelancers vs Krish. for Shopify execution",
      description:
        "Freelancers can be a strong option for specific projects, but recurring Shopify operations often require more predictable execution than individual schedules can provide. Teams evaluating this model usually care about deadline reliability, communication effort, and whether delivered changes are launch-ready without extra QA cycles. This page compares those practical factors so you can choose with clearer operational expectations.",
      primaryCta: contactCtaPrimary,
      secondaryCta: standardSecondaryCtas.viewProduct,
      microcopy: standardCtaMicrocopy
    },
    featureSection: {
      sectionTitle: "Comparison criteria that matter",
      features: [
        {
          title: "Turnaround consistency",
          description:
            "Freelancer timelines can shift with parallel client work, while Krish. is designed for more predictable request flow and response rhythm."
        },
        {
          title: "Coordination overhead",
          description:
            "Freelancer workflows often require more direct scoping and follow-up from your team; Krish. reduces back-and-forth with structured intake."
        },
        {
          title: "Implementation reliability",
          description:
            "Freelancer quality can vary by individual and context, while Krish. combines AI-assisted execution with human verification before delivery."
        }
      ]
    },
    insightSections: [
      {
        sectionTitle: "When freelancers are a better fit",
        sectionDescription:
          "Freelancer models can work well in specific conditions.",
        bullets: [
          "You need a highly specialized one-time build with clear scope boundaries.",
          "Your team has bandwidth to manage briefing, revision loops, and final QA directly.",
          "Timeline flexibility is acceptable if project requirements evolve mid-implementation.",
          "You already have a trusted freelancer with deep context of your current theme stack."
        ]
      },
      {
        sectionTitle: "When teams choose Krish. instead",
        sectionDescription:
          "Operational teams often prefer repeatable execution and lower coordination effort.",
        bullets: [
          "You run recurring weekly requests across campaigns, merchandising, and bug fixes.",
          "You need clearer response expectations for launch-driven work.",
          "You want one execution workflow across Slack, WhatsApp, or email instead of fragmented threads.",
          "You want delivered changes validated before handoff to reduce internal rework."
        ]
      }
    ],
    faqSection: {
      sectionTitle: "Freelancers vs Krish. FAQs",
      faqs: [
        {
          question: "Is this comparison saying freelancers are always a bad option?",
          answer:
            "No. Freelancers can be effective, but teams with recurring operational load often need more consistency and lower coordination overhead."
        },
        {
          question: "How should we evaluate both models fairly?",
          answer:
            "Use one real Shopify request and compare response speed, communication effort, and delivered implementation quality."
        },
        {
          question: "What is the biggest hidden cost in freelancer workflows?",
          answer:
            "Internal time spent on briefing, follow-up, and QA can become significant when request volume increases."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Want to compare with a real task?",
      "Submit one request and evaluate execution quality and speed directly."
    )
  },
  "shopify-agencies-vs-krish": {
    metadataTitle: "Shopify Agencies vs Krish.",
    metadataDescription:
      "Compare Shopify agencies vs Krish. for ongoing implementation support, turnaround speed, and operational fit.",
    path: "/compare/shopify-agencies-vs-krish",
    intro: {
      eyebrow: "Comparison",
      title: "Shopify agencies vs Krish.",
      description:
        "Agencies are often strong partners for larger strategic projects, redesigns, and multi-stream programs. However, daily Shopify execution work usually requires shorter cycles, tighter request handling, and lower operational drag. This comparison focuses on practical execution differences so teams can decide whether agency structure or a recurring task execution model better matches day-to-day store operations.",
      primaryCta: contactCtaPrimary,
      secondaryCta: standardSecondaryCtas.viewProduct,
      microcopy: standardCtaMicrocopy
    },
    featureSection: {
      sectionTitle: "Comparison criteria that matter",
      features: [
        {
          title: "Turnaround consistency",
          description:
            "Agency workflows can involve planning layers and broader prioritization queues, while Krish. emphasizes faster recurring request cycles."
        },
        {
          title: "Coordination overhead",
          description:
            "Agency delivery often includes additional process overhead, whereas Krish. is structured for lightweight operational coordination."
        },
        {
          title: "Implementation reliability",
          description:
            "Both models can deliver quality, but reliability depends on whether the model is tuned for recurring small changes versus larger project milestones."
        }
      ]
    },
    insightSections: [
      {
        sectionTitle: "When agencies are the better choice",
        sectionDescription:
          "Agency engagement is often valuable for broader strategic work.",
        bullets: [
          "You are planning a full redesign, migration, or multi-channel program with large scope dependencies.",
          "You need cross-disciplinary services beyond implementation, such as brand strategy and campaign production.",
          "Longer delivery timelines fit your roadmap and operational cadence.",
          "Your team prefers formal project structure with dedicated planning phases."
        ]
      },
      {
        sectionTitle: "When Krish. is the better fit",
        sectionDescription:
          "Krish. is designed for recurring implementation throughput in operational contexts.",
        bullets: [
          "You need weekly storefront updates with consistent execution turnaround.",
          "Your team wants fewer status meetings and less project-management overhead.",
          "Campaign and merchandising teams need fast implementation for changing priorities.",
          "You need dependable delivery quality for ongoing small-to-medium Shopify tasks."
        ]
      }
    ],
    faqSection: {
      sectionTitle: "Agencies vs Krish. FAQs",
      faqs: [
        {
          question: "Should we replace our agency entirely with Krish.?",
          answer:
            "Not necessarily. Many teams use agencies for strategic work and Krish. for recurring operational execution."
        },
        {
          question: "Can Krish. support agency-led roadmaps with tactical execution?",
          answer:
            "Yes. Krish. can implement ongoing Shopify tasks that support broader roadmap initiatives."
        },
        {
          question: "What is the main tradeoff to evaluate?",
          answer:
            "Compare process overhead against turnaround needs for your recurring request volume."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Need agency-level reliability for recurring tasks?",
      "Krish. can support ongoing Shopify execution without heavyweight process."
    )
  },
  "task-services-vs-krish": {
    metadataTitle: "Task Services vs Krish.",
    metadataDescription:
      "Compare Shopify task services vs Krish. for request quality, implementation context, and integrated execution workflow.",
    path: "/compare/task-services-vs-krish",
    intro: {
      eyebrow: "Comparison",
      title: "Task services vs Krish.",
      description:
        "Task services can be a useful starting point for simple standardized requests, especially when teams need low-friction ticket handling. As request complexity grows, teams often evaluate whether the model can still deliver reliable outcomes without repeated clarification loops. This page compares practical delivery behavior so you can assess fit for both straightforward and code-dependent Shopify execution work.",
      primaryCta: contactCtaPrimary,
      secondaryCta: standardSecondaryCtas.viewProduct,
      microcopy: standardCtaMicrocopy
    },
    featureSection: {
      sectionTitle: "Comparison criteria that matter",
      features: [
        {
          title: "Turnaround consistency",
          description:
            "Queue-based services can be fast for simple tasks, but turnaround may vary for requests that need deeper implementation context."
        },
        {
          title: "Coordination overhead",
          description:
            "Some task models require repeated reformats or scope restatement; Krish. aims to reduce this with clearer request interpretation."
        },
        {
          title: "Implementation reliability",
          description:
            "Reliable outcomes depend on whether the model can handle edge cases and verify behavior before marking tasks complete."
        }
      ]
    },
    insightSections: [
      {
        sectionTitle: "When task services can work well",
        sectionDescription:
          "Task-first models can be effective for clearly templated updates.",
        bullets: [
          "Your requests are repetitive and map cleanly to predefined task categories.",
          "You have internal ownership for QA and can manage occasional revision loops.",
          "Most work is low-complexity storefront edits with limited cross-page dependencies.",
          "You prioritize simple queue management over broader execution context."
        ]
      },
      {
        sectionTitle: "Where teams outgrow task-only models",
        sectionDescription:
          "Execution needs change as store complexity and campaign pressure increase.",
        bullets: [
          "Requests increasingly require interpretation across templates, apps, and conversion workflows.",
          "Delivery quality varies when tasks do not fit fixed templates.",
          "Internal teams spend extra time translating needs into acceptable ticket formats.",
          "You need higher confidence in delivered behavior without repeated rework."
        ]
      }
    ],
    faqSection: {
      sectionTitle: "Task services vs Krish. FAQs",
      faqs: [
        {
          question: "Is Krish. only for complex tasks?",
          answer:
            "No. Krish. supports simple recurring tasks and more complex implementation requests in one workflow."
        },
        {
          question: "What should we test during a comparison?",
          answer:
            "Test a mixed request set with both straightforward and edge-case tasks to evaluate model flexibility and reliability."
        },
        {
          question: "Why does implementation context matter so much?",
          answer:
            "Context reduces misinterpretation and helps ensure the delivered change works correctly in the live store environment."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Need a more integrated execution workflow?",
      "Try Krish. on a mixed task list and compare operational overhead."
    )
  },
  "storetasker-vs-krish": {
    metadataTitle: "Storetasker vs Krish.",
    metadataDescription:
      "Compare Storetasker vs Krish. for Shopify task execution, turnaround reliability, and ongoing support workflow.",
    path: "/compare/storetasker-vs-krish",
    intro: {
      eyebrow: "Comparison",
      title: "Storetasker vs Krish.",
      description:
        "Both Storetasker and Krish. support Shopify execution, but teams usually compare how each model performs under recurring operational load. Buyers often want to understand whether turnaround stays predictable, how much internal management effort is required, and whether delivered work is consistently launch-ready. This page focuses on those concrete comparison points for practical decision-making.",
      primaryCta: contactCtaPrimary,
      secondaryCta: standardSecondaryCtas.viewProduct,
      microcopy: standardCtaMicrocopy
    },
    featureSection: {
      sectionTitle: "Comparison criteria that matter",
      features: [
        {
          title: "Turnaround consistency",
          description:
            "Compare how consistently each model delivers tasks within expected timelines across both simple and moderately complex requests."
        },
        {
          title: "Coordination overhead",
          description:
            "Evaluate the amount of internal effort needed for requirement clarification, follow-ups, and delivery validation."
        },
        {
          title: "Implementation reliability",
          description:
            "Assess how often delivered changes match requested behavior with minimal iteration before launch."
        }
      ]
    },
    insightSections: [
      {
        sectionTitle: "How to evaluate model fit fairly",
        sectionDescription:
          "Use operational evidence instead of feature checklists alone.",
        bullets: [
          "Submit comparable tasks that represent your real weekly execution workload.",
          "Track how quickly each provider moves from request intake to implementation start.",
          "Measure how many clarification cycles are needed before outputs are usable.",
          "Review whether delivered work is production-ready without extra internal QA burden."
        ]
      },
      {
        sectionTitle: "Decision signals teams watch most",
        sectionDescription:
          "Operational reliability usually matters more than isolated one-off wins.",
        bullets: [
          "Predictable request flow across campaign periods and high-priority change windows.",
          "Lower time spent managing execution details inside internal Slack and docs workflows.",
          "Consistent quality across repeated tasks in different store templates.",
          "Clear communication of next steps when requests involve dependencies or constraints."
        ]
      }
    ],
    faqSection: {
      sectionTitle: "Storetasker vs Krish. FAQs",
      faqs: [
        {
          question: "Can we run a side-by-side test before choosing?",
          answer:
            "Yes. A small comparison batch is a practical way to evaluate turnaround, coordination overhead, and implementation reliability."
        },
        {
          question: "Which factor usually determines long-term fit?",
          answer:
            "Teams usually prioritize predictable recurring delivery with low internal management overhead."
        },
        {
          question: "Should price alone drive this decision?",
          answer:
            "Price matters, but operational reliability and coordination cost often have larger long-term impact on execution velocity."
        }
      ]
    },
    finalCta: withDefaultCta(
      "Want to benchmark with your own backlog?",
      "Send a few real Shopify tasks and compare execution experience."
    )
  },
  "taskhusky-vs-krish": {
    metadataTitle: "TaskHusky vs Krish.",
    metadataDescription:
      "Compare TaskHusky vs Krish. for Shopify task delivery speed, implementation reliability, and communication workflow fit.",
    path: "/compare/taskhusky-vs-krish",
    intro: {
      eyebrow: "Comparison",
      title: "TaskHusky vs Krish.",
      description:
        "When teams compare TaskHusky and Krish., the main question is not whether tasks can be completed, but how reliably recurring requests move through the workflow under real operating pressure. This includes consistency of turnaround, the coordination effort required from internal teams, and the quality of delivered implementation for both routine and edge-case Shopify updates.",
      primaryCta: contactCtaPrimary,
      secondaryCta: standardSecondaryCtas.viewProduct,
      microcopy: standardCtaMicrocopy
    },
    featureSection: {
      sectionTitle: "Comparison criteria that matter",
      features: [
        {
          title: "Turnaround consistency",
          description:
            "Evaluate whether both urgent and standard tasks are delivered predictably across repeated request cycles."
        },
        {
          title: "Coordination overhead",
          description:
            "Assess how much internal effort is needed for request formatting, follow-up, and verification before publishing changes."
        },
        {
          title: "Implementation reliability",
          description:
            "Compare how frequently delivered updates meet expected behavior without additional correction rounds."
        }
      ]
    },
    insightSections: [
      {
        sectionTitle: "Practical comparison method",
        sectionDescription:
          "The best comparison mirrors your real Shopify operating rhythm.",
        bullets: [
          "Test with requests across multiple categories such as theme edits, campaign updates, and bug fixes.",
          "Track clarification quality and speed, not just final completion timestamps.",
          "Evaluate consistency across several tasks instead of judging one isolated output.",
          "Measure handoff quality by how confidently your team can publish delivered changes."
        ]
      },
      {
        sectionTitle: "What teams optimize for long term",
        sectionDescription:
          "Recurring execution models should reduce operational drag as request volume grows.",
        bullets: [
          "Faster movement from request submission to active implementation.",
          "Lower dependence on internal team members for repeated briefing and QA.",
          "Stable quality across changing campaign and merchandising priorities.",
          "Clear escalation and next-step communication when tasks involve constraints."
        ]
      }
    ],
    faqSection: {
      sectionTitle: "TaskHusky vs Krish. FAQs",
      faqs: [
        {
          question: "How many tasks should we compare before deciding?",
          answer:
            "A short set of representative tasks across different complexity levels usually gives enough signal for model fit."
        },
        {
          question: "What is the biggest evaluation mistake teams make?",
          answer:
            "Focusing only on first-task speed instead of ongoing reliability and internal coordination effort."
        },
        {
          question: "Can we prioritize low-overhead communication in this comparison?",
          answer:
            "Yes. Communication and coordination efficiency are core factors in long-term execution performance."
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
      "Explore Krish. resource blog content focused on Shopify execution workflows and practical implementation guidance.",
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
      "Krish. can execute the related Shopify tasks for your store."
    )
  },
  docs: {
    metadataTitle: "Documentation",
    metadataDescription:
      "Read Krish. documentation on architecture, coding standards, SEO rules, and workflow expectations.",
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
      "Krish. can execute Shopify tasks while aligning with your process and quality expectations."
    )
  }
};

export const staticSitePaths = [
  "/",
  "/product",
  "/faqs",
  "/use-cases",
  "/guides",
  "/compare",
  "/resources",
  "/free-shopify-development-first-month-offer",
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


const topLevelRouteTitleByPath: Record<string, string> = {
  "/": "Home",
  [productPageContent.path]: productPageContent.intro.eyebrow ?? productPageContent.metadataTitle,
  [faqsPageContent.path]: faqsPageContent.metadataTitle,
  [useCasesPageContent.path]: useCasesPageContent.intro.eyebrow ?? useCasesPageContent.metadataTitle,
  [guidesPageContent.path]: guidesPageContent.intro.eyebrow ?? guidesPageContent.metadataTitle,
  [comparePageContent.path]: comparePageContent.intro.eyebrow ?? comparePageContent.metadataTitle,
  [resourcesPageContent.path]: resourcesPageContent.intro.eyebrow ?? resourcesPageContent.metadataTitle,
  "/free-shopify-development-first-month-offer": "Free Shopify Development First Month Offer",
  [aboutPageContent.path]: aboutPageContent.metadataTitle,
  [contactPageContent.path]: contactPageContent.metadataTitle,
  "/contact/success": "Request Received",
  [blogPageContent.path]: blogPageContent.metadataTitle,
  [privacyPageContent.path]: privacyPageContent.metadataTitle,
  [termsPageContent.path]: termsPageContent.metadataTitle
};

function buildRouteTitleByPath(): Record<string, string> {
  return {
    ...topLevelRouteTitleByPath,
    ...Object.fromEntries(
      Object.values(productSubpageContent).map((page) => [page.path, page.intro.title])
    ),
    ...Object.fromEntries(
      Object.values(useCaseSubpageContent).map((page) => [page.path, page.intro.title])
    ),
    ...Object.fromEntries(
      Object.values(guideSubpageContent).map((page) => [page.path, page.intro.title])
    ),
    ...Object.fromEntries(
      Object.values(compareSubpageContent).map((page) => [page.path, page.intro.title])
    ),
    ...Object.fromEntries(
      Object.values(resourceSubpageContent).map((page) => [page.path, page.intro.title])
    )
  };
}

export const routeTitleByPath = buildRouteTitleByPath();
