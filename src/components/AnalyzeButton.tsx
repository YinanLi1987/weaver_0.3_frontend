import React from "react";
import { analyzeFull } from "../api/analyze";

// Inline type definitions (no external import)
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

interface Props {
  prompts: PromptDefinition[];
  models: string[];
  csvFileName: string;
  selectedColumns: string[];
  onResults: (results: AnalyzeResultItem[]) => void;
}

const AnalyzeButton: React.FC<Props> = ({
  prompts,
  models,
  csvFileName,
  selectedColumns,
  onResults,
}) => {
  const handleClick = async () => {
    if (
      !csvFileName ||
      prompts.length === 0 ||
      models.length === 0 ||
      selectedColumns.length === 0
    ) {
      alert("Please complete all required sections.");
      return;
    }

    try {
      for (const [i, prompt] of prompts.entries()) {
        if (
          typeof prompt.name !== "string" ||
          typeof prompt.description !== "string" ||
          !Array.isArray(prompt.examples) ||
          !prompt.examples.every((ex) => typeof ex === "string")
        ) {
          console.error(`Prompt at index ${i} is malformed:`, prompt);
          alert(
            `Prompt #${
              i + 1
            } has an invalid structure. Check the console for details.`
          );
          return;
        }
      }

      // Log payload for debugging
      console.log("Payload being sent:", {
        prompts,
        models,
        csvFileName,
        selectedColumns,
      });
      const response = await analyzeFull({
        prompts,
        models,
        csvFileName,
        selectedColumns,
      });
      if (!response || !Array.isArray(response.results)) {
        alert("Invalid response format.");
        return;
      }
      onResults(response.results);
    } catch (e) {
      console.error("Analysis failed:", e);
      alert("Analysis failed.");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-neutral-800 text-white px-4 py-2 rounded-md text-sm hover:bg-neutral-900 transition"
    >
      Run Analysis
    </button>
  );
};

export default AnalyzeButton;
