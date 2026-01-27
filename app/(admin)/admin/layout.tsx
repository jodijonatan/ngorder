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
  Bell,
  Search,
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
    <div className="min-h-screen bg-[#030712] flex">
      {/* --- SIDEBAR --- */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#09090b] border-r border-white/5 transform transition-transform duration-300 lg:relative lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full p-6">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 px-2 mb-10">
            <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Package className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-black text-white tracking-tighter">
              NGORDER <span className="text-slate-500">CMS</span>
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 space-y-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-200 group
                    ${
                      isActive
                        ? "bg-white text-black font-bold shadow-xl shadow-white/5"
                        : "text-slate-500 hover:text-white hover:bg-white/5"
                    }
                  `}
                >
                  <item.icon
                    className={`w-5 h-5 ${isActive ? "text-black" : "text-slate-500 group-hover:text-purple-400"}`}
                  />
                  <span className="text-sm tracking-wide">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile / Logout */}
          <div className="mt-auto pt-6 border-t border-white/5">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 w-full text-slate-500 hover:text-red-400 transition-colors group"
            >
              <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-bold uppercase tracking-widest text-[10px]">
                Sign Out
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Content Body */}
        <main className="flex-1 overflow-y-auto relative">
          {/* Mobile Menu Button */}
          <div className="lg:hidden p-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 text-slate-400 hover:text-white transition-colors"
            >
              {isSidebarOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Subtle Page Background Decor */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
            <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-purple-600/5 blur-[100px] rounded-full"></div>
          </div>

          <div className="p-6 md:p-10 max-w-[1600px] mx-auto">{children}</div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
