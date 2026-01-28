import Link from "next/link";
import Image from "next/image";
import { LayoutGrid, ArrowUpRight } from "lucide-react";

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
    <div className="group block w-full">
      {/* Image Container - Link ke Detail */}
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-square w-full overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-slate-50 border border-slate-100 group-hover:border-emerald-500/30 transition-all duration-500"
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-100">
            <LayoutGrid className="w-8 h-8 opacity-10 text-slate-400" />
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={`px-2 py-1 rounded-lg text-[8px] md:text-[9px] font-black uppercase tracking-widest backdrop-blur-md border ${
              product.stock > 0
                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                : "bg-red-500/10 text-red-500 border-red-500/20"
            }`}
          >
            {product.stock > 0 ? `Stock: ${product.stock}` : "Sold Out"}
          </span>
        </div>

        {/* View Detail Icon */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <div className="bg-white/90 p-2 rounded-lg shadow-sm">
            <ArrowUpRight className="w-4 h-4 text-slate-900" />
          </div>
        </div>
      </Link>

      {/* Product Content */}
      <div className="mt-4 px-1 space-y-1">
        <h3 className="text-slate-800 font-bold text-xs md:text-sm uppercase tracking-tight line-clamp-1 group-hover:text-emerald-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-emerald-700 font-black text-sm md:text-base tracking-tighter">
          Rp{product.price.toLocaleString("id-ID")}
        </p>
        <p className="text-[9px] md:text-[10px] text-slate-400 font-medium uppercase tracking-wider line-clamp-1 opacity-70">
          {product.description || "No description available"}
        </p>
      </div>
    </div>
  );
}
