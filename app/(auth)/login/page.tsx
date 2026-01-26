"use client";

import { signIn, getSession } from "next-auth/react";
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
        // Redirect to the redirect page which will handle role-based redirection
        router.push("/redirect");
      }
    } catch (error) {
      setError("Terjadi gangguan koneksi. Coba beberapa saat lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden bg-[#030712]">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-slate-500 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Kembali ke Beranda</span>
        </Link>

        {/* Card Container */}
        <div className="bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 mb-6 shadow-xl shadow-purple-500/20 ring-4 ring-white/5">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tighter mb-2">
              WELCOME BACK
            </h1>
            <p className="text-slate-500 text-sm">
              Masuk untuk melanjutkan pengalaman belanja Anda.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-xs font-medium animate-shake">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-purple-500 transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Password
                </label>
                <Link
                  href="#"
                  className="text-[10px] font-bold text-purple-500 hover:text-purple-400 uppercase tracking-tighter"
                >
                  Lupa Password?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-purple-500 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-12 py-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative group overflow-hidden bg-white text-black font-black py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 mt-4"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative group-hover:text-white transition-colors duration-300 flex items-center justify-center">
                {loading ? (
                  <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
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
              <span className="bg-[#030712] px-4 text-slate-500 uppercase">
                Atau masuk dengan
              </span>
            </div>
          </div>

          <button className="w-full flex items-center justify-center space-x-3 bg-white/[0.03] border border-white/10 text-white py-4 rounded-2xl font-bold text-sm hover:bg-white/[0.08] transition-all">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5"
              alt="Google"
            />
            <span>Google Account</span>
          </button>

          {/* Register Link */}
          <p className="mt-10 text-center text-sm text-slate-500 font-medium">
            Baru di Ngorder?{" "}
            <Link
              href="/register"
              className="text-white hover:text-purple-400 font-bold underline decoration-purple-500/30 underline-offset-4 transition-all"
            >
              Buat akun sekarang
            </Link>
          </p>
        </div>

        {/* Security Badge */}
        <div className="mt-8 flex items-center justify-center space-x-2 text-slate-600">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
            End-to-end encrypted session
          </span>
        </div>
      </div>
    </div>
  );
}
