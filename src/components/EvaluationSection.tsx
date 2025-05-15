// src/components/EvaluationSection.tsx
import React from "react";
import { matchField } from "../utils/matchField";
import SectionTooltip from "./SectionTooltip";

interface ExtractedFieldData {
  entities?: string[];
}

interface LLMResult {
  model: string;
  extracted?: Record<string, ExtractedFieldData>;
}

interface ArticleResult {
  id: string;
  finalEntities: Record<string, string[]>;
  llmResults: LLMResult[];
}

interface Props {
  results: ArticleResult[];
  promptNames: string[]; // e.g. ["Population", "Intervention"]
}

function evaluate(field: string, final: string[], predicted: string[]) {
  const gold = new Set(final.map((e) => e.toLowerCase()));
  const pred = new Set(predicted.map((e) => e.toLowerCase()));

  const tp = [...pred].filter((e) => gold.has(e));
  const fp = [...pred].filter((e) => !gold.has(e));
  const fn = [...gold].filter((e) => !pred.has(e));

  const precision = tp.length / (tp.length + fp.length || 1);
  const recall = tp.length / (tp.length + fn.length || 1);
  const f1 = (2 * precision * recall) / (precision + recall || 1);

  return {
    TP: tp.length,
    FP: fp.length,
    FN: fn.length,
    precision: precision.toFixed(2),
    recall: recall.toFixed(2),
    f1: f1.toFixed(2),
  };
}

const EvaluationSection: React.FC<Props> = ({ results, promptNames }) => {
  // Collect evaluation results
  const statsPerModel: Record<
    string,
    Record<string, ReturnType<typeof evaluate>>
  > = {};

  results.forEach((article) => {
    const final = article.finalEntities;

    article.llmResults.forEach((res) => {
      const model = res.model;
      if (!statsPerModel[model]) statsPerModel[model] = {};

      promptNames.forEach((field) => {
        const matchedBaseField = matchField(field, final) ?? "";
        const matchedPredField = matchField(field, res.extracted || {}) ?? "";

        const base = matchedBaseField ? final[matchedBaseField] ?? [] : [];
        const predicted = matchedPredField
          ? res.extracted?.[matchedPredField]?.entities ?? []
          : [];

        const existing = statsPerModel[model][field];
        const evaluation = evaluate(field, base, predicted);

        if (existing) {
          // accumulate
          ["TP", "FP", "FN"].forEach((k) => {
            (existing as any)[k] += (evaluation as any)[k];
          });
        } else {
          statsPerModel[model][field] = {
            ...evaluation,
            TP: evaluation.TP,
            FP: evaluation.FP,
            FN: evaluation.FN,
          };
        }
      });
    });
  });

  return (
    <div className="mt-10 space-y-8">
      <h2 className="text-xl font-semibold">
        LLM Evaluation Summary
        <SectionTooltip description="See how each LLM performed by comparing its output with the confirmed final entities. Metrics include precision, recall, and F1 score." />
      </h2>
      {Object.entries(statsPerModel).map(([model, fields]) => (
        <div key={model} className="border p-4 rounded-md shadow-sm bg-white">
          <h3 className="font-bold text-lg mb-3 text-blue-700">{model}</h3>
          <table className="w-full text-sm border">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2 border">Field</th>
                <th className="p-2 border">TP</th>
                <th className="p-2 border">FP</th>
                <th className="p-2 border">FN</th>
                <th className="p-2 border">Precision</th>
                <th className="p-2 border">Recall</th>
                <th className="p-2 border">F1</th>
              </tr>
            </thead>
            <tbody>
              {promptNames.map((field) => {
                const evalResult = fields[field];
                if (!evalResult) return null;
                return (
                  <tr key={field} className="border-t">
                    <td className="p-2 border font-medium">{field}</td>
                    <td className="p-2 border">{evalResult.TP}</td>
                    <td className="p-2 border">{evalResult.FP}</td>
                    <td className="p-2 border">{evalResult.FN}</td>
                    <td className="p-2 border">{evalResult.precision}</td>
                    <td className="p-2 border">{evalResult.recall}</td>
                    <td className="p-2 border">{evalResult.f1}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default EvaluationSection;
