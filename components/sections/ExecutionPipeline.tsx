import { Section } from "@/components/sections/Section";

export function ExecutionPipeline() {
  return (
    <Section>
      <div className="execution-pipeline">
        <header className="execution-pipeline__header">
          <h2 className="execution-pipeline__title">How Krish. completes your Shopify tasks</h2>
          <p className="execution-pipeline__subtitle">
            Krish. combines AI systems with experienced developers to complete Shopify development work
            quickly and reliably.
          </p>
        </header>

        <div aria-label="Execution pipeline" className="execution-pipeline__flow" role="list">
          <article className="execution-pipeline__stage" role="listitem">
            <p className="execution-pipeline__icon" aria-hidden>
              💬
            </p>
            <h3 className="execution-pipeline__stage-title">Change request</h3>
            <p className="execution-pipeline__stage-text">
              &quot;You tell us a Shopify task via Slack, WhatsApp, Email etc&quot;
            </p>
          </article>

          <span aria-hidden className="execution-pipeline__arrow">
            →
          </span>

          <article className="execution-pipeline__stage" role="listitem">
            <p className="execution-pipeline__icon" aria-hidden>
              🤖
            </p>
            <h3 className="execution-pipeline__stage-title">Task evaluation</h3>
            <div className="execution-pipeline__rows">
              <p className="execution-pipeline__row execution-pipeline__row--ai">🤖 AI analyzes the request</p>
              <p className="execution-pipeline__row execution-pipeline__row--human">
                👩‍💻 Humans review requirements
              </p>
            </div>
          </article>

          <span aria-hidden className="execution-pipeline__arrow">
            →
          </span>

          <article className="execution-pipeline__stage" role="listitem">
            <p className="execution-pipeline__icon" aria-hidden>
              ⚙️
            </p>
            <h3 className="execution-pipeline__stage-title">Implementation</h3>
            <div className="execution-pipeline__rows">
              <p className="execution-pipeline__row execution-pipeline__row--ai">
                🤖 AI generates implementation plan
              </p>
              <p className="execution-pipeline__row execution-pipeline__row--human">
                👩‍💻 Developers complete the work
              </p>
            </div>
          </article>

          <span aria-hidden className="execution-pipeline__arrow">
            →
          </span>

          <article className="execution-pipeline__stage" role="listitem">
            <p className="execution-pipeline__icon" aria-hidden>
              ✅
            </p>
            <h3 className="execution-pipeline__stage-title">Quality check</h3>
            <div className="execution-pipeline__rows">
              <p className="execution-pipeline__row execution-pipeline__row--ai">🤖 AI verifies implementation</p>
              <p className="execution-pipeline__row execution-pipeline__row--human">👩‍💻 Humans test and approve</p>
            </div>
          </article>

          <span aria-hidden className="execution-pipeline__arrow">
            →
          </span>

          <article className="execution-pipeline__stage" role="listitem">
            <p className="execution-pipeline__icon" aria-hidden>
              🛍
            </p>
            <h3 className="execution-pipeline__stage-title">Shopify store updated</h3>
            <p className="execution-pipeline__stage-text">New homepage banner is displaying now.</p>
          </article>
        </div>
      </div>
    </Section>
  );
}
