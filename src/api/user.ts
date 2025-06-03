import { API_BASE_URL } from "./config";

export async function getUserBalance(token: string) {
  const res = await fetch(`${API_BASE_URL}/user/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch user balance");
  return res.json();
}

export async function getUserPayments(token: string) {
  const res = await fetch(`${API_BASE_URL}/user/payments`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch payment history");
  return res.json();
}
export async function getUserUsage(token: string) {
  const res = await fetch(`${API_BASE_URL}/user/usage`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to load usage");
  return res.json();
}
