"use client";

import { useCart } from "@/store/cart";
import { ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    stock: number;
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={product.stock <= 0}
      className={`w-full py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] flex items-center justify-center space-x-3 transition-all transform active:scale-95 shadow-lg ${
        product.stock > 0
          ? "bg-slate-900 text-white hover:bg-emerald-600 shadow-emerald-500/20 cursor-pointer"
          : "bg-slate-200 text-slate-400 cursor-not-allowed"
      }`}
    >
      <ShoppingCart className="w-5 h-5" />
      <span>{product.stock > 0 ? "Tambahkan ke Keranjang" : "Stok Habis"}</span>
    </button>
  );
}
