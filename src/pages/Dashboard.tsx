import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import Spinner from "../components/Spinner";
import { formatCurrencyAuto } from "../utils/formatCurrency";

export default function Dashboard() {
  const { user } = useAuth();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    const fetchBalance = async () => {
      if (!user) return;
      const token = await user.getIdToken();
      const res = await fetch("http://localhost:8000/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setBalance(data.balance);
      setLoading(false);
    };

    fetchBalance();
  }, [user]);

  const handleUseFeature = () => {
    if (balance === 0) {
      setAlert("Insufficient balance. Please recharge to use this feature.");
      return;
    }

    // TODO: Add actual feature logic here (e.g. call OpenAI API)
    console.log("Feature used.");
  };

  if (!user) {
    return (
      <div className="p-6 text-red-600 font-semibold">
        Please sign in to access the dashboard.
      </div>
    );
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="p-6 space-y-4">
      <p>
        <strong>Balance:</strong>{" "}
        {balance !== null ? formatCurrencyAuto(balance) : "N/A"}
      </p>

      {alert && (
        <div className="p-3 bg-yellow-100 text-yellow-800 rounded">{alert}</div>
      )}

      <div className="border p-4 bg-white rounded shadow space-y-2">
        <p className="text-gray-700">This is your main feature area.</p>
        <button
          onClick={handleUseFeature}
          className={`px-4 py-2 rounded text-white ${
            balance === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={balance === 0}
        >
          Run Feature
        </button>
      </div>
    </div>
  );
}
