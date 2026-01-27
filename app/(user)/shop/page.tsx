"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/store/cart";
import {
  Search,
  SlidersHorizontal,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  slug: string;
  image: string | null;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { addItem } = useCart();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (session?.user?.role === "ADMIN") {
      router.push("/admin");
      return;
    }
    fetchProducts();
  }, [session, status, router]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
    });
  };

  // --- LOADING STATE (SKELETON) ---
  if (loading) {
    return (
      <div className="min-h-screen bg-transparent p-8">
        <div className="max-w-7xl mx-auto">
          <div className="h-10 w-48 bg-white/5 animate-pulse rounded-lg mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-80 bg-white/5 animate-pulse rounded-3xl"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 md:pt-10">
        {/* Header Section - Stacked on mobile, side-by-side on desktop */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 md:mb-12">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-emerald-600">
              <Sparkles className="w-3 h-3 md:w-4 h-4" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">
                Katalog Eksklusif
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">
              Explore <span className="text-slate-300 font-light">/</span> Shop
            </h1>
          </div>

          {/* Search Bar - Full width on mobile */}
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors w-4 h-4" />
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl md:rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {/* <button className="p-3 bg-white border border-slate-200 rounded-xl md:rounded-2xl hover:bg-slate-50 transition-all shadow-sm">
              <SlidersHorizontal className="w-5 h-5 text-slate-600" />
            </button> */}
          </div>
        </div>

        {/* Status Bar */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-xs md:text-sm text-slate-500">
            Menampilkan{" "}
            <span className="text-emerald-600 font-bold">
              {filteredProducts.length}
            </span>{" "}
            produk
          </p>
          <div className="h-[1px] flex-1 bg-slate-100 mx-4 hidden sm:block"></div>
        </div>

        {/* Products Grid - 2 columns on mobile, 3 on tablet, 4 on desktop */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200 px-4">
            <ShoppingBag className="text-slate-300 w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900">
              Produk Tidak Ditemukan
            </h3>
            <p className="text-sm text-slate-500">Coba kata kunci lain.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col bg-white border border-slate-100 rounded-2xl md:rounded-[2rem] p-2 md:p-4 hover:shadow-xl transition-all duration-300"
              >
                {/* Image Wrapper */}
                <div className="relative aspect-square mb-3 rounded-xl md:rounded-[1.5rem] overflow-hidden bg-slate-50">
                  <ProductCard product={product} />

                  {/* Desktop Hover Action (Hidden on Mobile for better UX) */}
                  <div className="absolute inset-0 bg-emerald-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center backdrop-blur-[2px]">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-emerald-700 shadow-lg transition-transform hover:scale-105"
                    >
                      Beli +
                    </button>
                  </div>
                </div>

                {/* Info & Price */}
                <div className="px-1 md:px-2 flex flex-col flex-1">
                  <h3 className="text-xs md:text-base font-bold text-slate-800 truncate leading-tight">
                    {product.name}
                  </h3>
                  <div className="mt-auto pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-sm md:text-lg font-black text-emerald-700">
                      Rp{product.price.toLocaleString("id-ID")}
                    </span>
                    <span className="text-[8px] md:text-[10px] w-fit px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded-md font-bold">
                      Stok: {product.stock}
                    </span>
                  </div>

                  {/* Mobile Quick Add Button (Visible only on small screens) */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-3 w-full md:hidden bg-emerald-600 text-white py-2 rounded-lg text-[10px] font-bold active:bg-emerald-700"
                  >
                    Tambah +
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
