// src/pages/Home.tsx
import Header from "../components/Header";

export default function Home() {
  return (
    <div>
      <main className="p-6">
        <h1 className="text-4xl font-bold mb-4">Welcome to Weaver</h1>
        <p className="text-gray-600 mb-6">
          Weaver for Know – extract, connect, and explore knowledge.
        </p>

        <div className="bg-gray-100 p-4 rounded shadow text-sm text-gray-700">
          <p className="font-semibold mb-1">Developed by:</p>
          <p className="mt-4">
            <strong>Marie-Liesse Vermeire</strong>
            <br />
            CIRAD - Persyst - UPR Recyclage et Risque
            <br />
            Concept Originator - Testing data, Sientific insights and iterative
            feedback
          </p>
          <p>
            <strong>Li Yinan</strong>
            <br />
            Oulu University of Applied Sciences, Finland
            <br />
            Lead Developer - System Architecture, Design, and Implementation
          </p>
        </div>
      </main>

      <footer className="mt-12 text-center text-gray-400 text-sm p-4 border-t">
        © 2025 Weaver. All rights reserved.
      </footer>
    </div>
  );
}
