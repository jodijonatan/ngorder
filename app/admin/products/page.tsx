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
=======
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Trash2, Package } from "lucide-react";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Manajemen Produk</h1>
              <p className="text-gray-400">Kelola produk toko Anda dengan mudah</p>
            </div>
            <Link
              href="/admin/products/create"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Tambah Produk</span>
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.length === 0 ? (
            <div className="col-span-full">
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-12 text-center">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Belum ada produk</h3>
                <p className="text-gray-400 mb-6">Mulai tambahkan produk pertama Anda</p>
                <Link
                  href="/admin/products/create"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] inline-flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Tambah Produk Pertama</span>
                </Link>
              </div>
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all duration-200 group"
              >
                {/* Product Image */}
                <div className="aspect-square bg-slate-800 rounded-lg mb-4 overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Package className="w-12 h-12" />
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-2xl font-bold text-purple-400">
                    Rp {product.price.toLocaleString('id-ID')}
                  </p>
                  <p className="text-sm text-gray-400">
                    Stok: {product.stock}
                  </p>
                  {product.description && (
                    <p className="text-sm text-gray-300 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-2 mt-4">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={() => {
                      if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
                        fetch(`/api/admin/products/${product.id}`, {
                          method: 'DELETE',
                        }).then(() => {
                          window.location.reload();
                        });
                      }
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        {products.length > 0 && (
          <div className="mt-8 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{products.length}</div>
                <div className="text-gray-400">Total Produk</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {products.reduce((sum, p) => sum + p.stock, 0)}
                </div>
                <div className="text-gray-400">Total Stok</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  Rp {products.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString('id-ID')}
                </div>
                <div className="text-gray-400">Total Nilai</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
