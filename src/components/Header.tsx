// src/components/Header.tsx
import { useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="flex justify-between items-center p-4 shadow bg-white">
      {/* 左侧 Logo + 名称 */}
      <div className="text-xl font-bold text-gray-800">
        Weaver <span className="text-sm text-gray-500">– for Know</span>
      </div>

      {/* 右侧导航 */}
      <nav className="flex gap-4 items-center">
        <a href="/" className="text-gray-700 hover:text-blue-600">
          Home
        </a>
        <a href="/about" className="text-gray-700 hover:text-blue-600">
          About
        </a>
        <a href="/dashboard" className="text-gray-700 hover:text-blue-600">
          Dashboard
        </a>

        {!isLoggedIn ? (
          <>
            <button className="px-4 py-1 border rounded text-blue-600 hover:bg-blue-100">
              Sign In
            </button>
            <button className="px-4 py-1 border rounded bg-blue-600 text-white hover:bg-blue-700">
              Register
            </button>
          </>
        ) : (
          <span className="text-sm text-gray-500">Welcome!</span>
        )}
      </nav>
    </header>
  );
}
