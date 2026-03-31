import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import type { AnalyzeGoal, AnalyzeProfile, CompletedAnalysisResult } from "@/types/analyzer";

const cacheTtlMs = 24 * 60 * 60 * 1000;
const dbVersion = 4;

type PersistedAnalysisEntry = {
  analysisId: string;
  cacheKey: string;
  storeUrl: string;
  goal: AnalyzeGoal;
  analysisProfile: AnalyzeProfile;
  createdAt: string;
  result: CompletedAnalysisResult;
};

type AnalyzerDatabase = {
  version: number;
  analysesById: Record<string, PersistedAnalysisEntry>;
  latestByCacheKey: Record<string, string>;
};

type CacheLookupHit = {
  analysisId: string;
  createdAt: string;
  result: CompletedAnalysisResult;
};

const defaultDb: AnalyzerDatabase = {
  version: dbVersion,
  analysesById: {},
  latestByCacheKey: {},
};

let writeQueue: Promise<void> = Promise.resolve();

function resolveDbPath(): string {
  const customPath = process.env.KRISH_ANALYZER_DB_PATH;
  if (customPath) {
    return customPath;
  }

  return path.join(process.cwd(), ".krish-data", "analyzer-cache-db.json");
}

function toCacheKey(storeUrl: string, goal: AnalyzeGoal, analysisProfile: AnalyzeProfile): string {
  return `${storeUrl.toLowerCase()}::${goal}::${analysisProfile}`;
}

function isFresh(createdAtIso: string, nowMs: number): boolean {
  const createdAtMs = new Date(createdAtIso).getTime();
  if (Number.isNaN(createdAtMs)) {
    return false;
  }

  return nowMs - createdAtMs <= cacheTtlMs;
}

function pruneExpired(db: AnalyzerDatabase, nowMs = Date.now()): AnalyzerDatabase {
  const nextById: Record<string, PersistedAnalysisEntry> = {};
  const nextByCacheKey: Record<string, string> = {};

  for (const [analysisId, entry] of Object.entries(db.analysesById)) {
    if (!isFresh(entry.createdAt, nowMs)) {
      continue;
    }

    nextById[analysisId] = entry;
  }

  for (const [cacheKey, analysisId] of Object.entries(db.latestByCacheKey)) {
    if (nextById[analysisId]) {
      nextByCacheKey[cacheKey] = analysisId;
    }
  }

  return {
    version: dbVersion,
    analysesById: nextById,
    latestByCacheKey: nextByCacheKey,
  };
}

async function readDb(): Promise<AnalyzerDatabase> {
  const dbPath = resolveDbPath();

  try {
    const raw = await readFile(dbPath, "utf8");
    const parsed: unknown = JSON.parse(raw);

    if (!parsed || typeof parsed !== "object") {
      return defaultDb;
    }

    const candidate = parsed as Partial<AnalyzerDatabase>;
    if (
      candidate.version !== dbVersion ||
      !candidate.analysesById ||
      typeof candidate.analysesById !== "object" ||
      !candidate.latestByCacheKey ||
      typeof candidate.latestByCacheKey !== "object"
    ) {
      return defaultDb;
    }

    return pruneExpired({
      version: dbVersion,
      analysesById: candidate.analysesById as Record<string, PersistedAnalysisEntry>,
      latestByCacheKey: candidate.latestByCacheKey as Record<string, string>,
    });
  } catch {
    return defaultDb;
  }
}

async function writeDb(db: AnalyzerDatabase): Promise<void> {
  const dbPath = resolveDbPath();
  const directory = path.dirname(dbPath);

  await mkdir(directory, { recursive: true });
  await writeFile(dbPath, JSON.stringify(db, null, 2), "utf8");
}

function enqueueWrite(mutator: (db: AnalyzerDatabase) => AnalyzerDatabase): Promise<void> {
  const run = async () => {
    const current = await readDb();
    const next = pruneExpired(mutator(current));
    await writeDb(next);
  };

  writeQueue = writeQueue.then(run, run);
  return writeQueue;
}

export async function readFreshCachedAnalysis(input: {
  storeUrl: string;
  goal: AnalyzeGoal;
  analysisProfile: AnalyzeProfile;
}): Promise<CacheLookupHit | null> {
  const db = await readDb();
  const cacheKey = toCacheKey(input.storeUrl, input.goal, input.analysisProfile);
  const analysisId = db.latestByCacheKey[cacheKey];

  if (!analysisId) {
    return null;
  }

  const entry = db.analysesById[analysisId];
  if (!entry) {
    return null;
  }

  if (!isFresh(entry.createdAt, Date.now())) {
    return null;
  }

  return {
    analysisId: entry.analysisId,
    createdAt: entry.createdAt,
    result: entry.result,
  };
}

export async function writeCachedAnalysis(input: {
  analysisId: string;
  storeUrl: string;
  goal: AnalyzeGoal;
  analysisProfile: AnalyzeProfile;
  result: CompletedAnalysisResult;
}): Promise<void> {
  const cacheKey = toCacheKey(input.storeUrl, input.goal, input.analysisProfile);
  const createdAt = new Date().toISOString();

  await enqueueWrite((db) => ({
    version: dbVersion,
    analysesById: {
      ...db.analysesById,
      [input.analysisId]: {
        analysisId: input.analysisId,
        cacheKey,
        storeUrl: input.storeUrl,
        goal: input.goal,
        analysisProfile: input.analysisProfile,
        createdAt,
        result: input.result,
      },
    },
    latestByCacheKey: {
      ...db.latestByCacheKey,
      [cacheKey]: input.analysisId,
    },
  }));
}
