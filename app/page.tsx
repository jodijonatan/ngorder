import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    take: 6,
  });

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* --- HERO SECTION --- */}
      <section className="relative bg-slate-900 py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="text-indigo-400 font-semibold tracking-wider uppercase text-sm">
            E-commerce Masa Kini
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mt-4 mb-6 tracking-tight">
            Ngorder <span className="text-indigo-500">Apapun</span> <br /> Jadi
            Lebih Mudah.
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-10">
            Temukan koleksi produk pilihan dengan kualitas terbaik dan harga
            yang tetap bersahabat di kantong.
          </p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-indigo-500/20">
            Belanja Sekarang
          </button>
        </div>
        {/* Dekorasi Abstrak Belakang */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
      </section>

      {/* --- PRODUCT GRID SECTION --- */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold">Produk Terbaru</h2>
            <div className="h-1 w-12 bg-indigo-600 mt-2"></div>
          </div>
          <button className="text-indigo-600 font-semibold hover:underline">
            Lihat Semua →
          </button>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <p className="text-slate-500">
              Stok produk sedang kosong. Cek lagi nanti ya!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Image Placeholder (Ganti src ke product.image jika ada) */}
                <div className="relative h-64 bg-slate-100 overflow-hidden">
                  <div className="flex items-center justify-center h-full text-slate-400">
                    [Image of {product.name}]
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                      Baru
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold group-hover:text-indigo-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-slate-500 text-sm mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-2xl font-black text-slate-900">
                      Rp {product.price.toLocaleString("id-ID")}
                    </span>
                    <button className="bg-slate-900 text-white p-3 rounded-xl hover:bg-indigo-600 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
