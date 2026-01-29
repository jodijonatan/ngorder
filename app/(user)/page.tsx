import Link from "next/link";
import { ArrowRight, ShoppingBag, Heart, User } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-surface text-text-main">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-secondary/10 blur-[100px] rounded-full" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-text-main">
              Selamat Datang di{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">
                NGORDER
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-text-muted mb-8 max-w-3xl mx-auto">
              Platform modern untuk memesan produk favorit Anda dengan mudah dan
              cepat. Temukan berbagai produk berkualitas dengan harga terbaik.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center px-8 py-4 bg-accent text-white font-bold rounded-2xl hover:opacity-90 transition-all duration-200 shadow-lg shadow-accent/25"
              >
                Mulai Belanja
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/profile"
                className="inline-flex items-center px-8 py-4 border border-primary/10 text-text-main font-bold rounded-2xl hover:bg-primary/5 transition-all duration-200"
              >
                Lihat Profil
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-primary/5">
        <div className="w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-text-main">
              Kenapa Memilih NGORDER?
            </h2>
            <p className="text-text-muted text-lg">
              Kami menyediakan pengalaman berbelanja yang modern dan
              user-friendly
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center p-6 rounded-2xl bg-white border border-primary/5 hover:border-secondary/20 transition-all duration-200 shadow-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-text-main">
                Berbelanja Mudah
              </h3>
              <p className="text-text-muted">
                Interface yang intuitif memudahkan Anda menemukan dan memesan
                produk yang diinginkan
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white border border-primary/5 hover:border-secondary/20 transition-all duration-200 shadow-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-text-main">
                Produk Favorit
              </h3>
              <p className="text-text-muted">
                Simpan produk favorit Anda dan dapatkan notifikasi ketika ada
                penawaran spesial
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white border border-primary/5 hover:border-secondary/20 transition-all duration-200 shadow-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-text-main">
                Profil Personal
              </h3>
              <p className="text-text-muted">
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
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-text-main">
            Siap untuk Memulai?
          </h2>
          <p className="text-text-muted text-lg mb-8">
            Bergabunglah dengan ribuan pengguna yang telah mempercayai NGORDER
            untuk kebutuhan berbelanja mereka
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center px-8 py-4 bg-accent text-white font-bold rounded-2xl hover:opacity-90 transition-all duration-200 shadow-lg shadow-accent/25"
          >
            Jelajahi Produk
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
