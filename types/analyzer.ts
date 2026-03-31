export type AnalyzeGoal = "conversion" | "speed" | "pdp";
export type AnalyzeProfile = "basic" | "advanced";
export type AnalyzerStage =
  | "queued"
  | "rendering"
  | "visual_review"
  | "lighthouse"
  | "synthesis"
  | "done"
  | "error";
export type RecommendationEvidenceSource = "Visual" | "DOM" | "Performance";

export type RecommendationEffort = "S" | "M" | "L";
export type RecommendationImpact = "High" | "Med" | "Low";
export type RecommendationConfidence = "High" | "Medium";
export type VisualFindingSeverity = "high" | "medium" | "low";
export type VisualFindingConfidence = "high" | "medium";
export type AnalyzerPageType = "home" | "pdp" | "cart" | "unknown";

export type AnalysisRecommendation = {
  title: string;
  whyItMatters: string;
  effort: RecommendationEffort;
  impact: RecommendationImpact;
  howToFix: string;
  confidence: RecommendationConfidence;
  implementationPrompt: string;
  flaggedBecause: string;
  safeValidationStep: string;
  evidenceSources: RecommendationEvidenceSource[];
};

export type AnalysisSummary = {
  headline: string;
  overview: string;
  estimatedMinutes: number;
};

export type VisualFinding = {
  id: string;
  title: string;
  severity: VisualFindingSeverity;
  evidence: string;
  whyItMatters: string;
  fixHint: string;
  confidence: VisualFindingConfidence;
  pageType: AnalyzerPageType;
  source: "ai" | "rules";
};

export type LighthouseVitals = {
  lcpMs: number | null;
  cls: number | null;
  inpMs: number | null;
  fcpMs: number | null;
};

export type PerformanceOpportunity = {
  title: string;
  potentialSavingsMs: number;
  pageType: AnalyzerPageType;
  url: string;
};

export type PerformancePageReport = {
  pageType: AnalyzerPageType;
  url: string;
  score: number | null;
  vitals: LighthouseVitals;
  opportunities: PerformanceOpportunity[];
};

export type PerformanceReport = {
  available: boolean;
  summary: string;
  pages: PerformancePageReport[];
  topOpportunities: PerformanceOpportunity[];
};

export type ThemeCodeAnalysisPlaceholder = {
  status: "coming_soon";
  note: string;
  plannedInputs: string[];
};

export type AnalysisArtifactsReady = {
  renderedPages: boolean;
  visualReview: boolean;
  lighthouse: boolean;
  synthesis: boolean;
};

export type CompletedAnalysisResult = {
  summary: AnalysisSummary;
  todayPlan: AnalysisRecommendation[];
  quickWins: AnalysisRecommendation[];
  blockers: AnalysisRecommendation[];
  visualFindings: VisualFinding[];
  performance: PerformanceReport;
  themeCodeAnalysis: ThemeCodeAnalysisPlaceholder;
};

export type AnalyzeRequest = {
  storeUrl: string;
  goal?: AnalyzeGoal;
  analysisProfile?: AnalyzeProfile;
  forceFresh?: boolean;
};

export type AnalyzeQueuedResponse = {
  analysisId: string;
  status: "queued";
  stage: AnalyzerStage;
  progress: number;
  artifactsReady: AnalysisArtifactsReady;
  servedFromCache: false;
};

export type AnalyzeDoneResponse = {
  analysisId: string;
  status: "done";
  stage: "done";
  progress: 100;
  artifactsReady: AnalysisArtifactsReady;
  servedFromCache: boolean;
  cachedAt?: string;
} & CompletedAnalysisResult;

export type AnalyzeErrorResponse = {
  analysisId: string;
  status: "error";
  stage: "error";
  progress: 100;
  artifactsReady: AnalysisArtifactsReady;
  servedFromCache: false;
  message: string;
};

export type AnalyzeQueueResponse =
  | AnalyzeQueuedResponse
  | AnalyzeDoneResponse
  | AnalyzeErrorResponse;
