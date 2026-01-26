"use client";

import { useCart } from "@/store/cart";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCart();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    // Redirect admin users away from cart
    if (session?.user?.role === "ADMIN") {
      router.push("/admin");
      return;
    }
  }, [session, status, router]);

  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <ShoppingBag className="w-24 h-24 mx-auto text-gray-600 mb-4" />
            <h1 className="text-3xl font-bold mb-2">Keranjang Kosong</h1>
            <p className="text-gray-400">Belum ada produk di keranjang Anda</p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Mulai Belanja</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Keranjang Belanja</h1>
          <p className="text-gray-400">{items.length} produk di keranjang</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-lg p-6"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                    <p className="text-gray-400">
                      Rp {item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.qty - 1)}
                      className="w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <span className="w-8 text-center">{item.qty}</span>

                    <button
                      onClick={() => updateQuantity(item.id, item.qty + 1)}
                      className="w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-semibold">
                      Rp {(item.price * item.qty).toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="w-8 h-8 bg-red-600 hover:bg-red-700 rounded flex items-center justify-center transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal</span>
                <span>Rp {totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Pengiriman</span>
                <span>Gratis</span>
              </div>
              <div className="border-t border-slate-700 pt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>Rp {totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200">
              Lanjut ke Pembayaran
            </button>

            <Link
              href="/shop"
              className="block text-center mt-4 text-purple-400 hover:text-purple-300 transition-colors"
            >
              Lanjut Belanja
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
