export default function Dashboard() {
  return (
    <div className="text-center space-y-6">
      <h2 className="text-2xl font-bold text-[#1b3b6f]">Laporan Aktivitas Sistem</h2>

      <div className="grid grid-cols-3 gap-5 max-w-4xl mx-auto">
        {[
          { title: "Total Pemilih", value: 250 },
          { title: "Pelatihan Aktif", value: 12 },
          { title: "Logistik Terkirim", value: 32 }
        ].map((item, i) => (
          <div key={i} className="p-6 bg-white shadow rounded-xl border-t-4 border-[#1b3b6f]">
            <h3 className="text-[#1b3b6f]">{item.title}</h3>
            <p className="text-3xl font-bold text-[#8b1e3f] mt-2">{item.value}</p>
          </div>
        ))}
      </div>

      <p className="text-gray-600 max-w-2xl mx-auto">
        Sistem Informasi Terintegrasi KPU Kabupaten Manokwari menampilkan data pemilih, pelatihan, dan distribusi logistik secara transparan dan akuntabel.
      </p>
    </div>
  );
}
