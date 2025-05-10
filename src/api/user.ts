import { API_BASE_URL } from "./config";

export async function getUserBalance(token: string) {
  const res = await fetch(`${API_BASE_URL}/user/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
