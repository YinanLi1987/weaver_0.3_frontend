import React, { useState } from "react";

import ArticleDetail from "./ArticleDetail";
import ConflictTooltip from "./ConflictTooltip";
import SectionTooltip from "./SectionTooltip";
import { matchField } from "../utils/matchField";

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
  results: ArticleResult[];
  onUpdate: (newResults: ArticleResult[]) => void;
  promptNames: string[];
}
function normalize(entities: string[]) {
  return [...new Set(entities.map((e) => e.trim().toLowerCase()))].sort();
}

function areEntityListsEqual(listA: string[], listB: string[]) {
  const a = normalize(listA);
  const b = normalize(listB);
  return a.length === b.length && a.every((v, i) => v === b[i]);
}
const AnalysisTable: React.FC<Props> = ({ results, onUpdate, promptNames }) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [selectedLLMs, setSelectedLLMs] = useState<Record<string, string>>({});
  const allModels: string[] = Array.from(
    new Set(results.flatMap((r) => r.llmResults.map((res) => res.model)))
  );
  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleLLMSwitch = (articleId: string, model: string) => {
    setSelectedLLMs((prev) => ({
      ...prev,
      [articleId]: model,
    }));
  };

  return (
    <section className="bg-white p-6 rounded-md shadow-md">
      {" "}
      <h2 className="text-lg font-semibold">
        Analize results
        <SectionTooltip description="View and compare entities extracted by each model. Click on a row to see details and edit final entities if needed." />
      </h2>
      <table className="w-full table-auto border-collapse text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border w-[10%]">ID</th>
            <th className="p-2 border w-[80%]">Title</th>
            {promptNames.map((name) => (
              <th key={name} className="p-2 border w-[10%] text-center">
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.map((article) => {
            return (
              <React.Fragment key={article.id}>
                <tr
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleRow(article.id)}
                >
                  <td className="p-2 border">{article.id}</td>
                  <td className="p-2 border">
                    {Object.values(article.columns)[0] || "(no title)"}
                  </td>
                  {promptNames.map((field) => {
                    const baseField = matchField(
                      field,
                      article.llmResults[0]?.extracted || {}
                    );
                    const baseEntities = baseField
                      ? article.llmResults[0]?.extracted?.[baseField]
                          ?.entities ?? []
                      : [];

                    const allSame = article.llmResults.every((r) => {
                      const matched = matchField(field, r.extracted || {});
                      const entities = matched
                        ? r.extracted?.[matched]?.entities ?? []
                        : [];
                      return areEntityListsEqual(entities, baseEntities);
                    });

                    return (
                      <td key={field} className="p-2 border text-center">
                        {allSame && baseEntities.length > 0 ? (
                          <span className="text-green-700 bg-green-100 px-2 py-1 rounded-full text-sm font-medium">
                            {baseEntities.join(", ")}
                          </span>
                        ) : (
                          <ConflictTooltip
                            field={field}
                            llmResults={article.llmResults}
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>

                {expandedRows[article.id] && (
                  <tr>
                    <td colSpan={3} className="p-4 bg-gray-50 border-t-0">
                      <ArticleDetail
                        article={article}
                        selectedLLM={selectedLLMs[article.id] || allModels[0]}
                        onLLMSwitch={(model) =>
                          handleLLMSwitch(article.id, model)
                        }
                        onUpdate={(updated) => {
                          const merged = results.map((r) =>
                            r.id === updated.id ? updated : r
                          );
                          onUpdate(merged);
                        }}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default AnalysisTable;
