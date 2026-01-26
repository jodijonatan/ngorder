import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    redirect("/");
  }

  const products = await prisma.product.findMany();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Link
          href="/admin/products/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Tambah Produk
        </Link>
      </div>

      <div className="bg-slate-900 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Daftar Produk</h2>

        {products.length === 0 ? (
          <p className="text-gray-400">Belum ada produk</p>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="border border-slate-700 rounded-lg p-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-400">{product.description}</p>
                    <p className="text-green-400 font-semibold">
                      Rp {product.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Stok: {product.stock} | Slug: {product.slug}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
