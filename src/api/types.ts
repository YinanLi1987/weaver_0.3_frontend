// --- Prompt configuration provided by the user ---
export interface PromptDefinition {
  name: string; // Name of the entity type
  description: string; // Description of what should be extracted
  examples: string[]; // Valid entity examples
}

// --- Single entity + supporting evidence extracted by a model ---
export interface EntityEvidence {
  entities: string[]; // Extracted values
  evidence: string[]; // Matching text spans from source
}

// --- LLM output for one row (one model's result) ---
export interface LLMResult {
  model: string; // e.g., "gpt-4"
  extracted: Record<string, EntityEvidence>; // Field → data
}

// --- Full analysis result for a single row ---
export interface AnalyzeResultItem {
  id: string; // Row ID (__id__)
  columns: Record<string, string>; // Original CSV content
  llmResults: LLMResult[]; // One per model
  finalEntities: Record<string, string[]>; // Final user-selected output
}

// --- UI-only extensions for interactive display ---
export interface ArticleResult extends AnalyzeResultItem {
  _expanded?: boolean; // UI expansion toggle
  _selectedLLM?: string; // Currently viewed model
}

// --- Optional helper: for displaying extracted field details ---
export interface ExtractedFieldData {
  entities: string[];
  evidence: string[];
}

// --- Optional: for LLM dropdowns or configs ---
export interface ModelOption {
  id: string; // Model ID
  name: string; // Display name
}

// --- Optional: for showing evaluation metrics ---
export interface PerformanceStats {
  model: string;
  precision: number;
  recall: number;
  f1: number;
}
