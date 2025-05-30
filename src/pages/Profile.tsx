// src/pages/Profile.tsx
import { useAuth } from "../auth/AuthProvider";
import { useEffect, useState } from "react";
import { formatCurrencyAuto } from "../utils/formatCurrency";
import { getUserBalance, getUserPayments } from "../api/user";
import { startStripeCheckout } from "../api/payment";

export default function Profile() {
  const { user } = useAuth();
  const [balance, setBalance] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [payments, setPayments] = useState<
    { amount: number; timestamp: string }[]
  >([]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("paid") === "1") {
      setShowSuccess(true);
    }
  }, []);

  useEffect(() => {
    const loadUserData = async () => {
      const token = await user?.getIdToken();
      if (!token) return;
      const [balanceData, paymentsData] = await Promise.all([
        getUserBalance(token),
        getUserPayments(token),
      ]);
      setBalance(balanceData.balance);
      setPayments(paymentsData);
    };

    if (user) loadUserData();
  }, [user]);

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
      <ul className="space-y-2">
        {payments.length === 0 && <li>No recharge records found.</li>}
        {payments.map((p, idx) => (
          <li key={idx} className="text-sm">
            💰 {formatCurrencyAuto(p.amount)} &nbsp; on{" "}
            {new Date(p.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
