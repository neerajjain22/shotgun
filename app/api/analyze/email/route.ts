import { NextResponse } from "next/server";

import { AnalyzerInputError, captureAnalysisEmail } from "@/lib/store-analyzer";

type EmailCapturePayload = {
  analysisId: string;
  email: string;
};

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        {
          message: "Invalid request payload.",
        },
        { status: 400 },
      );
    }

    const payload = body as Partial<EmailCapturePayload>;
    captureAnalysisEmail({
      analysisId: payload.analysisId ?? "",
      email: payload.email ?? "",
    });

    return NextResponse.json(
      {
        success: true,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof AnalyzerInputError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: error.statusCode },
      );
    }

    return NextResponse.json(
      {
        message: "We could not save your email right now. Please try again.",
      },
      { status: 500 },
    );
  }
}
