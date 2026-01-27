"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const sidebarItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Produk", href: "/admin/products", icon: Package },
  { name: "Pesanan", href: "/admin/orders", icon: ShoppingCart },
  { name: "Pelanggan", href: "/admin/users", icon: Users },
  { name: "Pengaturan", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-surface flex overflow-hidden">
      {/* --- SIDEBAR --- */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-surface/50 backdrop-blur-2xl border-r border-white/5 transform transition-all duration-500 lg:relative lg:translate-x-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full p-8">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 px-2 mb-12">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-tr from-secondary to-accent rounded-xl blur-sm opacity-50"></div>
              <div className="relative w-10 h-10 bg-surface border border-white/10 rounded-xl flex items-center justify-center">
                <Package className="text-secondary w-5 h-5" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-text-main tracking-tighter leading-none">
                NGORDER
              </span>
              <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.3em] mt-1">
                Admin Console
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 space-y-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`
                    flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group
                    ${
                      isActive
                        ? "bg-secondary text-white font-bold shadow-lg shadow-secondary/20"
                        : "text-text-muted hover:text-text-main hover:bg-white/[0.03]"
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon
                      className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 
                      ${isActive ? "text-white" : "text-text-muted group-hover:text-accent"}`}
                    />
                    <span className="text-sm font-medium tracking-tight">
                      {item.name}
                    </span>
                  </div>
                  {isActive && (
                    <ChevronRight className="w-4 h-4 text-white/50" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Profile / Logout */}
          <div className="mt-auto pt-6 border-t border-white/5">
            <button
              onClick={handleLogout}
              className="flex items-center justify-between px-4 py-4 w-full bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl transition-all duration-300 group border border-red-500/10"
            >
              <div className="flex items-center space-x-3">
                <LogOut className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  Keluar Sesi
                </span>
              </div>
            </button>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Navbar for Mobile */}
        <header className="lg:hidden flex items-center justify-between p-6 bg-surface/50 backdrop-blur-md border-b border-white/5">
          <span className="text-lg font-black text-text-main tracking-tighter uppercase">
            NG<span className="text-secondary">ORDER</span>
          </span>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-3 bg-white/[0.03] border border-white/10 rounded-xl text-text-muted hover:text-text-main transition-all"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto relative custom-scrollbar">
          {/* Subtle Decorative Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full -z-10" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full -z-10" />

          <div className="p-6 md:p-12 lg:p-16 max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-surface/80 backdrop-blur-sm z-40 lg:hidden transition-all duration-500"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
