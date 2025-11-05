import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-60 bg-[#1b3b6f] text-white min-h-screen p-5 space-y-6 fixed">
      <h1 className="text-xl font-bold text-center">SITAKPU</h1>

      <nav className="space-y-3 text-sm">
        <Link to="/" className="block hover:bg-white/20 rounded px-3 py-2">Dashboard</Link>
        <Link to="/voters" className="block hover:bg-white/20 rounded px-3 py-2">Data Pemilih</Link>
        <Link to="/logistics" className="block hover:bg-white/20 rounded px-3 py-2">Logistik</Link>
        <Link to="/training" className="block hover:bg-white/20 rounded px-3 py-2">Pelatihan</Link>
      </nav>
    </div>
  );
}
