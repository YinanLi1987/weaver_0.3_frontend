import { ArticleResult } from "../types";

export function groupResults(raw: any[]): ArticleResult[] {
  return raw.map((item) => ({
    id: item.id || "unknown",
    columns: item.columns || {},
    llmResults: item.llmResults || [], // ✅ 保留 LLM 提取结构
    finalEntities: item.finalEntities || {}, // ✅ 保留人工确认数据
  }));
}
