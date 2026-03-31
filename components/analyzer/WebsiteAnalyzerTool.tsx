"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import type {
  AnalysisRecommendation,
  AnalyzeGoal,
  AnalyzeQueueResponse,
  AnalyzerStage,
  VisualFinding,
} from "@/types/analyzer";

import styles from "./WebsiteAnalyzerTool.module.css";

type GoalOption = {
  value: AnalyzeGoal;
  label: string;
};

type AnalysisTier = "basic" | "advanced";

const goalOptions: GoalOption[] = [
  { value: "conversion", label: "Increase conversion" },
  { value: "speed", label: "Improve speed" },
  { value: "pdp", label: "Improve product pages" },
];

const stageOrder: AnalyzerStage[] = [
  "queued",
  "rendering",
  "visual_review",
  "lighthouse",
  "synthesis",
  "done",
];

const stageLabelByKey: Record<AnalyzerStage, string> = {
  queued: "Queued for analysis",
  rendering: "Rendering store pages",
  visual_review: "Reviewing visual layout",
  lighthouse: "Running Lighthouse and Core Web Vitals",
  synthesis: "Synthesizing recommendations",
  done: "Analysis complete",
  error: "Analysis failed",
};

const pollingIntervalMs = 1300;
const pollingDeadlineMs = 90_000;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeStoreUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

function isValidStoreUrl(value: string): boolean {
  try {
    const parsed = new URL(normalizeStoreUrl(value));
    return Boolean(parsed.hostname) && parsed.hostname.includes(".");
  } catch {
    return false;
  }
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function trackEvent(name: string, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent("krish:product-event", {
      detail: {
        event: name,
        ...payload,
      },
    }),
  );

  const maybeDataLayer = (window as Window & { dataLayer?: Array<Record<string, unknown>> })
    .dataLayer;
  if (Array.isArray(maybeDataLayer)) {
    maybeDataLayer.push({
      event: name,
      ...payload,
    });
  }
}

function resolveErrorMessage(payload: unknown, fallback: string): string {
  if (payload && typeof payload === "object" && "message" in payload) {
    const message = (payload as { message?: unknown }).message;
    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }

  return fallback;
}

async function copyText(value: string): Promise<boolean> {
  if (typeof navigator === "undefined") {
    return false;
  }

  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    try {
      const helper = document.createElement("textarea");
      helper.value = value;
      helper.setAttribute("readonly", "");
      helper.style.position = "absolute";
      helper.style.left = "-9999px";
      document.body.appendChild(helper);
      helper.select();
      const copied = document.execCommand("copy");
      document.body.removeChild(helper);
      return copied;
    } catch {
      return false;
    }
  }
}

function Pill({ label, tone }: { label: string; tone: "high" | "med" | "low" | "neutral" }) {
  const className = [
    styles.pill,
    styles[`pill${tone.charAt(0).toUpperCase()}${tone.slice(1)}`],
  ].join(" ");
  return <span className={className}>{label}</span>;
}

function RecommendationCard({
  item,
  isLocked,
  isDone,
  isCopied,
  onCopy,
  onMarkDone,
}: {
  item: AnalysisRecommendation;
  isLocked?: boolean;
  isDone?: boolean;
  isCopied?: boolean;
  onCopy: () => void;
  onMarkDone: () => void;
}) {
  return (
    <article className={`${styles.recommendationCard} ${isLocked ? styles.lockedCard : ""}`}>
      <div className={styles.cardTop}>
        <h3>{item.title}</h3>
        <div className={styles.badges}>
          <Pill
            label={`Impact: ${item.impact}`}
            tone={item.impact === "High" ? "high" : item.impact === "Med" ? "med" : "low"}
          />
          <Pill label={`Effort: ${item.effort}`} tone="neutral" />
          <Pill
            label={`Confidence: ${item.confidence}`}
            tone={item.confidence === "High" ? "high" : "med"}
          />
          {item.evidenceSources.map((source) => (
            <Pill key={`${item.title}-${source}`} label={source} tone="neutral" />
          ))}
        </div>
      </div>

      <p className={styles.cardParagraph}>
        <strong>Why this matters:</strong> {item.whyItMatters}
      </p>
      <p className={styles.cardParagraph}>
        <strong>Why flagged:</strong> {item.flaggedBecause}
      </p>
      <p className={styles.cardParagraph}>
        <strong>How to fix:</strong> {item.howToFix}
      </p>
      <p className={styles.cardParagraph}>
        <strong>Safe check:</strong> {item.safeValidationStep}
      </p>

      <div className={styles.promptBlock}>
        <p className={styles.promptLabel}>Copy-ready implementation prompt</p>
        <pre>{item.implementationPrompt}</pre>
      </div>

      <div className={styles.cardActions}>
        <button type="button" className={styles.inlineAction} onClick={onCopy} disabled={isLocked}>
          {isCopied ? "Copied" : "Copy task"}
        </button>
        <button
          type="button"
          className={styles.inlineAction}
          onClick={onMarkDone}
          disabled={Boolean(isLocked) || Boolean(isDone)}
        >
          {isDone ? "Marked done" : "Mark done"}
        </button>
      </div>
    </article>
  );
}

