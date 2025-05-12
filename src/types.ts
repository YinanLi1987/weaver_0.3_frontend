export interface EntityWithEvidence {
  entities: string[];
  evidence: string[];
}
export interface ExtractedFieldData {
  entities?: string[];
  evidence?: string[];
}
export interface LLMResult {
  model: string;
  extracted?: {
    [field: string]: ExtractedFieldData;
  };
}
export interface ArticleResult {
  id: string;
  columns: Record<string, string>;
  llmResults: LLMResult[];
  finalEntities: Record<string, string[]>; // if still used
}
