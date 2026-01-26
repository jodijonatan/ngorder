"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useCart } from "@/store/cart";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Home,
  Store,
  Settings,
  LogOut,
  LogIn,
  UserPlus,
  Heart,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();
  const { items } = useCart();

  const cartItemCount = items.reduce(
    (total: number, item: { qty: number }) => total + item.qty,
    0,
  );

  // Efek scroll untuk navbar transparan ke solid
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/80 backdrop-blur-md border-b border-white/10 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-2 group shrink-0">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
              <div className="relative w-9 h-9 bg-slate-900 border border-white/10 rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-purple-400 group-hover:text-white transition-colors" />
              </div>
            </div>
            <span className="text-xl font-black tracking-tighter text-white">
              NG<span className="text-purple-500">ORDER</span>
            </span>
          </Link>

          {/* Desktop Navigation (Center) */}
          <div className="hidden md:flex items-center bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-lg">
            <div className="flex items-center space-x-8">
              <NavLink
                href="/"
                icon={<Home className="w-4 h-4" />}
                label="Home"
              />
              <NavLink
                href="/shop"
                icon={<Store className="w-4 h-4" />}
                label="Shop"
              />
              {session?.user?.role === "ADMIN" && (
                <NavLink
                  href="/admin"
                  icon={<Settings className="w-4 h-4" />}
                  label="Admin"
                />
              )}
            </div>
          </div>

          {/* Action Icons (Right) */}
          <div className="flex items-center space-x-2">
            {/* Search Glass Button */}
            <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all">
              <Search className="w-5 h-5" />
            </button>

            {/* Cart with Badge */}
            {session?.user?.role !== "ADMIN" && (
              <Link
                href="/cart"
                className="relative p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-purple-600 text-[10px] items-center justify-center text-white font-bold">
                      {cartItemCount}
                    </span>
                  </span>
                )}
              </Link>
            )}

            <div className="h-6 w-[1px] bg-white/10 mx-2 hidden sm:block"></div>

            {/* User Profile / Auth */}
            <div className="relative group">
              {session ? (
                <>
                  <button className="flex items-center space-x-2 p-1 pl-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all">
                    <div className="w-7 h-7 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white uppercase">
                      {session.user?.name?.substring(0, 2)}
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400 group-hover:rotate-180 transition-transform duration-300" />
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-full mt-2 w-56 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                    <div className="bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-2">
                      <div className="px-4 py-3 border-b border-white/5 mb-1">
                        <p className="text-xs text-gray-400">Signed in as</p>
                        <p className="text-sm font-medium text-white truncate">
                          {session.user?.email}
                        </p>
                      </div>
                      <DropdownItem
                        href="/profile"
                        icon={<User className="w-4 h-4" />}
                        label="Profile"
                      />
                      <DropdownItem
                        href="/favorites"
                        icon={<Heart className="w-4 h-4" />}
                        label="Wishlist"
                      />
                      <button
                        onClick={() => signOut()}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-sm"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:bg-white/10 rounded-lg"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-slate-950 z-[-1] transition-transform duration-500 md:hidden ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 text-2xl font-medium">
          <Link href="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link href="/shop" onClick={() => setIsMenuOpen(false)}>
            Shop
          </Link>
          <Link href="/cart" onClick={() => setIsMenuOpen(false)}>
            Cart ({cartItemCount})
          </Link>
          {session ? (
            <button onClick={() => signOut()} className="text-red-500">
              Sign Out
            </button>
          ) : (
            <button onClick={() => signIn()} className="text-purple-500">
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

// Helper Components
function NavLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center space-x-1.5 text-sm font-medium text-gray-400 hover:text-white transition-colors group"
    >
      <span className="group-hover:text-purple-400 transition-colors">
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
}

function DropdownItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white rounded-lg transition-colors"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
