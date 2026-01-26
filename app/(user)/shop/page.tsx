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
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center space-x-2 text-purple-400 mb-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Katalog Eksklusif
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
              EXPLORE{" "}
              <span className="text-slate-500 text-3xl md:text-4xl font-light">
                /
              </span>{" "}
              SHOP
            </h1>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors w-4 h-4" />
              <input
                type="text"
                placeholder="Cari produk impian..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white/[0.06] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button className="p-3.5 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
              <SlidersHorizontal className="w-5 h-5 text-slate-300" />
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="mb-8 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Menampilkan{" "}
            <span className="text-slate-200 font-medium">
              {filteredProducts.length}
            </span>{" "}
            produk
          </p>
          <div className="h-[1px] flex-1 bg-white/5 mx-6 hidden md:block"></div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-white/[0.02] rounded-[2.5rem] border border-dashed border-white/10">
            <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
              <ShoppingBag className="text-slate-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Produk Tidak Ditemukan
            </h3>
            <p className="text-slate-500 max-w-xs mx-auto">
              Maaf, kami tidak dapat menemukan produk "{searchQuery}". Coba kata
              kunci lain.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col bg-white/[0.02] border border-white/5 rounded-[2rem] p-4 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500"
              >
                {/* Product Card wrapper (Image & Badge) */}
                <div className="relative mb-4 rounded-[1.5rem] overflow-hidden bg-slate-900/50">
                  <ProductCard product={product} />

                  {/* Overlay Action on Hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-white text-black px-6 py-3 rounded-xl font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      Quick Add +
                    </button>
                  </div>
                </div>

                {/* Info & Price */}
                <div className="px-2 pb-2">
                  <div className="flex justify-between items-center gap-2">
                    <h3 className="font-bold text-slate-200 truncate group-hover:text-purple-400 transition-colors">
                      {product.name}
                    </h3>
                    <span className="text-sm font-black text-white shrink-0">
                      Rp{product.price.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1 italic">
                    Ready Stock: {product.stock}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
