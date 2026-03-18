export type LegalSubsection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: LegalSubsection[];
};

export type LegalContactBlock = {
  heading: string;
  lines: string[];
};

export type LegalDocumentContent = {
  metadataTitle: string;
  metadataDescription: string;
  path: string;
  title: string;
  effectiveDate: string;
  intro: string[];
  sections: LegalSection[];
  contact?: LegalContactBlock;
  closingNote?: string;
};

export const termsDocument: LegalDocumentContent = {
  metadataTitle: "Terms of Service",
  metadataDescription:
    "Read the Terms of Service for SonicLinker, Inc. and understand the conditions for using our website and services.",
  path: "/terms",
  title: "Terms of Service",
  effectiveDate: "April 18, 2025",
  intro: [
    "Welcome to SonicLinker, Inc. (\"Company\", \"we\", \"our\", \"us\"). By accessing or using our website and services, you agree to comply with and be bound by the following terms and conditions (\"Terms\"). Please read these carefully before using our services. If you do not agree to these Terms, please do not use our services."
  ],
  sections: [
    {
      heading: "General Terms",
      paragraphs: [
        "Please read these Terms and Conditions (hereinafter referred to as \"Terms\", \"Terms of Use\", or \"Terms of Service\") carefully. Your use of this website or mobile application constitutes your agreement to be bound by these Terms.",
        "When you access, browse, or use this website, you may access any sub-site linked through this website. Such sub-sites may have their own terms and conditions of use, and you are obliged to follow the terms according to the instructions set out in such sub-sites."
      ]
    },
    {
      heading: "User ID and Password",
      paragraphs: [
        "By entering into this Agreement, you acknowledge and agree that your user ID and password (\"Participant Account\") is for your exclusive use only. Use or sharing of your Participant Account with another user is not permitted and is cause for immediate blocking of your access to the website, the services, the content, and the courseware, and for termination of this Agreement."
      ]
    },
    {
      heading: "Usage of the Website and Services",
      paragraphs: [
        "We grant you a personal, restricted, non-transferable, non-exclusive, and revocable license to use the website, services, content, and courseware offered through the website until completion of the certification training course that you have enrolled for, or termination of this Agreement according to these Terms, whichever is earlier."
      ]
    },
    {
      heading: "Intellectual Property Rights",
      paragraphs: [
        "While you are granted a limited and non-exclusive right to use the website, services, content, and courseware for the restricted purpose set forth in this Agreement, you acknowledge and agree that we are the sole and exclusive owner of the website, services, content, and courseware and are vested with all intellectual property rights and other proprietary rights in them."
      ]
    }
  ],
  contact: {
    heading: "Contact Information",
    lines: [
      "If you have any questions or concerns about these Terms, please contact us at:",
      "SONICLINKER, INC",
      "380 Brannan St, San Francisco, CA 94107",
      "Email: info@soniclinker.com"
    ]
  },
  closingNote:
    "By continuing to access or use our services, you acknowledge that you have read, understood, and agreed to these Terms and Conditions."
};

