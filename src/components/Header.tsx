import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import LoginModal from "./LoginModal";
import { Link } from "react-router-dom";

export default function Header() {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <header className="flex justify-between items-center p-4 shadow bg-white">
      {/* Logo and site name */}
      <div className="text-xl font-bold text-gray-800">
        Weaver <span className="text-sm text-gray-500">– for Knowledge</span>
      </div>

      {/* Navigation links */}
      <nav className="flex items-center gap-4">
        <a href="/" className="text-gray-700 hover:text-blue-600">
          Home
        </a>
        <a href="/dashboard" className="text-gray-700 hover:text-blue-600">
          Dashboard
        </a>

        {!user ? (
          <button
            className="text-sm text-gray-700 hover:text-black transition"
            onClick={() => setShowLogin(true)}
          >
            Sign In
          </button>
        ) : (
          <div className="flex items-center space-x-2">
            {user && (
              <Link
                to="/profile"
                className="text-sm text-gray-500 hover:text-black transition"
                title="View profile"
              >
                {user.email}
              </Link>
            )}
            <button
              className="text-sm text-gray-500 hover:text-black transition"
              onClick={() => signOut(auth)}
            >
              Sign Out
            </button>
          </div>
        )}
      </nav>

      {/* Login modal */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </header>
  );
}
