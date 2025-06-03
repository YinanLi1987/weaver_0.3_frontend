// src/pages/Profile.tsx
import { useAuth } from "../auth/AuthProvider";
import { useEffect, useState } from "react";
import { formatCurrencyAuto } from "../utils/formatCurrency";
import { getUserBalance, getUserPayments, getUserUsage } from "../api/user";
import { startStripeCheckout } from "../api/payment";

export default function Profile() {
  const { user, loading } = useAuth();
  const [balance, setBalance] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [payments, setPayments] = useState<
    { amount: number; timestamp: string }[]
  >([]);
  const [usage, setUsage] = useState<
    {
      model: string;
      tokens_input: number;
      tokens_output: number;
      billed_amount: number;
      timestamp: string;
      prompt_summary?: string;
    }[]
  >([]);

  const [loadingData, setLoadingData] = useState(true);

  // Detect if user was redirected after payment
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("paid") === "1") {
      setShowSuccess(true);
      // Optional: clean up URL
      const url = new URL(window.location.href);
      url.searchParams.delete("paid");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  // Load balance and payment history
  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      setLoadingData(true);
      try {
        const token = await user.getIdToken();
        const [balanceData, paymentsData, usageData] = await Promise.all([
          getUserBalance(token),
          getUserPayments(token),
          getUserUsage(token),
        ]);
        setBalance(balanceData.balance);
        setPayments(paymentsData);
        setUsage(usageData);
      } catch (err) {
        console.error("Failed to load user data", err);
      } finally {
        setLoadingData(false);
      }
    };
    loadData();
  }, [user, showSuccess]);

  const handleRecharge = async () => {
    const token = await user?.getIdToken();
    if (!token) return;

    const data = await startStripeCheckout(token);
    if (!data.checkout_url) {
      alert("Payment failed to start. Please try again.");
      console.error("Stripe checkout failed:", data);
      return;
    }
    window.location.href = data.checkout_url;
  };
  if (loading) return <div>Loading...</div>;
  if (!user) return <div className="p-6">Not logged in.</div>;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">User Info</h2>

      {showSuccess && (
        <div className="p-3 bg-green-100 text-green-700 rounded">
          Payment successful! Your balance has been updated.
        </div>
      )}

      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Balance:</strong>{" "}
        {balance !== null ? formatCurrencyAuto(balance) : "N/A"}
      </p>
      <button
        onClick={handleRecharge}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Recharge
      </button>
      <h2 className="text-lg font-semibold mt-6">Recharge History</h2>
      {loadingData ? (
        <p>Loading payments...</p>
      ) : payments.length === 0 ? (
        <p>No recharge records found.</p>
      ) : (
        <ul className="space-y-2">
          {payments.map((p, idx) => (
            <li key={idx} className="text-sm">
              💰 {formatCurrencyAuto(p.amount)} &nbsp; on{" "}
              {new Date(p.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
      <h2 className="text-lg font-semibold mt-6">Usage Records</h2>
      {loadingData ? (
        <p>Loading usage...</p>
      ) : usage.length === 0 ? (
        <p>No usage records found.</p>
      ) : (
        <ul className="space-y-2">
          {usage.map((u, idx) => (
            <li
              key={idx}
              className="text-sm border border-gray-200 p-3 rounded bg-gray-50"
            >
              <div>
                🧠 <strong>{u.model}</strong> used{" "}
                <strong>{u.tokens_input + u.tokens_output}</strong> tokens →{" "}
                <span className="text-blue-700 font-medium">
                  {formatCurrencyAuto(u.billed_amount)}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                {new Date(u.timestamp).toLocaleString()}
              </div>
              {u.prompt_summary && (
                <div className="text-xs italic text-gray-600 mt-1">
                  “{u.prompt_summary.slice(0, 100)}...”
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
