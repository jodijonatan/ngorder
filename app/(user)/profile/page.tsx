"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Calendar,
  Shield,
  LogOut,
  Settings,
  ShoppingBag,
  Heart,
  CreditCard,
  ChevronRight,
} from "lucide-react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
      return;
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-surface text-text-main flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"></div>
          <p className="text-text-muted animate-pulse">
            Menyiapkan profil Anda...
          </p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  const user = session.user;

  return (
    <div className="min-h-screen bg-surface text-text-main p-8 relative overflow-hidden">
      {/* Efek Cahaya Latar */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="p-3 bg-secondary/10 rounded-2xl ring-1 ring-secondary/20">
              <User className="w-8 h-8 text-secondary" />
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase">
              Profil{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">
                Akun
              </span>
            </h1>
          </div>
          <p className="text-text-muted">
            Kelola identitas dan pengaturan akun eksklusif Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information Card */}
            <div className="bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-[2.5rem] p-8 shadow-2xl">
              <h2 className="text-xl font-black mb-8 flex items-center space-x-3 uppercase tracking-tight">
                <div className="w-1.5 h-6 bg-secondary rounded-full" />
                <span>Informasi Pribadi</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InfoItem
                  icon={<User className="w-5 h-5" />}
                  label="Nama Lengkap"
                  value={user?.name || "Member Ngorder"}
                />
                <InfoItem
                  icon={<Mail className="w-5 h-5" />}
                  label="Alamat Email"
                  value={user?.email || "-"}
                />
                <InfoItem
                  icon={<Shield className="w-5 h-5" />}
                  label="Tipe Keanggotaan"
                  value={user?.role || "USER"}
                  isHighlight
                />
                <InfoItem
                  icon={<Calendar className="w-5 h-5" />}
                  label="Bergabung Sejak"
                  value="Januari 2026"
                />
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-text-muted uppercase tracking-[0.2em] ml-2">
                Aksi Cepat
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ActionLink
                  href="/shop"
                  icon={<ShoppingBag className="w-5 h-5" />}
                  title="Lanjut Belanja"
                  color="text-secondary"
                />
                <ActionLink
                  href="/favorites"
                  icon={<Heart className="w-5 h-5" />}
                  title="Daftar Keinginan"
                  color="text-red-400"
                />
                <ActionLink
                  href="/cart"
                  icon={<CreditCard className="w-5 h-5" />}
                  title="Metode Pembayaran"
                  color="text-accent"
                />
                <ActionLink
                  href="/profile/settings"
                  icon={<Settings className="w-5 h-5" />}
                  title="Keamanan Akun"
                  color="text-text-muted"
                />
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
            {/* Account Status Card */}
            <div className="bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-[2rem] p-6">
              <h3 className="text-sm font-black uppercase tracking-widest mb-6 text-text-muted">
                Status Akun
              </h3>

              <div className="space-y-4">
                <StatusRow
                  label="Verifikasi"
                  value="Aktif"
                  dotColor="bg-green-500"
                />
                <StatusRow
                  label="Keamanan"
                  value="Tinggi"
                  dotColor="bg-accent"
                />
                <StatusRow
                  label="Level"
                  value="Premium"
                  valueClass="text-secondary font-black"
                />
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="group w-full flex items-center justify-between bg-red-500/10 hover:bg-red-500 border border-red-500/20 text-red-500 hover:text-white p-5 rounded-2xl transition-all duration-300"
            >
              <div className="flex items-center space-x-3">
                <LogOut className="w-5 h-5" />
                <span className="font-bold tracking-widest text-xs">
                  KELUAR SESI
                </span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-50 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Komponen Pendukung ---

function InfoItem({ icon, label, value, isHighlight = false }: any) {
  return (
    <div className="flex items-start space-x-4">
      <div className="mt-1 text-text-muted opacity-40">{icon}</div>
      <div>
        <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">
          {label}
        </p>
        <p
          className={`font-medium ${isHighlight ? "text-secondary font-black" : "text-text-main"}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function ActionLink({ href, icon, title, color }: any) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between p-5 bg-white/[0.03] border border-white/5 hover:border-secondary/30 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="flex items-center space-x-4">
        <div className={`${color} group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <span className="font-bold text-sm tracking-tight">{title}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-all" />
    </Link>
  );
}

function StatusRow({ label, value, dotColor, valueClass }: any) {
  return (
    <div className="flex justify-between items-center py-2">
      <span className="text-xs text-text-muted font-medium">{label}</span>
      <div className="flex items-center space-x-2">
        {dotColor && (
          <div
            className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`}
          />
        )}
        <span className={`text-xs font-bold ${valueClass || "text-text-main"}`}>
          {value}
        </span>
      </div>
    </div>
  );
}
