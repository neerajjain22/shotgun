import { NextResponse } from "next/server";

type LeadPayload = {
  name: string;
  workEmail: string;
  storeUrl: string;
  taskDescription: string;
  deadline: string | null;
  preferredChannel: string | null;
};

type LeadField = keyof LeadPayload;
type LeadFieldErrors = Partial<Record<LeadField, string>>;

const allowedChannels = new Set(["Slack", "WhatsApp", "Email"]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeStoreUrl(value: string): string {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `https://${value}`;
}

function isValidStoreUrl(value: string): boolean {
  try {
    const parsed = new URL(normalizeStoreUrl(value));
    return Boolean(parsed.hostname) && parsed.hostname.includes(".");
  } catch {
    return false;
  }
}

function validatePayload(payload: Partial<LeadPayload>): LeadFieldErrors {
  const errors: LeadFieldErrors = {};

  const name = payload.name?.trim() ?? "";
  if (!name) {
    errors.name = "Name is required.";
  }

  const workEmail = payload.workEmail?.trim() ?? "";
  if (!workEmail) {
    errors.workEmail = "Work email is required.";
  } else if (!emailPattern.test(workEmail)) {
    errors.workEmail = "Enter a valid work email.";
  }

  const storeUrl = payload.storeUrl?.trim() ?? "";
  if (!storeUrl) {
    errors.storeUrl = "Store URL is required.";
  } else if (!isValidStoreUrl(storeUrl)) {
    errors.storeUrl = "Enter a valid Shopify store URL.";
  }

  const taskDescription = payload.taskDescription?.trim() ?? "";
  if (!taskDescription) {
    errors.taskDescription = "Task description is required.";
  } else if (taskDescription.length < 20) {
    errors.taskDescription = "Task description must be at least 20 characters.";
  } else if (taskDescription.length > 2000) {
    errors.taskDescription = "Task description is too long.";
  }

  if (payload.deadline) {
    const deadlineDate = new Date(payload.deadline);
    if (Number.isNaN(deadlineDate.getTime())) {
      errors.deadline = "Enter a valid deadline date.";
    }
  }

  if (payload.preferredChannel && !allowedChannels.has(payload.preferredChannel)) {
    errors.preferredChannel = "Preferred channel is not valid.";
  }

  return errors;
}

function toLeadPayload(payload: Partial<LeadPayload>): LeadPayload {
  return {
    name: payload.name?.trim() ?? "",
    workEmail: payload.workEmail?.trim() ?? "",
    storeUrl: normalizeStoreUrl(payload.storeUrl?.trim() ?? ""),
    taskDescription: payload.taskDescription?.trim() ?? "",
    deadline: payload.deadline ?? null,
    preferredChannel: payload.preferredChannel ?? null
  };
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request payload."
        },
        { status: 400 }
      );
    }

    const payload = body as Partial<LeadPayload>;
    const fieldErrors = validatePayload(payload);

    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fix the highlighted fields.",
          fieldErrors
        },
        { status: 400 }
      );
    }

    const lead = toLeadPayload(payload);
    void lead;

    return NextResponse.json(
      {
        success: true
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while submitting your request."
      },
      { status: 500 }
    );
  }
}
