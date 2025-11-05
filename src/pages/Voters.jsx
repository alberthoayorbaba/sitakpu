import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";

export default function Voters() {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ name: "", nik: "", district: "" });
  const [error, setError] = useState("");

  // ✅ Fetch Data Dari Database Saat Halaman Dibuka
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: voters, error } = await supabase
      .from("voters")
      .select("*")
      .order("id", { ascending: true });

    if (!error) setData(voters);
  };

  const openAdd = () => {
    setEditItem(null);
    setForm({ name: "", nik: "", district: "" });
    setError("");
    setIsOpen(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    setForm(item);
    setError("");
    setIsOpen(true);
  };

  // ✅ Tambah / Edit Data
  const saveData = async () => {
    if (form.nik.length !== 16) {
      setError("NIK harus 16 digit!");
      return;
    }

    if (editItem) {
      await supabase
        .from("voters")
        .update({
          name: form.name,
          nik: form.nik,
          district: form.district
        })
        .eq("id", editItem.id);
    } else {
      await supabase
        .from("voters")
        .insert([
          { name: form.name, nik: form.nik, district: form.district }
        ]);
    }

    setIsOpen(false);
    fetchData();
  };

  // ✅ Hapus Data
  const deleteData = async (id) => {
    await supabase.from("voters").delete().eq("id", id);
    fetchData();
  };

  return (
    <div className="min-h-screen bg-[#eef3fb] p-8 font-sans">
      <div className="bg-white rounded-2xl shadow-lg border-t-4 border-[#1b3b6f] p-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-[#1b3b6f] mb-6 text-center">
          Data Pemilih Terdaftar (DPT)
        </h2>

        <button
          onClick={openAdd}
          className="mb-4 bg-[#1b3b6f] hover:bg-[#162f57] text-white px-4 py-2 rounded-lg"
        >
          + Tambah Pemilih
        </button>

        <table className="w-full text-sm border-collapse overflow-hidden rounded-lg shadow">
          <thead className="bg-[#1b3b6f] text-white">
            <tr>
              <th className="p-3">No</th>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">NIK</th>
              <th className="p-3 text-left">Distrik</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, i) => (
              <tr key={item.id} className="border-b hover:bg-[#f3f6ff] transition">
                <td className="p-3 text-center">{i + 1}</td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.nik}</td>
                <td className="p-3">{item.district}</td>
                <td className="p-3 text-center space-x-2">
                  <button onClick={() => openEdit(item)} className="text-blue-600 hover:underline">
                    Edit
                  </button>
                  <button onClick={() => deleteData(item.id)} className="text-red-600 hover:underline">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white w-96 p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold text-[#1b3b6f] mb-4">
                {editItem ? "Edit Data Pemilih" : "Tambah Data Pemilih"}
              </h3>

              <input
                className="w-full border p-2 rounded mb-3"
                placeholder="Nama Pemilih"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                className="w-full border p-2 rounded mb-3"
                placeholder="NIK (16 digit)"
                maxLength="16"
                value={form.nik}
                onChange={(e) => setForm({ ...form, nik: e.target.value })}
              />

              {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

              <input
                className="w-full border p-2 rounded mb-4"
                placeholder="Distrik"
                value={form.district}
                onChange={(e) => setForm({ ...form, district: e.target.value })}
              />

              <div className="flex justify-end space-x-2">
                <button onClick={() => setIsOpen(false)} className="px-3 py-1 border rounded">
                  Batal
                </button>
                <button onClick={saveData} className="px-3 py-1 bg-[#1b3b6f] text-white rounded">
                  Simpan
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
