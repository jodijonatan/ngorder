"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak sesuai.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Keamanan akun penting! Password minimal 6 karakter.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        await signIn("credentials", {
          email,
          password,
          callbackUrl: "/",
        });
      } else {
        const data = await response.json();
        setError(data.error || "Pendaftaran gagal. Silakan coba lagi.");
      }
    } catch (error) {
      setError("Terjadi gangguan server. Coba beberapa saat lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Background menggunakan surface sesuai global css
    <div className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden bg-surface">
      {/* Background Decor menggunakan variabel global primary/secondary */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-secondary/10 blur-[130px] rounded-full" />
      </div>

      <div className="max-w-xl w-full relative z-10">
        {/* Navigation Back */}
        <Link
          href="/login"
          className="inline-flex items-center text-text-muted hover:text-text-main transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Sudah punya akun? Masuk</span>
        </Link>

        {/* Card Container */}
        <div className="bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
          {/* Header Section */}
          <div className="mb-10">
            <div className="inline-flex items-center space-x-2 bg-secondary/10 border border-secondary/20 px-3 py-1 rounded-full mb-6">
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              <span className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">
                Join the future
              </span>
            </div>
            <h1 className="text-4xl font-black text-text-main tracking-tighter mb-2 uppercase">
              Create{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">
                Account
              </span>
            </h1>
            <p className="text-text-muted text-sm">
              Mulai petualangan belanja eksklusif Anda di Ngorder.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {error && (
              <div className="md:col-span-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-2xl text-xs font-medium text-center italic">
                {error}
              </div>
            )}

            {/* Name Field */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">
                Nama Lengkap
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-secondary transition-colors" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-text-main placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-secondary transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-text-main placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-secondary transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-12 py-4 text-text-main placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-text-main transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">
                Confirm
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-secondary transition-colors" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-12 py-4 text-text-main placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-text-main transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button - Menggunakan warna Accent sesuai CTA Utama */}
            <div className="md:col-span-2 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="group w-full relative cursor-pointer overflow-hidden bg-accent text-white font-black py-5 rounded-2xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-accent/20"
              >
                <span className="relative flex items-center justify-center tracking-widest text-xs">
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "KONFIRMASI PENDAFTARAN"
                  )}
                </span>
              </button>
            </div>
          </form>

          {/* Policy Footer */}
          <div className="mt-10 text-center">
            <div className="text-[10px] text-text-muted/50 font-bold uppercase tracking-[0.1em] leading-relaxed">
              Dengan mendaftar, Anda menyetujui <br />
              <Link
                href="/terms"
                className="text-text-muted hover:text-secondary transition-colors"
              >
                Syarat & Ketentuan
              </Link>
              <span className="mx-2">&</span>
              <Link
                href="/privacy"
                className="text-text-muted hover:text-secondary transition-colors"
              >
                Kebijakan Privasi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
