import { API_BASE_URL } from "./config";

export interface ProgressResponse {
  progress: { [model: string]: number };
  total: number;
}
export async function fetchProgress(): Promise<ProgressResponse> {
  const res = await fetch(`${API_BASE_URL}/progress`);

  if (!res.ok) {
    throw new Error("Failed to fetch progress");
  }

  return res.json();
}
