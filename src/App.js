import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Voters from "./pages/Voters";
import Logistics from "./pages/Logistics";
import Training from "./pages/Training";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="ml-60 w-full p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/voters" element={<Voters />} />
            <Route path="/logistics" element={<Logistics />} />
            <Route path="/training" element={<Training />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