export const privacyDocument: LegalDocumentContent = {
  metadataTitle: "Privacy Policy",
  metadataDescription:
    "Read how SonicLinker, Inc. collects, uses, and safeguards information across websites, APIs, dashboards, and related services.",
  path: "/privacy",
  title: "Privacy Policy",
  effectiveDate: "August 25, 2025",
  intro: [
    "SonicLinker, Inc. (\"SonicLinker,\" \"Company,\" \"we,\" \"our,\" or \"us\") builds agentic commerce infrastructure, including AI traffic analytics, an Agentic CDN, and Agentic Commerce APIs (beta). This Privacy Policy explains how we collect, use, disclose, and safeguard information when you use our websites, dashboards, SDKs, APIs, and related services (collectively, the \"Services\")."
  ],
  sections: [
    {
      heading: "Scope & Roles",
      paragraphs: [
        "When you visit our websites or interact with us as a prospective or existing customer, we act as a controller of your personal information.",
        "When our customers deploy SonicLinker on their own properties (for example, websites and apps) to measure or serve AI agents and users, we act as a processor or service provider to those customers. In that case, the customer's privacy policy governs, and we process data according to our Data Processing Addendum (\"DPA\")."
      ]
    },
    {
      heading: "Information We Collect",
      subsections: [
        {
          heading: "A. Business & Website Visitor Information (we are the Controller)",
          paragraphs: [
            "We collect information you provide and information collected automatically when you interact with our websites, demo pages, and sales/support channels:"
          ],
          bullets: [
            "Contact & account data: name, email, company, role, phone, authentication, and workspace settings.",
            "Billing data: billing address, tax IDs, and limited payment details (processed by our payment provider; we do not store full card numbers).",
            "Communications: emails, support chats, meeting notes, feedback, and survey responses.",
            "Device & usage data: IP address (which may indicate approximate location), user-agent, referrer, pages viewed, timestamps, product usage events, and cookies or similar technologies."
          ]
        },
        {
          heading: "B. Service Data From Customer Properties (we are the Processor)",
          paragraphs: [
            "When customers implement our SDKs, APIs, or server-side collectors on their sites/apps, we process data on their behalf, including:"
          ],
          bullets: [
            "Request metadata: IP address, user-agent and model signatures, referrer, URL path and query parameters, HTTP headers, timestamps, and response codes.",
            "Event & performance metrics: page loads, route changes, latency, error events, and dwell or engagement signals.",
            "Derived classifications: AI-agent vs human detection, detected agent class/model where available, intent categories, and fraud/abuse risk scores.",
            "Identifiers: first-party cookie/local-storage IDs and/or server-issued pseudonymous IDs scoped to a customer domain, plus optional customer-provided user/order IDs where configured.",
            "Content served via Agentic CDN: machine-readable page variants, structured responses, and personalization rules applied to agents based on intent and context."
          ]
        },
        {
          heading: "Important",
          paragraphs: [
            "We do not intentionally collect sensitive categories (for example, government IDs, health, or precise geolocation) via our SDKs. Customers should avoid sending such data and can configure field masking. We do not perform cross-site tracking or fingerprinting for advertising."
          ]
        },
        {
          heading: "C. Integrations & Sources You Connect",
          paragraphs: [
            "If you connect third-party systems (for example, Shopify, Cloudflare Workers, GTM, product catalogs, review systems, or helpdesk/CRM tools), we receive the data necessary to provide the integrations you enable. The type and volume of data depend on your configuration and granted permissions."
          ]
        },
        {
          heading: "D. Payment & Transaction Metadata (Agentic Commerce APIs - optional)",
          paragraphs: [
            "If you enable checkout or payments features powered by partners, we process transaction metadata (such as order ID, amount, currency, and non-sensitive line items) as a processor. Sensitive payment data is handled by the payment provider under its own policies."
          ]
        }
      ]
    },
    {
      heading: "How We Use Information",
      subsections: [
        {
          heading: "As Controller (Business & Website Data)",
          bullets: [
            "Provide and improve the Services, including authentication, operations, and troubleshooting.",
            "Communicate with you for support, service notices, onboarding, and (where permitted) product and marketing updates.",
            "Detect fraud, prevent misuse, and protect users and Services.",
            "Comply with legal obligations, enforce agreements, and defend legal claims."
          ]
        },
        {
          heading: "As Processor (Service Data on Customer Properties)",
          bullets: [
            "Measure and classify traffic, including AI-agent vs human detection and engagement metrics.",
            "Serve content via Agentic CDN according to customer configuration.",
            "Provide analytics/reporting dashboards, alerts, and export APIs.",
            "Maintain reliability/security through monitoring, anomaly detection, and audit logs.",
            "Produce aggregated, de-identified benchmark insights that do not identify individuals or customers."
          ]
        }
      ]
    },
    {
      heading: "Cookies & Similar Technologies",
      paragraphs: [
        "We use first-party cookies and similar technologies to remember preferences, keep users signed in, and analyze product usage. Where required by law, we or our customers obtain consent. We respect supported browser signals such as Global Privacy Control (GPC) where applicable."
      ]
    },
    {
      heading: "How We Share Information",
      paragraphs: [
        "We do not sell or \"share\" personal information for cross-context behavioral advertising.",
        "We share information as follows:"
      ],
      bullets: [
        "Service providers/sub-processors for hosting, security, logging/monitoring, communications, support, and payments under confidentiality and data protection obligations.",
        "Customer-directed disclosures to systems and partners you choose to connect.",
        "Legal and safety disclosures to comply with law or protect rights and safety.",
        "Business transfers such as mergers, acquisitions, or asset sales (with notice where required)."
      ]
    },
    {
      heading: "Data Retention",
      paragraphs: [
        "Business & website data (controller): retained while your account is active and as needed for the purposes above; marketing data is retained until you unsubscribe or request deletion.",
        "Service data (processor): customer-configurable. If not configured, default retention is 13 months for event-level logs, after which we delete or aggregate data."
      ]
    },
    {
      heading: "Security",
      paragraphs: [
        "We use administrative, technical, and physical safeguards designed to protect information, including encryption in transit and at rest, least-privilege access controls, and regular monitoring."
      ]
    },
    {
      heading: "International Data Transfers",
      paragraphs: [
        "We may process and store information in countries other than where it is collected. Where required, we use appropriate transfer mechanisms, such as Standard Contractual Clauses (SCCs). For processor activities, our DPA governs transfers and sub-processors."
      ]
    },
    {
      heading: "Your Rights & Choices",
      paragraphs: [
        "Your rights depend on your location and role:"
      ],
      bullets: [
        "Website visitors & business contacts (controller): you may request access, correction, deletion, restriction, portability, or object to processing, and opt out of marketing.",
        "End users & AI agents on customer properties (processor): contact the relevant customer (site/app owner). We assist customers as required by law and the DPA.",
        "California and other U.S. state rights may include access/know, delete, correct, and opt out of certain processing. We do not sell or share personal information for targeted advertising.",
        "To make a request, email privacy@soniclinker.com. We may verify your identity and relationship to a customer."
      ]
    },
    {
      heading: "Children's Privacy",
      paragraphs: [
        "Our Services are not directed to children under 16, and we do not knowingly collect personal information from them."
      ]
    },
    {
      heading: "Third-Party Links",
      paragraphs: [
        "Our websites and dashboards may link to third-party sites or services. Their privacy practices are governed by their own policies."
      ]
    },
    {
      heading: "Changes to This Policy",
      paragraphs: [
        "We may update this Policy from time to time. We will post the updated version with a new effective date and, if changes are material, provide additional notice."
      ]
    },
    {
      heading: "Processor Annex (Summary)",
      paragraphs: [
        "For customers using SonicLinker on their properties:"
      ],
      bullets: [
        "Nature/Purpose: measurement and classification of AI agents and users; content delivery via Agentic CDN; optional commerce/checkout integrations.",
        "Types of data: request metadata, event metrics, derived classifications, pseudonymous identifiers, customer-provided fields, and optional transaction metadata.",
        "Data subjects: visitors/users of customer properties and AI agents interacting with them.",
        "Retention: customer-configurable, with a 13-month default for event-level logs.",
        "Security measures: encryption in transit/at rest, access controls, monitoring, and vulnerability management.",
        "Sub-processors: standard cloud infrastructure and service vendors; list available upon request."
      ]
    }
  ],
  contact: {
    heading: "Contact Us",
    lines: [
      "If you have questions, requests, or complaints about this Policy or our data practices, contact:",
      "Email: hello@soniclinker.com",
      "Address: 380 Brannan St, San Francisco, CA 94107"
    ]
  },
  closingNote:
    "Note: This Privacy Policy is a general description of practices and is not legal advice. Customers should consult counsel when configuring SonicLinker and updating their own privacy notices."
};
