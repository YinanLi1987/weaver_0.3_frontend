import { matchField } from "./matchField";

interface ArticleResult {
  id: string;
  columns: Record<string, string>;
  finalEntities: Record<string, string[]>;
}

export function exportFinalEntitiesToCSV(
  results: ArticleResult[],
  promptFields: string[]
) {
  if (results.length === 0) return;

  const originalHeaders = Object.keys(results[0].columns);
  const headers = ["__id__", ...originalHeaders, ...promptFields];

  const rows = results.map((row) => {
    const rowData: Record<string, string> = {
      __id__: row.id,
      ...row.columns,
    };

    promptFields.forEach((field) => {
      const matchedField = matchField(field, row.finalEntities || {});

      rowData[field] = matchedField
        ? (row.finalEntities[matchedField] ?? []).join(", ")
        : "";
    });

    return rowData;
  });

  const csvContent =
    headers.join(",") +
    "\n" +
    rows
      .map((row) =>
        headers.map((h) => `"${(row[h] ?? "").replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "enhanced_final_entities.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
