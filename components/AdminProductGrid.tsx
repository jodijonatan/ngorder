"use client";

import Link from "next/link";
import { Edit, Trash2, Package } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  stock: number;
  image: string | null;
  description: string;
}

interface AdminProductGridProps {
  products: Product[];
}

export default function AdminProductGrid({ products }: AdminProductGridProps) {
  const handleDelete = async (productId: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      try {
        const response = await fetch(`/api/admin/products/${productId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          window.location.reload();
        } else {
          alert("Gagal menghapus produk");
        }
      } catch (error) {
        alert("Terjadi kesalahan saat menghapus produk");
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.length === 0 ? (
        <div className="col-span-full">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Belum ada produk
            </h3>
            <p className="text-gray-400 mb-6">
              Mulai tambahkan produk pertama Anda
            </p>
            <Link
              href="/admin/products/create"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] inline-flex items-center space-x-2"
            >
              <Package className="w-5 h-5" />
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
                Rp {product.price.toLocaleString("id-ID")}
              </p>
              <p className="text-sm text-gray-400">Stok: {product.stock}</p>
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
                onClick={() => handleDelete(product.id)}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
