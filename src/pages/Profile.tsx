// src/pages/Profile.tsx
import { useAuth } from "../auth/AuthProvider";
import { useEffect, useState } from "react";

export default function Profile() {
  const { user } = useAuth();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      const token = await user?.getIdToken();
      const res = await fetch("https://your-backend.com/api/user/me", {
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
    const res = await fetch("https://your-backend.com/api/stripe/checkout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    window.location.href = data.checkout_url;
  };

  if (!user) return <div className="p-6">Not logged in.</div>;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">User Info</h2>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Balance:</strong>{" "}
        {balance !== null ? `$${balance.toFixed(2)}` : "Loading..."}
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
