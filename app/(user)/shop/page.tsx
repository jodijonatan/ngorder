"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/store/cart";
import { Search, ShoppingBag, Sparkles, X, Plus } from "lucide-react";

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
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const { addItem } = useCart();
  const { data: session, status } = useSession();
  const router = useRouter();

  // Load Data & Auth Check
  useEffect(() => {
    if (status === "loading") return;
    if (session?.user?.role === "ADMIN") {
      router.push("/admin");
      return;
    }
    fetchProducts();

    // Load favorites from local storage
    const stored = localStorage.getItem("favorites");
    if (stored) setFavoriteIds(JSON.parse(stored));
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

  // Logika toggle favorite yang akan dikirim ke ProductCard
  const toggleFavorite = (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    e.stopPropagation();

    let updatedIds: string[];
    if (favoriteIds.includes(productId)) {
      updatedIds = favoriteIds.filter((id) => id !== productId);
    } else {
      updatedIds = [...favoriteIds, productId];
    }

    setFavoriteIds(updatedIds);
    localStorage.setItem("favorites", JSON.stringify(updatedIds));
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50/30">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">
            Loading Collection
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/30 pb-20 pt-28">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-emerald-600 font-bold text-[10px] uppercase tracking-[0.2em]">
              <Sparkles className="w-4 h-4" />
              <span>Katalog Eksklusif</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase">
              Explore <span className="text-slate-300">/</span> Shop
            </h1>
          </div>

          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 w-4 h-4 transition-colors" />
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-12 py-3.5 text-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
            <ShoppingBag className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 uppercase">
              Produk Tidak Ditemukan
            </h3>
            <p className="text-slate-400 text-sm mt-2">
              Coba gunakan kata kunci pencarian lainnya.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="flex flex-col">
                <div className="bg-white border border-slate-100 rounded-[2rem] p-3 md:p-5 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-500 flex-1 flex flex-col">
                  {/* Komponen Card dengan Props Wishlist */}
                  <ProductCard
                    product={product}
                    isFavorite={favoriteIds.includes(product.id)}
                    onToggleFavorite={toggleFavorite}
                  />

                  {/* Add To Cart Button */}
                  <button
                    onClick={() =>
                      addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        qty: 1,
                      })
                    }
                    className="mt-4 w-full bg-slate-900 hover:bg-emerald-600 text-white py-3 md:py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center space-x-2 active:scale-95 shadow-lg shadow-slate-900/10 hover:shadow-emerald-500/20"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add To Cart</span>
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
