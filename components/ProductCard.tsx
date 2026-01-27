import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, LayoutGrid } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  stock: number;
  image: string | null;
  description: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      {/* Image Container */}
      <div className="aspect-square w-full relative overflow-hidden rounded-[2rem] bg-white/[0.02] border border-white/5 group-hover:border-secondary/40 transition-all duration-500 shadow-2xl">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          /* Fallback UI using Theme Variables */
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/[0.02] to-secondary/5">
            <div className="text-text-muted text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-surface rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-secondary/30 transition-all duration-500 shadow-inner">
                <LayoutGrid className="w-8 h-8 opacity-20 group-hover:opacity-100 group-hover:text-secondary transition-all" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">
                Visual Missing
              </p>
            </div>
          </div>
        )}

        {/* Dynamic Badge - Stock Status */}
        <div className="absolute top-4 left-4 z-10">
          <span
            className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest backdrop-blur-md border ${
              product.stock > 0
                ? "bg-secondary/10 text-secondary border-secondary/20"
                : "bg-red-500/10 text-red-500 border-red-500/20"
            }`}
          >
            {product.stock > 0 ? `In Stock: ${product.stock}` : "Depleted"}
          </span>
        </div>

        {/* Hover Overlay Action */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-8">
          <div className="bg-white text-black p-4 rounded-2xl shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <ShoppingCart className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Product Content */}
      <div className="mt-5 px-2 space-y-1">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-text-main font-black text-sm uppercase tracking-tight leading-tight group-hover:text-secondary transition-colors duration-300">
            {product.name}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-accent font-black text-lg italic tracking-tighter">
            Rp {product.price.toLocaleString("id-ID")}
          </p>
          <div className="h-[1px] flex-1 bg-white/5" />
        </div>

        <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest opacity-60 line-clamp-1">
          {product.description || "No transmission data available"}
        </p>
      </div>
    </Link>
  );
}
