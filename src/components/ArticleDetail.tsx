import React, { useEffect, useState } from "react";
import FinalEntityEditor from "./FinalEntityEditor";
import { highlightEvidence } from "../utils/highlight";

// Inline type definitions
interface EntityWithEvidence {
  entities: string[];
  evidence: string[];
}

interface ExtractedFieldData {
  entities?: string[];
  evidence?: string[];
}

interface LLMResult {
  model: string;
  extracted?: {
    [field: string]: ExtractedFieldData;
  };
}

interface ArticleResult {
  id: string;
  columns: Record<string, string>;
  llmResults: LLMResult[];
  finalEntities: Record<string, string[]>;
}

interface Props {
  article: ArticleResult;
  selectedLLM: string;
  onLLMSwitch: (model: string) => void;
  onUpdate: (updated: ArticleResult) => void;
}

const ArticleDetail: React.FC<Props> = ({
  article,
  selectedLLM,
  onLLMSwitch,
  onUpdate,
}) => {
  const current = article.llmResults.find((r) => r.model === selectedLLM) as
    | LLMResult
    | undefined;
  const allModels = article.llmResults.map((r) => r.model);
  const [initialized, setInitialized] = useState(false);
  const evidenceSpans = Object.values(current?.extracted ?? {}).flatMap(
    (entry: ExtractedFieldData) => entry.evidence ?? []
  );
  const fieldColors = [
    "bg-blue-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-purple-100",
    "bg-pink-100",
    "bg-orange-100",
  ];

  // 🧠 合并所有模型提取结果的实体并集（只初始化一次）
  useEffect(() => {
    if (!initialized && Object.keys(article.finalEntities || {}).length === 0) {
      const merged = collectAllEntities(article.llmResults);
      onUpdate({ ...article, finalEntities: merged });
      setInitialized(true);
    }
  }, [initialized, article, onUpdate]);

  const collectAllEntities = (
    llmResults: LLMResult[]
  ): Record<string, string[]> => {
    const merged: Record<string, Set<string>> = {};

    llmResults.forEach((res) => {
      if (!res.extracted) return;
      Object.entries(res.extracted).forEach(([field, data]) => {
        if (!merged[field]) merged[field] = new Set();
        (data.entities ?? []).forEach((e) => merged[field].add(e));
      });
    });

    return Object.fromEntries(
      Object.entries(merged).map(([k, v]) => [k, Array.from(v)])
    );
  };
  /*console.log("🧪 Article", article);
  console.log("🧠 Current LLM", current);
  console.log("🔍 Extracted", current?.extracted);
  console.log("selectedLLM:", selectedLLM);
  console.log("allModels:", allModels);*/

  return (
    <div className="space-y-6">
      {/* Column Texts with evidence highlight */}
      <div>
        <h3 className="font-semibold mb-2">Original Text</h3>
        {Object.entries(article.columns).map(([field, value], i) => {
          if (typeof value !== "string" || !value.trim()) return null;

          return (
            <div key={field} className="mb-4">
              <div
                className={`inline-block px-2 py-0.5 text-sm rounded font-medium text-gray-800 ${
                  fieldColors[i % fieldColors.length]
                }`}
              >
                {field}
              </div>
              <div className="mt-1 text-gray-800 whitespace-pre-wrap prose max-w-none">
                {highlightEvidence(value, evidenceSpans)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Entities extracted by each model */}
      <div>
        <h3 className="font-semibold mb-2">LLM Results</h3>
        <div className="flex gap-2 mb-2">
          {allModels.map((model) => (
            <button
              key={model}
              onClick={() => onLLMSwitch(model)}
              className={`px-3 py-1 rounded border ${
                selectedLLM === model
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {model}
            </button>
          ))}
        </div>

        {current?.extracted ? (
          <div>
            {Object.entries(current.extracted).map(([field, data]) => (
              <div key={field} className="mb-2">
                <p className="font-semibold">{field}:</p>
                <p>
                  <span className="text-gray-700">Entities:</span>{" "}
                  {data.entities?.join(", ") ?? "—"}
                </p>
                <p className="text-sm text-gray-500">
                  <span>Evidence:</span>{" "}
                  {data.evidence.length ? data.evidence.join(" | ") : "—"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-red-500">⚠️ No LLM extraction result.</p>
        )}
      </div>

      {/* Final Editor */}
      <div>
        <h3 className="font-semibold mb-2">Final Entity Selection</h3>
        <FinalEntityEditor
          entities={article.finalEntities || {}}
          onUpdate={(updated) => {
            const updatedArticle = {
              ...article,
              finalEntities: updated,
            };
            onUpdate(updatedArticle);
          }}
        />
      </div>
    </div>
  );
};

export default ArticleDetail;
