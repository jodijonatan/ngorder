"use client";

import Link from "next/link";
import { Edit, Trash2, Package, Plus, ExternalLink } from "lucide-react";

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
    if (
      confirm("Apakah Anda yakin ingin menghapus produk ini secara permanen?")
    ) {
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
        alert("Terjadi kesalahan sistem saat menghapus produk");
      }
    }
  };

  const cardStyle =
    "bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-[2rem] p-6 hover:border-secondary/30 transition-all duration-500 group relative overflow-hidden";
  const labelStyle =
    "text-[9px] font-black uppercase tracking-[0.2em] text-text-muted mb-1 block";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.length === 0 ? (
        <div className="col-span-full">
          <div className="bg-white/[0.02] border-2 border-dashed border-white/5 rounded-[3rem] p-20 text-center">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-secondary/20 blur-3xl rounded-full" />
              <Package className="w-20 h-20 text-secondary relative" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter italic text-text-main mb-2">
              Inventory <span className="text-text-muted">Empty</span>
            </h3>
            <p className="text-text-muted text-xs font-bold uppercase tracking-widest mb-10 opacity-60">
              Database tidak mendeteksi adanya unit terdaftar
            </p>
            <Link
              href="/admin/products/create"
              className="bg-text-main text-surface hover:bg-secondary hover:text-surface font-black py-4 px-10 rounded-2xl transition-all duration-300 inline-flex items-center space-x-3 text-[10px] uppercase tracking-[0.2em] shadow-xl"
            >
              <Plus className="w-4 h-4" />
              <span>Register New Unit</span>
            </Link>
          </div>
        </div>
      ) : (
        products.map((product) => (
          <div key={product.id} className={cardStyle}>
            {/* Glossy Overlay Effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 blur-[50px] -z-10 group-hover:bg-secondary/10 transition-colors" />

            {/* Product Image Container */}
            <div className="aspect-square bg-white/[0.03] rounded-2xl mb-6 overflow-hidden border border-white/5 relative">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-text-muted/20">
                  <Package className="w-12 h-12 mb-2" />
                  <span className="text-[8px] font-black tracking-widest uppercase">
                    No Visual
                  </span>
                </div>
              )}

              {/* Stock Badge Overlay */}
              <div className="absolute top-3 left-3">
                <span
                  className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest backdrop-blur-md border ${
                    product.stock > 10
                      ? "bg-secondary/10 text-secondary border-secondary/20"
                      : "bg-red-500/10 text-red-500 border-red-500/20"
                  }`}
                >
                  Qty: {product.stock}
                </span>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <div>
                <span className={labelStyle}>Product Identity</span>
                <h3 className="text-sm font-black text-text-main uppercase tracking-tight line-clamp-1 group-hover:text-secondary transition-colors">
                  {product.name}
                </h3>
              </div>

              <div>
                <span className={labelStyle}>Market Valuation</span>
                <p className="text-2xl font-black text-accent italic tracking-tighter">
                  Rp {product.price.toLocaleString("id-ID")}
                </p>
              </div>

              {product.description && (
                <p className="text-[10px] text-text-muted font-bold leading-relaxed line-clamp-2 uppercase opacity-60">
                  {product.description}
                </p>
              )}
            </div>

            {/* Actions Panel */}
            <div className="flex gap-3 mt-8 pt-6 border-t border-white/5">
              <Link
                href={`/admin/products/${product.id}`}
                className="flex-1 bg-white/[0.05] hover:bg-secondary hover:text-surface text-text-main font-black py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 text-[9px] uppercase tracking-widest"
              >
                <Edit className="w-3 h-3" />
                <span>Optimize</span>
              </Link>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white p-3 rounded-xl transition-all duration-300"
                title="Decommission Unit"
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
