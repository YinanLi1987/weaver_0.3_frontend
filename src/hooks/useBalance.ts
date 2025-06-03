import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../auth/AuthProvider";
import { API_BASE_URL } from "../api/config";

export function useBalance() {
  const { user } = useAuth();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = useCallback(async () => {
    if (!user) return;
    try {
      const token = await user.getIdToken();
      const res = await fetch(`${API_BASE_URL}/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch balance");
      }
      const data = await res.json();
      setBalance(data.balance);
      setError(null);
    } catch (err: any) {
      console.error("❌ Failed to load balance:", err);
      setError("Failed to fetch balance");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return { balance, loading, error, refreshBalance: fetchBalance };
}
