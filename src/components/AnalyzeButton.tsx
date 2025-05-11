import React from "react";
import { analyzeFull } from "../api/analyze";
import { PromptDefinition, AnalyzeResultItem } from "../api/types";

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
