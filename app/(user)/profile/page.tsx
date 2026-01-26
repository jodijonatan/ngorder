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
} from "lucide-react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/");
      return;
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const user = session.user;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center space-x-2">
            <User className="w-8 h-8 text-purple-500" />
            <span>Profil Saya</span>
          </h1>
          <p className="text-gray-400">Kelola informasi akun Anda</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info Card */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <User className="w-5 h-5 text-purple-500" />
                <span>Informasi Pribadi</span>
              </h2>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Nama Lengkap</p>
                    <p className="text-white font-medium">
                      {user?.name || "Tidak ada nama"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-white font-medium">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Role</p>
                    <p className="text-white font-medium capitalize">
                      {user?.role?.toLowerCase()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Bergabung Sejak</p>
                    <p className="text-white font-medium">Januari 2024</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Aksi Cepat</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/shop"
                  className="flex items-center space-x-3 p-4 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <ShoppingBag className="w-5 h-5 text-purple-500" />
                  <span>Lanjut Belanja</span>
                </Link>

                <Link
                  href="/favorites"
                  className="flex items-center space-x-3 p-4 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <Heart className="w-5 h-5 text-red-500" />
                  <span>Favorit Saya</span>
                </Link>

                <Link
                  href="/cart"
                  className="flex items-center space-x-3 p-4 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <CreditCard className="w-5 h-5 text-blue-500" />
                  <span>Keranjang</span>
                </Link>

                <Link
                  href="/profile/settings"
                  className="flex items-center space-x-3 p-4 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <Settings className="w-5 h-5 text-gray-400" />
                  <span>Pengaturan</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Status */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Status Akun</h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    Verifikasi Email
                  </span>
                  <span className="text-green-500 text-sm font-medium">
                    ✓ Terverifikasi
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Status Akun</span>
                  <span className="text-green-500 text-sm font-medium">
                    Aktif
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Level</span>
                  <span className="text-purple-500 text-sm font-medium">
                    Premium
                  </span>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
