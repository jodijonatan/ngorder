import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md space-y-6">
        <h1 className="text-8xl font-black text-text-main/10">404</h1>
        <div className="space-y-2">
          <h2 className="text-xl font-black text-text-main uppercase tracking-tight">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-text-muted text-sm">
            Halaman yang Anda cari tidak tersedia atau telah dipindahkan.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-secondary text-white font-bold px-6 py-3 rounded-xl hover:bg-secondary/90 transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Beranda</span>
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 text-text-main font-bold px-6 py-3 rounded-xl hover:bg-white/10 transition-all active:scale-95"
          >
            <Search className="w-4 h-4" />
            <span>Belanja</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
