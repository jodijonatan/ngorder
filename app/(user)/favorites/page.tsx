"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  slug: string;
  image: string;
}

export default function FavoritesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchFavorites();
    }
  }, [session]);

  const fetchFavorites = async () => {
    try {
      const storedFavorites = localStorage.getItem("favorites");
      if (storedFavorites) {
        const favoriteIds = JSON.parse(storedFavorites);
        const response = await fetch("/api/products");
        if (response.ok) {
          const allProducts = await response.json();
          const favoriteProducts = allProducts.filter((product: Product) =>
            favoriteIds.includes(product.id),
          );
          setFavorites(favoriteProducts);
        }
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = (productId: string) => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      const favoriteIds = JSON.parse(storedFavorites);
      const updatedFavorites = favoriteIds.filter(
        (id: string) => id !== productId,
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setFavorites(favorites.filter((product) => product.id !== productId));
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-surface text-text-main flex items-center justify-center">
        <div className="text-center">
          {/* Spinner menggunakan warna secondary */}
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"></div>
          <p className="text-text-muted animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-surface text-text-main p-8 relative overflow-hidden">
      {/* Background Decor subtle */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="p-3 bg-secondary/10 rounded-2xl">
              <Heart className="w-8 h-8 text-secondary fill-secondary/20" />
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase">
              Produk{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">
                Favorit
              </span>
            </h1>
          </div>
          <p className="text-text-muted max-w-lg">
            Koleksi produk yang telah Anda kurasi untuk pengalaman belanja yang
            lebih personal.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"></div>
            <p className="text-text-muted">Memuat koleksi Anda...</p>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-32 bg-white/[0.02] border border-white/5 rounded-[2.5rem] backdrop-blur-md">
            <div className="relative inline-block mb-6">
              <Heart className="w-24 h-24 mx-auto text-text-muted/20" />
              <Heart className="w-10 h-10 absolute -top-2 -right-2 text-secondary animate-bounce" />
            </div>
            <h2 className="text-2xl font-black mb-2 uppercase tracking-tight">
              Koleksi masih kosong
            </h2>
            <p className="text-text-muted mb-8 max-w-xs mx-auto">
              Simpan produk yang Anda sukai agar lebih mudah ditemukan nanti.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center space-x-3 bg-accent hover:scale-105 text-white font-black py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg shadow-accent/20"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="text-sm tracking-widest">JELAJAHI PRODUK</span>
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8 flex items-center justify-between">
              <p className="text-text-muted font-bold text-xs uppercase tracking-[0.2em]">
                {favorites.length} Item Tersimpan
              </p>
              <div className="h-[1px] flex-1 bg-white/5 mx-6" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {favorites.map((product) => (
                <div key={product.id} className="group relative">
                  {/* Container khusus untuk card agar seragam dengan gaya login/register */}
                  <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-4 hover:bg-white/[0.04] hover:border-secondary/30 transition-all duration-500 shadow-xl">
                    <ProductCard product={product} />

                    {/* Action Buttons overlay */}
                    <div className="mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-tighter">
                        Quick View
                      </span>
                      <button
                        onClick={() => removeFromFavorites(product.id)}
                        className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all duration-200"
                        title="Hapus dari favorit"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Indicator favorit permanen di pojok */}
                  <div className="absolute -top-2 -left-2 z-20">
                    <div className="bg-secondary p-1.5 rounded-lg shadow-lg">
                      <Heart className="w-3 h-3 text-white fill-current" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
