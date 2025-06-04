// src/utils/mergeEntities.ts
import { matchField } from "./matchField"; // 假如 matchField 也在 utils 里

import type { LLMResult } from "../types"; // 按实际情况引用类型

function mergeEntitiesFromAllLLMs(
  llmResults: LLMResult[],
  promptNames: string[]
): Record<string, string[]> {
  const merged: Record<string, Set<string>> = {};

  promptNames.forEach((field) => {
    merged[field] = new Set();
  });

  llmResults.forEach((res) => {
    promptNames.forEach((field) => {
      const matched = matchField(field, res.extracted || {});
      const entities = matched ? res.extracted?.[matched]?.entities ?? [] : [];
      entities.forEach((e) => {
        if (e.trim()) merged[field].add(e.trim());
      });
    });
  });

  const final: Record<string, string[]> = {};
  for (const field of promptNames) {
    final[field] = Array.from(merged[field]);
  }
  return final;
}

export default mergeEntitiesFromAllLLMs;
