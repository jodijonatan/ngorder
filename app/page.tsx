import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  // Ambil produk dari database
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    take: 6,
  });

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Selamat datang di Toko Online</h1>
      <p className="text-neutral-400 mb-8">Pilih produk terbaik kami!</p>

      {products.length === 0 ? (
        <p className="text-neutral-500">Belum ada produk tersedia.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-neutral-900 p-4 rounded-lg shadow hover:scale-105 transition-transform"
            >
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-neutral-400 mt-2">{product.description}</p>
              <p className="mt-3 font-bold">Rp {product.price}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
