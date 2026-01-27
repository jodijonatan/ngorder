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
      <div className="max-w-7xl mx-auto px-6 pt-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center space-x-2 text-emerald-600 mb-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Katalog Eksklusif
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
              EXPLORE{" "}
              <span className="text-slate-300 text-3xl md:text-4xl font-light">
                /
              </span>{" "}
              SHOP
            </h1>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors w-4 h-4" />
              <input
                type="text"
                placeholder="Cari produk impian..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all shadow-sm"
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
            <button className="p-3.5 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all shadow-sm">
              <SlidersHorizontal className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="mb-8 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Menampilkan{" "}
            <span className="text-emerald-600 font-bold">
              {filteredProducts.length}
            </span>{" "}
            produk terbaik
          </p>
          <div className="h-[1px] flex-1 bg-slate-100 mx-6 hidden md:block"></div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <ShoppingBag className="text-slate-300 w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Produk Tidak Ditemukan
            </h3>
            <p className="text-slate-500 max-w-xs mx-auto">
              Maaf, kami tidak dapat menemukan "{searchQuery}".
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col bg-white border border-slate-100 rounded-[2rem] p-4 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-500"
              >
                {/* Product Card wrapper */}
                <div className="relative mb-4 rounded-[1.5rem] overflow-hidden bg-slate-50">
                  <ProductCard product={product} />

                  {/* Overlay Action */}
                  <div className="absolute inset-0 bg-emerald-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-emerald-700 shadow-lg"
                    >
                      Beli Sekarang +
                    </button>
                  </div>
                </div>

                {/* Info & Price */}
                <div className="px-2 pb-2">
                  <h3 className="font-bold text-slate-800 truncate group-hover:text-emerald-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-lg font-black text-emerald-700">
                      Rp{product.price.toLocaleString("id-ID")}
                    </span>
                    <span className="text-[10px] px-2 py-1 bg-slate-100 text-slate-500 rounded-full font-bold uppercase">
                      Stock: {product.stock}
                    </span>
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
