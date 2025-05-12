import React, { useState } from "react";

import ArticleDetail from "./ArticleDetail";

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
}

const AnalysisTable: React.FC<Props> = ({ results, onUpdate }) => {
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
      <h2 className="text-lg font-semibold">Analize results</h2>
      <table className="w-full table-auto border-collapse text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border w-[10%]">ID</th>
            <th className="p-2 border w-[80%]">Title</th>
            <th className="p-2 border w-[10%]">Status</th>
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
                  <td className="p-2 border"></td>
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
