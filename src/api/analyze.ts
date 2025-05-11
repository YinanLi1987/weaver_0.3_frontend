import { API_BASE_URL } from "./config";
import { PromptDefinition, AnalyzeResultItem } from "./types";

export interface AnalyzeRequest {
  prompts: PromptDefinition[];
  models: string[];
  csvFileName: string;
  selectedColumns: string[];
}

export async function analyzeFull(
  data: AnalyzeRequest
): Promise<AnalyzeResponse> {
  const res = await fetch(`${API_BASE_URL}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to run analysis");
  }

  const json = await res.json();

  if (!json.results || !Array.isArray(json.results)) {
    throw new Error("Invalid analysis result format");
  }

  return json;
}
