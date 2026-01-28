import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ShoppingCart,
  ShieldCheck,
  Truck,
  RefreshCcw,
} from "lucide-react";

// Tipe untuk params di Next.js 15+
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  // 1. Await params untuk mendapatkan slug (Perbaikan Error Prisma)
  const { slug } = await params;

  // 2. Query ke Database
  const product = await prisma.product.findUnique({
    where: { slug: slug },
  });

  // 3. Jika produk tidak ada, tampilkan 404
  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white pb-20 pt-28 md:pt-36">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb / Back Button */}
        <Link
          href="/shop"
          className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-emerald-600 transition-colors mb-8 group"
        >
          <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          KEMBALI KE KATALOG
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Section Kiri: Gambar Produk */}
          <div className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-slate-50 border border-slate-100 shadow-xl">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-300">
                No Image Available
              </div>
            )}

            {/* Status Stock Badge */}
            <div className="absolute top-6 left-6">
              <span
                className={`px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-widest backdrop-blur-md border ${
                  product.stock > 0
                    ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                    : "bg-red-500/10 text-red-500 border-red-500/20"
                }`}
              >
                {product.stock > 0
                  ? `Tersedia: ${product.stock}`
                  : "Stok Habis"}
              </span>
            </div>
          </div>

          {/* Section Kanan: Informasi & Aksi */}
          <div className="flex flex-col justify-center">
            <div className="space-y-6">
              <header className="space-y-2">
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                  {product.name}
                </h1>
                <p className="text-2xl md:text-4xl font-light text-emerald-600 italic">
                  Rp{product.price.toLocaleString("id-ID")}
                </p>
              </header>

              <div className="h-[1px] w-full bg-slate-100" />

              <article className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                  Deskripsi Produk
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {product.description ||
                    "Tidak ada informasi detail untuk produk ini."}
                </p>
              </article>

              {/* Fitur Tambahan (Trust Badges) */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="flex flex-col items-center p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center space-y-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                    Original
                  </span>
                </div>
                <div className="flex flex-col items-center p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center space-y-2">
                  <Truck className="w-5 h-5 text-emerald-600" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                    Fast Ship
                  </span>
                </div>
                <div className="flex flex-col items-center p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center space-y-2">
                  <RefreshCcw className="w-5 h-5 text-emerald-600" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                    Guarantee
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <button
                  disabled={product.stock <= 0}
                  className={`w-full py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] flex items-center justify-center space-x-3 transition-all transform active:scale-95 shadow-lg ${
                    product.stock > 0
                      ? "bg-slate-900 text-white hover:bg-emerald-600 shadow-emerald-500/20"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Tambahkan ke Keranjang</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
