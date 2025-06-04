import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import Header from "./components/Header";
import Home from "./pages/Home";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import * as Tooltip from "@radix-ui/react-tooltip";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Tooltip.Provider>
          <Header /> {/* ✅ Global header always visible */}
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Tooltip.Provider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
