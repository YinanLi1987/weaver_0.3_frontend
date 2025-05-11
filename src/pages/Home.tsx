// src/pages/Home.tsx
import Header from "../components/Header";

export default function Home() {
  return (
    <div>
      <main className="p-6">
        <h1 className="text-4xl font-bold mb-4">Welcome to Weaver</h1>
        <p className="text-gray-600">
          Weaver for Know – extract, connect, and explore knowledge.
        </p>
      </main>

      <footer className="mt-12 text-center text-gray-400 text-sm p-4 border-t">
        © 2025 Weaver. All rights reserved.
      </footer>
    </div>
  );
}
