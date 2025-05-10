import { API_BASE_URL } from "./config";

export async function startStripeCheckout(token: string) {
  const res = await fetch(`${API_BASE_URL}/stripe/checkout`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
