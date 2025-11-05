import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";

export default function Training() {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({
    title: "",
    participants: "",
    date: "",
    location: "",
    status: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: trainings, error } = await supabase
      .from("trainings")
      .select("*")
      .order("id", { ascending: true });
    if (!error) setData(trainings);
  };

  const openAdd = () => {
    setEditItem(null);
    setForm({
      title: "",
      participants: "",
      date: "",
      location: "",
      status: "",
    });
    setIsOpen(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    setForm(item);
    setIsOpen(true);
  };

  const saveData = async () => {
    if (editItem) {
      await supabase.from("trainings").update(form).eq("id", editItem.id);
    } else {
      await supabase.from("trainings").insert([form]);
    }
    setIsOpen(false);
    fetchData();
  };

  const deleteData = async (id) => {
    await supabase.from("trainings").delete().eq("id", id);
    fetchData();
  };

  return (
    <div className="min-h-screen bg-[#eef3fb] p-8">
      <div className="bg-white rounded-2xl shadow-lg border-t-4 border-[#1b3b6f] p-8 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-[#1b3b6f] mb-6 text-center">
          Modul Pelatihan Petugas Pemilu
        </h2>

        <button
          onClick={openAdd}
          className="mb-4 bg-[#1b3b6f] hover:bg-[#162f57] text-white px-4 py-2 rounded-lg"
        >
          + Tambah Pelatihan
        </button>

        <table className="w-full text-sm border-collapse shadow rounded-lg overflow-hidden">
          <thead className="bg-[#1b3b6f] text-white">
            <tr>
              <th className="p-3">No</th>
              <th className="p-3 text-left">Judul Pelatihan</th>
              <th className="p-3 text-center">Tanggal</th>
              <th className="p-3 text-center">Lokasi</th>
              <th className="p-3 text-center">Jumlah Peserta</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, i) => (
              <tr
                key={item.id}
                className="border-b hover:bg-[#f3f6ff] transition"
              >
                <td className="p-3 text-center">{i + 1}</td>
                <td className="p-3">{item.title}</td>
                <td className="p-3 text-center">{item.date}</td>
                <td className="p-3 text-center">{item.location}</td>
                <td className="p-3 text-center">{item.participants}</td>
                <td
                  className={`p-3 text-center font-medium ${
                    item.status === "Selesai"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {item.status}
                </td>
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => openEdit(item)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteData(item.id)}
                    className="text-red-600 hover:underline"
                  >
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
                {editItem ? "Edit Pelatihan" : "Tambah Pelatihan"}
              </h3>

              <input
                className="w-full border p-2 rounded mb-3"
                placeholder="Judul Pelatihan"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />

              <input
                type="date"
                className="w-full border p-2 rounded mb-3"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />

              <input
                className="w-full border p-2 rounded mb-3"
                placeholder="Lokasi / Tempat"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />

              <input
                className="w-full border p-2 rounded mb-3"
                type="number"
                placeholder="Jumlah Peserta"
                value={form.participants}
                onChange={(e) =>
                  setForm({ ...form, participants: e.target.value })
                }
              />

              <select
                className="w-full border p-2 rounded mb-4"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="">Pilih Status</option>
                <option value="Selesai">Selesai</option>
                <option value="Belum Dilaksanakan">Belum Dilaksanakan</option>
              </select>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-1 border rounded"
                >
                  Batal
                </button>
                <button
                  onClick={saveData}
                  className="px-3 py-1 bg-[#1b3b6f] text-white rounded"
                >
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
