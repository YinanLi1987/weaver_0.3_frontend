import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-lg font-semibold mb-4 text-center">
          {mode === "login" ? "Sign In" : "Register"}
        </h2>
        <input
          className="w-full border p-2 mb-2 text-sm rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full border p-2 mb-2 text-sm rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-xs text-red-500 mb-2">{error}</p>}
        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-black text-white rounded hover:bg-gray-800 text-sm transition"
        >
          {mode === "login" ? "Login" : "Create Account"}
        </button>

        <p className="text-xs text-center text-gray-500 mt-4">
          {mode === "login" ? (
            <>
              No account?{" "}
              <button className="underline" onClick={() => setMode("register")}>
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button className="underline" onClick={() => setMode("login")}>
                Sign In
              </button>
            </>
          )}
        </p>

        <button
          onClick={onClose}
          className="text-xs mt-4 text-gray-400 hover:text-black block mx-auto"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