export function WebsiteAnalyzerTool() {
  const [storeUrl, setStoreUrl] = useState("");
  const [analysisTier, setAnalysisTier] = useState<AnalysisTier>("basic");
  const [goal, setGoal] = useState<AnalyzeGoal>("conversion");
  const [analysisId, setAnalysisId] = useState("");
  const [result, setResult] = useState<AnalyzeQueueResponse | null>(null);
  const [formError, setFormError] = useState("");
  const [requestError, setRequestError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pipelineStage, setPipelineStage] = useState<AnalyzerStage>("queued");
  const [pipelineProgress, setPipelineProgress] = useState(0);
  const [copiedKey, setCopiedKey] = useState("");
  const [completedTodayPlanCount, setCompletedTodayPlanCount] = useState(0);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailSuccess, setEmailSuccess] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [advancedMessage, setAdvancedMessage] = useState("");
  const [forceFreshMessage, setForceFreshMessage] = useState("");
  const [cacheMessage, setCacheMessage] = useState("");

  useEffect(() => {
    trackEvent("advanced_option_impression", {
      analysis_tier: "advanced",
      state: "coming_soon",
    });
    trackEvent("force_fresh_option_impression", {
      state: "coming_soon",
    });
  }, []);

  const doneResult = result?.status === "done" ? result : null;

  const nextRecommendation = useMemo(() => {
    if (!doneResult) {
      return null;
    }

    return (
      doneResult.todayPlan[completedTodayPlanCount] ??
      doneResult.quickWins[0] ??
      doneResult.blockers[0] ??
      null
    );
  }, [completedTodayPlanCount, doneResult]);

  async function pollForResult(nextAnalysisId: string): Promise<AnalyzeQueueResponse> {
    const startedAt = Date.now();

    while (Date.now() - startedAt < pollingDeadlineMs) {
      await wait(pollingIntervalMs);

      const response = await fetch(`/api/analyze/${nextAnalysisId}`, {
        method: "GET",
        cache: "no-store",
      });

      const payload: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(resolveErrorMessage(payload, "We could not load your action plan yet."));
      }

      const data = payload as AnalyzeQueueResponse;
      if (data.status === "queued") {
        setPipelineStage(data.stage);
        setPipelineProgress(data.progress);
      } else if (data.status === "error") {
        throw new Error(data.message);
      } else if (data.status === "done") {
        return data;
      }
    }

    throw new Error("Analysis is taking longer than expected. Please try again in a moment.");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    setRequestError("");
    setEmailError("");
    setEmailSuccess("");
    setAdvancedMessage("");
    setForceFreshMessage("");
    setCacheMessage("");
    setCopiedKey("");
    setCompletedTodayPlanCount(0);
    setPipelineStage("queued");
    setPipelineProgress(0);
    setResult(null);

    if (analysisTier !== "basic") {
      setFormError("Advanced analysis is coming soon. Basic analysis is available right now.");
      return;
    }

    if (!isValidStoreUrl(storeUrl)) {
      setFormError("Enter a valid Shopify store URL (for example: yourstore.myshopify.com).");
      return;
    }

    setIsSubmitting(true);
    setPipelineProgress(8);

    const normalizedStoreUrl = normalizeStoreUrl(storeUrl);
    trackEvent("analyzer_submit_started", {
      goal,
      analysis_tier: analysisTier,
      analysis_profile: "basic",
      store_url: normalizedStoreUrl,
    });

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          storeUrl: normalizedStoreUrl,
          goal,
          analysisProfile: "basic",
        }),
      });

      const payload: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(
          resolveErrorMessage(payload, "We could not analyze your storefront right now."),
        );
      }

      const data = payload as AnalyzeQueueResponse;
      setAnalysisId(data.analysisId);

      if (data.status === "done") {
        setResult(data);
        setPipelineStage("done");
        setPipelineProgress(100);

        if (data.servedFromCache) {
          const cachedAtText = data.cachedAt
            ? new Date(data.cachedAt).toLocaleString()
            : "within the last 24 hours";
          setCacheMessage(`Loaded from saved analysis (${cachedAtText}).`);
        }
      } else {
        setPipelineStage(data.stage);
        setPipelineProgress(data.progress);
        const pollResponse = await pollForResult(data.analysisId);
        setResult(pollResponse);
        setPipelineStage("done");
        setPipelineProgress(100);
      }

      trackEvent("analysis_completed", {
        goal,
        analysis_tier: analysisTier,
        analysis_id: data.analysisId,
      });
    } catch (error) {
      setRequestError(
        error instanceof Error ? error.message : "We could not analyze your storefront right now.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleCopy(recommendation: AnalysisRecommendation, key: string) {
    const copied = await copyText(recommendation.implementationPrompt);
    if (copied) {
      setCopiedKey(key);
      trackEvent("copy_task_clicked", {
        analysis_id: analysisId,
        task_title: recommendation.title,
      });
    }
  }

  function handleMarkDone(index: number, recommendation: AnalysisRecommendation) {
    if (!doneResult || index !== completedTodayPlanCount) {
      return;
    }

    const nextCount = completedTodayPlanCount + 1;
    setCompletedTodayPlanCount(nextCount);
    trackEvent("task_marked_done", {
      analysis_id: analysisId,
      task_title: recommendation.title,
      tasks_completed: nextCount,
    });

    if (nextCount === 1) {
      trackEvent("first_fix_shipped", {
        analysis_id: analysisId,
      });
    }
  }

  async function handleEmailPlan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEmailError("");
    setEmailSuccess("");

    if (!analysisId) {
      setEmailError("Analyze your store first, then request the email plan.");
      return;
    }

    if (!emailPattern.test(email.trim())) {
      setEmailError("Enter a valid email address.");
      return;
    }

    setIsSendingEmail(true);

    try {
      const response = await fetch("/api/analyze/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          analysisId,
          email: email.trim(),
        }),
      });

      const payload: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(resolveErrorMessage(payload, "We could not save your email right now."));
      }

      setEmailSuccess("Action plan captured. We will send it shortly.");
      trackEvent("email_plan_requested", {
        analysis_id: analysisId,
      });
    } catch (error) {
      setEmailError(
        error instanceof Error ? error.message : "We could not save your email right now.",
      );
    } finally {
      setIsSendingEmail(false);
    }
  }

  function handleAdvancedInterest() {
    setAdvancedMessage("Advanced analysis is coming soon. We logged your interest.");
    trackEvent("advanced_option_interest_clicked", {
      analysis_tier: "advanced",
      state: "coming_soon",
    });
  }

  function handleForceFreshInterest() {
    setForceFreshMessage("Force fresh analysis is coming soon. We logged your interest.");
    trackEvent("force_fresh_interest_clicked", {
      state: "coming_soon",
    });
  }

  const completedAllTodayPlan = doneResult
    ? completedTodayPlanCount >= doneResult.todayPlan.length
    : false;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Instant Shopify audit</p>
          <h1>Analyze My Website</h1>
          <p>
            Share your store URL and get a plain-language, 10-minute action plan prioritized for
            user value and quick wins. Basic analysis is live. Advanced analysis is coming soon.
          </p>
        </header>

        <div className={styles.inputCard}>
          <form className={styles.inputForm} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label htmlFor="analyzer-store-url">Shopify store URL</label>
              <input
                id="analyzer-store-url"
                type="url"
                name="storeUrl"
                value={storeUrl}
                onChange={(event) => setStoreUrl(event.target.value)}
                placeholder="yourstore.myshopify.com"
                autoComplete="url"
                aria-invalid={Boolean(formError)}
                aria-describedby={formError ? "analyzer-store-url-error" : undefined}
              />
              {formError ? (
                <p id="analyzer-store-url-error" className={styles.errorText} role="alert">
                  {formError}
                </p>
              ) : null}
            </div>

            <div className={styles.field}>
              <label>Analysis type</label>
              <div className={styles.tierSelector} role="radiogroup" aria-label="Analysis type">
                <label className={`${styles.tierOption} ${styles.tierOptionActive}`}>
                  <input
                    type="radio"
                    name="analysis-tier"
                    value="basic"
                    checked={analysisTier === "basic"}
                    onChange={() => setAnalysisTier("basic")}
                  />
                  <span className={styles.tierTitle}>Basic analysis</span>
                  <span className={styles.tierMeta}>Available now</span>
                </label>

                <div
                  className={`${styles.tierOption} ${styles.tierOptionDisabled}`}
                  role="button"
                  aria-disabled="true"
                  tabIndex={0}
                  onClick={handleAdvancedInterest}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleAdvancedInterest();
                    }
                  }}
                >
                  <span className={styles.tierTitle}>Advanced analysis</span>
                  <span className={styles.tierMeta}>Coming soon</span>
                  <span className={styles.tierDescription}>
                    DOM rendering, visual layout understanding, Lighthouse/Core Web Vitals, and
                    theme code analysis.
                  </span>
                </div>
              </div>
            </div>

            {advancedMessage ? (
              <p className={styles.metaText} role="status">
                {advancedMessage}
              </p>
            ) : null}

            <div className={styles.field}>
              <label>Freshness preference</label>
              <div
                className={`${styles.tierOption} ${styles.tierOptionDisabled}`}
                role="button"
                aria-disabled="true"
                tabIndex={0}
                onClick={handleForceFreshInterest}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleForceFreshInterest();
                  }
                }}
              >
                <span className={styles.tierTitle}>Force fresh analysis</span>
                <span className={styles.tierMeta}>Coming soon</span>
                <span className={styles.tierDescription}>
                  Soon you can bypass cached reports and run a new analysis on demand.
                </span>
              </div>
            </div>

            {forceFreshMessage ? (
              <p className={styles.metaText} role="status">
                {forceFreshMessage}
              </p>
            ) : null}

            <div className={styles.field}>
              <label htmlFor="analyzer-goal">Primary goal (optional)</label>
              <select
                id="analyzer-goal"
                name="goal"
                value={goal}
                onChange={(event) => setGoal(event.target.value as AnalyzeGoal)}
              >
                {goalOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {requestError ? (
              <p className={styles.errorText} role="alert">
                {requestError}
              </p>
            ) : null}

            <div className={styles.inputActions}>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? "Analyzing..." : "Run Basic Analysis"}
              </Button>
            </div>
          </form>
        </div>

        {isSubmitting ? (
          <div className={styles.progressCard} aria-live="polite">
            <p className={styles.progressLabel}>Analyzing your storefront</p>
            <h2>{stageLabelByKey[pipelineStage]}</h2>
            <p className={styles.metaText}>Progress: {pipelineProgress}%</p>
            <ul>
              {stageOrder.map((stage) => (
                <li
                  key={stage}
                  className={
                    stageOrder.indexOf(stage) <= stageOrder.indexOf(pipelineStage)
                      ? styles.progressActive
                      : ""
                  }
                >
                  {stageLabelByKey[stage]}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {doneResult ? (
          <div className={styles.results}>
            <section className={styles.summaryCard} aria-live="polite">
              <h2>{doneResult.summary.headline}</h2>
              <p>{doneResult.summary.overview}</p>
              {cacheMessage ? <p className={styles.metaText}>{cacheMessage}</p> : null}
              <p className={styles.metaText}>
                Estimated execution time: {doneResult.summary.estimatedMinutes} minutes.
              </p>
            </section>

            <section className={styles.sectionBlock}>
              <h2>Visual Findings</h2>
              <p>AI-assisted layout review combined with deterministic DOM checks.</p>
              <ul className={styles.findingsList}>
                {doneResult.visualFindings.slice(0, 5).map((finding: VisualFinding) => (
                  <li key={finding.id}>
                    <strong>{finding.title}</strong> ({finding.severity}, {finding.confidence}) -{" "}
                    {finding.evidence}
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.sectionBlock}>
              <h2>Performance Snapshot</h2>
              <p>{doneResult.performance.summary}</p>
              <ul className={styles.findingsList}>
                {doneResult.performance.pages.map((page) => (
                  <li key={page.url}>
                    <strong>{page.pageType.toUpperCase()}</strong>:{" "}
                    {page.score === null ? "N/A" : `${page.score}/100`} | LCP{" "}
                    {page.vitals.lcpMs === null ? "N/A" : `${Math.round(page.vitals.lcpMs)}ms`} |
                    CLS {page.vitals.cls === null ? "N/A" : page.vitals.cls.toFixed(2)}
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.sectionBlock}>
              <h2>Top 3 Fixes to Ship Today</h2>
              <p>Finish one fix at a time. Each completed task unlocks your next best move.</p>
              <div className={styles.cardGrid}>
                {doneResult.todayPlan.map((item, index) => {
                  const isLocked = index > completedTodayPlanCount;
                  const isDone = index < completedTodayPlanCount;
                  const key = `today-${index}`;

                  return (
                    <RecommendationCard
                      key={item.title}
                      item={item}
                      isLocked={isLocked}
                      isDone={isDone}
                      isCopied={copiedKey === key}
                      onCopy={() => handleCopy(item, key)}
                      onMarkDone={() => handleMarkDone(index, item)}
                    />
                  );
                })}
              </div>
              {completedAllTodayPlan ? (
                <p className={styles.successText}>You&apos;ve already improved your store.</p>
              ) : (
                <p className={styles.metaText}>
                  Next best fix unlocks after you mark the current task done.
                </p>
              )}
            </section>

            <section className={styles.sectionBlock}>
              <h2>Quick Wins (&lt;15 min)</h2>
              <div className={styles.cardGrid}>
                {doneResult.quickWins.map((item, index) => {
                  const key = `quick-${index}`;
                  return (
                    <RecommendationCard
                      key={item.title}
                      item={item}
                      isCopied={copiedKey === key}
                      onCopy={() => handleCopy(item, key)}
                      onMarkDone={() => {
                        trackEvent("quick_win_marked_done", {
                          analysis_id: analysisId,
                          task_title: item.title,
                        });
                      }}
                    />
                  );
                })}
              </div>
            </section>

            <section className={styles.sectionBlock}>
              <h2>Conversion Blockers</h2>
              <div className={styles.cardGrid}>
                {doneResult.blockers.map((item, index) => {
                  const key = `blocker-${index}`;
                  return (
                    <RecommendationCard
                      key={item.title}
                      item={item}
                      isCopied={copiedKey === key}
                      onCopy={() => handleCopy(item, key)}
                      onMarkDone={() => {
                        trackEvent("blocker_marked_done", {
                          analysis_id: analysisId,
                          task_title: item.title,
                        });
                      }}
                    />
                  );
                })}
              </div>
            </section>

            <section className={styles.nextSteps}>
              <h2>Next Step Buttons</h2>
              <p>
                Keep momentum. Copy the next task, ship it, then get implementation help if needed.
              </p>
              <div className={styles.nextActions}>
                <button
                  type="button"
                  className={styles.primaryAction}
                  onClick={() => {
                    if (!nextRecommendation) {
                      return;
                    }

                    void handleCopy(nextRecommendation, "next-step");
                  }}
                >
                  {copiedKey === "next-step" ? "Copied next task" : "Copy task"}
                </button>
                <button
                  type="button"
                  className={styles.secondaryAction}
                  onClick={() => {
                    if (!nextRecommendation || !doneResult) {
                      return;
                    }

                    const index = doneResult.todayPlan.findIndex(
                      (item) => item.title === nextRecommendation.title,
                    );
                    if (index >= 0) {
                      handleMarkDone(index, nextRecommendation);
                    }
                  }}
                >
                  Mark done
                </button>
                <Link
                  href={`/contact?source=analyzer&analysisId=${encodeURIComponent(analysisId)}`}
                  className={styles.secondaryAction}
                  onClick={() =>
                    trackEvent("cta_help_implementing_clicked", {
                      analysis_id: analysisId,
                    })
                  }
                >
                  Get help implementing
                </Link>
              </div>

              <form className={styles.emailForm} onSubmit={handleEmailPlan}>
                <label htmlFor="plan-email">Email me this action plan</label>
                <div className={styles.emailRow}>
                  <input
                    id="plan-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@company.com"
                    autoComplete="email"
                  />
                  <button type="submit" disabled={isSendingEmail}>
                    {isSendingEmail ? "Saving..." : "Email me this action plan"}
                  </button>
                </div>
                {emailError ? <p className={styles.errorText}>{emailError}</p> : null}
                {emailSuccess ? <p className={styles.successText}>{emailSuccess}</p> : null}
              </form>
            </section>

            <section className={styles.sectionBlock}>
              <h2>Theme Code Analysis</h2>
              <p>{doneResult.themeCodeAnalysis.note}</p>
              <ul className={styles.findingsList}>
                {doneResult.themeCodeAnalysis.plannedInputs.map((inputType) => (
                  <li key={inputType}>{inputType}</li>
                ))}
              </ul>
            </section>
          </div>
        ) : null}
      </div>
    </section>
  );
}
