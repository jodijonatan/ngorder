import Link from "next/link";
import { ArrowRight, ShoppingBag, Heart, User } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20" />
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 blur-[100px] rounded-full" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
              Selamat Datang di{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                NGORDER
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Platform modern untuk memesan produk favorit Anda dengan mudah dan
              cepat. Temukan berbagai produk berkualitas dengan harga terbaik.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg shadow-purple-500/25"
              >
                Mulai Belanja
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/profile"
                className="inline-flex items-center px-8 py-4 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/5 transition-all duration-200"
              >
                Lihat Profil
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-[#0a0a0a]/50">
        <div className="w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Kenapa Memilih NGORDER?
            </h2>
            <p className="text-slate-400 text-lg">
              Kami menyediakan pengalaman berbelanja yang modern dan
              user-friendly
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Berbelanja Mudah</h3>
              <p className="text-slate-400">
                Interface yang intuitif memudahkan Anda menemukan dan memesan
                produk yang diinginkan
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Produk Favorit</h3>
              <p className="text-slate-400">
                Simpan produk favorit Anda dan dapatkan notifikasi ketika ada
                penawaran spesial
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Profil Personal</h3>
              <p className="text-slate-400">
                Kelola profil Anda, lihat riwayat pesanan, dan dapatkan
                rekomendasi produk
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="w-full text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Siap untuk Memulai?
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Bergabunglah dengan ribuan pengguna yang telah mempercayai NGORDER
            untuk kebutuhan berbelanja mereka
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg shadow-purple-500/25"
          >
            Jelajahi Produk
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
