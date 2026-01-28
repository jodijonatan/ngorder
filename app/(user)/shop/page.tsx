"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/store/cart";
import { Search, ShoppingBag, Sparkles, X, Heart, Plus } from "lucide-react";

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

  useEffect(() => {
    if (status === "loading") return;
    if (session?.user?.role === "ADMIN") {
      router.push("/admin");
      return;
    }
    fetchProducts();
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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (e: React.MouseEvent, productId: string) => {
    e.preventDefault(); // Mencegah navigasi Link dari ProductCard
    let updatedIds = favoriteIds.includes(productId)
      ? favoriteIds.filter((id) => id !== productId)
      : [...favoriteIds, productId];
    setFavoriteIds(updatedIds);
    localStorage.setItem("favorites", JSON.stringify(updatedIds));
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading)
    return (
      <div className="p-20 text-center animate-pulse text-slate-400 uppercase tracking-widest text-xs">
        Loading Collection...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50/30 pb-20 pt-28">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-emerald-600 font-bold text-[10px] uppercase tracking-[0.2em]">
              <Sparkles className="w-4 h-4" /> <span>Katalog Eksklusif</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase">
              Explore <span className="text-slate-300">/</span> Shop
            </h1>
          </div>

          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group relative">
              {/* 1. Tombol Wishlist (Absolute overlay di atas Card) */}
              <button
                onClick={(e) => toggleFavorite(e, product.id)}
                className="absolute top-3 right-3 z-30 p-2 bg-white/80 backdrop-blur-md rounded-xl shadow-sm border border-slate-50 hover:scale-110 active:scale-90 transition-all"
              >
                <Heart
                  className={`w-4 h-4 ${favoriteIds.includes(product.id) ? "text-red-500 fill-red-500" : "text-slate-300"}`}
                />
              </button>

              {/* 2. Komponen Visual Card */}
              <div className="bg-white border border-slate-100 rounded-[2rem] p-3 md:p-5 hover:shadow-xl transition-all duration-500">
                <ProductCard product={product} />

                {/* 3. Tombol Add To Cart (Tampil di bawah Card) */}
                <button
                  onClick={() =>
                    addItem({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      qty: 1,
                    })
                  }
                  className="mt-4 w-full bg-slate-900 hover:bg-emerald-600 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add To Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-slate-100/50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">
              Produk tidak ditemukan
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
