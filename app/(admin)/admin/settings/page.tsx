import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  Settings,
  Shield,
  Palette,
  Save,
  Eye,
  EyeOff,
  Globe,
  Lock,
} from "lucide-react";

export default async function AdminSettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    redirect("/");
  }

  // For now, we'll use static data. In a real app, fetch from DB or config
  const settings = {
    siteName: "NGORDER",
    siteDescription: "Platform e-commerce modern untuk bisnis Anda",
    adminEmail: session.user?.email || "",
    theme: "dark",
    maintenanceMode: false,
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 pb-20">
      {/* Decorative Glow */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 pt-12">
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center space-x-2 text-purple-400 mb-3">
              <Settings className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-[0.3em]">
                System Configuration
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
              SETTINGS <span className="text-slate-600 font-light">PANEL</span>
            </h1>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-8">
          {/* General Settings */}
          <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 backdrop-blur-md">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Globe className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Pengaturan Umum</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Nama Situs
                </label>
                <input
                  type="text"
                  defaultValue={settings.siteName}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-purple-500/50 focus:outline-none transition-colors"
                  placeholder="Masukkan nama situs"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Email Admin
                </label>
                <input
                  type="email"
                  defaultValue={settings.adminEmail}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-purple-500/50 focus:outline-none transition-colors"
                  placeholder="admin@example.com"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Deskripsi Situs
                </label>
                <textarea
                  rows={3}
                  defaultValue={settings.siteDescription}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-purple-500/50 focus:outline-none transition-colors resize-none"
                  placeholder="Deskripsi singkat tentang situs"
                />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 backdrop-blur-md">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-red-500/20 rounded-xl">
                <Shield className="w-6 h-6 text-red-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Keamanan</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Password Lama
                </label>
                <div className="relative">
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-purple-500/50 focus:outline-none transition-colors pr-12"
                    placeholder="Masukkan password lama"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Password Baru
                </label>
                <div className="relative">
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-purple-500/50 focus:outline-none transition-colors pr-12"
                    placeholder="Masukkan password baru"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                    <EyeOff className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Konfirmasi Password Baru
                </label>
                <div className="relative">
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-purple-500/50 focus:outline-none transition-colors pr-12"
                    placeholder="Konfirmasi password baru"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                    <EyeOff className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 backdrop-blur-md">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <Palette className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Tampilan</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-3">
                  Tema
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="theme"
                      value="dark"
                      defaultChecked={settings.theme === "dark"}
                      className="text-purple-500 focus:ring-purple-500"
                    />
                    <span className="text-white">Gelap</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="theme"
                      value="light"
                      defaultChecked={settings.theme === "light"}
                      className="text-purple-500 focus:ring-purple-500"
                    />
                    <span className="text-white">Terang</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={settings.maintenanceMode}
                    className="text-purple-500 focus:ring-purple-500 rounded"
                  />
                  <div>
                    <span className="text-white font-medium">
                      Mode Maintenance
                    </span>
                    <p className="text-sm text-slate-500">
                      Aktifkan untuk menampilkan halaman maintenance ke pengguna
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-12 flex justify-end">
          <button className="group relative inline-flex items-center justify-center bg-white text-black font-black px-8 py-4 rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-white/5">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Save className="relative w-5 h-5 mr-2 group-hover:text-white transition-colors" />
            <span className="relative group-hover:text-white transition-colors">
              SIMPAN PERUBAHAN
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
