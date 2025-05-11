import { API_BASE_URL } from "./config";

export interface UploadCSVResponse {
  filename: string;
  columns: string[];
}

export async function uploadCSV(file: File): Promise<UploadCSVResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE_URL}/upload_csv`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to upload CSV");
  }

  const data = await res.json();

  if (!data.filename || !Array.isArray(data.columns)) {
    throw new Error("Invalid response format");
  }

  return data;
}
