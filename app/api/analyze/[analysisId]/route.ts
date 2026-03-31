import { NextResponse } from "next/server";

import { getAnalysis } from "@/lib/store-analyzer";

type AnalyzeRouteContext = {
  params: {
    analysisId: string;
  };
};

export async function GET(_: Request, context: AnalyzeRouteContext) {
  const analysisId = context.params.analysisId;
  const result = getAnalysis(analysisId);

  if (!result) {
    return NextResponse.json(
      {
        message: "Analysis not found. Submit your store URL to start a new review.",
      },
      { status: 404 },
    );
  }

  return NextResponse.json(result);
}
