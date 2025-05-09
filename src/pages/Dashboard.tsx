import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setShowWarning(true);
      // Show message for 2s, then redirect
      setTimeout(() => {
        setShowWarning(false);
        navigate("/", { replace: true });
      }, 2000);
    }
  }, [loading, user, navigate]);

  if (loading) return <Spinner />;

  return (
    <div className="relative p-6">
      {showWarning && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded shadow">
          You must be signed in to access the dashboard.
        </div>
      )}
      {user && <div>Welcome to your Dashboard, {user.email}</div>}
    </div>
  );
}
