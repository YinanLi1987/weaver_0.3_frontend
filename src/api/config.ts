// src/config.ts
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ??
  "http://localhost:8000/api";
