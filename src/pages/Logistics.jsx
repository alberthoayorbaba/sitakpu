import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";

export default function Logistics() {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ name: "", qty: "", dest: "", status: "" });

  // Ambil data saat halaman dibuka
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: logistics, error } = await supabase
      .from("logistics")
      .select("*")
      .order("id", { ascending: true });

    if (!error) setData(logistics);
  };

  const openAdd = () => {
    setEditItem(null);
    setForm({ name: "", qty: "", dest: "", status: "" });
    setIsOpen(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    setForm(item);
    setIsOpen(true);
  };

  const saveData = async () => {
    if (editItem) {
      await supabase
        .from("logistics")
        .update(form)
        .eq("id", editItem.id);
    } else {
      await supabase.from("logistics").insert([form]);
    }
    setIsOpen(false);
    fetchData();
  };

  const deleteData = async (id) => {
    await supabase.from("logistics").delete().eq("id", id);
    fetchData();
  };

  return (
    <div className="min-h-screen bg-[#eef3fb] p-8 font-sans">
      <div className="bg-white rounded-2xl shadow-lg border-t-4 border-[#1b3b6f] p-8 max-w-5xl mx-auto">
        
        <h2 className="text-2xl font-bold text-[#1b3b6f] mb-6 text-center">
          Status Distribusi Logistik Pemilu
        </h2>

        <button
          onClick={openAdd}
          className="mb-4 bg-[#1b3b6f] hover:bg-[#162f57] text-white px-4 py-2 rounded-lg"
        >
          + Tambah Logistik
        </button>

        <table className="w-full text-sm border-collapse rounded-lg shadow overflow-hidden">
          <thead className="bg-[#1b3b6f] text-white">
            <tr>
              <th className="p-3">No</th>
              <th className="p-3 text-left">Nama Barang</th>
              <th className="p-3 text-center">Jumlah</th>
              <th className="p-3 text-left">Tujuan</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, i) => (
              <tr key={item.id} className="border-b hover:bg-[#f3f6ff] transition">
                <td className="p-3 text-center">{i + 1}</td>
                <td className="p-3">{item.name}</td>
                <td className="p-3 text-center">{item.qty}</td>
                <td className="p-3">{item.dest}</td>
                <td className="p-3 text-center">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    item.status === "Terkirim"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {item.status}
                  </span>
                </td>
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
                {editItem ? "Edit Logistik" : "Tambah Logistik"}
              </h3>

              <input
                className="w-full border p-2 rounded mb-3"
                placeholder="Nama Barang"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                className="w-full border p-2 rounded mb-3"
                placeholder="Jumlah Barang"
                type="number"
                value={form.qty}
                onChange={(e) => setForm({ ...form, qty: e.target.value })}
              />

              <input
                className="w-full border p-2 rounded mb-3"
                placeholder="Tujuan Distribusi"
                value={form.dest}
                onChange={(e) => setForm({ ...form, dest: e.target.value })}
              />

              <select
                className="w-full border p-2 rounded mb-4"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="">-- Pilih Status --</option>
                <option value="Terkirim">Terkirim</option>
                <option value="Proses Distribusi">Proses Distribusi</option>
              </select>

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
