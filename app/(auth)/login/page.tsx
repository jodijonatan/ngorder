"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LogIn,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
        redirect: false,
      });

      if (result?.error) {
        setError("Email atau password tidak sesuai. Silakan coba lagi.");
      } else {
        router.push("/redirect");
      }
    } catch (error) {
      setError("Terjadi gangguan koneksi. Coba beberapa saat lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Menggunakan bg-surface sebagai background utama
    <div className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden bg-surface">
      {/* Background Decor menggunakan variabel global */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-text-muted hover:text-text-main transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Kembali ke Beranda</span>
        </Link>

        {/* Card Container */}
        <div className="bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
          {/* Header */}
          <div className="mb-10 text-center">
            {/* Icon menggunakan gradient Secondary ke Accent */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-secondary to-accent mb-6 shadow-xl shadow-secondary/20 ring-4 ring-white/5">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-black text-text-main tracking-tighter mb-2">
              WELCOME BACK
            </h1>
            <p className="text-text-muted text-sm">
              Masuk untuk melanjutkan pengalaman belanja Anda.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-xs font-medium">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-secondary transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-text-main placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary/40 transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-text-muted uppercase tracking-widest">
                  Password
                </label>
                <Link
                  href="#"
                  className="text-[10px] font-bold text-secondary hover:text-accent uppercase tracking-tighter transition-colors"
                >
                  Lupa Password?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-secondary transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-12 py-4 text-text-main placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary/40 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-text-main transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button - Menggunakan warna Accent sebagai CTA Utama */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative group cursor-pointer overflow-hidden bg-accent text-white font-black py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 mt-4 shadow-lg shadow-accent/20"
            >
              <span className="relative flex items-center justify-center">
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  "SIGN IN"
                )}
              </span>
            </button>
          </form>

          {/* Social Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
              <span className="bg-surface px-4 text-text-muted uppercase">
                Atau masuk dengan
              </span>
            </div>
          </div>

          <button className="w-full flex items-center justify-center space-x-3 bg-white/[0.03] border border-white/10 text-text-main py-4 rounded-2xl font-bold text-sm hover:bg-white/[0.08] transition-all">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5"
              alt="Google"
            />
            <span>Google Account</span>
          </button>

          {/* Register Link */}
          <p className="mt-10 text-center text-sm text-text-muted font-medium">
            Baru di Ngorder?{" "}
            <Link
              href="/register"
              className="text-text-main hover:text-accent font-bold underline decoration-secondary/30 underline-offset-4 transition-all"
            >
              Buat akun sekarang
            </Link>
          </p>
        </div>

        {/* Security Badge */}
        <div className="mt-8 flex items-center justify-center space-x-2 text-text-muted/40">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
            End-to-end encrypted session
          </span>
        </div>
      </div>
    </div>
  );
}
