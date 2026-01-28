import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import {
  Settings,
  Shield,
  Palette,
  Save,
  Eye,
  EyeOff,
  Globe,
  Lock,
  Cpu,
  ArrowRight,
} from "lucide-react";

export default async function AdminSettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    redirect("/");
  }

  const settings = {
    siteName: "NGORDER",
    siteDescription: "Platform e-commerce modern untuk bisnis Anda",
    adminEmail: session.user?.email || "",
    theme: "dark",
    maintenanceMode: false,
  };

  const labelStyle =
    "block text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-3";
  const inputStyle =
    "w-full px-5 py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-text-main placeholder:text-text-muted/20 focus:border-secondary/50 focus:bg-white/[0.05] focus:outline-none transition-all text-sm font-medium";

  return (
    <div className="min-h-screen bg-surface text-text-main pb-20 relative overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-secondary/5 blur-[140px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 pt-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-secondary group">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">
                Core Infrastructure
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none">
              System{" "}
              <span className="text-text-muted font-light">Settings</span>
            </h1>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-10">
          {/* General Settings */}
          <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-md relative overflow-hidden group">
            <div className="flex items-center space-x-4 mb-10">
              <div className="p-3 bg-secondary/10 rounded-2xl text-secondary">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black uppercase tracking-tighter italic">
                  Global Profile
                </h2>
                <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">
                  Identify your digital presence
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className={labelStyle}>Platform Identity</label>
                <input
                  type="text"
                  defaultValue={settings.siteName}
                  className={inputStyle}
                  placeholder="Site name"
                />
              </div>

              <div className="space-y-2">
                <label className={labelStyle}>Root Administrator</label>
                <input
                  type="email"
                  defaultValue={settings.adminEmail}
                  className={inputStyle}
                  placeholder="admin@internal.systems"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className={labelStyle}>Metadata Description</label>
                <textarea
                  rows={3}
                  defaultValue={settings.siteDescription}
                  className={`${inputStyle} resize-none`}
                  placeholder="Briefly describe the nexus..."
                />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-md relative overflow-hidden">
            <div className="flex items-center space-x-4 mb-10">
              <div className="p-3 bg-red-500/10 rounded-2xl text-red-500">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black uppercase tracking-tighter italic">
                  Auth Protocol
                </h2>
                <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">
                  Credential & access management
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className={labelStyle}>Old Access Key</label>
                  <div className="relative">
                    <input
                      type="password"
                      className={inputStyle}
                      placeholder="••••••••••••"
                    />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-secondary transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={labelStyle}>New Access Key</label>
                  <div className="relative">
                    <input
                      type="password"
                      className={inputStyle}
                      placeholder="New credential"
                    />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-secondary transition-colors">
                      <EyeOff className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Appearance & State */}
          <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-md">
            <div className="flex items-center space-x-4 mb-10">
              <div className="p-3 bg-accent/10 rounded-2xl text-accent">
                <Palette className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black uppercase tracking-tighter italic">
                  Visual Logic
                </h2>
                <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">
                  Interface & operational state
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-5">
                <label className={labelStyle}>Visual Schema</label>
                <div className="flex space-x-6">
                  {["dark", "light"].map((t) => (
                    <label
                      key={t}
                      className="flex items-center space-x-3 cursor-pointer group"
                    >
                      <div className="relative flex items-center justify-center">
                        <input
                          type="radio"
                          name="theme"
                          value={t}
                          defaultChecked={settings.theme === t}
                          className="peer appearance-none w-5 h-5 border-2 border-white/10 rounded-full checked:border-secondary transition-all"
                        />
                        <div className="absolute w-2 h-2 bg-secondary rounded-full opacity-0 peer-checked:opacity-100 transition-all" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest text-text-muted group-hover:text-text-main transition-colors">
                        {t === "dark" ? "Eclipse" : "Radiance"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/5">
                <label className="flex items-start space-x-4 cursor-pointer">
                  <div className="mt-1 relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      defaultChecked={settings.maintenanceMode}
                      className="peer appearance-none w-5 h-5 border-2 border-white/10 rounded-lg checked:bg-secondary checked:border-secondary transition-all"
                    />
                    <Save className="absolute w-3 h-3 text-surface opacity-0 peer-checked:opacity-100 transition-all" />
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-text-main block mb-1">
                      Maintenance Lockdown
                    </span>
                    <p className="text-[9px] text-text-muted font-bold leading-relaxed uppercase opacity-60">
                      Restrict public access during architectural updates.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-16 flex justify-end">
          <button className="group relative inline-flex items-center justify-center bg-text-main text-surface font-black px-12 py-5 rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-secondary/10 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Save className="relative w-5 h-5 mr-3 group-hover:text-surface transition-colors" />
            <span className="relative text-[10px] tracking-[0.3em] uppercase group-hover:text-surface">
              Commit Changes
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
