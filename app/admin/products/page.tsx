import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Daftar Produk</h1>
      <Link
        href="/admin/products/create"
        className="bg-green-600 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Tambah Produk
      </Link>

      <table className="min-w-full bg-neutral-900 text-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Nama</th>
            <th className="px-4 py-2">Harga</th>
            <th className="px-4 py-2">Stok</th>
            <th className="px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-neutral-700">
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">Rp {product.price}</td>
              <td className="px-4 py-2">{product.stock}</td>
              <td className="px-4 py-2 space-x-2">
                <Link
                  href={`/admin/products/${product.id}`}
                  className="bg-blue-600 px-2 py-1 rounded"
                >
                  Edit
                </Link>
                <Link
                  href={`/admin/products/${product.id}/delete`}
                  className="bg-red-600 px-2 py-1 rounded"
                >
                  Hapus
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
