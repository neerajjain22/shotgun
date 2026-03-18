import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/config/site";

import styles from "./HomePage.module.css";

export const metadata: Metadata = {
  title: "Shopify development help for small tasks | Krish.",
  description:
    "Get help with Shopify theme changes, product page updates, bug fixes, and other Shopify development tasks without hiring or managing developers.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    url: siteConfig.url,
    title: "Shopify development help for small tasks | Krish.",
    description:
      "Get help with Shopify theme changes, product page updates, bug fixes, and other Shopify development tasks without hiring or managing developers."
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopify development help for small tasks | Krish.",
    description:
      "Get help with Shopify theme changes, product page updates, bug fixes, and other Shopify development tasks without hiring or managing developers."
  }
};

export default function HomePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>
            The last Shopify team
            <br />
            you will ever need.
          </h1>
          <p className={styles.heroSubtitle}>
            Stop chasing freelancers and managing scattered workflows. Send Shopify requests in one chat and
            get execution completed with AI systems plus experienced developers.
          </p>

          <div className={styles.chatCard}>
            <div className={styles.chatHeader}>
              <div className={styles.headerStatus}>
                <span className={styles.statusDot} />
                <strong>Krish. is Online</strong>
              </div>
              <span className={styles.workspaceLabel}>Active workspace</span>
            </div>

            <div className={styles.chatBody}>
              <div className={`${styles.message} ${styles.userMessage}`}>
                &quot;Need a landing page for our spring skincare campaign.&quot;
              </div>

              <div className={`${styles.typing} ${styles.typingOne}`} aria-hidden="true">
                <span />
                <span />
                <span />
              </div>

              <div className={`${styles.message} ${styles.agentMessage} ${styles.agentOne}`}>
                <span className={styles.agentPulse} />
                <p>
                  Done. The page is live, mobile-optimized, and tracking pixels are configured for your ad
                  campaigns.
                </p>
              </div>

              <div className={`${styles.message} ${styles.userMessage} ${styles.userTwo}`}>
                &quot;Great. Now add a 15% off badge to all products in that collection.&quot;
              </div>

              <div className={`${styles.typing} ${styles.typingTwo}`} aria-hidden="true">
                <span />
                <span />
                <span />
              </div>

              <div className={`${styles.message} ${styles.agentMessage} ${styles.agentTwo}`}>
                <span className={styles.agentPulse} />
                <p>Updated all products. Discount badges are now visible and synced with your theme.</p>
              </div>
            </div>

            <div className={styles.chatInputRow}>
              <div className={styles.chatInput}>
                <span>Ask Krish. to do any Shopify task...</span>
                <span className={styles.sendButton} aria-hidden="true">
                  ↗
                </span>
              </div>
            </div>
          </div>

          <div className={styles.heroActions}>
            <Link className={styles.primaryCta} href="/free-shopify-development-first-month-offer">
              Start for free
            </Link>
            <Link className={styles.secondaryCta} href="/use-cases">
              See Use cases
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.darkSection}>
        <div className={styles.darkInner}>
          <div>
            <h2 className={styles.sectionTitleLight}>The Shopify execution bottleneck.</h2>
            <p className={styles.sectionBodyLight}>
              Your team knows what to change, but execution gets stuck. Briefs, follow-ups, and QA loops
              slow every launch. Small tasks pile up while revenue-impacting work waits.
            </p>
          </div>

          <div className={styles.metricStack}>
            <article className={styles.metricBlockDanger}>
              <p className={styles.metricValue}>10+ tasks</p>
              <p className={styles.metricDescription}>usually waiting in the average Shopify backlog.</p>
            </article>
            <article className={styles.metricBlockMuted}>
              <p className={styles.metricValue}>100+ hrs/month</p>
              <p className={styles.metricDescription}>lost in back-and-forth with your agency</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionIntro}>
          <h2 className={styles.sectionTitle}>The best process is no process.</h2>
          <p className={styles.sectionBody}>
            Krish. removes the operational overhead. You describe the Shopify change and we execute.
          </p>
        </div>

        <div className={styles.cardGridThree}>
          <article className={styles.infoCard}>
            <div className={styles.cardHeader}>
              <p className={styles.crossedLine}>admin &gt; themes &gt; liquid &gt; edit code</p>
              <p className={styles.bubbleLight}>&quot;Update the homepage banner.&quot;</p>
            </div>
            <h3>No dashboards</h3>
            <p>Send requests in plain language instead of learning another tool.</p>
          </article>

          <article className={styles.infoCard}>
            <div className={styles.cardHeader}>
              <p className={styles.crossedLine}>Ticket #4087: checkout issue on mobile</p>
              <p className={styles.bubbleLight}>&quot;Fix the checkout alignment.&quot;</p>
            </div>
            <h3>No ticket queues</h3>
            <p>Skip status meetings and forms. Focus on outcomes, not admin overhead.</p>
          </article>

          <article className={styles.infoCard}>
            <div className={styles.cardHeader}>
              <p className={styles.crossedLine}>Reviewing PR... 3 blockers found.</p>
              <p className={styles.bubbleDark}>
                <span className={styles.bubbleDot} />
                Deployed and verified.
              </p>
            </div>
            <h3>No QA bottleneck</h3>
            <p>Every task is completed and checked before it reaches your live Shopify store.</p>
          </article>
        </div>
      </section>

      <section className={styles.sectionWithBorder}>
        <div className={styles.sectionIntro}>
          <h2 className={styles.sectionTitle}>The old way is broken.</h2>
          <p className={styles.sectionBody}>
            Compare fragmented agency delivery with a single execution workspace built for Shopify teams.
          </p>
        </div>

        <div className={styles.compareGrid}>
          <article className={styles.compareCardLight}>
            <p className={styles.compareLabelDanger}>The agency retainer</p>
            <ul className={styles.pointList}>
              <li>
                <strong>Weeks of scoping</strong>
                <span>Discovery calls and proposal cycles for simple implementation tasks.</span>
              </li>
              <li>
                <strong>Developer ghosting</strong>
                <span>Context gets lost and timelines slip when ownership is fragmented.</span>
              </li>
              <li>
                <strong>Costly app bloat</strong>
                <span>Extra app subscriptions stack up and slow your store performance.</span>
              </li>
            </ul>
          </article>

          <article className={styles.compareCardDark}>
            <p className={styles.compareLabelSuccess}>The Krish. workspace</p>
            <ul className={styles.pointListDark}>
              <li>
                <strong>Instant execution</strong>
                <span>Send a task and get implementation started right away.</span>
              </li>
              <li>
                <strong>Reliable delivery</strong>
                <span>AI systems and humans coordinate execution and verification.</span>
              </li>
              <li>
                <strong>Lower overhead</strong>
                <span>Build needed functionality directly into your store with less tool sprawl.</span>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section className={styles.finalCtaSection}>
        <h2>Never write another developer hiring brief.</h2>
        <Link className={styles.finalCtaButton} href="/free-shopify-development-first-month-offer">
          Start your free month
        </Link>
      </section>
    </>
  );
}
