"use client";

import { useRouter } from "next/navigation";
import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";

import styles from "./LeadCaptureForm.module.css";

type LeadFormValues = {
  name: string;
  workEmail: string;
  storeUrl: string;
  taskDescription: string;
  deadline: string;
  preferredChannel: string;
};

type LeadFormField = keyof LeadFormValues;
type LeadFormErrors = Partial<Record<LeadFormField, string>>;

const initialFormValues: LeadFormValues = {
  name: "",
  workEmail: "",
  storeUrl: "",
  taskDescription: "",
  deadline: "",
  preferredChannel: ""
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const preferredChannels = new Set(["Slack", "WhatsApp", "Email"]);

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
  const normalized = normalizeStoreUrl(value);

  try {
    const parsed = new URL(normalized);
    return Boolean(parsed.hostname) && parsed.hostname.includes(".");
  } catch {
    return false;
  }
}

function validateForm(values: LeadFormValues): LeadFormErrors {
  const errors: LeadFormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!values.workEmail.trim()) {
    errors.workEmail = "Work email is required.";
  } else if (!emailPattern.test(values.workEmail.trim())) {
    errors.workEmail = "Enter a valid email address.";
  }

  if (!values.storeUrl.trim()) {
    errors.storeUrl = "Store URL is required.";
  } else if (!isValidStoreUrl(values.storeUrl)) {
    errors.storeUrl = "Enter a valid Shopify store URL.";
  }

  if (!values.taskDescription.trim()) {
    errors.taskDescription = "Task description is required.";
  } else if (values.taskDescription.trim().length < 20) {
    errors.taskDescription = "Add a bit more detail so we can scope this correctly.";
  }

  if (values.preferredChannel && !preferredChannels.has(values.preferredChannel)) {
    errors.preferredChannel = "Choose a valid communication channel.";
  }

  return errors;
}

function resolveErrorMessage(responseBody: unknown): string {
  if (responseBody && typeof responseBody === "object" && "message" in responseBody) {
    const message = (responseBody as { message?: unknown }).message;
    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }

  return "We could not submit your request right now. Please try again.";
}

export function LeadCaptureForm() {
  const router = useRouter();
  const [values, setValues] = useState<LeadFormValues>(initialFormValues);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [submitError, setSubmitError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    const field = name as LeadFormField;

    setValues((currentValues) => ({
      ...currentValues,
      [field]: value
    }));

    if (errors[field]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [field]: undefined
      }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");

    const fieldErrors = validateForm(values);
    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    const payload = {
      ...values,
      name: values.name.trim(),
      workEmail: values.workEmail.trim(),
      storeUrl: normalizeStoreUrl(values.storeUrl),
      taskDescription: values.taskDescription.trim(),
      deadline: values.deadline || null,
      preferredChannel: values.preferredChannel || null
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const responseBody: unknown = await response.json().catch(() => null);
        setSubmitError(resolveErrorMessage(responseBody));

        if (responseBody && typeof responseBody === "object" && "fieldErrors" in responseBody) {
          const apiErrors = (responseBody as { fieldErrors?: LeadFormErrors }).fieldErrors;
          if (apiErrors) {
            setErrors((currentErrors) => ({
              ...currentErrors,
              ...apiErrors
            }));
          }
        }

        return;
      }

      router.push("/contact/success");
    } catch {
      setSubmitError("We could not submit your request right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
      <div className={styles.field}>
        <label htmlFor="lead-name">Name</label>
        <input
          id="lead-name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={handleChange}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "lead-name-error" : undefined}
          placeholder="Jane Smith"
        />
        {errors.name ? (
          <p className={styles.errorText} id="lead-name-error" role="alert">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label htmlFor="lead-email">Work email</label>
        <input
          id="lead-email"
          name="workEmail"
          type="email"
          autoComplete="email"
          value={values.workEmail}
          onChange={handleChange}
          aria-invalid={Boolean(errors.workEmail)}
          aria-describedby={errors.workEmail ? "lead-email-error" : undefined}
          placeholder="you@company.com"
        />
        {errors.workEmail ? (
          <p className={styles.errorText} id="lead-email-error" role="alert">
            {errors.workEmail}
          </p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label htmlFor="lead-store-url">Shopify store URL</label>
        <input
          id="lead-store-url"
          name="storeUrl"
          type="url"
          autoComplete="url"
          value={values.storeUrl}
          onChange={handleChange}
          aria-invalid={Boolean(errors.storeUrl)}
          aria-describedby={errors.storeUrl ? "lead-store-url-error" : undefined}
          placeholder="yourstore.myshopify.com"
        />
        {errors.storeUrl ? (
          <p className={styles.errorText} id="lead-store-url-error" role="alert">
            {errors.storeUrl}
          </p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label htmlFor="lead-task-description">Task description</label>
        <textarea
          id="lead-task-description"
          name="taskDescription"
          value={values.taskDescription}
          onChange={handleChange}
          aria-invalid={Boolean(errors.taskDescription)}
          aria-describedby={errors.taskDescription ? "lead-task-description-error" : undefined}
          placeholder="Describe the exact Shopify change you need."
          rows={5}
        />
        {errors.taskDescription ? (
          <p className={styles.errorText} id="lead-task-description-error" role="alert">
            {errors.taskDescription}
          </p>
        ) : null}
      </div>

      <div className={styles.twoColumnFields}>
        <div className={styles.field}>
          <label htmlFor="lead-deadline">Deadline (optional)</label>
          <input
            id="lead-deadline"
            name="deadline"
            type="date"
            value={values.deadline}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="lead-channel">Preferred channel (optional)</label>
          <select
            id="lead-channel"
            name="preferredChannel"
            value={values.preferredChannel}
            onChange={handleChange}
            aria-invalid={Boolean(errors.preferredChannel)}
            aria-describedby={errors.preferredChannel ? "lead-channel-error" : undefined}
          >
            <option value="">No preference</option>
            <option value="Slack">Slack</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Email">Email</option>
          </select>
          {errors.preferredChannel ? (
            <p className={styles.errorText} id="lead-channel-error" role="alert">
              {errors.preferredChannel}
            </p>
          ) : null}
        </div>
      </div>

      {submitError ? (
        <p className={styles.formError} role="alert">
          {submitError}
        </p>
      ) : null}

      <div className={styles.actions}>
        <Button type="submit" variant="primary" fullWidth disabled={isSubmitting}>
          {isSubmitting ? "Submitting request..." : "Start for free"}
        </Button>
      </div>
    </form>
  );
}
