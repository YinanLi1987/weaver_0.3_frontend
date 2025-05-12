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

export async function analyzeFull(
  data: AnalyzeRequest
): Promise<{ results: AnalyzeResultItem[] }> {
  const res = await fetch(`${API_BASE_URL}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to run analysis");
  }

  const json = await res.json();

  if (!Array.isArray(json.results)) {
    throw new Error("Invalid response format");
  }

  return json;
}
