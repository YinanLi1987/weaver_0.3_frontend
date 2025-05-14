import { API_BASE_URL } from "./config";

interface PromptDefinition {
  name: string;
  description: string;
  examples: string[];
}

interface EntityEvidence {
  entities: string[];
  evidence: string[];
}

interface LLMResult {
  model: string;
  extracted: Record<string, EntityEvidence>;
}

interface AnalyzeResultItem {
  id: string;
  columns: Record<string, string>;
  llmResults: LLMResult[];
  finalEntities: Record<string, string[]>;
}

export interface AnalyzeRequest {
  prompts: PromptDefinition[];
  models: string[];
  csvFileName: string;
  selectedColumns: string[];
}

export async function analyzeFull(params: {
  prompts: Prompt[];
  models: string[];
  csvFileName: string;
  selectedColumns: string[];
}): Promise<{ taskId: string }> {
  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error("Failed to run analysis");
  }

  return await response.json();
}
export async function fetchProgress(
  taskId: string
): Promise<Record<string, number>> {
  const res = await fetch(`${API_BASE_URL}/progress/${taskId}`);
  if (!res.ok) throw new Error("Failed to fetch progress");
  const data = await res.json();
  const parsed: Record<string, number> = {};
  for (const key in data) {
    parsed[key] = Number(data[key]);
  }
  return parsed;
}
export async function fetchResults(
  taskId: string
): Promise<{ results: ArticleResult[] }> {
  const res = await fetch(`${API_BASE_URL}/results/${taskId}`);
  if (!res.ok) throw new Error("Failed to fetch analysis results");
  return await res.json();
}
