import { NextResponse } from "next/server";

import { AnalyzerInputError, queueAnalysis } from "@/lib/store-analyzer";
import type { AnalyzeRequest } from "@/types/analyzer";

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

    const payload = body as AnalyzeRequest;
    const result = await queueAnalysis(payload);

    const statusCode = result.status === "done" ? 200 : result.status === "error" ? 500 : 201;
    return NextResponse.json(result, { status: statusCode });
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
        message: "We could not analyze your storefront right now. Please try again.",
      },
      { status: 500 },
    );
  }
}
