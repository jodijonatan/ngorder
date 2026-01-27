"use client";

import { useCart } from "@/store/cart";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  CreditCard,
} from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCart();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (session?.user?.role === "ADMIN") {
      router.push("/admin");
      return;
    }
  }, [session, status, router]);

  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-surface text-text-main flex items-center justify-center p-8 relative overflow-hidden">
        {/* Background Ambience */}
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-secondary/20 blur-3xl rounded-full" />
            <ShoppingBag className="w-32 h-32 mx-auto text-secondary relative animate-pulse" />
          </div>

          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tighter uppercase italic">
              Empty <span className="text-text-muted">Vault</span>
            </h1>
            <p className="text-text-muted font-bold uppercase tracking-widest text-xs">
              Belum ada transmisi data produk di keranjang Anda
            </p>
          </div>

          <Link
            href="/shop"
            className="group relative inline-flex items-center space-x-3 bg-white text-black font-black px-10 py-5 rounded-2xl overflow-hidden transition-all hover:scale-[1.05] active:scale-95 shadow-2xl shadow-white/5"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            <ShoppingBag className="relative w-5 h-5 group-hover:text-white transition-colors" />
            <span className="relative group-hover:text-white transition-colors uppercase tracking-widest text-[10px]">
              Initialize Shopping
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface text-text-main p-8 relative overflow-x-hidden">
      {/* Decorative Elements */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-secondary/5 blur-[140px] -z-10" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto pt-12">
        <div className="mb-16 space-y-4">
          <div className="flex items-center space-x-3 text-secondary">
            <div className="h-[1px] w-12 bg-secondary" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">
              Procurement Protocol
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none">
            Shopping{" "}
            <span className="text-text-muted font-light italic text-4xl md:text-5xl">
              Cart
            </span>
          </h1>
          <p className="text-text-muted text-[10px] font-bold uppercase tracking-[0.2em]">
            Active transmissions: {items.length} Units
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-md group hover:border-secondary/20 transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-black italic tracking-tight uppercase group-hover:text-secondary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-secondary font-bold text-sm">
                      Rp {item.price.toLocaleString()}{" "}
                      <span className="text-[10px] text-text-muted uppercase ml-2 tracking-widest">
                        / Unit
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center space-x-6 bg-white/[0.03] p-2 rounded-2xl border border-white/5">
                    <button
                      onClick={() => updateQuantity(item.id, item.qty - 1)}
                      className="w-10 h-10 bg-white/5 hover:bg-secondary hover:text-surface rounded-xl flex items-center justify-center transition-all active:scale-90"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <span className="text-lg font-black italic w-6 text-center">
                      {item.qty}
                    </span>

                    <button
                      onClick={() => updateQuantity(item.id, item.qty + 1)}
                      className="w-10 h-10 bg-white/5 hover:bg-secondary hover:text-surface rounded-xl flex items-center justify-center transition-all active:scale-90"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-right min-w-[140px]">
                    <p className="text-2xl font-black italic tracking-tighter">
                      Rp {(item.price * item.qty).toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-4 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all duration-300 group/trash"
                  >
                    <Trash2 className="w-5 h-5 group-hover/trash:rotate-12" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="relative">
            <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 backdrop-blur-xl h-fit sticky top-8">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-text-muted border-b border-white/5 pb-4">
                Summary Report
              </h2>

              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest">
                  <span className="text-text-muted">Subtotal</span>
                  <span className="text-text-main">
                    Rp {totalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest">
                  <span className="text-text-muted">Logistics</span>
                  <span className="text-accent italic">Free Protocol</span>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <div className="flex flex-col space-y-2">
                    <span className="text-[10px] font-black text-secondary uppercase tracking-[0.4em]">
                      Net Payable
                    </span>
                    <div className="flex justify-between items-end">
                      <span className="text-4xl font-black italic tracking-tighter">
                        Rp {totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button className="group relative w-full bg-text-main text-surface font-black py-5 rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-3">
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CreditCard className="relative w-5 h-5 group-hover:text-white transition-colors" />
                  <span className="relative group-hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px]">
                    Secure Checkout
                  </span>
                </button>

                <Link
                  href="/shop"
                  className="w-full py-4 text-center block text-[10px] font-black text-text-muted hover:text-secondary uppercase tracking-[0.3em] transition-colors"
                >
                  Return to Store
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
