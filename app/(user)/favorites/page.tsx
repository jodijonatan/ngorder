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
      // For now, we'll simulate favorites with localStorage
      // In a real app, this would be an API call
      const storedFavorites = localStorage.getItem("favorites");
      if (storedFavorites) {
        const favoriteIds = JSON.parse(storedFavorites);
        // Fetch products by IDs (simplified)
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
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center space-x-2">
            <Heart className="w-8 h-8 text-red-500" />
            <span>Produk Favorit</span>
          </h1>
          <p className="text-gray-400">Produk yang Anda sukai</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Memuat produk favorit...</p>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-24 h-24 mx-auto text-gray-600 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">
              Belum ada produk favorit
            </h2>
            <p className="text-gray-400 mb-6">
              Tambahkan produk ke favorit untuk melihatnya di sini
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Jelajahi Produk</span>
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-400">{favorites.length} produk favorit</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((product) => (
                <div
                  key={product.id}
                  className="bg-slate-900 border border-slate-800 rounded-lg p-4 hover:border-slate-700 transition-colors relative group"
                >
                  <ProductCard product={product} />

                  <button
                    onClick={() => removeFromFavorites(product.id)}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    title="Hapus dari favorit"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>

                  <div className="absolute top-2 left-2">
                    <Heart className="w-6 h-6 text-red-500 fill-current" />
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
