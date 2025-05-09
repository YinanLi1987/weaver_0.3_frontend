// src/pages/Profile.tsx
import { useAuth } from "../auth/AuthProvider";
import { useEffect, useState } from "react";
import { formatCurrencyAuto } from "../utils/formatCurrency";

export default function Profile() {
  const { user } = useAuth();
  const [balance, setBalance] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("paid") === "1") {
      setShowSuccess(true);
    }
  }, []);

  useEffect(() => {
    const fetchBalance = async () => {
      const token = await user?.getIdToken();
      const res = await fetch("http://localhost:8000/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setBalance(data.balance);
    };

    if (user) fetchBalance();
  }, [user]);

  const handleRecharge = async () => {
    const token = await user?.getIdToken();
    const res = await fetch("http://localhost:8000/api/stripe/checkout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
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
    </div>
  );
}
